import moment from 'moment';
import React from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground, Dimensions, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Animated, ScrollView, } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import AddButton from '../ReuseableComponent.js/AddButton';
import Button from '../ReuseableComponent.js/Button';
import Header from '../ReuseableComponent.js/Header';
import { OpenSansSemiBold } from '../src/validations';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import SimpleToast from 'react-native-simple-toast';
import { isEmpty } from '../src/validations';
import Modal from 'react-native-modal';
import Utility from '../ReuseableComponent.js/Utility';
import { translateText } from '../src/LanguageTranslation';
import AsyncStorage from '@react-native-community/async-storage';
const { width, height } = Dimensions.get('window')

class Schedule extends React.Component {
    filterModal = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            date: {
                '2021-10-01': { selected: true, selectedColor: colors.purpleCalendar },
                '2021-10-05': { selected: true, selectedColor: colors.pinkCalendar },
                '2021-10-17': { selected: true, selectedColor: colors.orangeCalendar },
                '2021-10-19': { selected: true, selectedColor: colors.blueCalendar },
            },
            data: [
                { name: "Past", fields: [{ image: require('../assets/scheduled_entry_pointer_purple.png'), date: '01 Jul', description: 'Fertilize Field 2' }] },
                { name: "Today", fields: [{ image: require('../assets/scheduled_entry_pointer_pink.png'), date: '05 Jul', description: 'Fertilize Field 3' }] },
                {
                    name: "Upcoming", fields: [{ image: require('../assets/scheduled_entry_pointer_orange.png'), date: '17 Jul', description: 'Water Wheat Field 1' },
                    { image: require('../assets/scheduled_entry_pointer_blue.png'), date: '19 Jul', description: 'Water Wheat Field 2' }]
                },
            ],
            listView: false,
            listData: [
                { color: require('../assets/schedule_list_dot_pink.png'), date: 'Today', desc: 'Fertilized Field 2' },
                { color: require('../assets/schedule_list_dot_orange.png'), date: '17 Jul', desc: 'Water Wheat Field 1' },
                { color: require('../assets/schedule_list_dot_blue.png'), date: '19 Jul', desc: 'Water Wheat Field 2' },
            ],
            ScheduleData: [],
            PastData: [],
            TodayData: [],
            UpcomeData: [],
            rows: {},
            openRowRef: {},
            markedDatess: {},
            //  markedDatesss:{'2023-04-01': {selected: true, marked: true, selectedColor: '#FF5733'},
            //                         '2023-04-02': {selected: false,marked: true, selectedColor: '#FFFFFF'},
            //                         '2023-04-03': {selected: true, marked: true, selectedColor: '#FF5733'}
            //                       }

        }

        console.disableYellowBox = true;

    }

    componentWillMount() {
        this.GetDate();
    }

    GetDate() {
        this.setState({ isLoading: true })
        var body = {
            "loginuserID": global.userID,
            "languageID": global.languageID,
            "apiType": "Android",
            "apiVersion": "2.0",
            "scheduleID": '',
        }
        console.log("NextPage-->", JSON.stringify(body));
        let config = {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            })
        }
        if (body !== "") {
            let newBody = JSON.stringify(body)
            config = { ...config, body: newBody }
        }
        fetch(global.Url + 'schedule/get-schedule-list', config)
            .then(response => response.json())
            .then(async resulta => {

                console.log("filteredData---000", resulta)

                if (resulta[0].status == "true") {

                    var arrData = resulta[0].data
                    

                    const res=arrData.slice(0).sort((a,b)=> a.scheduleDate.localeCompare(b.scheduleDate)||a.scheduleTime.localeCompare(b.scheduleTime));
                   
                    const  arrTempload = []
                    for (var i = 0; i < arrData.length; i++) {
                        if (global.isLanguageOtherThanEnglish) {
                            await translateText([arrData[i].scheduleID, arrData[i].userID, arrData[i].scheduleDate,
                                arrData[i].scheduleTime, arrData[i].scheduleColor,
                                arrData[i].scheduleSubject, arrData[i].scheduleCreatedDate,], (result) => {

                                var dict = {}
                                dict["scheduleID"] = result[0].translatedText
                                dict["userID"] = result[1].translatedText
                                dict["scheduleDate"] = result[2].translatedText
                                dict["scheduleTime"] = result[3].translatedText
                                dict["scheduleColor"] = result[4].translatedText
                                dict["scheduleSubject"] = result[5].translatedText
                                dict["scheduleCreatedDate"] = result[6].translatedText

                                console.log("filteredData---000dict", dict)

                                arrTempload.push(dict)

                                console.log("filteredData---000dict", JSON.stringify(arrTempload))

                                var sortedData = arrTempload.slice(0).sort((a,b)=> a.scheduleDate.localeCompare(b.scheduleDate)||a.scheduleTime.localeCompare(b.scheduleTime));
                   

                                this.setState({ ScheduleData: sortedData })

                                var filteredDatapast = arrTempload.filter((a) => { return (moment(a.scheduleDate).format('YYYY-MM-DD')) < moment(new Date()).format('YYYY-MM-DD') })
                                this.setState({ PastData: filteredDatapast })
            
                                var filteredDatatoday = arrTempload.filter((a) => { return (moment(a.scheduleDate).format('YYYY-MM-DD')) == moment(new Date()).format('YYYY-MM-DD') })
                                this.setState({ TodayData: filteredDatatoday })
            
            
                                var filteredData = arrTempload.filter((a) => { return (moment(a.scheduleDate).format('YYYY-MM-DD')) > moment(new Date()).format('YYYY-MM-DD') })
                                this.setState({ UpcomeData: filteredData })

                            }, (err) => {
                                SimpleToast.show('Something went wrong with translation')

                            })
                        } else {
                            var dict = {}
                           

                                dict["scheduleID"] = arrData[i].scheduleID
                                dict["userID"] = arrData[i].userID
                                dict["scheduleDate"] = arrData[i].scheduleDate
                                dict["scheduleTime"] =arrData[i].scheduleTime
                                dict["scheduleColor"] = arrData[i].scheduleColor
                                dict["scheduleSubject"] = arrData[i].scheduleSubject
                                dict["scheduleCreatedDate"] = arrData[i].scheduleCreatedDate
                                arrTempload.push(dict)
                                var sortedData = arrTempload.slice(0).sort((a,b)=> a.scheduleDate.localeCompare(b.scheduleDate)||a.scheduleTime.localeCompare(b.scheduleTime));
                   
                                var filteredDatapast = arrTempload.filter((a) => { return (moment(a.scheduleDate).format('YYYY-MM-DD')) < moment(new Date()).format('YYYY-MM-DD') })
                                this.setState({ PastData: filteredDatapast })
            
                                var filteredDatatoday = arrTempload.filter((a) => { return (moment(a.scheduleDate).format('YYYY-MM-DD')) == moment(new Date()).format('YYYY-MM-DD') })
                                this.setState({ TodayData: filteredDatatoday })
            
            
                                var filteredData = arrTempload.filter((a) => { return (moment(a.scheduleDate).format('YYYY-MM-DD')) > moment(new Date()).format('YYYY-MM-DD') })
                                this.setState({ UpcomeData: filteredData })

                            this.setState({ ScheduleData: sortedData })
                        }

                    }



                    //this.setState({ ScheduleData: res })
                            console.log("res---000",res);
                    // console.log("farmmgt/farm-input-data", this.state.ScheduleData);

                    // var filteredDatapast = arrData.filter((a) => { return (moment(a.scheduleDate).format('YYYY-MM-DD')) < moment(new Date()).format('YYYY-MM-DD') })
                    // this.setState({ PastData: filteredDatapast })

                    // var filteredDatatoday = arrData.filter((a) => { return (moment(a.scheduleDate).format('YYYY-MM-DD')) == moment(new Date()).format('YYYY-MM-DD') })
                    // this.setState({ TodayData: filteredDatatoday })


                    // var filteredData = arrData.filter((a) => { return (moment(a.scheduleDate).format('YYYY-MM-DD')) > moment(new Date()).format('YYYY-MM-DD') })
                    // this.setState({ UpcomeData: filteredData })

                    //  console.log("filteredData---000", filteredData)
                    var arrTemp = {}
                    var data;
                    // for (var i = 0; i < resulta[0].data.length; i++) {
                    //     data = [resulta[i].data.scheduleDate]+':'+{ selected: true, marked: true, selectedColor: "blue" }
                    //     arrTemp.push(data)
                    //     this.setState({ markedDatess: arrTemp })
                    // }
                    let markdate = {}
                    resulta[0].data.map((item) => {

                        /// console.log("filteredData---000", "markedDatess")
                        markdate[item.scheduleDate] = {
                            selected: true,

                            selectedColor: item.scheduleColor,
                        };

                    });

                    console.log("filteredData---000", "markedDatess")

                    console.log("filteredData---000", markdate)
                    this.setState({ markedDatess: markdate })

                } else {
                    this.setState({ ScheduleData: [] })
                    this.setState({ markedDatess: {} })
                    this.setState({ PastData: [] })
                    this.setState({ TodayData: [] })
                    this.setState({ UpcomeData: [] })
                }
                this.setState({ isLoading: false })
            }).catch(err => {
                this.setState({ isLoading: false })
                console.log("language/list-labels Error", err)
            })





    }


    Test = (rowMap, data, item) => {
        console.log("language/list-labels Error", data + "----" + item)
    }
    Delete = (item) => {
        console.log("item---->", item)
        // if (rowMap[index]) {

        //     rowMap[index].closeRow();

        //   }
        // this.closeItem(rowMap, rowKey);
        this.setState({ isLoading: true })
        var body = {
            "loginuserID": global.userID,

            "languageID": global.languageID,
            "apiType": "Android",
            "apiVersion": "2.0",
            "scheduleID": item,
        }
        console.log("item-->", JSON.stringify(body));
        let config = {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            })
        }
        if (body !== "") {
            let newBody = JSON.stringify(body)
            config = { ...config, body: newBody }
        }
        fetch(global.Url + 'schedule/delete-schedule', config)
            .then(response => response.json())
            .then(async resulta => {


                console.log("item---000", resulta)
                if (resulta[0].status == "true") {
                  //  SimpleToast.show(resulta[0].message)
                    console.log("item---000", this.state.ScheduleData.length)

                    this.GetDate();
                }
                this.setState({ isLoading: false })
            }).catch(err => {
                this.setState({ isLoading: false })
                console.log("language/list-labels Error", err)
            })


    }
    closeItem = (rowMap, rowKey) => {

        if (rowMap[rowKey]) {
            console.log("language/list-labels Error", rowMap + "----" + rowKey)
            rowMap[rowKey].closeRow();

        } else {

        }

    };


    closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            console.log("language/list-labels Error", "----" + rowKey)
            rowMap[rowKey].closeRow();
        }
    };

    deleteItem = (rowKey) => {
        //console.log("language/list-labels Error","----"+rowKey)

        //this.closeItem(rowMap, rowKey);

        //  rowMap[rowKey].closeRow()
        //this.closeOpenRow
        // closeRow(rowMap, rowKey);
        this.Delete(rowKey)

        // const newData = [...listData];

        // const prevIndex = listData.findIndex(item => item.key === rowKey);

        // newData.splice(prevIndex, 1);

        // setListData(newData);

    };

    deleteRow(rowMap, rowKey) {
        console.log("language/list-labels Error", rowMap + "----" + rowKey)
        rowMap[`${rowKey}`].closeRow()
    }

    renderHiddenItem = (data, rowMap) => (



        <View style={{ alignItems: 'flex-end', }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.pinkCalendar, margin: 10, width: '20%', paddingVertical: 11, borderRadius: 5, paddingLeft: 8, height: 55 }}>
                <Image source={require('../assets/delete_white_2.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                <TouchableOpacity onPress={() => this.deleteItem(rowMap, data.item.scheduleID)}>
                    <Text style={{ color: colors.white, fontSize: 12 }}> delete</Text>
                </TouchableOpacity>
            </View>
            {/* //Swipe left to */}

        </View>



    );

    refresh = (data) => {
        console.log('video------->', data)
        if (isEmpty(data)) {

        } else {
            this.GetDate();
        }
        // {this.BackPlayAction(global.item,global.index)}
    }

    //  onRowDidOpen = (rowKey, rowMap) => {
    //     console.log('video------->',"data")
    //     this.state.openRowRef.current = rowMap[rowKey];
    // };



    closeOpenRow = () => {
        if (this.state.openRowRef.current && this.state.openRowRef.current.closeRow) {
            console.log('video------->', "data")
            this.state.openRowRef.current.closeRow();
        }
    };
    onRowDidOpen1 = rowKey => {
        console.log('This row opened', rowKey);
    };
    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.75)" }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <Header name={"Schedule"} props={this.props} showList={!this.state.listView} showCalendar={this.state.listView} rightAction={() => { this.setState({ listView: !this.state.listView }) }} />
                {this.state.listView ?
                    <View>
                        {this.state.ScheduleData.length > 0 ?
                         <SwipeListView

                            data={this.state.ScheduleData}
                            renderItem={({ item, index }) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, backgroundColor: colors.white, padding: 10, elevation: 0.5, borderRadius: 5, height: 55 }}>
                                    {/* <Image source={item.scheduleColor} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 10 }} />
                                */}
                                    {/* {item.scheduleColor == "#5b2c6f" ? <Image source={require('../assets/color_purple.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                               :
                                               item.scheduleColor == "#FF5733" ? <Image source={require('../assets/color_orange.png')} style={{ width: 20, height: 20, marginRight: 10 , resizeMode: 'contain' }} />
                                               :
                                               item.scheduleColor == "#2ecc71" ? <Image source={require('../assets/color_green.png')} style={{ width: 20, height: 20, marginRight: 10 ,resizeMode: 'contain' }} />
                                               :
                                               item.scheduleColor == "#DFFF00" ? <Image source={require('../assets/color_yellow.png')} style={{ width: 20, height: 20,marginRight: 10 , resizeMode: 'contain' }} />
                                               :
                                               item.scheduleColor == "#3498db" ? <Image source={require('../assets/color_blue.png')} style={{ width: 20, height: 20, marginRight: 10 ,resizeMode: 'contain' }} />
                                               :
                                               item.scheduleColor == "#ed145b" ? <Image source={require('../assets/color_pink.png')} style={{ width: 20, height: 20, marginRight: 10 ,resizeMode: 'contain' }} />
                                               : null} */}

                                    <Image source={require('../assets/color_purple.png')} style={{ tintColor: item.scheduleColor, width: 20, height: 20, resizeMode: 'contain' }} />
                                    <View style={{ width: '85%',marginLeft:10 }}>
                                        <Text style={{ fontFamily: OpenSansSemiBold }}>{(moment(item.scheduleDate).format('YYYY-MM-DD')) == (moment(new Date()).format('YYYY-MM-DD'))? 'Today':(moment(item.scheduleDate).format("DD MMM"))}

                                            
                                            
                                            </Text>
                                        <Text style={{ color: colors.lightgrey1 }}>{item.scheduleSubject}</Text>
                                    </View>

                                  <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('addschedule', {onGoBack: this.refresh,item
                            })
                        }}>
                                    <Image source={require('../assets/edit_black.png')} style={{ width: 18, height: 18, resizeMode: 'contain', marginRight: 5 }} />
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={() => { this.deleteItem(item.scheduleID)}}>
                               <Image source={require('../assets/delete_white_2.png')} style={{ tintColor: 'black',width: 18, height: 18,marginRight:15, resizeMode: 'contain' }} />
                          
                                </TouchableOpacity> */}
                                </View>
                            )}
                            renderHiddenItem={({ item }) => (

                                <View style={{ alignItems: 'flex-end', }}>
                                    <TouchableOpacity onPress={() => { this.deleteItem(item.scheduleID) }} style={{ alignItems: 'flex-end', }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.pinkCalendar, margin: 10, width: '25%', paddingVertical: 11, borderRadius: 5, paddingLeft: 5, paddingRight: 5, height: 55 }}>
                                            <Image source={require('../assets/delete_white_2.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                                            {/* <TouchableOpacity onPress={() => {this.Delete(item,index)}}> */}



                                            <Text style={{ color: colors.white, fontSize: 12 }}>  delete</Text>

                                        </View>
                                    </TouchableOpacity>
                                    {/* //Swipe left to */}

                                </View>

                            )}
                            // renderHiddenItem={ ({item}, rowMap) => (
                            //     <View style={{ alignItems: 'flex-end', }}>

                            //     <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.pinkCalendar, margin: 10, width: '20%', paddingVertical: 11, borderRadius: 5, paddingLeft: 8, height: 55 }}>
                            //         <Image source={require('../assets/delete_white_2.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                            //         {/* <TouchableOpacity onPress={() => {this.Delete(item,index)}}> */}
                            //         <TouchableOpacity onPress={_ => rowMap[ `${item.scheduleID}` ].closeRow() }>


                            //         <Text style={{ color: colors.white, fontSize: 12 }}>  delete</Text>
                            //         </TouchableOpacity>
                            //     </View>
                            //     {/* //Swipe left to */}

                            // </View>
                            // )}
                            // renderHiddenItem={ (data, rowMap,{ item }) => (
                            //     <View style={{ alignItems: 'flex-end', }}>

                            //     <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.pinkCalendar, margin: 10, width: '20%', paddingVertical: 11, borderRadius: 5, paddingLeft: 8, height: 55 }}>
                            //         <Image source={require('../assets/delete_white_2.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                            //         <TouchableOpacity onPress={() => {this.Test(data, rowMap,item)}}>
                            //         <Text style={{ color: colors.white, fontSize: 12 }}>{item.scheduleID} delete</Text>
                            //         </TouchableOpacity>
                            //     </View>
                            //     {/* //Swipe left to */}

                            // </View>
                            // )}
                            useNativeDriver={true}
                            disableRightSwipe={true}
                            rightOpenValue={-(width * 0.4)}
                            keyExtractor={(item, index) => item.scheduleID}
                        // closeOnRowPress={true}
                        // closeOnRowBeginSwipe={true}
                        // onRowDidOpen={this.onRowDidOpen}
                        /> : null}

                    </View>

                    //     <SwipeListView
                    //     data={this.state.ScheduleData}
                    //     renderItem={({ item }) => (
                    //         <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, backgroundColor: colors.white, padding: 10, elevation: 0.2, borderRadius: 5, height: 55 }}>
                    //             {/* <Image source={item.scheduleColor} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 10 }} />
                    //              */}
                    //             {item.scheduleColor == "#5b2c6f" ? <Image source={require('../assets/color_purple.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                    //                             :
                    //                             item.scheduleColor == "#FF5733" ? <Image source={require('../assets/color_orange.png')} style={{ width: 20, height: 20, marginRight: 10 , resizeMode: 'contain' }} />
                    //                             :
                    //                             item.scheduleColor == "#2ecc71" ? <Image source={require('../assets/color_green.png')} style={{ width: 20, height: 20, marginRight: 10 ,resizeMode: 'contain' }} />
                    //                             :
                    //                             item.scheduleColor == "#DFFF00" ? <Image source={require('../assets/color_yellow.png')} style={{ width: 20, height: 20,marginRight: 10 , resizeMode: 'contain' }} />
                    //                             :
                    //                             item.scheduleColor == "#3498db" ? <Image source={require('../assets/color_blue.png')} style={{ width: 20, height: 20, marginRight: 10 ,resizeMode: 'contain' }} />
                    //                             :
                    //                             item.scheduleColor == "#ed145b" ? <Image source={require('../assets/color_pink.png')} style={{ width: 20, height: 20, marginRight: 10 ,resizeMode: 'contain' }} />
                    //                             : null}

                    //             <View style={{ width: '85%' }}>
                    //                 <Text style={{ fontFamily: OpenSansSemiBold }}>{moment(item.scheduleDate).format("DD MMM")}</Text>
                    //                 <Text style={{ color: colors.lightgrey1 }}>{item.scheduleSubject}</Text>
                    //             </View>
                    //             <Image source={require('../assets/edit_black.png')} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                    //         </View>
                    //     )}
                    //     keyExtractor={(item, index) => item.scheduleID}
                    //     renderHiddenItem={this.renderHiddenItem}
                    //     useNativeDriver={true}
                    //     disableRightSwipe={true}
                    //     rightOpenValue={-(width * 0.4)}
                    //     onRowDidOpen={this.onRowDidOpen1}

                    // />
                    :
                    <ScrollView>
                        <View style={{ margin: 10 }}>
                            <Calendar
                                ref={ref => this.calendar = ref}
                                // Collection of dates that have to be marked. Default = {}
                                //  markedDates={this.state.date}
                                enableSwipeMonths={true}
                                renderArrow={(direction) => (direction == 'left' ? <Image source={require('../assets/arrow_calendar_left.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} /> : <Image source={require('../assets/arrow_calendar_right.png')} style={{ width: 20, height: 20, resizeMode: 'contain', }} />)}
                                // onDayPress={(date) => {
                                //     var json = {}
                                //     json[moment(date.timestamp).format('YYYY-MM-DD')] = { selected: true, selectedColor: colors.green }
                                //     this.setState({ date: json })
                                //     // this.weatherModal.current.open()
                                // }}
                                // markedDates={{
                                //     '2023-04-01': {selected: true, marked: true, selectedColor: '#FF5733'},
                                //     '2023-04-02': {marked: true},
                                //     '2023-04-03': {selected: true, marked: true, selectedColor: '#FF5733'}
                                //   }}
                                markedDates={this.state.markedDatess}


                                hideExtraDays={true}
                                headerStyle={{ borderBottomWidth: 1, borderBottomColor: colors.lightgrey1 }}
                            />
                        </View>

                        {/* <FlatList
                            data={this.state.data}
                            keyExtractor={item => item.name}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                                    <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16 }}>{item.name}</Text>
                                    <FlatList
                                        data={item.fields}
                                        keyExtractor={item => item.description}
                                        renderItem={({ item }) => (
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={item.image} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                <Text> {item.date}  </Text>
                                                <Text style={{ color: colors.lightgrey1 }}>{item.description}</Text>
                                            </View>
                                        )}
                                    />
                                </View>
                            )}
                            style={{ marginHorizontal: 10, backgroundColor: colors.white }}
                        /> */}

                        {this.state.PastData.length > 0 ? <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                            <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16 }}>Past</Text>
                            <FlatList
                                data={this.state.PastData}
                                keyExtractor={item => item.scheduleID}
                                renderItem={({ item }) => (

                                    // {item.scheduleColor === "#5b2c6f" && (
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                        {/* {item.scheduleColor == "#5b2c6f" ? <Image source={require('../assets/scheduled_entry_pointer_purple.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#FF5733" ? <Image source={require('../assets/scheduled_entry_pointer_orange.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#2ecc71" ? <Image source={require('../assets/scheduled_entry_pointer_green.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#DFFF00" ? <Image source={require('../assets/scheduled_entry_pointer_yellow.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#3498db" ? <Image source={require('../assets/scheduled_entry_pointer_blue.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#ed145b" ? <Image source={require('../assets/scheduled_entry_pointer_pink.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                : null} */}

                                        <Image source={require('../assets/scheduled_entry_pointer_pink.png')} style={{ tintColor: item.scheduleColor, width: 30, height: 30, resizeMode: 'contain' }} />


                                        <Text> {moment(item.scheduleDate).format("DD MMM")}  </Text>
                                        <Text style={{ color: colors.lightgrey1 }}>{item.scheduleSubject}</Text>
                                    </View>
                                    //)}



                                )}
                            />
                        </View> : null}

                        {this.state.TodayData.length > 0 ?
                            <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                                <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16 }}>Today</Text>
                                <FlatList
                                    data={this.state.TodayData}
                                    keyExtractor={item => item.scheduleID}
                                    renderItem={({ item }) => (

                                        // {item.scheduleColor === "#5b2c6f" && (
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            {/*             
                                                 {item.scheduleColor == "#5b2c6f" ? <Image source={require('../assets/scheduled_entry_pointer_purple.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#FF5733" ? <Image source={require('../assets/scheduled_entry_pointer_orange.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#2ecc71" ? <Image source={require('../assets/scheduled_entry_pointer_green.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#DFFF00" ? <Image source={require('../assets/scheduled_entry_pointer_yellow.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#3498db" ? <Image source={require('../assets/scheduled_entry_pointer_blue.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#ed145b" ? <Image source={require('../assets/scheduled_entry_pointer_pink.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                : null} */}

                                            <Image source={require('../assets/scheduled_entry_pointer_pink.png')} style={{ tintColor: item.scheduleColor, width: 30, height: 30, resizeMode: 'contain' }} />


                                            <Text> {moment(item.scheduleDate).format("DD MMM")}  </Text>
                                            <Text style={{ color: colors.lightgrey1 }}>{item.scheduleSubject}</Text>
                                        </View>
                                        //)}



                                    )}
                                />
                            </View> : null}

                        {this.state.UpcomeData.length > 0 ?
                            <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                                <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16 }}>Upcoming</Text>
                                <FlatList
                                    data={this.state.UpcomeData}
                                    keyExtractor={item => item.scheduleID}
                                    renderItem={({ item }) => (

                                        // {item.scheduleColor === "#5b2c6f" && (
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                            {/* {item.scheduleColor == "#5b2c6f" ? <Image source={require('../assets/scheduled_entry_pointer_purple.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#FF5733" ? <Image source={require('../assets/scheduled_entry_pointer_orange.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#2ecc71" ? <Image source={require('../assets/scheduled_entry_pointer_green.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#DFFF00" ? <Image source={require('../assets/scheduled_entry_pointer_yellow.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#3498db" ? <Image source={require('../assets/scheduled_entry_pointer_blue.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                :
                                                item.scheduleColor == "#ed145b" ? <Image source={require('../assets/scheduled_entry_pointer_pink.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                : null} */}
                                            <Image source={require('../assets/scheduled_entry_pointer_pink.png')} style={{ tintColor: item.scheduleColor, width: 30, height: 30, resizeMode: 'contain' }} />


                                            <Text> {moment(item.scheduleDate).format("DD MMM")}  </Text>
                                            <Text style={{ color: colors.lightgrey1 }}>{item.scheduleSubject}</Text>
                                        </View>
                                        //)}



                                    )}
                                />
                            </View> : null}

                        <AddButton props={this.props} nav="addschedule" />

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('addschedule', {
                                onGoBack: this.refresh,
                            })
                        }}
                            style={{ position: 'absolute', right: 0, bottom: 0 }} >
                            <Image source={require('../assets/plus_circular_floating_btn.png')} style={{ width: 70, height: 70, resizeMode: 'contain', }} />
                        </TouchableOpacity>
                    </ScrollView>}
                <Modal visible={this.state.isLoading}
                    style={{ alignItems: 'center' }}>
                    <Image source={require('../assets/loader.gif')} style={{ width: 50, height: 50, }} />
                </Modal>
            </SafeAreaView>
        )
    }

}
const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
};

const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
};
const onRowDidOpen1 = (rowKey, rowMap) => {
    openRowRef.current = rowMap[rowKey];
};

const closeOpenRow = () => {
    if (openRowRef.current && openRowRef.current.closeRow) {
        openRowRef.current.closeRow();
    }
};

function alertLogin(props) {
    var ut = new Utility()
    ut.loginAlert(props)
}

function mapStateToProps(state) {
    return {


    };
}


export default compose(connect(mapStateToProps, {

}))(Schedule);


const styles = StyleSheet.create({





});