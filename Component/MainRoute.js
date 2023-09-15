/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    Image,
    StyleSheet,Platform,Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import splashScreen from '../Component/splashScreen';
import AppIntro from './AppInto';
import SelectLanguage from './SelectLanguage';
import Location from './Location';
import Login from './Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import { colors } from '../colors';
import Forum from './Forum';
import Signup from './Signup';
import BuySellRent from './BuySellRent';
import Buy from './Buy';
import PostNewAd from './PostNewAd';
import ReviewAd from './ReviewAd';
import MyAccount from './MyAccount';
import AskQuestion from './AskQuestion';
import Sell from './Sell';
import Rent from './Rent';
import AdDetails from './AdDetails';
import Notification from './Notification';
import Profile from './Profile';
import Sales from './Sales';
import Purchase from './Purchase';
import Rented from './Rented';
import Refer from './Refer';
import GetHelp from './GetHelp';
import AccountSettings from './AccountSettings';
import NewsFeed from './NewsFeed';
import AgriServices from './AgriServices';
import GeneralInfo from './GeneralInfo';
import NewsFeedDetails from './NewsFeedDetails';
import Weather from './Weather';
import Nearby from './Nearby';
import Advertisements from './Advertisements';
import CategoryDetails from './CategoryDetails';
import ImportantLinks from './ImportantLinks';
import GeneralKnowledge from './GeneralKnowledge';
import GeneralKnowledgeDetails from './GeneralKnowledgeDetails';
import MarketPrice from './MarketPrice';
import DropdownText from './DropdownText';
import FarmersHelpDetails from './FarmersHelpDetails';
import Articles from './Articles';
import SubmitArticle from './SubmitArticle';
import InputData from './InputData';
import InputDataNext from './InputDataNext';
import Schedule from './Schedule';
import Summary from './Summary';
import SummaryDetails from './SummaryDetails';
import AddSchedule from './AddSchedule';
import Expense from './Expense';
import AddExpense from './AddExpense';
import Revenue from './Revenue';
import AddRevenue from './AddRevenue';
import AddSummary from './AddSummary';

import CMS_Page from './CMS_Page';
import MyForum from './MyForum';
import Fire from './Fire';
import MyMessage from './MyMessage';
import ChatView from './ChatView';
import ReviewArticle from './ReviewArticle';
import ArticleReadMore from './ArticleReadMore';


import { getLanguageForLabelUpdate,isEmpty } from '../src/validations';
import { translateText } from '../src/LanguageTranslation';
import FarmSchemes from './FarmSchemes';
const { width, height } = Dimensions.get('window')


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


