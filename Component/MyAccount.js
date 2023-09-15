import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground,Platform, Dimensions, Text, FlatList, Share,TouchableOpacity, TextInput,BackHandler } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import AddButton from '../ReuseableComponent.js/AddButton';
import Button from '../ReuseableComponent.js/Button';
import Header from '../ReuseableComponent.js/Header';
import HomeHeader from '../ReuseableComponent.js/HomeHeader';
import { BaseUrlProfilePic } from '../src/api/ServerConfig';
import { isEmpty, logoutUser, OpenSansSemiBold } from '../src/validations';
const { width, height } = Dimensions.get('window')
import  Utility  from '../ReuseableComponent.js/Utility';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient'

class MyAccount extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
            category: [
                {
                    image: require('../assets/sales_green.png'),
                    name:  global.languageData.Sales,
                    nav: 'sales',
                    // isComingSoon: true
                },
                {
                    image: require('../assets/purchase_green.png'),
                    name: global.languageData.Purchase,
                    nav: 'purchase',
                    // isComingSoon: true
                },
                {
                    image: require('../assets/rent_green.png'),
                    name: global.languageData.Rent,
                    nav: 'rented',
                    // isComingSoon: true
                },
                {
                    image: require('../assets/forum_green.png'),
                    name: global.languageData.Forum,
                    nav: 'myForum',
                    // isComingSoon: true
                },
                {
                    image: require('../assets/my_messages_green.png'),
                    name: global.languageData.My_Messages,
                    nav: 'myMessage',
                    // isComingSoon: true
                },
                {
                    image: require('../assets/get_help_green.png'),
                    name: global.languageData.Get_Help,
                    nav: 'gethelp'
                },
                {
                    image: require('../assets/refer_friend_green.png'),
                    name: global.languageData.Refer_Friend,
                    nav: 'refer'
                },
                {
                    image: require('../assets/account_settings_green.png'),
                    name: global.languageData.Account_Settings,
                    nav: 'accountsetting'
                }
            ],
            user: global.user,
            lblTitle:global.languageData.My_Account,
            lblLogout:global.languageData.Logout
        }
        console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    refreshUser() {
        this.setState({ user: global.user })
    }

    componentDidMount=async()=>{
       
    }

    componentWillMount() {
      
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        console.log('back click my account')
        this.props.navigation.push('home')
        return true;
    }

    onShare = async () => {
        
        try {
            const result = await Share.share({
                message: global.settingData.sharemessage,
                url: ''
            });


        } catch (error) {
            console.log(error.message)
        }
    };
    

    btnSelectAction(item,index){
        if(item.name == global.languageData.My_Messages || item.name == global.languageData.Forum){

            if(global.user){
                console.log('push called',item.name,global.languageData.Forum)
                isEmpty(item.nav) ? SimpleToast.show('Not available') : item.name == global.languageData.My_Messages || item.name == global.languageData.Forum ?this.props.navigation.push(item.nav):this.props.navigation.navigate(item.nav)
            }else{
                var ut = new Utility()
                ut.loginAlert(this.props)
            }

        }else{
            if(item.name == global.languageData.Refer_Friend){
                this.onShare()
            }else{
                isEmpty(item.nav) ? SimpleToast.show('Not available') : item.name == global.languageData.My_Messages?this.props.navigation.push(item.nav):this.props.navigation.navigate(item.nav)
            }
            
        }
        
    }


    render() {
        const user = this.state.user
        return (
            <Fragment>
                {Platform.OS=='ios'?<LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
            style={{height:global.notchHeight}}/>:null}

            <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.75)" }}>
            <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <HomeHeader props={this.props} showImage={true} showSearch={false} />
                {user ?
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('profile', { refresh: this.refreshUser.bind(this) }) }}
                        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, margin: 10 }}>
                        <Image source={isEmpty(user.userProfilePicture) ? require('../assets/user_green_big.png') : { uri: BaseUrlProfilePic + user.userProfilePicture }}
                            style={{ width: 60, height: 60, borderRadius: 60, borderWidth: 5, borderColor: "rgba(206,245,181,0.8)" }} />
                        <Text style={{ width: '60%', fontSize: 18, fontFamily: OpenSansSemiBold }}>{user.userFullName}</Text>
                        <Image source={require('../assets/arrow_right_black.png')} style={{ width: 12, height: 12, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    : null}

                <FlatList
                    data={this.state.category}
                    keyExtractor={item => item.name}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item,index }) => (
                        <TouchableOpacity disabled={item.isComingSoon}
                            onPress={() => this.btnSelectAction(item,index)}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: colors.white, borderRadius: 5, elevation: 2, margin: 10, opacity: item.isComingSoon ? 0.4 : 1 }}>
                            <Image source={item.image} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                            <Text style={{ width: '60%', fontSize: 17, fontFamily: OpenSansSemiBold }}>{item.name}</Text>
                            <Image source={require('../assets/arrow_right_black.png')} style={{ width: 12, height: 12, resizeMode: 'contain' }} />
                            {item.isComingSoon ? <Text style={{ position: 'absolute', top: 15, left: '65%', paddingHorizontal: 5, borderRadius: 5, backgroundColor: 'red', color: colors.white, }}>{global.languageData.Coming_Soon}</Text> : null}

                        </TouchableOpacity>
                    )}
                />
                {this.state.user ?
                    <View style={{ marginVertical: 10 }}>
                        <Button name={this.state.lblLogout} onPress={() => {
                            logoutUser(this.props, () => { })
                        }} />
                    </View> : <View style={{ marginVertical: 10 }}>
                        <Button name={global.languageData.Login} onPress={() => { logoutUser(this.props, () => { }) }} />
                    </View>}

                    <View style={{padding:5,backgroundColor:'rgb(242,242,242)',alignItems:'center'}}>
                        <Text>Version {DeviceInfo.getVersion()}</Text>
                    </View>

            </SafeAreaView>
            </Fragment>
        )
    }

}



function mapStateToProps(state) {
    return {


    };
}


export default compose(connect(mapStateToProps, {

}))(MyAccount);