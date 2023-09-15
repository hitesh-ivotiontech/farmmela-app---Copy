import React,{Fragment} from 'react';
import { Linking } from 'react-native';
import { View, StatusBar, Image, SafeAreaView, ImageBackground,Platform, Dimensions, Text, FlatList, BackHandler,TouchableOpacity, TextInput, } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import ActivityListView from '../ReuseableComponent.js/ActivityListView';
import Header from '../ReuseableComponent.js/Header';
import SearchAndFilter from '../ReuseableComponent.js/SearchAndFilter';
import { HomeActions } from '../src/actions';
import HTML from 'react-native-render-html';
import { isEmpty, isServerSuccess, OpenSansSemiBold, } from '../src/validations';
import { BaseUrlImages } from '../src/api/ServerConfig';
import LinearGradient from 'react-native-linear-gradient'

const { width, height } = Dimensions.get('window')
import { translateText } from '../src/LanguageTranslation';

class ImportantDetails extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isFromWorkshop: false,
            arrWorkshop:[]

        }
        console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        const { categoryID, item } = this.props.route.params
        if (item.name == global.languageData.Workshops) {
            this.setState({ isFromWorkshop: true })
            var body = {
                "userID": global.userID,
                "languageID": global.languageID,
                "apiType": "Android",
                "workshopID": "0",
                "page": 0,
                "pagesize": 10,
                "apiVersion": "2.0",
                "categoryID": categoryID,
                "subcatID": ""
            }
            this.props.Workshops(body)
        } else {
            var body = {
                "userID": global.userID,
                "languageID": global.languageID,
                "apiType": "Android",
                "linkID": "0",
                "page": 0,
                "pagesize": 20,
                "apiVersion": "2.0",
                "categoryID": categoryID,
                "subcatID": ""
            }
            this.props.ImportantLink(body)

        }
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }


    handleBackButtonClick = () => {
        this.props.navigation.navigate('categorydetails')
        return true;
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ImportantLinkSuccess) {
            var data = nextProps.ImportantLinkInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    this.setState({ data: response.data })
                    console.log('response of links',response.data)
                }
            })
        }

        if (nextProps.WorkshopsSuccess) {
            var data = nextProps.WorkshopsInfo.details
            isServerSuccess(data, this.props, async(response) => {
                if (response.status == "true") {
                    var data = response.data[0]
                    this.setState({arrWorkshop:response.data})
                    var arrTemp = []
                    global.isLanguageOtherThanEnglish ?
                    
                    await translateText([data.workshopTitle,data.workshopLinks,data.workshopInformations], (result) => {
                        
                        var dict = {}
                        dict['workshopTitle'] = result[0].translatedText
                        dict['workshopLinks'] = result[1].translatedText
                        dict['workshopInformations'] = result[2].translatedText
                        arrTemp.push(dict)
                        this.setState({ data: arrTemp })
                    }, (err) => {
                        this.setState({ data: response.data })
                    })
                    : this.setState({ data: response.data })
                }                
            })
        }
    }


    render() {

        return (
            <Fragment>
                {Platform.OS=='ios'?<LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
            style={{height:global.notchHeight}}/>:null}
            <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.75)" }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <Header props={this.props} name={this.state.isFromWorkshop ? global.languageData.Workshops : global.languageData.Important_Links} showHome={true} />
                {this.state.isFromWorkshop ?
                    <View style={{ margin: 10 }}>
                        <SearchAndFilter onChangeText={() => { }} />
                    </View> : null}
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.linkID}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        this.state.isFromWorkshop ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.white, elevation: 2, borderRadius: 5, marginBottom: 10, padding: 10 }}>
                                <View style={{ width: '20%', }}>
                                    <Image source={{ uri: BaseUrlImages+'workshop/'+this.state.arrWorkshop[0].workshopImages }}
                                        style={{ width: width * 0.18, height: width * 0.18, borderRadius: 10 }} />
                                </View>
                                <View style={{ width: '76%' }}>
                                    <Text numberOfLines={2} style={{ fontFamily: OpenSansSemiBold }}>{item.workshopTitle}</Text>
                                    <View>
                                        <TouchableOpacity onPress={() => { Linking.openURL(item.workshopLinks) }}>
                                            <Text style={{ color: colors.green, fontSize: 13, textDecorationLine: 'underline', marginVertical: 5 }}>{item.workshopLinks}</Text>
                                        </TouchableOpacity>
                                        <HTML source={{ html: item.workshopInformations }} contentWidth={width} />
                                    </View>
                                </View>

                            </View> :
                            <ActivityListView icon={require('../assets/link_list_circular.png')} item={item} props={this.props} setLinkInfo={item.linkUrl} impLinkView={true} width={'89%'} />
                    )}
                    style={{ margin: 10 }}
                />
            </SafeAreaView>
            </Fragment>
        )
    }

}



function mapStateToProps(state) {
    return {
        ImportantLinkInfo: state.ImportantLink,
        ImportantLinkSuccess: state.ImportantLink.success,

        WorkshopsInfo: state.Workshops,
        WorkshopsSuccess: state.Workshops.success,
    };
}


export default compose(connect(mapStateToProps, {
    ...HomeActions
}))(ImportantDetails);