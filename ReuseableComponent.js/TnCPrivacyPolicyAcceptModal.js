import React, { Component } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { Modalize } from 'react-native-modalize';
import { OpenSansSemiBold } from '../src/validations';
import Button from './Button';
const { width, height } = Dimensions.get('window')
import { translateText } from '../src/LanguageTranslation';

class TnCPPAcceptModal extends Component {

    // Please accept

    constructor(props) {
        super(props);
        this.state = {
           lblPleaseAccept:'Please accept',
           lblByClicking:"By clicking Continue you Agree to our",
           lblTerms:"Terms & Conditions",
           lblAnd:'and',
           lblPrivacy:'Privacy Policy',
           lblContinue:'Continue'
        }
        console.disableYellowBox = true;
    }

    componentDidMount=async()=>{
        
        global.isLanguageOtherThanEnglish ?
        await translateText(['Please accept',"By clicking Continue you Agree to our",
        'Terms & Conditions','and','Privacy Policy','Continue'] , (result) => {
            
           this.setState({lblPleaseAccept:result[0].translatedText,lblByClicking:result[1].translatedText,
            lblTerms:result[2].translatedText,lblAnd:result[3].translatedText,lblPrivacy:result[4].translatedText,
        lblContinue:result[5].translatedText})
        }, (err) => {
            
        }):null
         
    }

    render() {
        return (
            <Modalize ref={this.props.modal} handlePosition="inside"
                adjustToContentHeight={true}
                useNativeDriver={true} closeOnOverlayTap={true}
                modalStyle={{ padding: 10, }}>
                <View style={{ margin: 10, justifyContent: 'space-between', height: height / 4,bottom:15}}>
                    <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16, textAlign: 'center', margin: 10 }}>{this.state.lblPleaseAccept}</Text>
                    <Text style={{ fontSize: 12.5 }}>{this.state.lblByClicking} <Text onPress={() => this.props.navigation.navigate('cmspages', { name: 'terms', title: 'Terms & Conditions' })} style={{ textDecorationLine: 'underline' }}>{this.state.lblTerms}</Text> {this.state.lblAnd} <Text onPress={() => this.props.navigation.navigate('cmspages', { name: 'privacy', title: "Privacy Policy" })} style={{ textDecorationLine: 'underline' }}>{this.state.lblPrivacy}</Text></Text>
                    <Button name={this.state.lblContinue} onPress={this.props.action} />
                </View>
            </Modalize>
        )
    }
}

export default TnCPPAcceptModal;