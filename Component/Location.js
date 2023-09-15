import AsyncStorage from '@react-native-community/async-storage';
import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground, Dimensions, ActivityIndicator,Text, FlatList, TouchableOpacity, Picker, Platform, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import Button from '../ReuseableComponent.js/Button';
import Header from '../ReuseableComponent.js/Header';
import { requestLocationPermission } from '../src/Requestpermissions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder'
import { getLocationFromAsync, isEmpty, isServerSuccess, OpenSansSemiBold, setLocationInAsync } from '../src/validations';
import SimpleToast from 'react-native-simple-toast';
import ActionSheet from 'react-native-actionsheet';
import { CommonActions } from '../src/actions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { request, PERMISSIONS } from 'react-native-permissions';
import HomeHeader from '../ReuseableComponent.js/HomeHeader';
import { GooglePlacesKey, } from '../src/api/ServerConfig';
const { width, height } = Dimensions.get('window')
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient'

class Location extends React.Component {

    constructor(props) {
        super(props);
        // alert(JSON.stringify(global.location))
        this.state = {
            stateList: [],
            cityList: [],
            selectedState: global.location ? global.location.state : '',
            selectedCity: global.location ? global.location.city : '',
            from: '',
            currentState: '',
            currentCity: '',
            currentLat:0,
            currentLong:0
,            recentLocation: [],
            lbl_Use_current_location:global.languageData.Use_current_location,
            llbl_Search_city_area:global.languageData.Search_city_area,
            lbl_Location_Access:global.languageData.Location_Access,
            lbl_Change_Location:global.languageData.Change_Location,
            lbl_Recent_Location:global.languageData.Recent_Location,
            lbl_Choose_Region:global.languageData.Choose_Region,
            userDeviceCity:'',
            userDeviceState:'',
            userDeviceLat:0,
            userDeviceLong:0,
            countryName:'',
            isLoading:false,
        }
        console.disableYellowBox = true;

    }

    componentDidMount(){
        console.log('componentDidMount called location')
        this.setState({})
    }

    componentWillMount() {
        console.log('componentWillMount called location')
        console.log('type is',this.props.route.params.from)
        var from = this.props.route.params.from
        this.setState({ from })
        this.getRecentLocation()
        this.requestPermission()

        var body = {
            "loginuserID": global.userID,
            "languageID":global.languageID,
            "countryID": "0",
            "searchWord": "",
            "page": 0,
            "pagesize": 100,
            "apiType": "Android",
            "apiVersion": "2.0"
        }
        this.props.AllStates(body)
    }


    async getRecentLocation() {
        var recentLocation = JSON.parse(await AsyncStorage.getItem('recentlocation'));
        if (recentLocation != null) {
            this.setState({ recentLocation })
        }
    }

