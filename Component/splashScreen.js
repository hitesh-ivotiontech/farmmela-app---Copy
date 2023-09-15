import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground, Dimensions,AppState, Text,Alert,Linking,Platform} from 'react-native';

// import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import { getLanguageFromAsync, getLocationFromAsync, getUserFromAsync, isEmpty } from '../src/validations';
const { width, height } = Dimensions.get('window')
import Home from './Home';
import Forum from './Forum';
import BuySellRent from './BuySellRent';
import NewsFeed from './NewsFeed';
import AgriServices from './AgriServices';
//https://www.getpostman.com/collections/ae6613003c6d62c240ce
import { getAppstoreAppMetadata } from "react-native-appstore-version-checker";
import { getVersion } from 'react-native-device-info';
import DeviceInfo from 'react-native-device-info';
import SpInAppUpdates, {
    NeedsUpdateResponse,
    IAUUpdateKind,
    StartUpdateOptions,
  } from 'sp-react-native-in-app-updates';
  const inAppUpdates = new SpInAppUpdates(
    true // isDebug
  );
// https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyAdXyEdNNXHSxAwOukVxqboPETQF33ZwWI&query=bank
class SplashScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            applicationState: AppState.currentState
        }
        console.disableYellowBox = true;
        // global.Url = 'http://164.52.209.69/farmmela/backend/web/index.php/v1/'
       
        global.Url = 'https://app.farmmela.in/backend/web/index.php/v2/'
       // global.Url = 'https://farmmela.fusioninformatics.net/backend/web/index.php/v2/'
       
        // global.Url = 'http://3.111.160.227/backend/web/index.php/v2/';
        global.isReset = false
        global.isResetForum = false
        global.languageID = '1'
        global.isEditForum = false
        global.dicPost = {}
        global.childId = ''
        global.isFromAdDetail = false
        global.isEditArticle = false
        global.dictArticle = {}
        global.showRedDot = false
        global.isFirstLoad = false
        global.isImageLoad = true
        global.notchHeight = DeviceInfo.hasNotch()?50:20
    }




    componentDidMount() {
        if (Platform.OS === 'android') {
        // inAppUpdates.checkNeedsUpdate().then((result) => {
        //     console.log('check result is new', result,DeviceInfo.getVersion())
        //     if (result.shouldUpdate) {
        //       let updateOptions: StartUpdateOptions = {};
        //       if (Platform.OS === 'android') {
        //         // android only, on iOS the user will be promped to go to your app store page
        //         updateOptions = {
        //           updateType: IAUUpdateKind.IMMEDIATE,
        //         };
        //       }
        //       inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
        //     }else{
        //         this.getSettingApi()
        //     }
        //   });
        // }



        this.getSettingApi();
        AppState.addEventListener('change', this._handleAppStateChange);
        }
       
       if(Platform.OS == 'ios'){
        this.getSettingApi()
        // setTimeout(() => {
        //     getUserFromAsync(async (user) => {
        //         global.isSignIn = false
        //         if (user != null) {
        //             getLanguageFromAsync((lang) => {
        //                 console.log('isNotification Open',global.isNotificationOpen)
        //                 isEmpty(lang) ?
                            
        //                     this.props.navigation.replace("selectlanguage", { from: 'intro' })
        //                     : getLocationFromAsync(location => {
        //                         isEmpty(location) ?
        //                             this.props.navigation.replace('location', { from: 'language' })
        //                             : global.isNotificationOpen == true?this.props.navigation.push('myMessage'):this.props.navigation.replace('home')
                                    
        //                     })
        //             })

        //         } else {
        //             var intro = await AsyncStorage.getItem('intro');
        //             if (intro == 'seen') {
        //                 getLanguageFromAsync((lang) => {
        //                     isEmpty(lang) ?
        //                         // this.props.navigation.replace("selectlanguage", { from: 'intro' })
        //                         this.props.navigation.replace('intro')
        //                         : getLocationFromAsync(location => {
        //                             isEmpty(location) ?
        //                                 // this.props.navigation.replace('location', { from: 'language' })
        //                                 this.props.navigation.replace('intro')
        //                                 : this.props.navigation.replace('login')
        //                         })
        //                 })
        //             }
        //             else {
        //                 this.props.navigation.replace('intro')
        //             }
        //         }
        //     })

        // }, 1000)
       }
    }

    componentWillMount(){
        AppState.removeEventListener('change', this._handleAppStateChange);
    }


    _handleAppStateChange = (nextAppState) => {
        console.log('app state', nextAppState)
        if (Platform.OS == 'ios') {
            
        } else {
           
            if (nextAppState === 'active') {
                console.log('App has come to the foreground!')
                if(global.isFirstLoad == false){
                    // this.getSettingApi()
                }
                
            } else if (nextAppState === 'background') {
                console.log('App has come to the background!')

            }
        }
        this.setState({ applicationState: nextAppState });
    }

    getSettingApi(){
        var body = {
            "loginuserID": "0",
            "languageID": "1",
            "apiType": "Android",
            "apiVersion": "2.0"
            }
       
        let config = {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            })
        }
        if (body !== "") {
            let newBody = JSON.stringify(body)
            config = { ...config, body: newBody }
        }
         fetch(global.Url+'masters/get-settings', config)
            .then(response=> response.json())
            .then(result => {
                var arrData = result[0].data[0]
                global.settingData = arrData
                console.log('setting data is',arrData)
                var storeUrl = arrData.settingsPlaystoreLink
                setTimeout(() => {
                    getUserFromAsync(async (user) => {
                        global.isSignIn = false
                        if (user != null) {
                            getLanguageFromAsync((lang) => {
                                isEmpty(lang) ?
                                    
                                    this.props.navigation.replace("selectlanguage", { from: 'intro' })
                                    : getLocationFromAsync(location => {
                                        isEmpty(location) ?
                                            this.props.navigation.replace('location', { from: 'language' })
                                            : global.isNotificationOpen == true?this.props.navigation.push('myMessage'):this.props.navigation.replace('home')
                                            
                                    })
                            })
        
                        } else {
                            var intro = await AsyncStorage.getItem('intro');
                            if (intro == 'seen') {
                                getLanguageFromAsync((lang) => {
                                    isEmpty(lang) ?
                                        // this.props.navigation.replace("selectlanguage", { from: 'intro' })
                                        this.props.navigation.replace('intro')
                                        : getLocationFromAsync(location => {
                                            isEmpty(location) ?
                                                // this.props.navigation.replace('location', { from: 'language' })
                                                this.props.navigation.replace('intro')
                                                : this.props.navigation.replace('login')
                                        })
                                })
                            }
                            else {
                                this.props.navigation.replace('intro')
                            }
                        }
                    })
        
                }, 1000)
                // if(DeviceInfo.getVersion() == arrData.settingsAppVersion){
                //     console.log('device version is',DeviceInfo.getVersion(),arrData.settingsAppVersion)
                //     global.isFirstLoad = true
               
                // }else{
                //     Alert.alert(
                //     "Version Update",
                //     'New version of application is available now, please install that.',
                //     [
                //         {
                //             text:'OK',
                //             onPress: () => Linking.canOpenURL(storeUrl).then(supported => {
                //                 if (!supported) {
                //                     console.log('Unsupported url: ' + storeUrl)
                //                 } else {
                //                     return Linking.openURL(storeUrl)
                //                 }
                //             }).catch(err => console.error('An error occurred', err)),
                //         },
                //     ]
                // );
                // }

      
        
                console.log("setting Data is new one",global.Url, arrData)
            }).catch(err => {
                console.log("Error", err)
                
            })
}




    render() {

        return (
            // <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: colors.white, justifyContent: 'center' }}>
                // <StatusBar hidden={true} />
                <ImageBackground source={require('../assets/splash_with_logo.png')} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', }}>
                    {/* <Image source={require('../assets/splash_logo_dummy_only.png')} style={{ width: 200, height: 200 }} resizeMode="contain" /> */}

                </ImageBackground>
            // </SafeAreaView>
        )
    }

}



function mapStateToProps(state) {
    return {


    };
}


export default compose(connect(mapStateToProps, {

}))(SplashScreen);