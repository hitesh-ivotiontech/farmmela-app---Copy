import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground, Dimensions,Platform, Text, FlatList, BackHandler,TouchableOpacity, TextInput, } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import Header from '../ReuseableComponent.js/Header';
import SearchAndFilter from '../ReuseableComponent.js/SearchAndFilter';
import { CommonActions } from '../src/actions';
import { BaseUrlImages } from '../src/api/ServerConfig';
import { isServerSuccess, searchFilter } from '../src/validations';
const { width, height } = Dimensions.get('window')
import { translateText } from '../src/LanguageTranslation';
import LinearGradient from 'react-native-linear-gradient'

class GeneralKnowledge extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: [],
            filterCategory: [],
            color: '',
            arrMain:[]
        }
        console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        const { categoryID, color } = this.props.route.params
        this.setState({ color })
        var body = {
            "loginuserID": global.userID,
            "languageID": global.languageID,
            "searchWord": "",
            "categoryID": categoryID,
            "page": 0,
            "pagesize": 50,
            "apiType": "Android",
            "apiVersion": "2.0"
        }
        this.props.GetAskQuestionSubCategory(body)
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
        if (nextProps.GetAskQuestionSubCategorySuccess) {
           
            var data = nextProps.GetAskQuestionSubCategoryInfo.details
            isServerSuccess(data, this.props, async (response) => {
                if (response.status == "true") {
                    // this.setState({ category: response.data, filterCategory: response.data })
                    var arrData = response.data
                    var arrTemp = []
                    this.setState({ arrMain: arrData })
                    for(var i=0;i<arrData.length;i++){
                       
                       
                        global.isLanguageOtherThanEnglish ?
                        
                        
                        await translateText([arrData[i].subcatName,Number(arrData[i].subcatDisplayOrder),Number(arrData[i].subcatID),arrData[i].categoryID], (result) => {
                            // console.log("Response translateText",result )
                            
                            var dict = {}
                            dict["subcatName"]= result[0].translatedText
                            dict["subcatDisplayOrder"]= String(result[1].translatedText).replace(' ','')
                            dict["subcatID"]= result[2].translatedText
                            dict["categoryID"]= result[3].translatedText
                            arrTemp.push(dict)

                            
                                
                            var sortedData = arrTemp.sort((a, b) => a.subcatDisplayOrder - b.subcatDisplayOrder)
                            this.setState({category:sortedData,filterCategory: sortedData })
                           
                        }, (err) => {
                            SimpleToast.show('Something went wrong with translation')
                            
                        })
                        : this.setState({ category: response.data, filterCategory: response.data })
                        
                    }
                    
                    
                    setTimeout(() => {
                        // console.log("Response sortecategorydData", this.state.category)
                        
                        
                    }, 300);
                   
                    // console.log("Response", response.data)
                }
            })
        }
    }


    searchFromList(text) {
        this.setState({ filterCategory: searchFilter(text, this.state.category) })
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
                <Header props={this.props} name={global.languageData.General_Knowledge} showHome={true} />
                <View style={{ padding: 10 }}>
                    <SearchAndFilter name="Search" onChangeText={(text) => { this.searchFromList(text) }} hideFilter={true} />
                    <FlatList
                        data={this.state.filterCategory}
                        numColumns={3}
                        keyExtractor={item => item.subcatID}
                        renderItem={({ item,index }) => (
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('generalknowledgedetails', { item:this.state.arrMain[index], category: this.state.category }) }}
                                style={{ backgroundColor: this.state.color, borderRadius: 10, width: '31.5%', height: (height - 60) / 1.87 / 4 - 8.5, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                                <Image source={{ uri: BaseUrlImages + 'subcategory/' + this.state.arrMain[index].subcatImage }} style={{ width: '100%', height: '60%', resizeMode: 'contain' }} />
                                <Text style={{ textAlign: 'center' }}>{item.subcatName}</Text>
                            </TouchableOpacity>
                        )}
                        columnWrapperStyle={{ marginBottom: 10, }}
                        contentContainerStyle={{ paddingTop: 10 }}
                    />

                </View>
            </SafeAreaView>
            </Fragment>
        )
    }

}



function mapStateToProps(state) {
    return {
        GetAskQuestionSubCategoryInfo: state.GetAskQuestionSubCategory,
        GetAskQuestionSubCategorySuccess: state.GetAskQuestionSubCategory.success,

    };
}


export default compose(connect(mapStateToProps, {
    ...CommonActions
}))(GeneralKnowledge);