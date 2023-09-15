import React from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground,Platform, Dimensions, Text, FlatList,BackHandler, TouchableOpacity, Picker, ActivityIndicator, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import Header from '../ReuseableComponent.js/Header';
import SearchAndFilter from '../ReuseableComponent.js/SearchAndFilter';
import { DegreeSign, OpenSansSemiBold } from '../src/validations';
import { Modalize } from 'react-native-modalize';
import { Calendar } from 'react-native-calendars';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window')
import { WeatherApiKey } from '../src/api/ServerConfig';
import { getIconFromWeatherCode } from '../src/weatherfunctions';
import SimpleToast from 'react-native-simple-toast';
import { translateText } from '../src/LanguageTranslation';

var currentDate= new Date()
var maxDate=''
class Weather extends React.Component {
    calendarModal = React.createRef();
    weatherModal = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            currentTemperature: null,
            forecastOf7Days: null,
            times: [],
            date: {},
            dateWiseForecast: null,
            dateWiseForecastDate: '',
            lblDay:global.languageData.Day,
            lblHighTemp:global.languageData.High_Temp,
            lblLowTemp:global.languageData.Low_Temp,
            strCurrentStatus:''

        }
        // console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount(){
        maxDate = moment(currentDate).add(9,'days').format('YYYY-MM-DD')
        console.log('current date time',moment(currentDate).format('HH'))
    }

    componentWillMount() {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${WeatherApiKey}&q=${global.location.city.cityName}&days=30&aqi=no&alerts=no`).then(res =>
            res.json()).then(data => {
                var forecastOf7Days = data.forecast.forecastday
            // console.log('response of weather',data)
                // this.setState({
                //     currentTemperature: data.current,
                //     forecastOf7Days,
                //     times: forecastOf7Days[0].hour,
                // })

                let arrTemp = forecastOf7Days[0].hour
                var arrNew = []
                for(var i=0;i<arrTemp.length;i++){
                    // arrNew.push(forecastOf7Days[0].hour[i].time_epoch * 1000 - 3600*1000 )
                    // console.log('response of weather',forecastOf7Days[0].hour[i].time_epoch * 1000 - 3600*1000)
                    if(moment(forecastOf7Days[0].hour[i].time_epoch * 1000).format('HH') < moment(currentDate).format('HH')){
                        
                        
                    }else{
                        arrNew.push(forecastOf7Days[0].hour[i])
                        // console.log('time array',forecastOf7Days[0].hour[i].temp_c)
                    }
                }
                this.setState({
                    currentTemperature: data.current,
                    forecastOf7Days,
                    times: arrNew,
                    strCurrentStatus:data.current.condition.text
                })
                setTimeout(() => {
                    this.setLabel()
                }, 400);

            }).catch(err => { console.log(err), SimpleToast.show('Something went wrong') });

           
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        }

        componentDidUpdate(){

        }
    
        componentWillUnmount() {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        }
    
    
        handleBackButtonClick = () => {
            this.props.navigation.push('home')
            return true;
        }

    setLabel=async()=>{
       

            global.isLanguageOtherThanEnglish ?
            await translateText([this.state.strCurrentStatus], (result) => {
                this.setState({strCurrentStatus:result[0].translatedText})
                console.log('weather status',result[0].translatedText)
            }, (err) => {console.log('traslation error',err)
                
            }):null
            
            
        
    }

    setDayName(item){
        let day  = moment(item.date_epoch * 1000).format('dddd')
        var strDay = ''
        if(day == 'Monday' &&  global.isLanguageOtherThanEnglish){
            strDay = global.languageData.Monday
        }


        else if(day == 'Tuesday' &&  global.isLanguageOtherThanEnglish){
            strDay = global.languageData.Tuesday
        }

        else if(day == 'Wednesday' &&  global.isLanguageOtherThanEnglish){
            strDay = global.languageData.Wednesday
        }

        else if(day == 'Thursday' &&  global.isLanguageOtherThanEnglish){
            strDay = global.languageData.Thursday
        }

        else if(day == 'Friday' &&  global.isLanguageOtherThanEnglish){
            strDay = global.languageData.Friday
        }


        else if(day == 'Saturday' &&  global.isLanguageOtherThanEnglish){
            strDay = global.languageData.Saturday
        }

        else if(day == 'Sunday' &&  global.isLanguageOtherThanEnglish){
            strDay = global.languageData.Sunday
        }else{
            strDay = day
        }

        return(
            <View style={{width: '36%'}}>
                <Text style={{ fontSize: 13, width: '100%' }}>{strDay}</Text>
            </View>
        )
    }



    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <Header props={this.props} name={global.languageData.Weather} navName={'home'}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 10 }}>

                        <SearchAndFilter name={global.location.city.cityName + ", " + global.location.state.stateName} hideFilter={true} showCalendar={true} filterAction={() => { this.calendarModal.current.open() }} onChangeText={() => { }} />
                        {this.state.currentTemperature ?
                            <LinearGradient colors={[colors.white, colors.yellow]}
                                start={{ x: 0.1, y: 1 }} end={{ x: 3, y: 1 }}
                                style={{ marginVertical: 10, padding: 10, backgroundColor: colors.white, elevation: 2, borderRadius: 2 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: OpenSansSemiBold }}>{global.location.city.cityName}</Text>
                                    <Text style={{ color: colors.lightgrey1, fontSize: 12 }}>{moment().format("DD MMM YYYY")}</Text>
                                </View>
                                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Image source={{uri:'https:'+this.state.currentTemperature.condition.icon}}
                                        style={{ width: 55, height: 55, resizeMode: 'contain' }}
                                    />
                                    <View style={{ width: '60%' }}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={{ fontSize: 35, color: colors.green, fontFamily: OpenSansSemiBold, }}>{parseInt(this.state.currentTemperature.temp_c)}</Text>
                                            <Text style={{ fontSize: 18, marginTop: 5, color: colors.green }}>{DegreeSign}C</Text>
                                        </View>
                                        <Text style={{ fontSize: 12, textTransform: 'capitalize' }}>{this.state.strCurrentStatus}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 12, color: colors.green, textAlign: 'right' }}><Text style={{ fontFamily: OpenSansSemiBold }}>H:</Text> {this.state.forecastOf7Days.length > 0 ? parseInt(this.state.forecastOf7Days[0].day.maxtemp_c) : null}{DegreeSign} C</Text>
                                        <Text style={{ fontSize: 12, color: colors.green, textAlign: 'right' }}><Text style={{ fontFamily: OpenSansSemiBold }}>L:</Text> {this.state.forecastOf7Days.length > 0 ? parseInt(this.state.forecastOf7Days[0].day.mintemp_c) : null}{DegreeSign} C</Text>
                                    </View>
                                </View>
                            </LinearGradient> :
                            <Image source={require('../assets/loader.gif')} style={{ width: 50, height: 50, marginTop: height / 4, alignSelf: 'center' }} />
                        }
                    </View>
                    <View >
                        <FlatList
                            data={this.state.times}
                            keyExtractor={item => item.time_epoch}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                // moment(item.time_epoch * 1000).format('H') >= moment().format('H') ?
                                    <View style={{ marginRight: 20 }}>
                                        <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 13 }}>{moment(item.time).format('h A')}</Text>
                                        {/* <Image source={getIconFromWeatherCode(item.condition.code)}
                                            style={{ width: 30, height: 30, resizeMode: 'contain', marginVertical: 5 }}
                                        /> */}
                                        <Image source={{uri:'https:'+item.condition.icon}}
                                            style={{ width: 40, height: 40, resizeMode: 'contain', marginVertical: 5,}}
                                        />
                                        
                                        <Text style={{ color: colors.green, fontSize: 13 }}>{parseInt(item.temp_c)}{DegreeSign}C</Text>
                                    </View>
                                    // : null
                            )}
                            style={{ backgroundColor: colors.white, paddingLeft: 20, paddingVertical: 10, elevation: 2 }}
                            contentContainerStyle={{}}
                        />
                    </View>
                    {this.state.forecastOf7Days ?
                        <FlatList
                            data={this.state.forecastOf7Days.slice(1, 7)}
                            keyExtractor={item => item.date_epoch}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: 'row',alignItems:'center' ,backgroundColor: colors.white, padding: 10, borderBottomWidth: 1, borderBottomColor: colors.lightgrey }}>
                                    {this.setDayName(item)}
                                    <View style={{ width: '20%' }}>
                                        <Image source={{uri:'https:' + item.day.condition.icon}}
                                            style={{ width: 40, height: 40, resizeMode: 'contain', }}
                                        />
                                        
                                    </View>
                                    <Text style={{ fontSize: 13, width: '21%'}}>{parseInt(item.day.maxtemp_c)}{DegreeSign}C</Text>
                                    <Text style={{ fontSize: 13, width: '30%' }}>{parseInt(item.day.mintemp_c)}{DegreeSign}C</Text>
                                </View>
                            )}
                            ListHeaderComponent={() => (
                                <View style={{ flexDirection: 'row', backgroundColor: colors.yellow, padding: 10 }}>
                                    <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 13, width: '25%' }}>{this.state.lblDay}</Text>
                                    <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 13, width: '25%' }}></Text>
                                    <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 13, width: '25%' }}>{this.state.lblHighTemp}</Text>
                                    <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 13, width: '25%', }}>{this.state.lblLowTemp}</Text>
                                </View>
                            )}
                            style={{ backgroundColor: colors.white, elevation: 2, margin: 10 }}
                        /> : null}
                </ScrollView>
                {/* Calendar Modal */}
                <Modalize ref={this.calendarModal} handlePosition="inside"
                    adjustToContentHeight={true}
                    useNativeDriver={true}
                    modalStyle={{ borderRadius: 30 }} >
                    <View style={{ marginTop: 10,marginBottom:Platform.OS=='ios'?40:0 }}>
                        <Calendar
                            ref={ref => this.calendar = ref}
                            // Collection of dates that have to be marked. Default = {}
                            markedDates={this.state.date}
                            maxDate={maxDate}
                            enableSwipeMonths={true}
                            renderArrow={(direction) => (direction == 'left' ? <Image source={require('../assets/arrow_calendar_left.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} /> : <Image source={require('../assets/arrow_calendar_right.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />)}
                            onDayPress={(date) => {
                                var json = {}
                                json[moment(date.timestamp).format('YYYY-MM-DD')] = { selected: true, selectedColor: colors.green }
                                this.setState({
                                    date: json,
                                    dateWiseForecast: this.state.forecastOf7Days.find(item => item.date == moment(date.timestamp).format("YYYY-MM-DD")),
                                    dateWiseForecastDate: moment(date.timestamp).format("DD MMM YYYY")
                                })
                                console.log("dateWiseForecast is",this.state.forecastOf7Days.find(item => item.date == moment(date.timestamp).format("YYYY-MM-DD")))
                                this.calendarModal.current.close();
                                this.weatherModal.current.open()
                            }}
                            minDate={new Date()}
                            hideExtraDays={true}
                        />
                    </View>
                </Modalize>

                <Modalize ref={this.weatherModal} handlePosition="inside"
                    adjustToContentHeight={true}
                    useNativeDriver={true} closeOnOverlayTap={true}
                    modalStyle={{}}  >
                    <View style={{ marginVertical: 20, }}>
                        <Text style={{ textAlign: 'center', fontFamily: OpenSansSemiBold, fontSize: 16, marginVertical: 10 }}>Weather</Text>
                        <Text style={{ alignSelf: 'center', backgroundColor: colors.lightgrey, borderRadius: 20, paddingHorizontal: 10, padding: 5 }}><Ionicons name="calendar" size={18} /> {this.state.dateWiseForecastDate}</Text>
                        {this.state.dateWiseForecast ?
                            <View style={{ padding: 10 }}>
                                <LinearGradient colors={[colors.white, colors.yellow]}
                                    start={{ x: 0.1, y: 1 }} end={{ x: 3, y: 1 }}
                                    style={{ marginVertical: 10, padding: 10, backgroundColor: colors.white, elevation: 2, borderRadius: 2 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: OpenSansSemiBold }}>{global.location.city.cityName}</Text>
                                        {/* <Text style={{ color: colors.lightgrey1, fontSize: 12 }}>{moment(this.state.dateWiseForecast.date_epoch * 1000).format("DD MMM YYYY")}</Text> */}
                                    </View>
                                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Image source={{uri:'https:'+this.state.dateWiseForecast.day.condition.icon}}
                                            style={{ width: 55, height: 55, resizeMode: 'contain' }}
                                        />
                                        <View style={{ width: '60%' }}>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={{ fontSize: 35, color: colors.green, fontFamily: OpenSansSemiBold, }}>{parseInt(this.state.dateWiseForecast.day.maxtemp_c)}</Text>
                                                <Text style={{ fontSize: 18, marginTop: 5, color: colors.green }}>{DegreeSign}C</Text>
                                            </View>
                                            <Text style={{ fontSize: 12, textTransform: 'capitalize' }}>{this.state.dateWiseForecast.day.condition.text}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 12, color: colors.green, textAlign: 'right' }}><Text style={{ fontFamily: OpenSansSemiBold }}>H:</Text> {parseInt(this.state.dateWiseForecast.day.maxtemp_c)}{DegreeSign} C</Text>
                                            <Text style={{ fontSize: 12, color: colors.green, textAlign: 'right' }}><Text style={{ fontFamily: OpenSansSemiBold }}>L:</Text> {parseInt(this.state.dateWiseForecast.day.mintemp_c)}{DegreeSign} C</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </View> : <Text style={{ color: colors.lightgrey1, textAlign: 'center', marginVertical: 50 }}>Records not found</Text>}

                        {this.state.dateWiseForecast ?
                            <View>
                                <FlatList
                                    data={this.state.dateWiseForecast.hour}
                                    keyExtractor={item => item.time_epoch}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        // moment(item.time).format('H') >= moment().format('H') ?
                                            <View style={{ marginRight: 20 }}>
                                                <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 13 }}>{moment(item.time).format('h A')}</Text>
                                                <Image source={{uri:'https:'+item.condition.icon}}
                                                    style={{ width: 40, height: 40, resizeMode: 'contain', marginVertical: 5 }}
                                                />
                                                <Text style={{ color: colors.green, fontSize: 13 }}>{parseInt(item.temp_c)}{DegreeSign}C</Text>
                                            </View>
                                            // : null
                                    )}
                                    style={{ backgroundColor: colors.white, paddingLeft: 20, paddingVertical: 10, elevation: 2 }}
                                    contentContainerStyle={{}}
                                />
                            </View> : null}


                    </View>
                </Modalize>
            </SafeAreaView >
        )
    }

}



function mapStateToProps(state) {
    return {


    };
}


export default compose(connect(mapStateToProps, {

}))(Weather);