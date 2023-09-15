import AsyncStorage from '@react-native-community/async-storage';
import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground, Dimensions, Text, FlatList, TouchableOpacity,BackHandler} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import Button from '../ReuseableComponent.js/Button';
import Header from '../ReuseableComponent.js/Header';
import { CommonActions } from '../src/actions';
import { isServerSuccess, OpenSansSemiBold, setLanguageInAsync } from '../src/validations';
const { width, height } = Dimensions.get('window')
import { translateText } from '../src/LanguageTranslation';

class SelectLanguage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            languages: [],
            selectedLanguage: global.language || {
                "languageID": "1",
                "languageName": "English"
            },
            from: '',
            lblUpdate:'Update'
        }
        // console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount=async()=>{
        global.isLanguageOtherThanEnglish ?
        await translateText('Update', (result) => {
            this.setState({lblUpdate:result[0].translatedText})
        }, (err) => {
            
        }):null
    }

    componentWillMount() {
        var body = {
            "languageID": "1",
            "apiType": "Android",
            "apiVersion": "2.0",
            "page": 0,
            "pagesize": 10
        }
        this.props.AllLanguages(body)
        var from = this.props.route.params.from
        this.setState({ from })
        console.log('from is',from)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        console.log('back click')
        if(this.state.from == 'intro'){
            this.props.navigation.navigate('intro')
        }else{
            this.props.navigation.push('accountsetting')
        }
       
        return true;
    }



    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.AllLanguagesSuccess) {
            var data = nextProps.AllLanguagesInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    
                    var data = response.data
                    console.log('lang response',data)
                    this.setState({ languages: data })

                }
            })
        }
    }

    setLanguageView() {
        return (
            <FlatList
                data={this.state.languages}
                showsVerticalScrollIndicator={true}
                keyExtractor={(item) => item.languageID}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 }}
                        onPress={() => { this.setState({ selectedLanguage: item }) }}  >
                        <Text style={[{ fontSize: 16 }, this.state.selectedLanguage.languageName == item.languageName ? { fontFamily: OpenSansSemiBold, color: colors.green } : null]}>{item.languageName}</Text>
                        {this.state.selectedLanguage.languageName == item.languageName ? <Image source={require('../assets/tick_green.png')} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 10 }} />
                            : null}
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 1, backgroundColor: colors.green }} />
                )}
                style={{ height: height / 3.5, marginBottom: 15 }}
            />
        )
    }

    render() {

        return (
            <Fragment>
            <SafeAreaView style={{backgroundColor:'rgb(180,231,206)'}}/>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(255,251,186)' }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                {this.state.from == 'intro' ? 
                <ImageBackground source={require('../assets/onboarding_bg_with_logo.png')}
                    style={{ width: '100%', height: '100%', }}  >
                    <Ionicons name="chevron-back-outline" size={35} style={{ marginTop: 20 }} onPress={()=>this.props.navigation.navigate('intro')}/>
                    <View style={{ padding: 10, marginTop: height / 3 }}>
                        <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 18, marginBottom: 20 }}>Please Select your App Language</Text>
                        {this.setLanguageView()}
                        <Button name="Continue" onPress={() => {
                            setLanguageInAsync(this.state.selectedLanguage, () => {
                                this.props.navigation.navigate('location', { from: 'language' })
                            })
                        }} />
                    </View>
                </ImageBackground>
                    :
                    <View style={{ flex: 1 }}>
                        <Header props={this.props} name={global.languageData.Change_Language} showHome={true}/>
                        <View style={{ padding: 10, justifyContent: 'space-between', flex: 1, marginBottom: 20 }}>
                            {this.setLanguageView()}
                            <Button name={this.state.lblUpdate} onPress={() => {
                                setLanguageInAsync(this.state.selectedLanguage, () => {
                                    this.props.navigation.push('accountsetting')
                                    this.props.navigation.navigate('myaccount')
                                    this.props.navigation.push('home')
                                })
                            }} />
                        </View>
                    </View>
                }

            </SafeAreaView>
            </Fragment>
        )
    }

}



function mapStateToProps(state) {
    return {
        AllLanguagesInfo: state.AllLanguages,
        AllLanguagesSuccess: state.AllLanguages.success

    };
}


export default compose(connect(mapStateToProps, {
    ...CommonActions
}))(SelectLanguage);