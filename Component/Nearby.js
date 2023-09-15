import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground,Alert,Linking, Dimensions,Platform, Text, FlatList,BackHandler, TouchableOpacity, TextInput, StyleSheet, Animated, Keyboard, ScrollView, } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import { CommonActions } from '../src/actions';
import {isServerSuccess} from '../src/validations';
import Header from '../ReuseableComponent.js/Header';
import ActionSheet from 'react-native-actionsheet';
import { requestLocationPermission } from '../src/Requestpermissions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder'
import { request, PERMISSIONS } from 'react-native-permissions';
import { Modalize } from 'react-native-modalize';
import LaunchNavigator from 'react-native-launch-navigator';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient'

import MapView, { Marker } from 'react-native-maps'
import { DotSign, OpenSansSemiBold } from '../src/validations';
const { width, height } = Dimensions.get('window')
const APIKEY = 'AIzaSyCuPvrOzb5iUjQvcuiypHFd-4KM9rJX4ds'
class Nearby extends React.Component {
    listingModal = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'Randhawa Services', item: 'Farm Equipment', rate: '5.0', mobile: '9898989898', status: 'Open', closeTime: 'Closes 10AM' },
                { name: 'Jayram Dairy', item: 'Farm Equipment', rate: '4.5', mobile: '9898989898', status: 'Open', closeTime: 'Closes 10AM' },
                { name: 'Narish Seeds', item: 'Farm Equipment', rate: '4.0', mobile: '9898989898', status: 'Open', closeTime: 'Closes 10AM' },
                { name: 'Randhawa', item: 'Farm Equipment', rate: '5.0', mobile: '9898989898', status: 'Open', closeTime: 'Closes 10AM' },
            ],
            isComingSoon: false,
            arrCategoryList:[],
            valueCategory:'',
            googleCategory:'hospital',
            currentLat:global.location.currentLat.selectedLat,
            currentLong:global.location.currentLong.selectedLong,
            isLoading:false,
            arrMarkerList:[],
            isListLoading:false,
            isCategoryOpen:false,
            arrMainSearch:[],
            txtSearch:'',
            txtPlaceHolder:global.languageData.Select_Dairy_Petrol_Pump,
            searchLat:0,
            searchLong:0,
        }
        console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.GetMapCategoryListSuccess) {
            var data = nextProps.GetMapCategoryListInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    console.log('category list',response)
                    this.setState({arrCategoryList:response.data,arrMainSearch:response.data},()=>{
                        // this.categoryAction.show()
                    })
                }else{
                    
                }
            })
        }
    }

    componentDidMount(){
        // console.log('global.location',global.languageData)
        var body = {
                "loginuserID": global.userID,
                "languageID": global.languageID,
                "searchWord":"",
                "page":0,
                "pagesize":100,
                "apiType": "Android",
                "apiVersion": "2.0"
            }
            this.props.GetMapCategoryList(body)
        // this.requestPermission()
        this.getDefaultList()
    }

    componentWillMount() {
        const { isComingSoon } = this.props.route.params.item
        this.setState({ isComingSoon })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

   
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    getDefaultList(){
            this.setState({arrMarkerList:[],isListLoading:true})
                const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${APIKEY}&location=${this.state.currentLat},${this.state.currentLong}&radius=1500`
                fetch(url)
                .then(res => res.json())
                .then((resJson) => {
                    console.log('near by response',resJson,url)
                    if(resJson.results.length == 0){
                        this.setState({isListLoading:false})
                        SimpleToast.show(global.languageData.Couldt_find_your_category_please_try_other)
                    }else{
                        console.log('opening hours is', resJson.results[0].opening_hours)
                        
                        this.setState({arrMarkerList:resJson.results,},()=>{this.setState({isListLoading:false}),this.listingModal.current.open()})      
                    }
                })
                .catch((e) => {
                    this.setState({isListLoading:false})
                    console.log('Error in getAddressFromCoordinates', e)
                })
           
        
    }

    getNearByList(placeType){
        this.setState({isListLoading:true,isLoading:true})
            const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${APIKEY}&query=${placeType}&location=${this.state.currentLat},${this.state.currentLong}&radius=1500`
            fetch(url)
            .then(res => res.json())
            .then((resJson) => {
                // console.log('near by response',resJson.results)
                if(resJson.results.length == 0){
                    this.setState({isListLoading:false})
                    SimpleToast.show(global.languageData.Couldt_find_your_category_please_try_other)
                }else{
                    console.log('opening hours is', resJson.results)
                    
                    this.setState({arrMarkerList:resJson.results,searchLat:resJson.results[0].geometry.location.lat,searchLong:resJson.results[0].geometry.location.lng},
                        ()=>{this.setState({isListLoading:false,isLoading:false},
                                ()=>{this.listingModal.current.open()})})
                              
                }
               
                
            })
            .catch((e) => {
                this.setState({isListLoading:false,isLoading:false})
                console.log('Error in getAddressFromCoordinates', e)
            })
       
    
}

    requestPermission() {
        if(Platform.OS == 'android'){
        requestLocationPermission(result => {
            if (result == "denied") {
                this.requestPermission()
            } else {
                this.setState({isLoading:true})
                Geolocation.getCurrentPosition(async result => {
                    
                    this.setState({currentLat:result.coords.latitude,currentLong:result.coords.longitude},()=>{this.setState({isLoading:false})})
                }, err => {
                    this.setState({isLoading:false})
                    console.log(err)
                    SimpleToast.show("We're unable to find your current location")
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, forceRequestLocation: true, accuracy: { android: "high", ios: "best" } })
            }
        })
    }else{
            this.IsPermissionAllowed()
        }
    }

    IsPermissionAllowed = async () => {
        const locationWhenUse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        // const locationAlwaysUse = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        if (locationWhenUse == 'granted') {
            this.setState({isLoading:true})
            Geolocation.getCurrentPosition(async result => {
                this.setState({currentLat:result.coords.latitude,currentLong:result.coords.longitude},()=>{ this.setState({isLoading:false})})
            }, err => {
                this.setState({isLoading:false})
                console.log(err)
                SimpleToast.show("We're unable to find your current location")
            },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, forceRequestLocation: true, accuracy: { android: "high", ios: "best" } })
        
        } else if (locationWhenUse == 'unavailable') {
                Alert.alert(
                    '',
                    'FarmMeala needs location permission for use services.',
                    [
                        { text: 'NO', onPress: () => { } },
                        { text: 'OK', onPress: () => { Linking.openURL('app-settings:') } },

                    ],
                    { cancelable: false },
                );
        } else {
            Alert.alert(
                '',
                'FarmMeala needs location permission for use services.',
                [
                    { text: 'NO', onPress: () => {  } },
                    { text: 'OK', onPress: () => { Linking.openURL('app-settings:') } },

                ],
                { cancelable: false },
            );
        }
        return { locationWhenUse };
    }

    handleBackButtonClick = () => {
        console.log('back click')
        this.props.navigation.navigate('home')
        return true;
    }

    btnCategoryAction=()=>{
        // if(this.state.arrCategoryList.length == 0){
        //     var body = {
        //         "loginuserID": global.userID,
        //         "languageID": global.languageID,
        //         "searchWord":"",
        //         "page":0,
        //         "pagesize":100,
        //         "apiType": "Android",
        //         "apiVersion": "2.0"
        //     }
        //     this.props.GetMapCategoryList(body)
        // }else{
        //     this.categoryAction.show()
        // }
        this.setState({isCategoryOpen:true})
        
    }

    onCategoryAction(index){
        if (index) {
            this.setState({ valueCategory: this.state.arrCategoryList[index - 1].mapcatName,
                googleCategory:this.state.arrCategoryList[index - 1].mapcatGoogleName},()=>{
                    console.log('selected category',this.state.valueCategory,this.state.googleCategory)
                })
            this.getNearByList(this.state.arrCategoryList[index - 1].mapcatGoogleName)
        }
        
    }

    btnSelectedCategory(item,index){
        this.setState({ valueCategory: item.mapcatName,txtSearch:item.mapcatName,
            googleCategory:item.mapcatGoogleName,isCategoryOpen:false})
            this.refSearch.clear()
        Keyboard.dismiss()
        this.getNearByList(item.mapcatGoogleName)
    }

    btnNavigateAction(item){
        LaunchNavigator.navigate([item.geometry.location.lat, item.geometry.location.lng], {
            start: [this.state.currentLat,this.state.currentLong]
        })
            .then(() => console.log("Launched navigator"))
            .catch((err) => console.error("Error launching navigator: "+err));
    }

    btnCallAction(item){
        const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${APIKEY}&placeid=${item.place_id}`
        fetch(url)
        .then(res => res.json())
        .then((resJson) => {
            console.log('near by response',resJson)
            if(Object.keys(resJson.result).length == 0){
                SimpleToast.show("Something went wrong")
            }else{
                console.log('data is',resJson)
                if(resJson.result.formatted_phone_number){
                    Linking.openURL(`tel:${resJson.result.formatted_phone_number}`)
                }else{
                    SimpleToast.show(global.languageData.Contact_number_not_provided)
                }
                
            }
        })
        .catch((e) => {
            this.setState({isListLoading:false})
            console.log('Error in getAddressFromCoordinates', e)
        })
        
    }

    searchFilterAction = (searchText) => {
        this.setState({ txtSearch: searchText })
        let text = searchText.toLowerCase()
        let fullList = this.state.arrMainSearch;
        let filteredList = fullList.filter((item) => {

            
            if (item.mapcatName.toLowerCase().match(text))
                return item;
        })
        if (!text || text === '') {
            this.setState({ arrCategoryList: this.state.arrMainSearch })
        } else if (!filteredList.length) {
            this.setState({ arrCategoryList: filteredList })
        } else if (Array.isArray(filteredList)) {
            this.setState({ arrCategoryList: filteredList })

        }
    }

    setOpenText(item){
        if(item.opening_hours){
            return<Text style={{ fontSize: 13, color: colors.green }}>
                                                
            {Object.keys(item.opening_hours).length===0?global.languageData.Time_Not_Available:item.opening_hours.open_now == true?global.languageData.Open:global.languageData.Close}</Text>
        }else{
            return<Text style={{ fontSize: 13, color: colors.green }}>{global.languageData.Close}</Text>
        }

    }

    onClear=()=>{
        this.setState({isCategoryOpen:false,txtSearch:'',valueCategory:''})
        this.refSearch.clear()
        Keyboard.dismiss()
        this.getDefaultList()
        
    }

    setTextInputView(){
        return(
            <View style={{ height: 45,marginBottom:10,marginTop:10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.lightgrey,width:width-30, borderRadius: 10,paddingHorizontal:10,alignSelf:'center' }}>
                   
                    <TextInput
                        placeholder={this.state.txtPlaceHolder}
                        value={this.state.txtSearch}
                        onFocus={()=>this.setState({isCategoryOpen:true})}
                        style={{ flex: 1, padding: 0 }}
                        ref={ref => this.refSearch = ref}
                        onChangeText={text => { this.searchFilterAction(text) }}
                        returnKeyType={'done'}
                        onSubmitEditing={()=>{this.setState({isCategoryOpen:false})}}
                    />
                    {this.state.txtSearch.length>1?<TouchableOpacity onPress={this.onClear}>
                    <Image source={require('../assets/close_header.png')}
                                style={{ width: 15, height: 15, marginRight: 10, resizeMode: 'contain' }} />
                    
                    </TouchableOpacity>:null}
                    
                </View>
        )
    }

    setListingModal(){
        return <Modalize ref={this.listingModal} handlePosition="inside"
                    modalTopOffset={60} 
                    snapPoint={height/2-60}
                    useNativeDriver={true} closeOnOverlayTap={true} 
                    modalStyle={{ padding: 10}} overlayStyle={{backgroundColor:'trasparent'}}>
                    <FlatList
                                data={this.state.arrMarkerList}
                                // keyExtractor={item => item.name}
                                // showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={()=>this.btnNavigateAction(item)} style={{ backgroundColor: colors.white, borderRadius: 5, padding: 10, marginBottom: 10, }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <Image source={require('../assets/location_pin_red_list_circular.png')}
                                                style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                                            <View style={{ width: '71%' }}>
                                                <Text style={{ fontFamily: OpenSansSemiBold,marginBottom:3 }}>{item.name}</Text>
                                                <Text style={{ color: colors.lightgrey1, fontSize: 13,marginBottom:3,textTransform: 'capitalize'}}>{item.types[0]}</Text>
                                                {/* <Text style={{ fontSize: 13 }}><Ionicons name={"call"} /> +91 {item.mobile}</Text> */}
                                                {this.setOpenText(item)}
                                            </View>
                                            <View style={{ alignItems: 'flex-end', justifyContent: 'space-between',marginRight:10,}}>
                                                {item.rating?<Text style={{ fontSize: 13,marginRight:15 }}>{item.rating} <Image source={require('../assets/star.png')}
                                                    style={{ width: 10, height: 10, resizeMode: 'contain' }} />
                                                </Text>:<View/>}
                                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                                <TouchableOpacity onPress={()=>this.btnCallAction(item)} style={{ alignItems: 'center',marginRight:10 }}>
                                                    <Image source={require('../assets/contact_call.png')}
                                                        style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                                    
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={()=>this.btnNavigateAction(item)} style={{backgroundColor:colors.green, justifyContent: 'center',alignItems:'center',marginRight:20,width: 30, height: 30,borderRadius:360 }}>
                                                    {/* <Image source={require('../assets/navigate_circular_green.png')}
                                                        style={{ width: 25, height: 25, resizeMode: 'contain' }} /> */}
                                                    {/* <Text style={{ color: colors.green, fontSize: 11 }}>Directions</Text> */}
                                                    <Text style={{ color: colors.white, fontSize: 12,fontWeight:'bold' }}>{global.languageData.go}</Text>
                                                </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                style={{ margin: 10 }}
                            />
                </Modalize>
    }

    setCategoryListView(){
        if(this.state.isCategoryOpen){
        return(
            <View style={{position:'absolute',backgroundColor:'white',top:50,marginLeft:15,width:width-30,height:180,borderColor:'lightgrey',borderWidth:1}}>
                 <FlatList
                    data={this.state.arrCategoryList}
                    ItemSeparatorComponent={()=>{return <View style={{height:1,backgroundColor:'lightgrey'}}/>}}
                    renderItem={({ item,index }) => (
                        <TouchableOpacity onPress={()=>this.btnSelectedCategory(item,index)} style={{ backgroundColor: colors.white,padding: 10, marginBottom: 0}}>
                            <Text style={{fontSize:15}}>{item.mapcatName}</Text>
                        </TouchableOpacity>
                    )}
                    style={{ margin: 10 }}
                />
            </View>
        )
        }
    }

    setLoader(){
        return<Modal visible={this.state.isListLoading}
            style={{ alignItems: 'center',}}>

            <Image source={require('../assets/loader.gif')} style={{ width: 60, height: 60,}} />
          </Modal>
    }

    render() {

        
        if(this.state.isLoading){
           return(
            <Fragment>
            {Platform.OS=='ios'?<LinearGradient start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
        style={{height:global.notchHeight}}/>:null}
            <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.75)" }}>
            <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
            <Header name={global.languageData.Nearby} props={this.props} showHome={true} />
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../assets/loader.gif')} style={{ width: 50, height: 50, }} />
                </View>
            </SafeAreaView>
            </Fragment>
           )
        }else{
            const{valueCategory}=this.state;
            return (
                <Fragment>
                {Platform.OS=='ios'?<LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
            style={{height:global.notchHeight}}/>:null}
                <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.75)" }}>
                    <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                    <Header name={global.languageData.Nearby} props={this.props} showHome={true} />
                    {/* <HomeHeader props={this.props} showImage={true}  showHome={true}/> */}
                    {this.state.isComingSoon ?
                        // <Text style={{ marginTop: height / 3, textAlign: 'center', fontSize: 20, color: colors.green }}>COMING{"\n"}SOON</Text>
                        <View>
                             <ImageBackground style={{marginTop: height / 4,height:100,width:100,resizeMode:'contain',alignSelf:'center'}} source={require('../assets/plain_logo.png')}>
                            {/* <Text style={{textAlign: 'center', fontSize: 20, color: colors.black,alignSelf:'center',marginTop:50 }}>COMING{"\n"}SOON</Text> */}
                            {/* <Text style={{textAlign: 'center', fontSize: 18, color: colors.black,alignSelf:'center',marginTop:50 }}>{global.languageData.Coming_Soon}</Text> */}
                        </ImageBackground>
                        <Text style={{textAlign: 'center', fontSize: 18, color: colors.green,alignSelf:'center',marginTop:5 }}>{global.languageData.Coming_Soon}</Text>
                        </View>
                        :
                        <View>
                            {/* <TouchableOpacity onPress={this.btnCategoryAction} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10, padding: 12, backgroundColor: colors.lightgrey, borderRadius: 10 }}>
                                <Text style={{ color: colors.black, fontSize: 13 }}>{this.state.valueCategory}</Text>
                                <Image source={require('../assets/drop_down_arrow.png')} style={{ width: 10, height: 10, resizeMode: 'contain' }} />
                            </TouchableOpacity> */}
                            {this.setTextInputView()}
                            
                            <MapView
                                initialRegion={{
                                    latitude: valueCategory.length==0?this.state.currentLat:this.state.searchLat,
                                    longitude: valueCategory.length==0?this.state.currentLong:this.state.searchLong,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,

                                }}
                                ref={ref => this.refMap = ref}
                                onPress={this.state.isCategoryOpen?()=>{this.setState({isCategoryOpen:false,})
                                Keyboard.dismiss()}:null}
                                showsUserLocation={true}
                                // style={{ width: width, height: height / 3 }}
                                style={{ width: width, height:height-140}}
                            >
                                {/* <Marker
                                    key={1}
                                    coordinate={{
                                        latitude: this.state.currentLat,
                                        longitude: this.state.currentLong,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                    icon={require('../assets/location_pin_map_big_red.png')}
                                /> */}
                                {this.state.arrMarkerList.map((marker,index) => (
                                    <Marker 
                                    // icon={require('../assets/location_pin_red_list_circular.png')}
                                    // 
                                    // onPress={()=>{}}
                                    title={marker.name}
                                    coordinate={{ latitude: parseFloat( marker.geometry.location.lat), longitude:parseFloat(marker.geometry.location.lng)}}>
                                        <Image source={require('../assets/location_pin_map_big_red.png')} style={{height: 30, width:20,resizeMode:'contain' }} />
                                        </Marker> 
                        ))}  
    
                            </MapView>
                            {this.setCategoryListView()}
                            {this.state.arrMarkerList.length>0?<TouchableOpacity onPress={()=>this.listingModal.current.open()} style={{position:'absolute',bottom:Platform.OS=='ios'?80:40,right:20}}>
                                <Image source={require('../assets/listView_header.png')} style={{height:45,width:45,resizeMode:'contain'}}/>
                            </TouchableOpacity>:null}
                            {/* set flatlist here */}
                        </View>}
                        <ActionSheet
                        ref={ref => this.categoryAction = ref}
                        options={[global.languageData.cancel].concat(this.state.arrCategoryList.map(item => item.mapcatName))}
                        title={global.languageData.Select_Category}
                        cancelButtonIndex={0}
                        destructiveButtonIndex={0}
                        onPress={(index) => {this.onCategoryAction(index)}}
                    />
                    {this.setListingModal()}
                    {this.setLoader()}
                </SafeAreaView>
                </Fragment>
            )
        }
       
    }

}


function mapStateToProps(state) {
    return {
        GetMapCategoryListInfo: state.GetMapCategoryList,
        GetMapCategoryListSuccess: state.GetMapCategoryList.success,
    };
}


export default compose(connect(mapStateToProps, {
...CommonActions
}))(Nearby);