class MainRoute extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            
        }

    }

    componentDidMount(){
       
    }

    



    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.GetLanguageListSuccess) {
            var data = nextProps.GetLanguageListInfo.details[0].data[0]
            this.setState({ languageLabel: data })
        }
    }

    render() {

        return (

            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="launch" component={splashScreen} />
                    <Stack.Screen name="intro" component={AppIntro} />
                    <Stack.Screen name="selectlanguage" component={SelectLanguage} />
                    <Stack.Screen name="location" component={Location} />
                    <Stack.Screen name="login" component={Login} />
                    <Stack.Screen name="home" component={HomeTab} />
                    <Stack.Screen name="signup" component={Signup} />
                    <Stack.Screen name="buy" component={Buy} />
                    <Stack.Screen name="postnewad" component={PostNewAd} />
                    <Stack.Screen name="reviewad" component={ReviewAd} />
                    {/* <Stack.Screen name="myaccount" component={MyAccount} /> */}
                    <Stack.Screen name="askquestion" component={AskQuestion} />
                    <Stack.Screen name="sell" component={Sell} />
                    <Stack.Screen name="rent" component={Rent} />
                    <Stack.Screen name="addetails" component={AdDetails} />
                    <Stack.Screen name="notification" component={Notification} />
                    <Stack.Screen name="profile" component={Profile} />
                    <Stack.Screen name="sales" component={Sales} />
                    <Stack.Screen name="purchase" component={Purchase} />
                    <Stack.Screen name="rented" component={Rented} />
                    <Stack.Screen name="refer" component={Refer} />
                    <Stack.Screen name="gethelp" component={GetHelp} />
                    <Stack.Screen name="accountsetting" component={AccountSettings} />
                    <Stack.Screen name="newsfeeddetails" component={NewsFeedDetails} />
                    <Stack.Screen name="weather" component={Weather} />
                    <Stack.Screen name="nearby" component={Nearby} />
                    <Stack.Screen name="advertisements" component={Advertisements} />
                    <Stack.Screen name="categorydetails" component={CategoryDetails} />
                    <Stack.Screen name="importantlinks" component={ImportantLinks} />
                    <Stack.Screen name="generalknowledge" component={GeneralKnowledge} />
                    <Stack.Screen name="generalknowledgedetails" component={GeneralKnowledgeDetails} />
                    <Stack.Screen name="dropdowntext" component={DropdownText} />
                    <Stack.Screen name="farmschemes" component={FarmSchemes} />
                    
                    <Stack.Screen name="marketprice" component={MarketPrice} />
                    <Stack.Screen name="farmershelpdetails" component={FarmersHelpDetails} />
                    <Stack.Screen name="articles" component={Articles} />
                    <Stack.Screen name="submitarticles" component={SubmitArticle} />
                    <Stack.Screen name="inputdata" component={InputData} />
                    <Stack.Screen name="inputdatanext" component={InputDataNext} />
                    <Stack.Screen name="schedule" component={Schedule} />
                    <Stack.Screen name="summary" component={Summary} />
                    <Stack.Screen name="summarydetails" component={SummaryDetails} />
                    <Stack.Screen name="addschedule" component={AddSchedule} />
                    <Stack.Screen name="expense" component={Expense} />
                    <Stack.Screen name="addexpense" component={AddExpense} />
                    
                    <Stack.Screen name="revenue" component={Revenue} />
                    <Stack.Screen name="addrevenue" component={AddRevenue} />
                    <Stack.Screen name="addsummary" component={AddSummary} />
                    
                    <Stack.Screen name="cmspages" component={CMS_Page} />
                    <Stack.Screen name="myForum" component={MyForum} />
                    <Stack.Screen name="Fire" component={Fire} />
                    <Stack.Screen name="myMessage" component={MyMessage} />
                    <Stack.Screen name="chatView" component={ChatView} />
                    <Stack.Screen name="reviewArticle" component={ReviewArticle} />
                    <Stack.Screen name="articleReadMore" component={ArticleReadMore} />

                    <Stack.Screen name="forum" component={Forum} />
                    <Stack.Screen name="newsfeed" component={NewsFeed} />

                </Stack.Navigator>
            </NavigationContainer>

        );
    }
};

class HomeTab extends React.PureComponent {
    constructor(props) {
        super(props);
        // this.state = {
        //     lblHome:'Home',
        //     lblForum:'Forum',
        //     lblBuySell:'Buy/Sell/Rent',
        //     lblNews:'News Feed',
        //     lblAgri:'Agri Services'
        // }

        this.state = {
            lblHome:'Home',
            lblForum:'General Info',
            lblBuySell:'Farm Policies',
            lblNews:'Account',
        
        }
    }

        componentDidMount(){
            console.log('getLanguageForLabelUpdate')
            getLanguageForLabelUpdate((lang) => {
                console.log('getLanguageForLabelUpdate',lang)
                this.setTabLabel(lang)
                
            })
        }

        setTabLabel=async(lang)=>{
            // if(global.isLanguageOtherThanEnglish){
            //     await translateText([this.state.lblHome,this.state.lblForum,this.state.lblBuySell,this.state.lblNews,this.state.lblAgri] , (result) => {
            //         this.setState({lblHome: result[0].translatedText,
            //         lblForum: result[1].translatedText,
            //         lblBuySell: result[2].translatedText,
            //         lblNews: result[3].translatedText,
            //         lblAgri: result[4].translatedText})

            //     }, (err) => {
                 
            //     })
            // }

            if(global.isLanguageOtherThanEnglish){
                await translateText([this.state.lblHome,this.state.lblForum,this.state.lblBuySell,this.state.lblNews] , (result) => {
                    this.setState({lblHome: result[0].translatedText,
                    lblForum: result[1].translatedText,
                    lblBuySell: result[2].translatedText,
                    lblNews: result[3].translatedText,
                    })

                }, (err) => {
                 
                })
            }
    }



