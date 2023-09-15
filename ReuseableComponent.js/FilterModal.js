import React, { Component, useState } from 'react'
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Modalize } from 'react-native-modalize';
import { colors } from '../colors'
import { OpenSansSemiBold } from '../src/validations';
import SimpleToast from 'react-native-simple-toast';
import { translateText } from '../src/LanguageTranslation';


const { width, height } = Dimensions.get('window')

export default class FilterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterOptions:[],
            selectedFilter: "Cash Crops",
            from: props.from,
            arrSubCategory:[],
            arrSubSubCategory:[],
            selSubCategory:'',
            selectedSubSubCat:'',
            lblSearch:'Search',
            selectedCatID:'0',
            selectedSubCatID:'0',
            selectedSubSubCatID:'0',

        }
    }

    componentDidMount=async()=> {
        console.log('componentDidMount',this.props.from)
        this.getCategoryList()
        if(global.isLanguageOtherThanEnglish){
            await translateText([this.state.lblSearch], (result) => {
                this.setState({lblSearch:result[0].translatedText})
            }, (err) => {
                // SimpleToast.show('Something went wrong with translation')
            })
        }

        // if (this.props.from == 'rent') {
        //     var filterOptions = this.state.filterOptions

        //     // Cash Crops
        //     filterOptions[0].options.splice(2, 5,
        //         { name: "Tools / Equipment", show: false, options: ["Spray Equipment", "Irrigation Equipment", "Other"], selectedOption: '' },
        //         { name: "Transportation", show: false, options: [], selectedOption: '' },
        //         { name: "Other", show: false, options: [], selectedOption: '' },
        //     )

        //     // Fruits
        //     filterOptions[1].options.splice(2, 5,
        //         { name: "Tools / Equipment", show: false, options: ["Spray Equipment", "Irrigation Equipment", "Other"], selectedOption: '' },
        //         { name: "Transportation", show: false, options: [], selectedOption: '' },
        //         { name: "Other", show: false, options: [], selectedOption: '' },
        //     )

        //     // Vegetables
        //     filterOptions[2].options.splice(2, 5,
        //         { name: "Tools / Equipment", show: false, options: ["Spray Equipment", "Irrigation Equipment", "Other"], selectedOption: '' },
        //         { name: "Transportation", show: false, options: [], selectedOption: '' },
        //         { name: "Other", show: false, options: [], selectedOption: '' },
        //     )

        //     // Spices
        //     filterOptions[3].options.splice(2, 5,
        //         { name: "Tools / Equipment", show: false, options: ["Spray Equipment", "Irrigation Equipment", "Other"], selectedOption: '' },
        //         { name: "Transportation", show: false, options: [], selectedOption: '' },
        //         { name: "Other", show: false, options: [], selectedOption: '' },
        //     )

        //     // Flowers
        //     filterOptions[4].options.splice(2, 5,
        //         { name: "Tools / Equipment", show: false, options: ["Spray Equipment", "Irrigation Equipment", "Other"], selectedOption: '' },
        //         { name: "Transportation", show: false, options: [], selectedOption: '' },
        //         { name: "Other", show: false, options: [], selectedOption: '' },
        //     )

        //     // Dairy
        //     filterOptions[5].options.splice(1, 5,
        //         { name: "Tools / Equipment", show: false, options: [], selectedOption: '' },
        //         { name: "Transportation", show: false, options: [], selectedOption: '' },
        //         { name: "Other", show: false, options: [], selectedOption: '' },
        //     )

        //     // Fishery
        //     filterOptions[6].options.splice(0, 5,
        //         { name: "Fishing Equipment", show: false, options: ["Hand Tools", "Fishing Line", "Lures & Flies", "Rods", "Fishing Traps", "Fishing Nets", "Fish Tank", "Aquarium Tools", "Accessories", "Fishing Machine", "Fishing Vessel", "Fishing Trawler"], selectedOption: '' },
        //         { name: "Transportation", show: false, options: [], selectedOption: '' },
        //         { name: "Other", show: false, options: [], selectedOption: '' },
        //     )

        //     // Handicraft
        //     filterOptions[7].options.splice(2, 5,
        //         { name: "Transportation", show: false, options: [], selectedOption: '' },
        //         { name: "Other", show: false, options: [], selectedOption: '' },
        //     )

        //     // Livestock
        //     filterOptions[8].options.splice(2, 5,
        //         { name: "Transportation", show: false, options: [], selectedOption: '' },
        //         { name: "Other", show: false, options: [], selectedOption: '' },
        //     )

        //     this.setState({ filterOptions })
        // }
    }

    componentWillMount(){
        console.log('componentWillMount FilterModal',global.isFromFilterNav)
    }

    // getCategoryList(){
    //     var body = {
    //         "loginuserID": global.userID,
    //         "languageID": global.languageID,
    //         "searchWord": "",
    //         "apiType": "Android",
    //         "apiVersion": "2.0"
    //     }
    //     let config = {
    //         method: "POST",
    //         headers: new Headers({
    //             'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
    //             'auth': global.auth,
    //         })
    //     }
    //     if (body !== "") {
    //         let newBody = JSON.stringify(body)
    //         config = { ...config, body: newBody }
    //     }
    //      fetch(global.Url+'masters/get-category-list', config)
    //         .then(response=> response.json())
    //         .then(async result => {
    //             // console.log("result", result)
    //             var arrData = result[0].data
    //             var arrTemp = []
    //             for(var i=0;i<arrData.length;i++){
    //                 if(global.isLanguageOtherThanEnglish){
    //                     await translateText([arrData[i].postcatID,arrData[i].postcatName,arrData[i].categoryArabicName,arrData[i].categoryImage,arrData[i].categoryStatus,
    //                         arrData[i].categoryCreatedDate,arrData[i].categoryDisplayOrder.replace(' ','')], (result) => {
                           
    //                         var dict = {}
    //                         dict["postcatID"] = result[0].translatedText.replace(' ','')
    //                         dict["postcatName"] = result[1].translatedText
    //                         dict["categoryArabicName"] = result[2].translatedText
    //                         dict["categoryImage"] = result[3].translatedText
    //                         dict["categoryStatus"] = result[4].translatedText
    //                         dict["categoryCreatedDate"] = result[5].translatedText
    //                         dict["categoryDisplayOrder"] = result[6].translatedText.replace(' ','')
                          
    //                         if(result[0].translatedText == '10'){
    //                             console.log('pushed',dict)
    //                            }else{
    //                             //    console.log('pushed',dict)
    //                               arrTemp.push(dict)
    //                            }
    //                         var sortedData = arrTemp.sort((a, b) => a.categoryDisplayOrder - b.categoryDisplayOrder)
    //                         this.setState({filterOptions:sortedData,selectedFilter:sortedData[0].postcatName })
    //                     }, (err) => {
    //                         SimpleToast.show('Something went wrong with translation')
                            
    //                     })
    //                 }else{
    //                     this.setState({filterOptions:arrData,selectedFilter:arrData[0].postcatName})
    //                 }                   
    //               }
    //             this.getPostSubCategory(arrData[0].postcatID,"")
    //         }).catch(err => {
    //             console.log("Error", err)
                
    //         })
    // }

    getCategoryList(){
        var body = {
            "loginuserID": global.user?global.userID:'0',
            "languageID": global.languageID,
            "searchWord":"",
                "postcatType":this.props.from == 'rent'?'Rent':"Buy-Sell",
                "page":0,
                "pagesize":50,
                "apiType": "Android",
                "apiVersion": "2.0"
        }
        let config = {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                'auth': global.auth,
            })
        }
        if (body !== "") {
            let newBody = JSON.stringify(body)
            config = { ...config, body: newBody }
        }
         fetch(global.Url+'masters/get-postcategory-list', config)
            .then(response=> response.json())
            .then(async result => {
                // console.log("result", result)
                var arrData = result[0].data
                var arrTemp = []
                for(var i=0;i<arrData.length;i++){
                    if(global.isLanguageOtherThanEnglish){
                        await translateText([arrData[i].postcatID,arrData[i].postcatName,arrData[i].postcatImage,arrData[i].postcatStatus,
                            arrData[i].postcatCreatedDate,arrData[i].postcatDisplayOrder.replace(' ','')], (result) => {
                           
                            var dict = {}
                            dict["postcatID"] = result[0].translatedText.replace(' ','')
                            dict["postcatName"] = result[1].translatedText
                            dict["postcatImage"] = result[2].translatedText
                            dict["postcatStatus"] = result[3].translatedText
                            dict["postcatCreatedDate"] = result[4].translatedText
                            dict["postcatDisplayOrder"] = result[5].translatedText.replace(' ','')
                          
                            if(result[0].translatedText == '10'){
                                console.log('pushed',dict)
                               }else{
                                //    console.log('pushed',dict)
                                  arrTemp.push(dict)
                               }
                            var sortedData = arrTemp.sort((a, b) => a.postcatDisplayOrder - b.postcatDisplayOrder)
                            this.setState({filterOptions:sortedData,selectedFilter:sortedData[0].postcatName })
                        }, (err) => {
                            SimpleToast.show('Something went wrong with translation')
                            
                        })
                    }else{
                        this.setState({filterOptions:arrData,selectedFilter:arrData[0].postcatName})
                    }                   
                  }
                this.getPostSubCategory(arrData[0].postcatID,"")
            }).catch(err => {
                console.log("Error", err)
                
            })
    }

    getSubCategory(catID,searchText){
            var body = {
                "loginuserID": global.user?global.userID:'0',
                "languageID": global.languageID,
                "searchWord": searchText,
                "categoryID":catID,
                "page":0,
                "pagesize":20,
                "apiType": "Android",
                "apiVersion": "2.0"
            }
           
            let config = {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                    'auth': global.auth,
                })
            }
            if (body !== "") {
                let newBody = JSON.stringify(body)
                config = { ...config, body: newBody }
            }
             fetch(global.Url+'masters/get-subcatgory-list', config)
                .then(response=> response.json())
                .then(result => {
                    // console.log("get-subcatgory-list result", result)
                    var arrData = result[0].data
                   this.setState({arrSubCategory:arrData})
    
                }).catch(err => {
                    console.log("Error", err)
                    
                })
        
    }

    getPostSubCategory(catID,searchText){
        this.setState({arrSubCategory:[]})
        var body = {
            "loginuserID": global.user?global.userID:'0',
            "languageID": global.languageID,
            "searchWord": searchText,
            "categoryID":catID,
            "postsubcatType":global.isFromFilterNav=='buy'?"Buy-Sell":'Rent',
            "page":0,
            "pagesize":20,
            "apiType": "Android",
            "apiVersion": "2.0"
        }
        console.log("get-postsubcategory-list body", body)
        let config = {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                'auth': global.auth,
            })
        }
        if (body !== "") {
            let newBody = JSON.stringify(body)
            config = { ...config, body: newBody }
        }
         fetch(global.Url+'masters/get-postsubcategory-list', config)
            .then(response=> response.json())
            .then(async result => {
                console.log("get-postsubcategory-list result", result)
                if(result[0].status == 'false'){
                    
                }else{

                    var arrData = result[0].data
                    var arrTemp = []
                    for(var i=0;i<arrData.length;i++){
                        if(global.isLanguageOtherThanEnglish){
                            await translateText([arrData[i].categoryID,arrData[i].postsubcatName,arrData[i].postsubcatImage,
                                arrData[i].postsubcatStatus,arrData[i].postsubcatType,
                                arrData[i].postsubcatCreatedDate,arrData[i].postsubcatDisplayOrder.replace(' ',''),arrData[i].postsubcatID], (result) => {
                            
                            var dict = {}
                                
                            dict["categoryID"] = result[0].translatedText
                            dict["postsubcatName"] = result[1].translatedText
                            dict["postsubcatImage"] = result[2].translatedText
                            dict["postsubcatStatus"] = result[3].translatedText
                            dict["postsubcatType"] = result[4].translatedText
                            dict["postsubcatCreatedDate"] = result[5].translatedText
                            dict["postsubcatDisplayOrder"] = String(result[6].translatedText).replace(' ','')
                            dict["postsubcatID"] = result[7].translatedText
                            
                            arrTemp.push(dict)
                            var sortedData = arrTemp.sort((a, b) => a.postsubcatDisplayOrder - b.postsubcatDisplayOrder)
                            var result = sortedData.map(function (el) {
                                var o = Object.assign({}, el);
                                o.options = [];
                                o.selectedSubSubCat = ''
                                o.isOpen = false
                                return o;
                            })
                            this.setState({ arrSubCategory: result })
                            
                            }, (err) => {
                                SimpleToast.show('Something went wrong with translation')
                                var result = arrData.map(function (el) {
                                    var o = Object.assign({}, el);
                                    o.options = [];
                                    o.selectedSubSubCat = ''
                                    o.isOpen = false
                                    return o;
                                })
                                this.setState({ arrSubCategory: result })
                                
                            })
                        }else{
                                var result = arrData.map(function (el) {
                                var o = Object.assign({}, el);
                                o.options = [];
                                o.selectedSubSubCat = ''
                                o.isOpen = false
                                return o;
                            })
                            this.setState({ arrSubCategory: result })
                        }
                    }
                    
            //    this.setState({arrSubCategory:result})
            }

            }).catch(err => {
                console.log("Error", err)
                
            })
    
}

