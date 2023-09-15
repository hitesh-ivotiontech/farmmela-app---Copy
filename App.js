import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions, Image, StatusBar, AsyncStorage} from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './src/reducers';
import i18next from "i18next";
import { colors } from './colors';
import { setNetWorkStatus } from './src/actions';
import { I18nextProvider } from "react-i18next";
// import LanguageConfig from './src/config/LanguageConfig'
import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
import SimpleToast from 'react-native-simple-toast';
import MainRoute from './Component/MainRoute';
import GlobalFont from 'react-native-global-font'
import { MenuProvider } from 'react-native-popup-menu';
import firebase, {RemoteMessage} from 'react-native-firebase';
import HomeHeader from './ReuseableComponent.js/HomeHeader';

import  type { Notification, NotificationOpen} from 'react-native-firebase';
const { height, width } = Dimensions.get('window');

GlobalFont.applyGlobal('OpenSans-Regular')


i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en_US", // language to use
  // resources: LanguageConfig.I18ConfigResources(),
  fallbackLng: "en_US"
});
const styles = StyleSheet.create({
  defaultStyle: {
    height: Platform.OS === "android" ? 60 : 70,
    width,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: 'rgb(242, 138, 62)',
  },
  titleStyle: {
    flex: 1,
    marginRight: 15,
    color: 'white',
  }
});
class NetworkStatus extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  UNSAFE_componentWillMount() {
    NetInfo.addEventListener(
      this.handleFirstConnectivityChange
    );
  
    
  }
  handleFirstConnectivityChange = async (connectionInfo) => {
   

    console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    if (connectionInfo.type && connectionInfo.type === 'none') {
      console.log('connectionInfo if',)
      // this.setState({ visible: true });
      this.props.dispatch(setNetWorkStatus({
        connected: false
      }));



    } else {
      
      this.setState({ visible: false });
      this.props.dispatch(setNetWorkStatus( console.log('connectionInfo else',),{
       
        connected: true,
      }));
    }
  }

  onActionCallBack = () => {
    this.setState({ visible: false });
    if (this.props.onActionCallBack) {
      this.props.onActionCallBack();
    }
  }

  render() {
    let statusView = (
      <Modal isVisible={true}>
        <View
          style={{ flex: 0, backgroundColor: colors.white, borderRadius: 10 }}>
          <View style={{ justifyContent: 'center', padding: 30 }}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.green,
              }}>
              No Internet Connection
            </Text>
            <Text style={{ textAlign: 'center' }}>
              Please sit back and relax till you connect to internet
            </Text>
          </View>
        </View>
      </Modal>

    );
    return (
      this.state.visible ? statusView : null
    );
  }
}
NetworkStatus.defaultProps = {
  title: 'No Internet Connection',
  actionText: 'Dismiss',
  style: styles.defaultStyle,
};
class NetworkNotifier extends React.PureComponent {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.apiNetworkError && nextProps.apiNetworkError) {
      SimpleToast.show('You are offline. Please check your network and try again!');
    }
  }

  render() {
    return <NetworkStatus onActionCallBack={() => { }} dispatch={this.props.dispatch} />;
  }
}
class App extends React.PureComponent {
  constructor(props) {
    super(props);
   /* props.QuickbloxSdkSetting(config);*/
    console.disableYellowBox = true; 
    global.deviceToken = 'abc'   
    global.isChatOpen = false
    global.isNotificationOpen = false
    
 
  }

