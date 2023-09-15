import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView,Button, Text, TextInput, Platform,TouchableOpacity, Picker, BackHandler,Dimensions, AsyncStorage, StyleSheet, ActivityIndicator, Keyboard, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import Header from '../ReuseableComponent.js/Header';
import { OpenSansSemiBold } from '../src/validations';
import { translateText } from '../src/LanguageTranslation';
import SimpleToast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient'


const { width, height } = Dimensions.get('window')
class GetHelp extends React.Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            mobile: '8989895656',
            whatsapp: '8989895040',
            email: 'contact@farmmela.in',
            lbl_Were_here_to_help_you:global.languageData.Were_here_to_help_you,
            lbl_Give_us_a_call:global.languageData.Give_us_a_call,
            lbl_Send_us_a_message:global.languageData.Send_us_a_message,
            lbl_Send_us_an_email:global.languageData.Send_us_an_email,
            lblContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae",
            lbl_Title:global.languageData.Title,
            lbl_Enter_Title:global.languageData.Enter_Title,
            lbl_Description:global.languageData.Description,
            lbl_Write_from_here:global.languageData.Write_from_here,
            lbl_Submit:global.languageData.Review,
            title:'',
            question:'',
            lbl_Please_enter_title:global.languageData.Please_enter_title,
            lbl_Please_enter_description:global.languageData.Please_enter_description,
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }

    componentDidMount=async()=>{
        global.isLanguageOtherThanEnglish ?
        await translateText([this.state.lblContent] , (result) => {
            this.setState({lblContent:result[0].translatedText})
            console.log('tarnslated',result)
        }, (err) => {
            
        }):null
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        console.log('back click')
        this.props.navigation.navigate('myaccount')
        return true;
    }

    btnSubmitAction(){
        if(this.state.title.length == 0){
            SimpleToast.show(this.state.lbl_Enter_Title)
        }else if(this.state.question.length == 0){
            SimpleToast.show(this.state.lbl_Please_enter_description)
        }else{
            Linking.openURL('mailto:' + this.state.email+'?subject='+this.state.title+'&body='+this.state.question)
        }
        
    }

    render() {

        return (
            <Fragment>
                {Platform.OS=='ios'?<LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
            style={{height:global.notchHeight}}/>:null}

            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <Header name={global.languageData.Get_Help} props={this.props} showHome={true}/>
                <ScrollView style={{ padding: 10,flex:1}} keyboardShouldPersistTaps='handled'>
                    <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16 }}>{this.state.lbl_Were_here_to_help_you}</Text>
                    {/* <Text style={{ marginTop: 10 }}>{this.state.lblContent}</Text> */}

                    {/* <TouchableOpacity onPress={() => { Linking.openURL(`tel:${this.state.mobile}`) }}
                        style={{ flexDirection: 'row', width: '95%', marginTop: 50 }}>
                        <Image source={require('../assets/contact_call.png')} style={{ width: 50, height: 50, resizeMode: 'contain', marginRight: 15 }} />
                        <View style={{ width: '75%' }}>
                            <Text style={{ fontFamily: OpenSansSemiBold }}>{this.state.lbl_Give_us_a_call}</Text>
                            <Text style={{ color: colors.blue, paddingTop: 2, lineHeight: 18 }}>+91 {this.state.mobile}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { Linking.openURL(`whatsapp://send?phone=${this.state.whatsapp}`); }}
                        style={{ flexDirection: 'row', width: '95%', marginTop: 25 }}>
                        <Image source={require('../assets/contact_message.png')} style={{ width: 50, height: 50, resizeMode: 'contain', marginRight: 15 }} />
                        <View style={{ width: '75%' }}>
                            <Text style={{ fontFamily: OpenSansSemiBold }}>{this.state.lbl_Send_us_a_message}</Text>
                            <Text style={{ color: colors.blue, paddingTop: 2, lineHeight: 18 }}>+91 {this.state.whatsapp}</Text>
                        </View>
                    </TouchableOpacity> */}

                    <TouchableOpacity onPress={() => { Linking.openURL('mailto:' + this.state.email) }}
                        style={{ flexDirection: 'row', width: '95%', marginTop: 25 }}>
                        <Image source={require('../assets/contact_mail.png')} style={{ width: 50, height: 50, resizeMode: 'contain', marginRight: 15 }} />
                        <View style={{ width: '75%' }}>
                            <Text style={{ fontFamily: OpenSansSemiBold }}>{this.state.lbl_Send_us_an_email}</Text>
                            <Text style={{ color: colors.blue, paddingTop: 2, lineHeight: 18 }}>{this.state.email}</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <ScrollView style={{ paddingHorizontal: 10 }} keyboardShouldPersistTaps="handled" > */}
                <Text style={{ marginTop: 25 }}>{this.state.lbl_Title}</Text>
                    <TextInput
                        placeholder={this.state.lbl_Enter_Title}
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}

                        style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, }}
                    />


                    <Text style={{ marginTop: 10 }}>{this.state.lbl_Description}</Text>
                    <TextInput
                        placeholder={this.state.lbl_Write_from_here}
                        value={this.state.question}
                        onChangeText={(question) => this.setState({ question })}
                        multiline={true}
                        style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 100, textAlignVertical: 'top' }}
                    />
                        
                    {/* </ScrollView> */}
                </ScrollView>
                

                        <TouchableOpacity onPress={() => {this.btnSubmitAction()  }}
                            style={{ width: '80%', alignSelf: 'center', padding: 12,height:45,borderRadius: 10, backgroundColor: colors.green, fontSize: 16, color: colors.green,  marginBottom: 25, textAlign: 'center' }}>
                            <Text style={{ fontSize: 16, color: colors.white, textAlign: 'center' }}>{this.state.lbl_Submit}</Text>
                        </TouchableOpacity>
            </SafeAreaView >
            </Fragment>
        )
    }

}


function mapStateToProps(state) {
    return {
        state,



    };
}

export default compose(connect(mapStateToProps, {

}))(GetHelp);