getPostSubSubCategory(index,catID,subCatID,searchText){
    this.state.arrSubCategory[index].options = []
    var result = this.state.arrSubCategory.map(function (el) {
        var o = Object.assign({}, el);
        o.options = [];
        // o.selectedSubSubCat = ''
        return o;
    })
    this.setState({arrSubCategory:result})
    var body = {
        "loginuserID": global.userID,
        "languageID": global.languageID,
        "searchWord": searchText,
        "postcatID":catID,
        "postsubcatID":subCatID.replace(' ',''),
        "page":0,
        "pagesize":20,
        "apiType": "Android",
        "apiVersion": "2.0"
    }
    console.log("get-postsubsubcategory-list body", body)
    let config = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
            'auth': global.auth,
        })
    }
    if (body !== "") {
        let newBody = JSON.stringify(body)
        config = { ...config, body: newBody }
    }
     fetch(global.Url+'masters/get-postsubsubcategory-list', config)
        .then(response=> response.json())
        .then(async result => {
            console.log("get-postsubsubcategory-list result", result)
            if(result[0].status == 'false'){
                // SimpleToast.show('No Record Found')
                // this.props.onPress(catID,subCatID,'0')
                this.setState({selectedCatID:catID,selectedSubCatID:subCatID,selectedSubSubCatID:'0'})
                // this.props.filterModal.current.close()
            }else{
                var arrData = result[0].data
                var arrTemp= []
                for(var i=0;i<arrData.length;i++){
                    if(global.isLanguageOtherThanEnglish){
                        await translateText([arrData[i].postsubsubcatID,arrData[i].postcatID,arrData[i].postsubcatID,
                            arrData[i].postsubsubcatName,arrData[i].postsubsubcatImage,
                            arrData[i].postsubsubcatStatus,arrData[i].postsubsubcatCreatedDate,arrData[i].postsubsubcatDisplayOrder], (result) => {
                        
                        var dict = {}
                            
                        dict["postsubsubcatID"] = result[0].translatedText
                        dict["postcatID"] = result[1].translatedText
                        dict["postsubcatID"] = result[2].translatedText
                        dict["postsubsubcatName"] = result[3].translatedText
                        dict["postsubsubcatImage"] = result[4].translatedText
                        dict["postsubsubcatStatus"] = result[5].translatedText
                        dict["postsubsubcatCreatedDate"] = result[6].translatedText
                        dict["postsubsubcatDisplayOrder"] = result[7].translatedText
                        
                        arrTemp.push(dict)
                        var sortedData = arrTemp.sort((a, b) => a.postsubsubcatDisplayOrder - b.postsubsubcatDisplayOrder)
                        this.state.arrSubCategory[index].options = sortedData
                        this.setState({})
                        }, (err) => {
                            SimpleToast.show('Something went wrong with translation')
                            this.state.arrSubCategory[index].options = arrData
                            
                        })
                    }else{
                    
                        this.state.arrSubCategory[index].options = arrData
                    }
                }
               
                // this.state.arrSubCategory[index].options = arrData
                this.state.arrSubCategory[index].isOpen = true
                this.setState({})
            }
           
        }).catch(err => {
          
            console.log("Error", err)
            
        })

}

    btnCategoryAction(item){
        global.isReset = false
        this.setState({selectedFilter:item.postcatName})
        this.setState({selectedCatID:item.postcatID,selectedSubSubCat:'',selSubCategory:'',selectedSubCatID:'0',selectedSubSubCatID:'0'})
        // if(this.props.from == 'rent'){
        //     this.getSubCategory(item.postcatID,"")
        // }else{
            this.getPostSubCategory(item.postcatID,"")
        // }
        setTimeout(() => {
            console.log(this.state.selectedFilter)
        }, 300);
       

    }

    componentWillReceiveProps(){
       if(global.isReset == true){
        console.log('componentWillReceiveProps called FilterModal')
        this.setState({selectedSubSubCat:'',selSubCategory:'',selectedCatID:'0',selectedSubCatID:'0',selectedSubSubCatID:'0'})
        var result = this.state.arrSubCategory.map(function (el) {
            var o = Object.assign({}, el);
            o.options = [];
            o.selectedSubSubCat = ''
            o.isOpen = false
            return o;
        })
       this.setState({arrSubCategory:result,selSubCategory:'',})
    //    this.getPostSubCategory(this.state.filterOptions[0].postcatID,"")
       }        
    }


    btnSubCategoryAction(item,index){
        console.log('selected sub category called')
        global.isReset = false
        if(item.isOpen){
            this.state.arrSubCategory[index].isOpen = false
            this.setState({})
        }else{
        var from = global.isFromFilterNav
        var filterOptions = this.state.arrSubCategory
       
            this.setState({selSubCategory:item.postsubcatName,selectedSubSubCat:'',selectedSubSubCatID:'0'})
            setTimeout(() => {
                console.log('selected sub category',this.state.selSubCategory,from,filterOptions[index].categoryID,filterOptions[index].postsubcatID)
            }, 400);
            
            // this.props.onPress(filterOptions[index].postcatID,filterOptions[index].postsubcatID)
            this.setState({selectedCatID:filterOptions[index].categoryID,selectedSubCatID:filterOptions[index].postsubcatID,selectedSubSubCatID:'0'})
            // this.props.filterModal.current.close()


            // this.getPostSubSubCategory(index,filterOptions[index].postcatID,filterOptions[index].postsubcatID)
        }
    }

    resetFilter(){

                var result = this.state.arrSubCategory.map(function (el) {
                    var o = Object.assign({}, el);
                    o.options = [];
                    o.selectedSubSubCat = ''
                    o.isOpen = false
                    return o;
                })
                this.setState({arrSubCategory:this.state.arrSubCategory})
    }

    btnSubSubAction(item,index){
        this.state.arrSubCategory[index].selectedSubSubCat = item.item.postsubsubcatName
        
        // this.props.onPress(this.state.arrSubCategory[index].postcatID,this.state.arrSubCategory[index].postsubcatID,item.item.postsubsubcatID)
        // this.props.filterModal.current.close()
        this.setState({selectedCatID:this.state.arrSubCategory[index].postcatID,selectedSubCatID:this.state.arrSubCategory[index].postsubcatID,
            selectedSubSubCatID:item.item.postsubsubcatID})
        this.setState({selectedSubSubCat:item.item.postsubsubcatName})
    }

    btnSearchAction=()=>{
        this.props.onPress(this.state.selectedCatID,this.state.selectedSubCatID,this.state.selectedSubSubCatID)
        this.props.filterModal.current.close()
    }

    setOptionsView() {

        var item = this.state.filterOptions.find((item) => item.name == this.state.selectedFilter)
        var filterIndex = this.state.filterOptions.findIndex((item) => item.name == this.state.selectedFilter)
        var from = global.isFromFilterNav
        return (
            <FlatList
                data={this.state.arrSubCategory}
                renderItem={({ item, index }) => (
                    <View>
                        <TouchableOpacity onPress={() => this.btnSubCategoryAction(item,index)}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* <Text style={[{ paddingVertical: 10, fontSize: 15 },  from =='rent'?this.state.selSubCategory == item.subcatName:this.state.selSubCategory ==item.postsubcatName  ? { fontFamily: OpenSansSemiBold,color: colors.green } : {}]}>{from =='rent'?item.subcatName:item.postsubcatName}</Text> */}
                            {<Text style={[{ paddingVertical: 10, fontSize: 15 },this.state.selSubCategory == item.postsubcatName  ? { fontFamily: OpenSansSemiBold,color: colors.green } : {}]}>{item.postsubcatName}</Text>}
                            
                            {/* <Image source={item.isOpen  ? require('../assets/arrow_up.png') : require('../assets/arrow_down.png')} style={{ width: 12, height: 12, resizeMode: 'contain', marginRight: 15 }} /> */}
                            
                            
                            {/* {from =='rent'?this.state.selSubCategory == item.subcatName:this.state.selSubCategory ==item.postsubcatName ? <Image source={require('../assets/tick_green.png')} style={{ width: 15, height: 15, resizeMode: 'contain', marginRight: 15 }} />
                                            : null} */}

                            {/* {from == 'rent'?this.state.selSubCategory == item.subcatName?<Image source={require('../assets/tick_green.png')} style={{ width: 15, height: 15, resizeMode: 'contain', marginRight: 15 }} />
                                            : null:this.state.selSubCategory ==item.postsubcatName?<Image source={require('../assets/tick_green.png')} style={{ width: 15, height: 15, resizeMode: 'contain', marginRight: 15 }} />
                                            : null} */}
                        </TouchableOpacity>
                        {this.state.arrSubCategory[index].isOpen ?
                            <FlatList
                                data={this.state.arrSubCategory[index].options}
                                renderItem={(data) => (
                                    <TouchableOpacity onPress={() => {this.btnSubSubAction(data,index)
                                                                          
                                    }}
                                        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={[{ marginVertical: 5, fontSize: 15 }, this.state.arrSubCategory[index].selectedSubSubCat == data.item.postsubsubcatName ? { color: colors.green } : {}]}>{data.item.postsubsubcatName}</Text>
                                        {this.state.arrSubCategory[index].selectedSubSubCat == data.item.postsubsubcatName ? <Image source={require('../assets/tick_green.png')} style={{ width: 15, height: 15, resizeMode: 'contain', marginRight: 15 }} />
                                            : null}
                                    </TouchableOpacity>
                                )}
                            />
                          : null} 
                    </ View>
                )}
                ItemSeparatorComponent={() => (<View style={{ height: 1, backgroundColor: colors.lightgrey1 }} />)}
                style={{ marginTop: 10 }}
            />
        )

    }

    setFilterText(){
        if(this.state.selectedSubSubCat != ''){
            return(
                <Text style={{fontSize:15,width:width/2+20}}>{(this.state.selectedFilter)+' -> '+this.state.selSubCategory+' -> '+this.state.selectedSubSubCat}</Text>
            )
        }
        if(this.state.selSubCategory != ''){
            return(
                <Text style={{fontSize:15,width:width/2+20}}>{(this.state.selectedFilter)+' -> '+this.state.selSubCategory}</Text>
            )
        } 
        if(this.state.selSubCategory == '' && this.state.selectedSubSubCat == ''){
            return(
                <Text style={{fontSize:15,width:width/2+20}}>{this.state.selectedFilter}</Text>
            )
        }
       
    }

    render() {
        return (

            <Modalize ref={this.props.filterModal} handlePosition="inside"
                // adjustToContentHeight={true}
                modalHeight={height-40}
                useNativeDriver={true} closeOnOverlayTap={true}
                modalStyle={{ paddingTop: 10, }}>
                <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16, textAlign: 'center', margin: 10 }}>{global.languageData.Filter_Advertisement}</Text>
                <View style={{padding:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    {this.setFilterText()}
                 <View style={{flexDirection:'row',paddingHorizontal:10}}>
                 <TouchableOpacity style={{borderRadius:5,flexDirection:'row',alignSelf:'flex-end',padding:5,
                backgroundColor:colors.green,marginRight:10}} onPress={this.btnSearchAction} onFocus={()=>console.log('focus called')}>
                    <Text style={{fontSize:14,color:'white'}}>{this.state.lblSearch}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius:5,flexDirection:'row',alignSelf:'flex-end',padding:5,
                backgroundColor:colors.green,marginRight:10}} onPress={this.props.resetAction} onFocus={()=>console.log('focus called')}>
                    <Text style={{fontSize:14,color:'white'}}>{global.languageData.Reset}</Text>
                </TouchableOpacity>
                 </View>
                </View>
                
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ width: '40%', }}>
                        <FlatList
                            data={this.state.filterOptions}
                            renderItem={({ item,index }) => (
                                <TouchableOpacity onPress={() => this.btnCategoryAction(item)}>
                                    {item.postcatName == 'Narishakti'?null:<Text style={this.state.selectedFilter == item.postcatName ? styles.activeFilter : styles.inActiveFilter}>{item.postcatName}</Text>}
                                    
                                </TouchableOpacity>
                            )}
                            style={{ marginTop: 10 }}
                        />
                    </View>

                    <View style={{ width: '60%', paddingLeft: 10 }}>
                        {this.setOptionsView()}
                    </View>
                </View>
            </Modalize >

        )
    }
}


const styles = StyleSheet.create({
    activeFilter: {
        color: colors.green,
        backgroundColor: colors.white,
        height: 40,
        textAlignVertical: 'center',
        fontSize: 15,
        paddingLeft: 10
    },
    inActiveFilter: {
        color: colors.black,
        backgroundColor: colors.lightgrey,
        height: 40,
        textAlignVertical: 'center',
        fontSize: 15,
        paddingLeft: 10
    }
})