    async setRecentLocation(stateName, cityName,latitude,longitude,countryName) {
        var recentLocation = this.state.recentLocation
        var state = {
            stateName: stateName,
        }
        var city = {
            cityName: cityName
        }

        var lat ={
            selectedLat:latitude
        }
        var long ={
            selectedLong:longitude
        }
        var country={
            countryName:countryName
        }

        recentLocation.length > 5 ?
            recentLocation.pop() : null
        recentLocation.find(item => item.state.stateName == stateName && item.city.cityName == cityName)
            ? null :
            recentLocation.push({
                state,
                city,
                lat,long,country
            })
            console.log('selected location',stateName,cityName,latitude,long,longitude,countryName)

        await AsyncStorage.setItem('recentlocation', JSON.stringify(recentLocation))
        this.setState({ selectedState: state, selectedCity: city,selectedLat:lat,selectedLong:long }, () => {
            this.validate()
            var location = {
                state: state,
                city: city,
                currentLat:lat,
                currentLong:long,
                country:country
            }
            global.location = location
            console.log('global.location',global.location)
        })
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.AllStatesSuccess) {
            var data = nextProps.AllStatesInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    this.setState({ stateList: response.data })
                }
            })
        }

        if (nextProps.AllCitiesSuccess) {
            var data = nextProps.AllCitiesInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    this.setState({ cityList: response.data }),
                    
                    setTimeout(() => {
                        this.cityAction.show()
                    }, 300);
                }else{
                    console.log('location city not found',data)
                }
            })
        }
    }

    requestPermission() {
        console.log("requestPermission called",)
        if(Platform.OS == 'android'){
        requestLocationPermission(result => {
            console.log("requestPermission called",result)
            if (result == "denied") {
                this.requestPermission()
            } else {
                this.setState({isLoading:true})
                Geolocation.getCurrentPosition(async result => {
                    var NY = {
                        lat: result.coords.latitude,
                        lng: result.coords.longitude
                    }

                    // var NY = {
                    //     lat: 23.0225,
                    //     lng: 72.5714
                    // }

                    try {
                        const res = await Geocoder.geocodePosition(NY);
                        var data = res[0]
                        console.log("Data of location", data)
                        let strState = String(data.formattedAddress).split(',')
                        let fullState= String(strState[strState.length-2].replace(' ','')).split(',')
                        var newState = fullState[fullState.length-1].split(' ')

                        if(newState.length>2){
                            newState = fullState[fullState.length-1].split(' ')[0]+' '+fullState[fullState.length-1].split(' ')[1]
                        }else{
                            newState = fullState[fullState.length-1].split(' ')[0]
                        }
                        // let newState = fullState[fullState.length-1].split(' ')[0]+' '+fullState[fullState.length-1].split(' ')[1]
                        // this.setState({
                        //     currentState: newState,
                        //     currentCity: data.locality,
                        //     currentLat:data.position.lat,
                        // currentLong:data.position.lng
                        // })
                        this.setState({
                            userDeviceState: newState,
                            userDeviceCity: data.locality,
                            userDeviceLat:data.position.lat,
                            userDeviceLong:data.position.lng,
                            currentLat:data.position.lat,
                            currentLong:data.position.lng,
                            countryName:data.country
                        })
                        this.setState({isLoading:false})
                    }
                    catch (err) {
                        this.setState({isLoading:false})
                        console.log("Geo Code", err);
                    }
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
        console.warn('Permission is', locationWhenUse)
        if (locationWhenUse == 'granted') {
            this.setState({isLoading:true})
            Geolocation.getCurrentPosition(async result => {
                var NY = {
                    lat: result.coords.latitude,
                    lng: result.coords.longitude
                }

                try {
                    const res = await Geocoder.geocodePosition(NY);
                    var data = res[0]
                    console.log("Data of location", data)
                    // let strState =  data.formattedAddress.substring(data.formattedAddress.lastIndexOf(',')+1, data.formattedAddress.length);
                   let strState = String(data.formattedAddress).split(',')
                   let newState= strState[strState.length-2].replace(' ','')
                    console.log("strState", newState)
                   
                    // this.setState({
                    //     currentState: newState,
                    //     currentCity: data.locality,
                    //     currentLat:data.position.lat,
                    //     currentLong:data.position.lng
                    // })
                    this.setState({
                        userDeviceState: newState,
                        userDeviceCity: data.locality,
                        userDeviceLat:data.position.lat,
                        userDeviceLong:data.position.lng,
                        currentLat:data.position.lat,
                        currentLong:data.position.lng,
                        countryName:data.country
                    })
                    this.setState({isLoading:false})
                }
                catch (err) {
                    this.setState({isLoading:false})
                    console.log("Geo Code", err);
                }
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
            console.warn('else  is', global.cityID)
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

    validate() {
        if (isEmpty(this.state.selectedState)) {
            SimpleToast.show('Please select a state')
        } else if (isEmpty(this.state.selectedCity)) {
            SimpleToast.show('Please select a city')
        } else {
            var lat ={
                selectedLat:this.state.currentLat
            }
            var long ={
                selectedLong:this.state.currentLong
            }

            var country ={
                countryName:this.state.countryName
            }
            var location = {
                state: this.state.selectedState,
                city: this.state.selectedCity,
                currentLat:lat,
                currentLong:long,
                country:country
                
               
            }
            console.log('selected current location',location)
            setLocationInAsync(location, () => {
                if(this.state.from == 'setting'){
                    this.props.navigation.push('home')
                }else if(this.state.from == 'home'){
                    this.props.navigation.push('home')
                }else{
                    global.isGuestLogin ?
                    this.props.navigation.push('home') :
                    global.isSignIn == true?this.props.navigation.push('login'):
                    this.props.navigation.push('home')
                }
               
                    
            })
        }
    }

    getAddressFromCity=async(cityName)=>{
        try {
            const res = await Geocoder.geocodeAddress(cityName);
            var data = res[0]
            console.log("Data of getAddressFromCity", res[0])
            this.setState({
                currentCity: cityName,
                currentLat:data.position.lat,
                currentLong:data.position.lng,
                countryName:data.country
            })
            this.setRecentLocation(this.state.selectedState, cityName,data.position.lat,data.position.lng,data.country)
        }
        catch (err) {
            console.log("Geo Code", err);
        }
    }

    render() {

        return (
            <Fragment>
                {Platform.OS=='ios'?<LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
            style={{height:global.notchHeight}}/>:null}
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                {/* <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" /> */}
                <Header props={this.props} name={this.state.from == "location" ? this.state.lbl_Location_Access : this.state.lbl_Change_Location} showHome={this.state.from == "language"?false:true}/>

                <View style={{ flexDirection: 'row', margin: 10, backgroundColor: colors.lightgrey, borderRadius: 10, paddingLeft: 10 }}>
                    <Ionicons name="search" size={20} color={colors.lightgrey1} style={{ marginTop: 15 }} />
                    <GooglePlacesAutocomplete
                        placeholder={this.state.llbl_Search_city_area}
                        onPress={(data, details) => {
                            // 'details' is provided when fetchDetails = true
                            // console.log(JSON.stringify(details));
                            // console.log(JSON.stringify(data));
                            var state = data.terms[1].value
                            var city = data.terms[0].value
                            var lat = details.geometry.location.lat
                            var long = details.geometry.location.lng
                            var country = data.terms[2].value
                            this.setState({countryName:country})
                            this.setRecentLocation(state, city,lat,long,country)
                        }}
                        query={{
                            key: GooglePlacesKey,
                            language: 'en',
                            type: '(cities)',
                        }} onFail={(err) => console.log(err)}
                        suppressDefaultStyles={false}
                        fetchDetails={true}
                        styles={{
                            textInput: { backgroundColor: colors.lightgrey, marginTop: 5 },
                        }} filterReverseGeocodingByTypes={["locality", "sublocality"]}
                    />
                </View>

                {/* Current location */}
                <TouchableOpacity onPress={() => {
                    this.setRecentLocation(this.state.userDeviceState, this.state.userDeviceCity,this.state.userDeviceLat,this.state.userDeviceLong,this.state.countryName)
                }}
                    style={{ flexDirection: 'row', margin: 10, paddingLeft: 20 }}>
                    <Image source={require('../assets/location_aim.png')} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 8 }} />
                   
                    <View>
                    <Text style={{ color: colors.green, fontFamily: OpenSansSemiBold }}>{this.state.lbl_Use_current_location}</Text>
                    {this.state.userDeviceCity == ''?<ActivityIndicator size="small" color={colors.green} style={{ marginTop: 2 }} />:
                    <Text>{this.state.userDeviceCity + "," + this.state.userDeviceState}</Text>}
                </View>
                    
                </TouchableOpacity>

                {/* Recent Location */}
                {this.state.recentLocation.length > 0 ? <View>
                    <Text style={{ backgroundColor: colors.mediumGrey, paddingLeft: 10, padding: 5 }}>{this.state.lbl_Recent_Location}</Text>
                    <FlatList
                        data={this.state.recentLocation}
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                console.log('item',item)
                                this.setRecentLocation(item.state.stateName, item.city.cityName,item.lat.selectedLat,item.long.selectedLong)
                            }}
                                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <Image source={require('../assets/location_pin_light-green.png')} style={{ width: 15, height: 20,  marginRight: 8 }} />
                                <Text>{item.city.cityName + ' ,' + item.state.stateName}</Text>
                            </TouchableOpacity>
                        )}
                        style={{ margin: 10, flexGrow: 0 }}
                    />
                </View> : null}

                <Text style={{ backgroundColor: colors.mediumGrey, paddingLeft: 10, padding: 5 }}>{this.state.lbl_Choose_Region}</Text>
                <FlatList
                    data={this.state.stateList}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            this.setState({ selectedState: item.stateName, selectedCity: '' })
                            var body = {
                                "loginuserID": global.userID,
                                "languageID": global.languageID,
                                "searchWord": "",
                                "countryID": "0",
                                "page": "0",
                                "pagesize": "700",
                                "apiType": "Android",
                                "apiVersion": "2.0",
                                "stateID": item.stateID
                            }
                            this.props.AllCities(body)
                        }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: colors.mediumGrey }}>
                            <Text style={{ fontFamily: OpenSansSemiBold }}>{item.stateName}</Text>
                            <Ionicons name="chevron-forward-outline" color={colors.lightgrey1} size={20} />
                        </TouchableOpacity>
                    )}
                    style={{ flex: 1 }}
                />
                {/* <View style={{ flex: 1, justifyContent: 'space-between', padding: 10 }}>
                    <View>
                        <Text style={{}}>Your State</Text>
                        <TouchableOpacity onPress={() => { this.stateAction.show() }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ color: isEmpty(this.state.selectedState) ? colors.lightgrey1 : colors.black }}>{this.state.selectedState.stateName || "Select Your State"}</Text>
                            <Ionicons name="caret-down-outline" size={16} />
                        </TouchableOpacity>

                        <Text style={{ marginTop: 10 }}>Your City/District</Text>
                        <TouchableOpacity onPress={() => { this.state.selectedState ? this.cityAction.show() : '' }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ color: isEmpty(this.state.selectedCity) ? colors.lightgrey1 : colors.black }}>{this.state.selectedCity.cityName || "Select Your City/District"}</Text>
                            <Ionicons name="caret-down-outline" size={16} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Button name={this.state.from == "location" ? "Save & Continue" : "Update"} onPress={() => { this.validate() }} />
                    </View>
                </View> */}

                {/* State List */}
                {/* <ActionSheet
                    ref={ref => this.stateAction = ref}
                    options={this.state.stateList.map(item => item.stateName)}
                    title="Select Your State"
                    onPress={(index) => {
                        this.setState({ selectedState: this.state.stateList[index], selectedCity: '' })
                        var body = {
                            "loginuserID": global.userID,
                            "languageID": global.languageID,
                            "searchWord": "",
                            "countryID": "0",
                            "page": "0",
                            "pagesize": "10",
                            "apiType": "Android",
                            "apiVersion": "2.0",
                            "stateID": this.state.stateList[index].stateID
                        }
                        this.props.AllCities(body)
                    }}
                /> */}

                {/* City List */}
                <ActionSheet
                    ref={ref => this.cityAction = ref}
                    options={['Cancel'].concat(this.state.cityList.map(item => item.cityName))}
                    title={global.languageData.Select_Your_City_District}
                    onPress={(index) => {
                        if (index != 0) {
                            console.log('selected city',this.state.cityList[index - 1])
                            this.getAddressFromCity(this.state.cityList[index - 1].cityName)
                            // this.setRecentLocation(this.state.selectedState, this.state.cityList[index - 1].cityName)
                        }
                    }}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={0}
                    useNativeDriver={true}
                />

{/* <Modal visible={this.state.isLoading} 
            style={{ alignItems: 'center' }}>
            <Image source={require('../assets/loader.gif')} style={{ width: 50, height: 50, }} />
          </Modal> */}

            </SafeAreaView>
            </Fragment>
        )
    }

}



function mapStateToProps(state) {
    return {
        AllStatesInfo: state.AllStates,
        AllStatesSuccess: state.AllStates.success,

        AllCitiesInfo: state.AllCities,
        AllCitiesSuccess: state.AllCities.success
    };
}


export default compose(connect(mapStateToProps, {
    ...CommonActions
}))(Location);