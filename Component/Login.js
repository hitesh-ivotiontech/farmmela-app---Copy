import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground,Platform,Dimensions, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Picker, } from 'react-native';

// import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import Button from '../ReuseableComponent.js/Button';
import { getUserFromAsync, isServerSuccess, OpenSansSemiBold, setUserInAsync, validateEmail, validateOTP, validatePhone } from '../src/validations';
import { Modalize } from 'react-native-modalize';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import SimpleToast from 'react-native-simple-toast';
import { LoginActions } from '../src/actions';
import ActionSheet from 'react-native-actionsheet';
import Ionicons from 'react-native-vector-icons/Ionicons'
import TnCPPAcceptModal from '../ReuseableComponent.js/TnCPrivacyPolicyAcceptModal';
const { width, height } = Dimensions.get('window')
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import firebase, {RemoteMessage,messaging} from 'react-native-firebase';
// import RNOtpVerify from 'react-native-otp-verify';


class Login extends React.Component {
    modal = React.createRef();
    tncModal = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            otp: '',
            country: [],
            selectedCountry: {
                "countryID": "1",
                "countryName": "India",
                "countryDialCode": "91",
                "countryFlagImage": "http://13.126.208.24/backend/web/uploads/flag/20211112160413.png",
                "countryRemark": null,
                "countryStatus": "Active",
                "countryCreatedDate": "2021-09-23 18:00:19"
            },
            lbl_Welcome_to_FarmMela:global.languageData.Welcome_to_FarmMela,
            lbl_Enter_your_details_to_go_ahead:global.languageData.Enter_your_details_to_go_ahead,
            lbl_Email_ID_Mobile_Number:global.languageData.Email_ID_Mobile_Number,
            lbl_Select_Country:global.languageData.Select_Country,
            lbl_Sign_In_Sign_Up:global.languageData.Sign_In_Sign_Up,
            lbl_Continue_as_a_Guest_User:global.languageData.Continue_as_a_Guest_User,
            lbl_OTP_Verification:global.languageData.OTP_Verification,
            lbl_Enter_the_digit_OTP_sent_to:global.languageData.Enter_the_digit_OTP_sent_to,
            lbl_Didnt_receive_the_code:global.languageData.Didnt_receive_the_code,
            lbl_Continue:global.languageData.Continue,
            lbl_OTP_Code_is_valid:global.languageData.OTP_Code_is_valid,
            lbl_Resend:global.languageData.Resend,
            lbl_Get_OTP_on_call:global.languageData.Get_OTP_on_call,

        }
        console.disableYellowBox = true;
    }

    componentDidMount(){
        // RNOtpVerify.getOtp()
        //     .then(p => RNOtpVerify.addListener(this.otpHandler),console.log('addListener getOtp') )
        //     .catch(p => console.log('error is getOtp',p));
    }

    // otpHandler = (message: string) => {
    //     console.log('SMS :: ',message)
    // }

   

    componentWillMount() {
        var body = {
            "loginuserID": global.userID || "1",
            "languageID": global.languageID,
            "searchWord": "",
            "apiType": "Android",
            "apiVersion": "2.0"
        }
        this.props.GetCountryList(body)
    }

    componentWillUnmount(){
        
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.LoginWithOtpSuccess) {
            var data = nextProps.LoginWithOtpInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    var data = response.data[0]
                    console.log('login data',data)
                    // SimpleToast.show(response.message)
                    this.modal.current.open(),
                        this.focusOnOTP()
                } else {
                    this.props.navigation.navigate("signup", { mobile: this.state.mobile, countryCode: this.state.selectedCountry.countryDialCode })
                }
            })
        }

        if (nextProps.OTP_VerificationSuccess) {
            var data = nextProps.OTP_VerificationInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    // SimpleToast.show(response.message)
                    setUserInAsync(response.data[0], () => {
                        global.isSignIn = false
                        this.props.navigation.replace('home')
                    })
                } else {
                    console.log('verification fail',response)
                    this.setState({ otp: "" })
                    this.focusOnOTP()
                    
                    // SimpleToast.show(response.message)
                }
            })
        }

        if (nextProps.ResendOtpSuccess) {
            var data = nextProps.ResendOtpInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    // SimpleToast.show(response.message)
                }
            })
        }

        if (nextProps.GetCountryListSuccess) {
            var data = nextProps.GetCountryListInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    this.setState({ country: response.data })
                }
            })
        }

    }


    focusOnOTP() {
        setTimeout(() => {
            //   this.otpInput.focusField(1)
            if(this.otpInput){
                this.otpInput.focusField(0)
            }
        }, 1000);

    }

    validateMobileAndEmail() {
        if (isNaN(this.state.mobile)) {
            console.log('email found')
            global.isEmail = true
            return (validateEmail(this.state.mobile, "Email ID"))

        } else {
            console.log('mobile found')
            global.isEmail = false
            return (validatePhone(this.state.mobile))

        }

    }

    validateNumber() {
        if (this.validateMobileAndEmail()) {
            var body = {
                "userEmail": global.isEmail?this.state.mobile:'',
                "userMobile": global.isEmail?'':this.state.mobile,
                "languageID": global.languageID,
                "userDeviceID": "token",
                "apiType": "Android",
                "apiVersion": "2.0"
            }
            console.log('LoginWithOtp body',body)
            this.props.LoginWithOtp(body)


        }
    }


    validate() {
        if (validateOTP(this.state.otp, this.otpInput, this)) {
            var body = {
                "languageID": global.languageID,
                "userMobile": global.isEmail?'':this.state.mobile,
                "userEmail": global.isEmail?this.state.mobile:'',
                "userOTP": this.state.otp,
                "userDeviceID": global.deviceToken,
                "apiType": "Android",
                "apiVersion": "2.0",
                "userCountryCode": this.state.selectedCountry.countryDialCode
            }
            console.log(body)
            this.props.OTP_Verification(body)
        }
    }

    

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
         {/* <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}> */}
            
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                
                <KeyboardAwareScrollView style={{flex:1,height:height}}
            keyboardShouldPersistTaps={'handled'}>
                    <ImageBackground source={require('../assets/onboarding_bg_with_logo.png')}
                        style={{ width: '100%', height: Platform.OS=='ios'?height:height, }}  >
                        <View style={{ padding: 10, marginTop: height / 3 + 40, }}>
                            <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 22, }}>{this.state.lbl_Welcome_to_FarmMela}</Text>
                            <Text style={{ color: colors.green, marginBottom: 20, fontFamily: OpenSansSemiBold, fontSize: 13 }}>{this.state.lbl_Enter_your_details_to_go_ahead}</Text>
                            <Text style={{}}>{this.state.lbl_Email_ID_Mobile_Number}</Text>
                            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', backgroundColor: colors.white, paddingHorizontal: 10, borderRadius: 10, marginTop: 10, }}>
                                <ActionSheet
                                    ref={ref => this.countryAction = ref}
                                    options={[global.languageData.cancel].concat(this.state.country.map(item => "(+" + item.countryDialCode + ") " + item.countryName))}
                                    title={this.state.lbl_Select_Country}
                                    cancelButtonIndex={0}
                                    onPress={(index) => {
                                        if (index) {
                                            this.setState({ selectedCountry: this.state.country[index - 1] })
                                        }
                                    }}
                                />
                                <TouchableOpacity style={{ paddingRight: 2 }}
                                    onPress={() => { this.countryAction.show() }}>
                                    <Text>+{this.state.selectedCountry.countryDialCode}</Text>
                                </TouchableOpacity>
                                <Ionicons name="chevron-down" style={{ paddingRight: 8 }} size={15} />
                                <TextInput
                                    placeholder={global.languageData.Enter_Email_ID_Mobile_Number}
                                    value={this.state.mobile}
                                    autoCapitalize='none'
                                    onChangeText={(mobile) => this.setState({ mobile })}
                                    onSubmitEditing={() => this.validateNumber()}
                                    style={{ flex: 1,height:45,backgroundColor:'white' }}
                                />
                            </View>
                            <View style={{ marginTop: height / 15 }}>
                                <Button name={this.state.lbl_Sign_In_Sign_Up} onPress={() => { this.validateNumber() }} />
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.tncModal.current.open()
                            }}
                                style={{ marginTop: height / 9, alignSelf: 'center' }}>
                                <Text style={{ textDecorationLine: 'underline', fontFamily: OpenSansSemiBold }}>{this.state.lbl_Continue_as_a_Guest_User}</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                    <Modalize ref={this.modal} handlePosition="inside" closeOnOverlayTap={false}
                        adjustToContentHeight={true}
                        useNativeDriver={true} panGestureEnabled={false}
                        modalStyle={{ padding: 10 }}>
                        <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16, textAlign: 'center', margin: 10 }}>{this.state.lbl_OTP_Verification}</Text>
                        <Text style={{ fontFamily: OpenSansSemiBold, }}>{this.state.lbl_Enter_the_digit_OTP_sent_to} {global.isEmail?'':'+'+this.state.selectedCountry.countryDialCode} {this.state.mobile}</Text>
                        <OTPInputView
                            ref={otpInput => this.otpInput = otpInput}
                            style={{ width: '100%', height: 100, }}
                            pinCount={6}
                            secureTextEntry={true}
                            autoFocusOnLoad={false}
                            code={this.state.otp}
                            // onCodeFilled = {(code) => {
                            //     console.log(`Code is ${code}, you are good to go!`)
                            // }}
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeChanged={async (otp) => {
                                await this.setState({ otp })
                                otp.length == 6 ? this.validate() : null
                            }}
                        />
                        {/* <Text style={{ fontFamily: OpenSansSemiBold, textAlign: 'center', color: colors.green, textDecorationLine: 'underline' }}>{this.state.lbl_Get_OTP_on_call}</Text> */}
                        <TouchableOpacity onPress={() => {
                            this.props.ResendOtp({
                                "languageID": global.languageID,
                                "loginuserID": "0",
                                "userMobile": this.state.mobile,
                                "apiType": "Android",
                                "apiVersion": "2.0",
                                "fromProfile":'No',
                                "userCountryCode": this.state.selectedCountry.countryDialCode
                            })
                        }}>
                            <Text style={{ textAlign: 'center', marginTop: 20, marginBottom: 10 }}>{this.state.lbl_Didnt_receive_the_code} <Text style={{ fontFamily: OpenSansSemiBold, textDecorationLine: 'underline' }}>{global.languageData.Resend}</Text></Text>
                        </TouchableOpacity>
                        <Button name={this.state.lbl_Continue} onPress={() => { this.validate() }} />
                        <Text style={{ textAlign: 'center', margin: 10, color: colors.lightgrey1, marginBottom: 20 }}>{this.state.lbl_OTP_Code_is_valid}</Text>
                    </Modalize>

                    <TnCPPAcceptModal modal={this.tncModal} navigation={this.props.navigation} action={() => {
                        global.isGuestLogin = true
                        this.tncModal.current.close()
                        this.props.navigation.navigate('home')
                    }} />

                </KeyboardAwareScrollView>
            {/* </SafeAreaView> */}
            </View>
        )
    }

}



function mapStateToProps(state) {
    return {
        LoginWithOtpInfo: state.LoginWithOtp,
        LoginWithOtpSuccess: state.LoginWithOtp.success,

        OTP_VerificationInfo: state.OTP_Verification,
        OTP_VerificationSuccess: state.OTP_Verification.success,

        ResendOtpInfo: state.ResendOtp,
        ResendOtpSuccess: state.ResendOtp.success,

        GetCountryListInfo: state.GetCountryList,
        GetCountryListSuccess: state.GetCountryList.success,


    };
}


export default compose(connect(mapStateToProps, {
    ...LoginActions
}))(Login);


const styles = StyleSheet.create({
    underlineStyleBase: {
        width: width / 8,
        height: width / 8,
        color: colors.black,
        backgroundColor: colors.lightgrey,
        borderRadius: 10,
        fontSize: 18
    },

    underlineStyleHighLighted: {
    },
});