    render() {
        return (
            // <Tab.Navigator screenOptions={{
            //     headerShown: false,
            //     tabBarItemStyle: { borderRadius: 10, marginHorizontal: 5.5, marginVertical: 5 },
            //     tabBarStyle: { height:Platform.OS=='ios'&&height>580? 90:60, elevation: 0 }, tabBarActiveTintColor: colors.white, tabBarActiveBackgroundColor: colors.green,
            //     tabBarLabelStyle: { marginBottom: 5 },
            // }}>
                <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarItemStyle: { borderRadius: 10, marginHorizontal: 0, marginVertical: 0 },
                tabBarStyle: {elevation: 0 }, tabBarActiveTintColor: colors.white, tabBarActiveBackgroundColor: colors.green,
                tabBarLabelStyle: { marginBottom: 5 },
            }}>
                {/* <Tab.Screen name="hometab" component={Home} options={{ tabBarIcon: ({ focused }) => (TabImage(focused, require('../assets/footer_home_inactive.png'), require('../assets/footer_home_active.png'))), title: this.state.lblHome, }} />
                <Tab.Screen name="forum" component={Forum} options={{ tabBarIcon: ({ focused }) => (TabImage(focused, require('../assets/footer_forum_inactive.png'), require('../assets/footer_forum_active.png'))), title: this.state.lblForum, }} />
                <Tab.Screen name="buysellrent" component={BuySellRent} options={{ tabBarIcon: ({ focused }) => (TabImage(focused, require('../assets/footer_buy_sell_rent_inactive.png'), require('../assets/footer_buy_sell_rent_active.png'))), title: this.state.lblBuySell, }} />
                <Tab.Screen name="newsfeed" component={NewsFeed} options={{ tabBarIcon: ({ focused }) => (TabImage(focused, require('../assets/footer_news_feed_inactive.png'), require('../assets/footer_news_feed_active.png'))), title: this.state.lblNews, }} />
                <Tab.Screen name="agriservices" component={AgriServices} options={{ tabBarIcon: ({ focused }) => (TabImage(focused, require('../assets/footer_agri_services_inactive.png'), require('../assets/footer_agri_services_active.png'))), title: this.state.lblAgri, }} /> */}

                <Tab.Screen name="hometab" component={Home} options={{ tabBarIcon: ({ focused }) => (TabImage(focused, require('../assets/footer_home_inactive.png'), require('../assets/footer_home_active.png'))), title: this.state.lblHome, }} />
                <Tab.Screen name="generalinfo" component={GeneralInfo} options={{ tabBarIcon: ({ focused }) => (TabImage(focused, require('../assets/genral_info_gray.png'), require('../assets/genral_info_white.png'))), title: this.state.lblForum, }} />
                <Tab.Screen name="agriservices" component={AgriServices} options={{ tabBarIcon: ({ focused }) => (TabImage(focused, require('../assets/farm_policies_gray.png'), require('../assets/farm_policies_white.png'))), title: this.state.lblBuySell, }} /> 

               <Tab.Screen name="myaccount" component={MyAccount} options={{ tabBarIcon: ({ focused }) => (TabImage(focused, require('../assets/user_icon_gray.png'), require('../assets/user_icon_white.png'))), title: this.state.lblNews, }} />
              
           
            </Tab.Navigator>
        )
    }
}

function TabImage(focused, inActiveImage, activeImage) {
    return (

        <Image source={focused ? activeImage : inActiveImage} style={{ width: 25, height: 25, resizeMode: 'contain' }

        } />)
}


const styles = StyleSheet.create({

});




function mapStateToProps(state) {
    return {
        state,

    };
}

export default compose(connect(mapStateToProps, {

}))(MainRoute);