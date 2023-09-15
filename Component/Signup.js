import AsyncStorage from '@react-native-community/async-storage';
import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground,Platform, Dimensions, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

// import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import Button from '../ReuseableComponent.js/Button';
import { getUserFromAsync, isEmpty, isServerSuccess, OpenSansSemiBold, setUserInAsync, validateName, validateOTP,validateEmail} from '../src/validations';
import { Modalize } from 'react-native-modalize';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Header from '../ReuseableComponent.js/Header';
import SimpleToast from 'react-native-simple-toast';
import { LoginActions } from '../src/actions';
import TnCPPAcceptModal from '../ReuseableComponent.js/TnCPrivacyPolicyAcceptModal';
import { translateText } from '../src/LanguageTranslation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const { width, height } = Dimensions.get('window')

class Signup extends React.Component {
    modal = React.createRef();
    tncModal = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email:'',
            genderList: [global.languageData.Male, global.languageData.Female, global.languageData.Others],
            selectedGender: '',
            tncAgree: false,
            sendNotification: true,
            otp: '',
            mobile: '',
            countryCode: '',
            lblSignUp:global.languageData.Sign_Up,
            lblFullName:global.languageData.Full_Name,
            lblGender:global.languageData.Gender,
            lblMobileNumber:global.languageData.Mobile_Number,
            lblUpdate:global.languageData.Update,
            lblMale:global.languageData.Male,
            lblFemale:global.languageData.Female,
            lblOther:global.languageData.Others,
            lblPleaseSelectGender:global.languageData.Please_select_your_gender,
            lbl_Continue_as_a_Guest_User:global.languageData.Continue_as_a_Guest_User,
            lbl_OTP_Verification:global.languageData.OTP_Verification,
            lbl_Enter_the_digit_OTP_sent_to:global.languageData.Enter_the_digit_OTP_sent_to,
            lbl_Didnt_receive_the_code:global.languageData.Didnt_receive_the_code,
            lbl_Continue:global.languageData.Continue,
            lbl_OTP_Code_is_valid:global.languageData.OTP_Code_is_valid,
            lbl_Resend:global.languageData.Resend,
            lbl_Get_OTP_on_call:global.languageData.Get_OTP_on_call,
            lblOptional:'Optional',
            valueGenderName:global.languageData.Male,
            txtMobile:'',
            lblEnterMobile:'Enter Mobile Number',
            lblPleaseEnterMobile:'Please enter Mobile Number',
            lblShowMyContact:'Show my contact details on My Buy/Sell/Rent Post for others',
            isContactShow:true,
        }
        console.disableYellowBox = true;
    }

    componentDidMount=async()=>{
        global.isLanguageOtherThanEnglish ?

                        
        await translateText(["Optional","Enter Mobile Number","Show my contact details on My Buy/Sell/Rent Post for others"], (result) => {
            this.setState({lblOptional:result[0].translatedText,
                lblEnterMobile:result[1].translatedText,
                lblShowMyContact:result[2].translatedText,
            })
        }, (err) => {
        })
        : null
    }

    componentWillMount() {
        var { mobile, countryCode } = this.props.route.params
        console.log('country code',countryCode)
        this.setState({ mobile:global.isEmail?'':mobile,email:global.isEmail?mobile:'', countryCode })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.RegisterUserSuccess) {
            var data = nextProps.RegisterUserInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    console.log('register response',response.data[0])
                    this.setState({ mobile: global.isEmail?response.data[0].userEmail:response.data[0].userMobile })
                    this.modal.current.open(),
                        this.focusOnOTP()
                }
            })
        }

        if (nextProps.OTP_VerificationRegisterSuccess) {
            var data = nextProps.OTP_VerificationRegisterInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    // SimpleToast.show(response.message)
                    setUserInAsync(response.data[0], () => {
                        this.props.navigation.push('home')
                    })
                } else {
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

    }


    focusOnOTP() {
        setTimeout(() => {
            if(this.otpInput){
                this.otpInput.focusField(0)
            }
            
        }, 1000);

    }

    validateForm() {
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if (validateName(this.state.name, "Full name")) {
            // if( global.isEmail &&this.state.email.length == 0){
            //     SimpleToast.show(global.languageData.Please_enter_Email)
            // }else if (global.isEmail && regEmail.test(this.state.email) === false ) {
            //     SimpleToast.show(global.languageData.Please_enter_valid_Email)
            // }
             if (isEmpty(this.state.selectedGender)) {
                SimpleToast.show(this.state.lblPleaseSelectGender)
            }
            else {
                if (this.state.tncAgree) {
                    var body = {
                        "languageID": global.languageID,
                        "userFullName": this.state.name.trim(),
                        "userEmail": this.state.email,
                        "userMobile": this.state.mobile,
                        "userGender": this.state.valueGenderName,
                        "userDeviceType": "Android",
                        "userDeviceID": global.deviceToken,
                        "apiType": "Android",
                        "apiVersion": "2.0",
                        "userSignedRefKey": "",
                        "userCountryCode": this.state.countryCode,
                        "userShowContactDetails":this.state.isContactShow?'Yes':'No',
                        "userRegisteredBy":global.isEmail?'Email':'Mobile'
                    }
                    console.log('body of sign up',body)
                    this.props.RegisterUser(body)

                } else {
                    SimpleToast.show(global.languageData.Please_accept_our_TnC)
                }
            }
        }

    }

    btnGenderAction(item,index){
        if(index == 0){
            this.setState({ valueGenderName: 'Male' })
        }else if(index == 1){
            this.setState({ valueGenderName: 'Female' })
        }else{
            this.setState({ valueGenderName: 'Others' })
        }
        this.setState({ selectedGender: item })
    }

    validate() {
        if (validateOTP(this.state.otp, this.otpInput, this)) {

            var body = {
                "languageID": global.languageID,
                "userMobile": this.state.mobile,
                "userEmail":this.state.email,
                "userOTP": this.state.otp,
                "userDeviceID": global.deviceToken,
                "apiType": "Android",
                "apiVersion": "2.0"
            }
            console.log('body of otp',body)
            this.props.OTP_VerificationRegister(body)
        }
    }


    render() {

        return (
                <Fragment>
                {/* <SafeAreaView style={{backgroundColor:[colors.greenHeaderFrom, colors.greenHeaderTo]}}/> */}
                {Platform.OS=='ios'?<LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
            style={{height:global.notchHeight}}/>:null}
                
                <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />

                <Header name={this.state.lblSignUp} props={this.props} />
                <KeyboardAwareScrollView style={{flex:1,height:height}}
            keyboardShouldPersistTaps={'handled'}>
                <View style={{ padding: 10, justifyContent: 'space-between', flex: 1,height:height-100 }}>
                    <View>
                        <Text style={{}}>{this.state.lblFullName}</Text>
                        <TextInput
                            value={this.state.name}
                            onChangeText={(name) => this.setState({ name })}
                            placeholder={global.languageData.Enter_Full_Name}
                            style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 10, marginTop: 10 }}
                        />
    {global.isEmail==false?<View>
                        <View style={{marginTop: 15,flexDirection:'row',alignItems:'center'}}>
                        <Text style={{marginRight:10}}>{global.languageData.Email}</Text>
                        <Text style={{ fontSize: 12.5, color: colors.lightgrey1 }}>({this.state.lblOptional})</Text>
                        </View>
                        
                        <TextInput
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                            placeholder={global.languageData.Enter_Email}
                            style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 10, marginTop: 10 }}
                        />
        </View>:<View>
        <View style={{marginTop: 15,flexDirection:'row',alignItems:'center'}}>
                        <Text style={{marginRight:10}}>{this.state.lblMobileNumber}</Text>
                        <Text style={{ fontSize: 12.5, color: colors.lightgrey1 }}>({this.state.lblOptional})</Text>
                        </View>
                        <TextInput
                            value={this.state.mobile}
                            onChangeText={(mobile) => this.setState({ mobile })}
                            placeholder={this.state.lblEnterMobile}
                            keyboardType={'number-pad'}
                            style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 10, marginTop: 10 }}
                        />
        </View>} 
            
                        <Text style={{ marginVertical: 10 }}>{this.state.lblGender}</Text>
                        <FlatList
                            data={this.state.genderList}
                            horizontal={true}
                            renderItem={({ item,index }) => (
                                <TouchableOpacity onPress={() => this.btnGenderAction(item,index)}
                                    style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                                    <Image source={this.state.selectedGender == item ? require('../assets/radio_btn_selected.png') : require('../assets/radio_btn_unselected.png')} style={{ width: 18, height: 18, resizeMode: 'contain', marginRight: 10 }} />
                                    <Text style={{ fontSize: 15 }}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    
                    <View>
                        {/*Contact detail check*/}
                        <TouchableOpacity onPress={() => this.setState({ isContactShow: !this.state.isContactShow })}
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20, marginBottom: 15 }}>
                            <Image source={this.state.isContactShow ? require('../assets/check_box_big_selected.png') : require('../assets/check_box_big_unselected.png')} style={{ width: 18, height: 18, resizeMode: 'contain', marginRight: 10 }} />
                            <View>
                                <Text style={{ fontSize: 12.5 }}>{this.state.lblShowMyContact}</Text>
                            </View>
                        </TouchableOpacity>
                        {/* TnC */}
                        <TouchableOpacity onPress={() => this.setState({ tncAgree: !this.state.tncAgree })}
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                            <Image source={this.state.tncAgree ? require('../assets/check_box_big_selected.png') : require('../assets/check_box_big_unselected.png')} style={{ width: 18, height: 18, resizeMode: 'contain', marginRight: 10 }} />
                            <Text style={{ fontSize: 12.5 }}>{global.languageData.I_Agree_with} <Text onPress={() => this.props.navigation.navigate('cmspages', { name: 'terms', title: 'Terms & Conditions' })} style={{ textDecorationLine: 'underline' }}>{global.languageData.Terms_Conditions}</Text> {global.languageData.and} <Text onPress={() => this.props.navigation.navigate('cmspages', { name: 'privacy', title: "Privacy Policy" })} style={{ textDecorationLine: 'underline' }}>{global.languageData.Privacy_Policy}</Text></Text>
                        </TouchableOpacity>

                        {/* Notification */}
                        <TouchableOpacity onPress={() => this.setState({ sendNotification: !this.state.sendNotification })}
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20, marginTop: 20 }}>
                            <Image source={this.state.sendNotification ? require('../assets/check_box_big_selected.png') : require('../assets/check_box_big_unselected.png')} style={{ width: 18, height: 18, resizeMode: 'contain', marginRight: 10 }} />
                            <View>
                                <Text style={{ fontSize: 12.5 }}>{global.languageData.I_allow_FarmMela}</Text>
                                <Text style={{ fontSize: 12.5, color: colors.green }}>({this.state.lblOptional})</Text>
                            </View>
                        </TouchableOpacity>
                        


                        <View style={{ marginTop: height / 15 }}>
                            <Button name={this.state.lblSignUp} onPress={() => { this.validateForm() }} />
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.tncModal.current.open();
                        }}
                            style={{ marginVertical: 20, alignSelf: 'center' }}>
                            <Text style={{ textDecorationLine: 'underline', fontFamily: OpenSansSemiBold }}>{this.state.lbl_Continue_as_a_Guest_User}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </KeyboardAwareScrollView>
                <Modalize ref={this.modal} handlePosition="inside"
                    adjustToContentHeight={true}
                    useNativeDriver={true} panGestureEnabled={false}
                    modalStyle={{ padding: 10 }}>
                    <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16, textAlign: 'center', margin: 10 }}>{this.state.lbl_OTP_Verification}</Text>
                    {global.isEmail?<Text style={{ fontFamily: OpenSansSemiBold, }}>{this.state.lbl_Enter_the_digit_OTP_sent_to} {this.state.mobile}</Text>:<Text style={{ fontFamily: OpenSansSemiBold, }}>{this.state.lbl_Enter_the_digit_OTP_sent_to} +{this.state.countryCode} {this.state.mobile}</Text>}
                    <OTPInputView
                        ref={otpInput => this.otpInput = otpInput}
                        style={{ width: '100%', height: 100, }}
                        pinCount={6}
                        secureTextEntry={true}
                        autoFocusOnLoad={false}
                        code={this.state.otp}
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
                                "userCountryCode": this.state.countryCode
                            })
                        }}>
                    <Text style={{ textAlign: 'center', marginTop: 20, marginBottom: 10 }}>{this.state.lbl_Didnt_receive_the_code} <Text style={{ fontFamily: OpenSansSemiBold, textDecorationLine: 'underline' }}>{this.state.lbl_Resend}</Text></Text>
                        </TouchableOpacity>
                    
                    <Button name={this.state.lbl_Continue} onPress={() => { this.validate() }} />
                    <Text style={{ textAlign: 'center', margin: 10, color: colors.lightgrey1, marginBottom: 20 }}>{this.state.lbl_OTP_Code_is_valid}</Text>
                </Modalize>

                <TnCPPAcceptModal modal={this.tncModal} navigation={this.props.navigation} action={() => {
                    global.isGuestLogin = true
                    this.props.navigation.navigate("home")
                }} />

            </SafeAreaView>
            </Fragment>
        )
    }

}



function mapStateToProps(state) {
    return {
        RegisterUserInfo: state.RegisterUser,
        RegisterUserSuccess: state.RegisterUser.success,

        OTP_VerificationRegisterInfo: state.OTP_VerificationRegister,
        OTP_VerificationRegisterSuccess: state.OTP_VerificationRegister.success,

        ResendOtpInfo: state.ResendOtp,
        ResendOtpSuccess: state.ResendOtp.success,

    };
}


export default compose(connect(mapStateToProps, {
    ...LoginActions
}))(Signup);


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