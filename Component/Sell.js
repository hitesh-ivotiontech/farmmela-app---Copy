import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground, Dimensions,Platform,Text, FlatList,RefreshControl, BackHandler,TouchableOpacity, TextInput, StyleSheet, Animated, } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { TabView } from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import AddButton from '../ReuseableComponent.js/AddButton';
import FilterModal from '../ReuseableComponent.js/FilterModal';
import Header from '../ReuseableComponent.js/Header';
import ListView from '../ReuseableComponent.js/ListView';
import SearchAndFilter from '../ReuseableComponent.js/SearchAndFilter';
import { BuySellRentActions } from '../src/actions';
import { isServerSuccess, OpenSansSemiBold, searchFilter } from '../src/validations';
const { width, height } = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient'

class Sell extends React.Component {
    filterModal = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: global.languageData.Sell},
                { key: 'second', title: global.languageData.My_Ads },
            ],
            data: [],
            myAds: [],
            filterData: [],
            filterMyAds: [],
            page: 0,
            pageMyAds: 0,
            isLoading:true,
            isRefresh:false
        }
        this.onEndReachedCalledDuringMomentum = true;
        console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        global.isFromFilterNav = 'buy'
        this.setState({
            data: [],
            myAds: [],
            filterData: [],
            filterMyAds: [],
            page: 0,
            pageMyAds: 0
        }, () => {
            this.getAds('0','0','0')
            this.getMyAds('0','0','0')
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.navigation.goBack()
       // this.props.navigation.navigate('buysellrent')
        return true;
    }

    reset=()=>{
        global.isReset = true
        this.onEndReachedCalledDuringMomentum = true;
        if(this.state.index ==1){
            this.setState({myAds: [],filterMyAds: [],pageMyAds: 0})
            setTimeout(() => {
                this.getMyAds('0','0','0')
            }, 300);
            
        }else{
            this.setState({data: [],filterData: [],page: 0,})
            setTimeout(() => {
                this.getAds('0','0','0')
            }, 300);
            
        }
        this.filterModal.current.close()
    }

    getAds(catID,subCatID,subSubID) {
        var body = {
            "loginuserID": global.user ? global.userID:'0',
            "categoryID": catID,
            "postsubcatID": subCatID,
            "postsubsubcatID":subSubID,
            "advertiseType": "Sell",
            "page": this.state.page,
            "pagesize": "300",
            "lat": "23.72",
            "longi": "72.23",
            "languageID": global.languageID,
            "apiType": "Android",
            "apiVersion": "2.0"
        }
        console.log('ads body',body)
        this.props.GetAdvertisement(body)
    }

    getMyAds(catID,subCatID,subSubID) {
        var body = {
            "loginuserID": global.user ? global.userID:'0',
            "categoryID": catID,
            "postsubcatID": subCatID,
            "postsubsubcatID":subSubID,
            "advertiseType": "Sell",
            "page": this.state.pageMyAds,
            "pagesize": "300",
            "lat": "23.72",
            "longi": "72.23",
            "languageID": global.languageID,
            "apiType": "Android",
            "apiVersion": "2.0"
        }
        console.log('my ads body',body)
        this.props.GetMyAdvertisement(body)
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.GetAdvertisementSuccess) {
            var data = nextProps.GetAdvertisementInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    var data = this.state.data
                    data = data.concat(response.data)
                    const newArray = Array.from(new Set(data.map(JSON.stringify))).map(JSON.parse);
                    data = newArray
                    this.setState({ data, filterData: data,})
                }
                this.setState({isLoading:false,isRefresh:false })
            })
           
        }else{
            this.setState({isLoading:false,isRefresh:false })
        }
        if (nextProps.GetMyAdvertisementSuccess) {
            var data = nextProps.GetMyAdvertisementInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    var myAds = this.state.myAds
                    myAds = myAds.concat(response.data)
                    const newArray = Array.from(new Set(myAds.map(JSON.stringify))).map(JSON.parse);
                    myAds = newArray
                    this.setState({ myAds, filterMyAds: myAds,isRefresh:false })
                }
            })
        }else{
            this.setState({isLoading:false,isRefresh:false })
        }
        if (nextProps.DeleteAdvertisementSuccess) {
            var data = nextProps.DeleteAdvertisementInfo.details
            isServerSuccess(data, this.props, (response) => {
                console.log("Delete Response", response)
                if (response.status == "true") {
                    // SimpleToast.show(response.message)
                    this.componentWillMount()
                }
            })
        }
    }

    _renderTabBar = props => {
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    return (
                        route.title !== '' ?
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={[{ alignItems: 'center', height: 40, justifyContent: 'center' }, i == this.state.index ? { backgroundColor: colors.green, borderRadius: 20 } : {}]}
                                    onPress={() => {//this.reset()
                                    this.setState({ index: i })}}>
                                    <Animated.Text numberOfLines={1}
                                        style={[{ fontFamily: OpenSansSemiBold, fontSize: 15 }, i == this.state.index ? { color: colors.white } : { color: colors.green }]}
                                    >
                                        {route.title}
                                    </Animated.Text>
                                </TouchableOpacity>
                                <Animated.View
                                    style={{}}
                                />
                            </View> : null
                    );
                })}

            </View>
        );
    };


    searchFromList(catID,subcatID,subSubID,type) {
        this.onEndReachedCalledDuringMomentum = true;
        if(type =='myads'){
            this.setState({
                
                myAds: [],
                filterMyAds: [],
                pageMyAds: 0
            })
            setTimeout(() => {
                this.getMyAds(catID,subcatID,subSubID)
            }, 300);
            
            console.log('item is',catID,subcatID, type)
        }else{
            this.setState({
                data: [],
                filterData: [],
                page: 0,
            })
            setTimeout(() => {
                this.getAds(catID,subcatID,subSubID)
            }, 300);
            
            console.log('item is',catID,subcatID, type)
        }
        // type == 'myads' ?
        //     this.setState({ filterMyAds: searchFilter(text, this.state.myAds) })
        //     :
        //     this.setState({ filterData: searchFilter(text, this.state.data) })
    }
    onRefreshFlatlist = () => {
        this.setState({isRefresh:true})
        if(this.state.index == 0){
            this.getAds("0","0","0")
        }else{
            this.getMyAds("0","0","0")
        }
    }

    view = (type) => (
        global.user || type=='sell'? <View style={{ paddingHorizontal: 10, flex: 1 }}>
            <SearchAndFilter filterAction={() => this.filterModal.current.open()} onChangeText={(text) => { this.searchFromList(text,type) }} />
            <FlatList
                data={type == 'myads' ? this.state.filterMyAds : this.state.filterData}
                keyExtractor={item => item.advertiseID}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefresh}
                        tintColor={colors.green}
                        onRefresh={this.onRefreshFlatlist}
                    />
                }
                renderItem={({ item }) => (
                    <ListView props={this.props} item={item} type={type} from={"Sell"} refresh={() => {
                        this.componentWillMount()
                    }}
                        deleteAdvertisemnt={(item) => {
                            var body = {
                                "loginuserID": global.userID,
                                "advertiseID": item.advertiseID,
                                "languageID": global.languageID,
                                "apiType": "Android",
                                "apiVersion": "2.0"
                            }
                            console.log(body)
                            this.props.DeleteAdvertisement(body);
                        }} />
                )}
                ListEmptyComponent={() => (
                    <Text style={{ color: colors.lightgrey1, textAlign: 'center', marginTop: height / 4 }}>{this.state.isLoading?'':global.languageData.No_records_found}</Text>
                )}
           
                onEndReachedThreshold={0.2}
                onEndReached={(distanceFromEnd) => {
                    if(!this.onEndReachedCalledDuringMomentum){
                    type == 'myads' ?
                        this.setState({ pageMyAds: this.state.pageMyAds + 1 }, () => this.getMyAds())
                        : this.setState({ page: this.state.page + 1 }, () => this.getAds())
                        this.onEndReachedCalledDuringMomentum = true;
                    }
                }}
                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            />

        </View>:<View><Text style={{ color: colors.lightgrey1, textAlign: 'center', marginTop: height / 4 }}>{global.languageData.You_need_to_login_for_use_this_module}</Text></View>
    )




    render() {

        return (
            <Fragment>
                {Platform.OS=='ios'?<LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
            style={{height:global.notchHeight}}/>:null}
            <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.75)" }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <Header name={global.languageData.Sell} props={this.props} showHome={true} />

                <TabView
                    style={{}}
                    navigationState={this.state}
                    // sceneContainerStyle={{ backgroundColor: colors.white }}
                    renderScene={({ route }) => {
                        switch (route.key) {
                            case 'first':
                                return this.view('sell');
                            case 'second':
                                return this.view('myads');
                            default:
                                return null;
                        }
                    }}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={index => {
                        // this.reset()
                        this.setState({ index });
                    }}
                />

                <FilterModal filterModal={this.filterModal} resetAction={this.reset} from='sell' onPress={(catID,subCatID,subSubID) => { this.searchFromList(catID,subCatID,subSubID, this.state.index == 0 ? 'sell' : 'myads') }} />

                <AddButton props={this.props} data={"Sell"} refresh={this.componentWillMount.bind(this)} />


            </SafeAreaView>
            </Fragment>
        )
    }

}


function mapStateToProps(state) {
    return {
        GetAdvertisementInfo: state.GetAdvertisement,
        GetAdvertisementSuccess: state.GetAdvertisement.success,

        GetMyAdvertisementInfo: state.GetMyAdvertisement,
        GetMyAdvertisementSuccess: state.GetMyAdvertisement.success,

        DeleteAdvertisementInfo: state.DeleteAdvertisement,
        DeleteAdvertisementSuccess: state.DeleteAdvertisement.success,
    };
}


export default compose(connect(mapStateToProps, {
    ...BuySellRentActions
}))(Sell);


const styles = StyleSheet.create({

    tabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        margin: 10,
        borderRadius: 20,
        elevation: 2,
        backgroundColor:'white'
    },


});