  async componentDidMount() {
    console.log('app js did mount')
    // console.log('get uid are',firebase.auth().currentUser)
    this.checkPermission();
    
      this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
        // Process your message as required
        console.log('Push Message app js',global.isChatOpen, message);
       
        
    });
      this.createNotificationListeners();
    
    
  }

  componentWillUnmount(){
    console.log('app js will unmount')
      this.notificationListener();
      this.notificationOpenedListener();
      this.notificationDisplayedListener();
     this.messageListener();
  }

  async checkPermission() {
    console.log('check permission called');
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log('check permission called true',enabled);
      // if(Platform.OS == 'android'){
        this.getToken();
      // }
       
    } else {
      console.log('check permission called else');
      // if(Platform.OS == 'android'){
        this.requestPermission();
      // }
        
    }
  }

  async getToken() {
    console.log('getToken called');
    let fcmToken = await AsyncStorage.getItem('fcmToken');    
    global.deviceToken = fcmToken;
    
    if (!fcmToken) {
      console.log('geting token called');
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            console.log('user has a device token');
            global.deviceToken = fcmToken;
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
    // var fcmToken =''
    // try{
    //   fcmToken = await firebase.messaging().getToken();
    // }catch(error){
    //   console.log('fcmToken error',error);
    // }
    // let fcmToken = await firebase.messaging().getToken();
    console.log('fcmToken',fcmToken);
  }
  
  //2
  async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            console.log('requestPermission authorised');
            // User has authorised

            setTimeout(() => {
               this.getToken();
            }, 1000);
           
        } catch (error) {
          console.log('requestPermission error',error);
            // User has rejected permissions
            // if(Platform.OS == 'ios'){
            //   this.getToken();
            // }
            alert(error)
        }
  }
  async createNotificationListeners(){    
    const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
    const badgeCount = await firebase.notifications().getBadge();
    console.log('badge count is new',badgeCount)
    console.log('notificationOpen App js new', notificationOpen);
    
    if (notificationOpen) {
        const action = notificationOpen.action;
        const notification: Notification = notificationOpen.notification;
        console.log('notificationess', notification);   
        global.isNotificationOpen = true
        
    }
  
  
    const channel = new firebase.notifications.Android.Channel('FarmMela-test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
        .setDescription('My apps test channel');
    // Create the channel
    
    firebase.notifications().android.createChannel(channel);
  
    
   
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
        // Process your notification as required
        //notification
        console.log('On Notification Listner', notification)
        if(global.isChatOpen){}else{
        notification = new firebase.notifications.Notification()
            .android.setChannelId('Farmmela-test-channel')
  
            .setNotificationId(notification._notificationId)
            .setTitle(notification._title)
            
            .setBody(notification._body)
            .setSubtitle(notification._subtitle)
            .setSound('default')
            .android.setPriority(firebase.notifications.Android.Priority.High)
            .setData(notification._data);
          }
         //   firebase.notifications().setBadge(10);
  
         if(global.isChatOpen){

        }else{
          console.log('display notification called app js',global.isChatOpen)
        firebase.notifications()
            .displayNotification(notification);
          }
            
        const {
            body,
            data,
            notificationId,
            sound,
            subtitle,
            title,actions,
            
        } = notification;
  
        console.log("LOG: ", title, body, notificationId,sound,subtitle,JSON.stringify(data) ,JSON.stringify(data.RefKey), actions)    
    });
  
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        console.log('onNotificationDisplayed called',global.isNotificationOpen)
    });
   
    this.notificationOpenedListener =  await firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen, ) => {
        // Get the action triggered by the notification being opened
  
        // triger in foreground
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;  
        var body = notification._data.type
        global.isNotificationOpen = true
        console.log('onNotificationOpened called',global.isNotificationOpen)
        // if (body.includes('chat')){
        //     this.props.navigation.navigate('myMessage')
        // } 
        // firebase.notifications().removeDeliveredNotification(notification.notificationId);
    });
  
  }
  

  render() {
    const { dispatch, navState } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <MenuProvider>
          <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
          <MainRoute />

          <NetworkNotifier apiNetworkError={this.props.apiNetworkError} dispatch={dispatch} />
          <Modal visible={this.props.AllLanguagesFetching || this.props.LoginWithOtpFetching ||
            this.props.OTP_VerificationFetching || this.props.AllStatesFetching ||
            this.props.AllCitiesFetching || this.props.GetAskQuestionCategoryFetching ||
            this.props.GetAskQuestionSubCategoryFetching || this.props.AskQuestionFetching ||
            this.props.PostNewAdvertisementFetching  || this.props.GetAdvertisementFetching ||
            this.props.GetMyAdvertisementFetching || this.props.GetNotificationsFetching ||
            this.props.DeleteNotificationsFetching || this.props.UpdateReadNotificationsFetching ||
            this.props.ImportantLinkFetching || this.props.GeneralKnowledgeFetching ||
            this.props.EcoFriendlyFetching || this.props.OrganicFarmingFetching ||
            this.props.HarvestToStorageFetching || this.props.HarvestToStorageFlowersFetching ||
            this.props.DiseasesManagementFetching || this.props.MilkingToTransportFetching ||
            this.props.OrganicProductsFetching || this.props.BreedingFetching ||
            this.props.LoanApplicationFetching || this.props.MaintenanceHygieneFetching ||
            this.props.CaptureToTransportFetching || this.props.LicenseGuidelinesFetching ||
            this.props.SchemesFetching || this.props.WorkshopsFetching ||
            this.props.SchemeIncentivesFetching || this.props.NGOsFetching || this.props.ResendOtpFetching  || this.props.GetCountryListFetching || this.props.MarketPriceFetching || this.props.GetForumListFetching ||
            this.props.GetEnamListFetching || this.props.GetFPOListFetching || this.props.GetFarmFacilityListFetching
          }
            style={{ alignItems: 'center' }}>
            <Image source={require('./assets/loader.gif')} style={{ width: 50, height: 50, }} />
          </Modal>
        </MenuProvider>
      </View >
    );
  }
}
const AppWithNavigationState = connect(state => ({
  navState: state.navState,
  apiNetworkError: state.NetWorkStatus.apiNetworkError || "",
  AllLanguagesFetching: state.AllLanguages.fetching,
  LoginWithOtpFetching: state.LoginWithOtp.fetching,
  OTP_VerificationFetching: state.OTP_Verification.fetching,
  AllStatesFetching: state.AllStates.fetching,
  AllCitiesFetching: state.AllCities.fetching,
  GetAskQuestionCategoryFetching: state.GetAskQuestionCategory.fetching,
  GetAskQuestionSubCategoryFetching: state.GetAskQuestionSubCategory.fetching,
  AskQuestionFetching: state.AskQuestion.fetching,
  PostNewAdvertisementFetching: state.PostNewAdvertisement.fetching,

  GetAdvertisementFetching: state.GetAdvertisement.fetching,
  GetMyAdvertisementFetching: state.GetMyAdvertisement.fetching,
  GetNotificationsFetching: state.GetNotifications.fetching,
  DeleteNotificationsFetching: state.DeleteNotifications.fetching,
  UpdateReadNotificationsFetching: state.UpdateReadNotifications.fetching,
  ImportantLinkFetching: state.ImportantLink.fetching,
  GeneralKnowledgeFetching: state.GeneralKnowledge.fetching,
  EcoFriendlyFetching: state.EcoFriendly.fetching,
  OrganicFarmingFetching: state.OrganicFarming.fetching,
  HarvestToStorageFetching: state.HarvestToStorage.fetching,
  HarvestToStorageFlowersFetching: state.HarvestToStorageFlowers.fetching,
  DiseasesManagementFetching: state.DiseasesManagement.fetching,
  MilkingToTransportFetching: state.MilkingToTransport.fetching,
  OrganicProductsFetching: state.OrganicProducts.fetching,
  BreedingFetching: state.Breeding.fetching,
  LoanApplicationFetching: state.LoanApplication.fetching,
  MaintenanceHygieneFetching: state.MaintenanceHygiene.fetching,
  CaptureToTransportFetching: state.CaptureToTransport.fetching,
  LicenseGuidelinesFetching: state.LicenseGuidelines.fetching,
  SchemesFetching: state.Schemes.fetching,
  WorkshopsFetching: state.Workshops.fetching,
  SchemeIncentivesFetching: state.SchemeIncentives.fetching,
  NGOsFetching: state.NGOs.fetching,
  ResendOtpFetching: state.ResendOtp.fetching,
  ForumAddCommentFetching: state.ForumAddComment.fetching,
  GetCountryListFetching: state.GetCountryList.fetching,
  MarketPriceFetching: state.MarketPrice.fetching,
  GetForumListFetching:state.GetForumList.fetching,
  GetEnamListFetching:state.GetEnamList.fetching,
  GetFPOListFetching:state.GetFPOList.fetching,
  GetFarmFacilityListFetching:state.GetFarmFacilityList.fetching,
}))(App);
const AppContainer = () =>
(<View style={{ flexGrow: 1, }}>
  <Provider
    store={createStore(reducer, compose(applyMiddleware(thunk)))}
  >
    <I18nextProvider i18n={i18next}>
      <AppWithNavigationState />
    </I18nextProvider>
  </Provider>
</View>);

export default AppContainer;