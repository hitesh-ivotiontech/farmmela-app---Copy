import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground, Dimensions, Text,Linking,Platform, FlatList,BackHandler, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import Header from '../ReuseableComponent.js/Header';
import { HomeActions } from '../src/actions';
import HTML from 'react-native-render-html';
import { isServerSuccess, OpenSansSemiBold } from '../src/validations';
import { BaseUrlImages } from '../src/api/ServerConfig';
import FilterByCategoryModal from '../ReuseableComponent.js/FilterByCategoryModal';
import { translateText } from '../src/LanguageTranslation';
const { width, height } = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient'

class GeneralKnowledgeDetails extends React.Component {
    modal = React.createRef();


    constructor(props) {
        super(props);
        this.state = {
            item: {},
            data: {},
            category: [],
            showLoading: global.isLanguageOtherThanEnglish,
            overview: "Overview",
            knowledgeInformation: '',
            headerTitle:'',
        }
        console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }

    componentWillMount() {
        const { item, category } = this.props.route.params
        
        this.setState({ item, category })
        var body = {
            "userID": global.userID,
            "languageID": global.languageID,
            "apiType": "Android",
            "knowledgeID": "0",
            "page": 0,
            "pagesize": 10,
            "apiVersion": "2.0",
            "categoryID": item.categoryID,
            "subcatID": item.subcatID.replace(' ','')
        }
        console.log('body of general knowledge',body)
        this.props.GeneralKnowledge(body)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        console.log('back click')
        this.props.navigation.navigate('generalknowledge')
        return true;
    }



    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.GeneralKnowledgeSuccess) {
            var data = nextProps.GeneralKnowledgeInfo.details
            isServerSuccess(data, this.props, async (response) => {
                if (response.status == "true") {
                    console.log('GeneralKnowledgeSuccess text',response)
                    const regex = /(<([^>&nbsp;]+)>)/ig;
                    // console.log('response of general lang16',response.data[0].knowledgeInformation.replace(new RegExp('&nbsp|&rsquo', 'g'), '')

                    global.isLanguageOtherThanEnglish ?
                        await translateText([this.state.overview, response.data[0].knowledgeInformation.replace(new RegExp('&nbsp|&rsquo', 'g'), ''),this.state.item.subcatName], (result) => {
                            console.log('translated text',result)
                            this.setState({
                                overview: result[0].translatedText,
                                knowledgeInformation: result[1].translatedText,
                                headerTitle:result[2].translatedText,
                                showLoading: false
                            })
                        }, (err) => {
                            SimpleToast.show('Something went wrong with translation')
                            this.setState({
                                knowledgeInformation: response.data[0].knowledgeInformation,
                                headerTitle:this.state.item.subcatName,
                                showLoading: false
                            })
                        })
                        : this.setState({
                            knowledgeInformation: response.data[0].knowledgeInformation,
                            headerTitle:this.state.item.subcatName,
                            showLoading: false
                        })
                    this.setState({ data: response.data[0] })
                }
            })
        }
    }

    reset=()=>{
        console.log('called reset')
        
        var body = {
            "userID": global.userID,
            "languageID": global.languageID,
            "apiType": "Android",
            "knowledgeID": "0",
            "page": 0,
            "pagesize": 10,
            "apiVersion": "2.0",
            "categoryID": this.state.category[0].categoryID,
            "subcatID": this.state.category[0].subcatID.replace(' ','')
        }
        console.log('body of general knowledge',body)
        this.props.GeneralKnowledge(body)
        this.setState({item:this.state.category[0]})
        this.modal.current.close()
    }



    render() {
        const data = this.state.data
        return (
            <Fragment>
                {Platform.OS=='ios'?<LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
            style={{height:global.notchHeight}}/>:null}
            <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.75)" }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <Header props={this.props} name={this.state.headerTitle} showHome={true} showRefresh={true} rightAction={() => this.modal.current.open()} />
                {this.state.showLoading ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <ActivityIndicator color={colors.green} size="large" />
                    </View> :
                    <ScrollView style={{ margin: 10, }} showsVerticalScrollIndicator={false}>
                        <Image source={{ uri: BaseUrlImages + 'generalknowledge/' + data.knowledgeImages }} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
                        <Text style={{ fontFamily: OpenSansSemiBold, }}>{this.state.overview}</Text>
                        <HTML source={{ html: this.state.knowledgeInformation }} contentWidth={width} renderersProps={{
                                            a: {
                                            onPress(event, url, htmlAttribs, target) {
                                                // Do stuff
                                                Linking.openURL(url)
                                            }
                                            }
                                        }}/>
                        {/* <Text style={{ fontFamily: OpenSansSemiBold, }}>{this.state.knowledgeInformation}</Text> */}
                    </ScrollView>}
                <FilterByCategoryModal modal={this.modal} category={this.state.category} fromGeneral={true} resetAction={this.reset}
                    selectedCategory={(item) => {
                        this.props.navigation.replace('generalknowledgedetails', { item, category: this.state.category })
                            , this.modal.current.close()
                    }}
                />
            </SafeAreaView>
            </Fragment>
        )
    }

}



function mapStateToProps(state) {
    return {
        GeneralKnowledgeInfo: state.GeneralKnowledge,
        GeneralKnowledgeSuccess: state.GeneralKnowledge.success,

    };
}


export default compose(connect(mapStateToProps, {
    ...HomeActions
}))(GeneralKnowledgeDetails);