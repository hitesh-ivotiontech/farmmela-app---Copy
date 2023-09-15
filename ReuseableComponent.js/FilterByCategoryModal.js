import React, { Component, } from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { Modalize } from 'react-native-modalize';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors'
import { CommonActions, ForumActions } from '../src/actions';
import { isServerSuccess, OpenSansSemiBold } from '../src/validations';
const { width, height } = Dimensions.get('window')
import { translateText } from '../src/LanguageTranslation';

class FilterByCategoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: "",

        }
    }


    componentWillMount() {
        var body = {
            "loginuserID": global.user ? global.userID:'0',
            "languageID": global.languageID,
            "searchWord": "",
            "apiType": "Android",
            "apiVersion": "2.0"
        }
        this.props.GetAskQuestionCategory(body)
    }

    componentWillReceiveProps(){
        if(global.isResetForum == true){
         console.log('componentWillReceiveProps called isResetForum')
         this.setState({selectedCategory:''})
        }        
     }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.GetAskQuestionCategorySuccess) {
            var data = nextProps.GetAskQuestionCategoryInfo.details
            isServerSuccess(data, this.props, async (response) => {
                if (response.status == "true") {
                    var arrData = response.data
                    var arrTemp = []
                    
                      for(var i=0;i<arrData.length;i++){
                       
                        

                        if(global.isLanguageOtherThanEnglish){
                            await translateText([arrData[i].categoryID.replace(' ',''),arrData[i].categoryName,arrData[i].categoryArabicName,arrData[i].categoryImage,arrData[i].categoryStatus,
                                arrData[i].categoryCreatedDate,arrData[i].categoryDisplayOrder.replace(' ','')], (result) => {
                               
                                var dict = {}
                              dict["categoryID"] = result[0].translatedText.replace(' ','')
                              dict["categoryName"] = result[1].translatedText
                              dict["categoryArabicName"] = result[2].translatedText
                              dict["categoryImage"] = result[3].translatedText
                              dict["categoryStatus"] = result[4].translatedText
                              dict["categoryCreatedDate"] = result[5].translatedText
                              dict["categoryDisplayOrder"] = result[6].translatedText
                               if(result[0].translatedText == '10'){
      
                               }else{
                                  arrTemp.push(dict)
                               }
                               var sortedData = arrTemp.sort((a, b) => a.categoryDisplayOrder - b.categoryDisplayOrder)
                                this.setState({categories:sortedData })
                               
                            }, (err) => {
                                SimpleToast.show('Something went wrong with translation')
                                
                            })
                        }else{
                            var dict = {}
                            dict["categoryID"] = arrData[i].categoryID
                            dict["categoryName"] = arrData[i].categoryName
                            dict["categoryArabicName"] = arrData[i].categoryArabicName
                            dict["categoryImage"] = arrData[i].categoryImage
                            dict["categoryStatus"] = arrData[i].categoryStatus
                            dict["categoryCreatedDate"] = arrData[i].categoryCreatedDate
                            dict["categoryDisplayOrder"] = arrData[i].categoryDisplayOrder
                             if(arrData[i].categoryName == 'Narishakti'){
    
                             }else{
                                arrTemp.push(dict)
                             }
                            this.setState({ categories: arrTemp})

                        }
                        
                       
                      }
                    
                }
            })
        }
    }

    


    render() {
        return (
            <Modalize ref={this.props.modal} handlePosition="inside"
                adjustToContentHeight={true}
                useNativeDriver={true} closeOnOverlayTap={true}
                modalStyle={{ padding: 10, }}>
                <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16, textAlign: 'center', margin: 10 }}>{global.languageData.Filter_by_Categories}</Text>
                <TouchableOpacity style={{borderRadius:5,flexDirection:'row',alignSelf:'flex-end',padding:5,
                backgroundColor:colors.green}} onPress={this.props.resetAction} onFocus={()=>console.log('focus called')}>
                    <Text style={{fontSize:14,color:'white'}}>{global.languageData.Reset}</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.props.category || this.state.categories}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 }}
                            onPress={() => { this.state.selectedCategory == item ? (this.setState({ selectedCategory: "" }), this.props.selectedCategory({ categoryName: "" })) : (this.setState({ selectedCategory: item }),global.isResetForum=false, this.props.selectedCategory(item)) }}
                        >
                            <Text style={[{ fontSize: 16 }, this.state.selectedCategory == item ? { fontFamily: OpenSansSemiBold, color: colors.green } : null]}>{this.props.fromGeneral ? item.subcatName : item.categoryName}</Text>
                            {this.state.selectedCategory == item ? <Image source={require('../assets/tick_green.png')} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 10 }} />
                                : null}
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 1.2, backgroundColor: colors.lightgrey }} />
                    )}
                    style={{ height: height / 2.3, marginBottom: 15 }}
                />

            </Modalize>

        )
    }

}



function mapStateToProps(state) {
    return {
        GetAskQuestionCategoryInfo: state.GetAskQuestionCategory,
        GetAskQuestionCategorySuccess: state.GetAskQuestionCategory.success,

    };
}


export default compose(connect(mapStateToProps, {
    ...CommonActions,
}))(FilterByCategoryModal);