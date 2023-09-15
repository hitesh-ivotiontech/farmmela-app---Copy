import moment from 'moment';
import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground,Platform, Dimensions, Text, FlatList,BackHandler,TouchableOpacity, TextInput, Alert, Keyboard} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import AddButton from '../ReuseableComponent.js/AddButton';
import FilterByCategoryModal from '../ReuseableComponent.js/FilterByCategoryModal';
import Header from '../ReuseableComponent.js/Header';
import SearchAndFilter from '../ReuseableComponent.js/SearchAndFilter';
import ImageZoomModal from '../ReuseableComponent.js/ImageZoomModal';
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';

import { ForumActions } from '../src/actions';
import { BaseUrlProfilePic } from '../src/api/ServerConfig';
import { isEmpty, isServerSuccess, OpenSansSemiBold, searchFilter } from '../src/validations';
import  Utility  from '../ReuseableComponent.js/Utility';
import { translateText } from '../src/LanguageTranslation';
import ImageZoom from 'react-native-image-pan-zoom';
import Modal from "react-native-modal";
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'

const { width, height } = Dimensions.get('window')

class MyForum extends React.Component {
    modal = React.createRef();
    
    constructor(props) {
        super(props);
        this.state = {
            forum: [],
            searchMyForum: [],
            forumID: '',
            comment: '',
            commentIndex: '',
            lbl_Like:global.languageData.Like,
            lbl_Report_it:global.languageData.Report_it,
            lbl_Comment:global.languageData.Comment,
            lbl_Type_your_report_reason_here:global.languageData.Type_your_report_reason_here,
            lbl_Please_enter_your_report_reason:global.languageData.Please_enter_your_report_reason,
            lbl_You:global.languageData.You,
            lbl_Do_you_want_to_delete_this_comment:global.languageData.Do_you_want_to_delete_this_comment,
            lbl_No:global.languageData.No,
            lbl_Yes:global.languageData.Yes,
            lbl_No_comment_found:global.languageData.No_comment_found,
            lbl_Be_the_first_to_comment:global.languageData.Be_the_first_to_comment,
            lbl_Type_your_comment_here:global.languageData.Type_your_comment_here,
            lbl_Please_enter_your_comment:global.languageData.Please_enter_your_comment,
            lbl_No_records_found:global.languageData.No_records_found,
            txtReport:'',
            txtComment:'',
            isLoading:true,
            isModalOpen:false,
            selectedImage:'',
            selectedIndex:0,
            selectedComment:''

        }
        console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }

    componentWillMount() {
       this.getForumList('0')
       BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUpdate(){
        console.log('componentWillUpdate called')
    }

    componentDidMount(){
        console.log('componentDidMount called')
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        console.log('handleBackButtonClick')
        this.props.navigation.navigate('myaccount')
        return true;
    }

    getForumList(catID){
        this.setState({ forum: [], searchMyForum: [] })
        var body = {
            "userID": global.user ?global.userID:'0',
            "languageID": global.languageID,
            "apiType": "Android",
            "blogID": "0",
            "page": 0,
            "pagesize": '400',
            "apiVersion": "2.0",
            "categoryID": catID,
            "subcatID": "",
            "type":"my"
        }
        console.log('forum data',body)
        this.props.GetForumList(body)
    }

    likeOrUnlikeForum(item) {
        if(global.user){
            this.setState({ forumID: item.forumID })
        var body = {
            "loginuserID": global.userID,
            "languageID": global.languageID,
            "forumID": item.forumID,
            "forumgerID": item.userID,
            "apiType": "Android",
            "apiVersion": "2.0"
        }
        item.isLikedbyMe == "No" ?
            this.props.ForumLike(body) :
            this.props.ForumUnlike(body)
        }else{
            var ut = new Utility()
            ut.loginAlert(this.props)
        }
       
    }

    editCommnetForumApi(){
        var body={
                "loginuserID": global.userID,
                "languageID": "1",
                "forumID":this.state.selectedComment.forumID,
                "forumgerID": this.state.selectedComment.userID,
                "commentID":this.state.selectedComment.commentID,
                "commentComment":this.state.txtComment,
                "apiType": "Android",
                "apiVersion": "2.0"
            
        }
        console.log('edit comment',body)
        this.props.EditCommnetForum(body)
    }

    reset=()=>{
        console.log('called reset')
        global.isResetForum=true
        this.setState({ searchMyForum: searchFilter('', this.state.forum) })
        this.modal.current.close()
        this.getForumList('0')
    }

    componentDidUpdate=async()=>{
       
         
    }

    setTranslate=async(item,index)=>{
        // global.isLanguageOtherThanEnglish ?
        // await translateText([item.forumTitle,item.forumDescription,item.categoryName] , (result) => {
        //     this.state.searchMyForum[index].forumTitle = result[0].translatedText
        //     this.state.searchMyForum[index].forumDescription = result[1].translatedText
        //     this.state.searchMyForum[index].categoryName = result[2].translatedText
        //     this.setState({})
        //     // strTitle= result[0].translatedText
        // }, (err) => {
            
        // }):null
        console.log('item',item)
        await translateText([item.forumTitle,item.forumDescription,item.categoryName] , (result) => {
            this.state.searchMyForum[index].forumTitle = result[0].translatedText
            this.state.searchMyForum[index].forumDescription = result[1].translatedText
            this.state.searchMyForum[index].categoryName = result[2].translatedText
            this.setState({})
            // strTitle= result[0].translatedText
        }, (err) => {
            
        })
    }

    setCommentTranslate=async(item,index)=>{
        global.isLanguageOtherThanEnglish ?
        await translateText([item.commentComment] , (result) => {
            item.commentComment = result[0].translatedText
            this.setState({})
        }, (err) => {
            
        }):null
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.GetMyForumListSuccess) {
            var data = nextProps.GetMyForumListInfo.details
            isServerSuccess(data, this.props, (response) => {
                this.setState({isLoading:false})
                if (response.status == "true") {
                    console.log('forum response',response.data)
                    var data = response.data.map(item => {
                        item['showComment'] = false
                        item['showReport'] = false
                        item['showEdit'] = false
                        item['isCommentEdit'] = false
                        return item;
                    })
                    this.setState({ forum: data, searchMyForum: data })
                }else{
                    this.setState({ forum: [], searchMyForum: [] })
                }
            })
        }

        if (nextProps.ForumLikeSuccess) {
            var data = nextProps.ForumLikeInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    // SimpleToast.show(response.message)
                    this.changeLikeUnlikeIcon("Yes")
                }
            })
        }

        if (nextProps.ForumUnlikeSuccess) {
            var data = nextProps.ForumUnlikeInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    // SimpleToast.show(response.message)
                    this.changeLikeUnlikeIcon("No")
                }
            })
        }

        if (nextProps.ForumAddCommentSuccess) {
            var data = nextProps.ForumAddCommentInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    var data = response.data[0]
                    var searchMyForum = this.state.searchMyForum
                    var index = searchMyForum.findIndex(item => item.forumID == data.forumID)
                    searchMyForum[index].comments.push(data)
                    searchMyForum[index].forumCommentCount = Number(searchMyForum[index].forumCommentCount)+1
                    Keyboard.dismiss()
                    this.setState({ searchMyForum,txtComment:'' })
                    // SimpleToast.show(response.message)
                    this.refComment.clear()
                }
            })
        }

        if (nextProps.AddReportSuccess) {
            var data = nextProps.AddReportInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    console.log('AddReportSuccess',response)
                    var searchMyForum = this.state.searchMyForum
                    var id = searchMyForum.findIndex(item => item.forumID == this.state.forumID)
                    searchMyForum[id].showReport = false
                    this.setState({ searchMyForum })
                    // SimpleToast.show(response.message)
                    this.refReport.clear()
                }else{
                    console.log('AddReportSuccess fail',response)
                }
            })
        }

        if (nextProps.ForumDeleteCommentSuccess) {
            var data = nextProps.ForumDeleteCommentInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    var searchMyForum = this.state.searchMyForum
                    var forumid = searchMyForum.findIndex(item => item.forumID == this.state.forumID)
                    searchMyForum[forumid].comments.splice(this.state.commentIndex, 1)
                    searchMyForum[forumid].forumCommentCount = Number(searchMyForum[forumid].forumCommentCount)-1
                    this.setState({ searchMyForum })
                    // SimpleToast.show(response.message)
                }
            })
        }

        if (nextProps.EditCommnetForumSuccess) {
            var data = nextProps.EditCommnetForumInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    // this.getForumList('0')
                    var searchMyForum = this.state.searchMyForum
                    var forumid = searchMyForum.findIndex(item => item.forumID == this.state.forumID)
                    let indexComment = searchMyForum[forumid].comments.findIndex(item=>item.commentID == this.state.selectedComment.commentID)
                    searchMyForum[forumid].comments[indexComment].commentComment =  this.state.txtComment
                   
                    this.setState({ searchMyForum })
                    this.setState({selectedComment:'',txtComment:""})
                    this.refComment.clear()
                    // SimpleToast.show(response.message)
                }
            })
        }

        if (nextProps.DeleteMyForumSuccess) {
            var data = nextProps.DeleteMyForumInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    console.log('DeleteMyForumSuccess',response)
                    // SimpleToast.show(response.message)
                    // this.getForumList('0')
                    var searchMyForum = this.state.searchMyForum
                    var forumid = searchMyForum.findIndex(item => item.forumID == this.state.forumID)
                    searchMyForum.splice(forumid, 1)
                    this.setState({ searchMyForum })
                }else{
                    console.log('delete fail')
                    SimpleToast.show(response.message)
                }
            })
        }


    }

    changeLikeUnlikeIcon(value) {
        console.log('changeLikeUnlikeIcon',value,this.state.forumID)
        var forum = this.state.forum
        var id = forum.findIndex(item => item.forumID == this.state.forumID)
        forum[id].isLikedbyMe = value
        if(value =='Yes'){
            forum[id].forumLikeCount = Number(forum[id].forumLikeCount)+1
        }else{
            forum[id].forumLikeCount =  Number(forum[id].forumLikeCount)-1
        }
        this.setState({ forum })
    }

    searchFromList(text) {
        // this.setState({ searchMyForum: searchFilter(text, this.state.forum) })
        this.setState({ forum: [], searchMyForum: [] })
       this.getForumList(text.categoryID)
    }

    addComment(text, item) {
        var body = {
            "loginuserID": global.userID,
            "languageID":global.languageID,
            "forumID": item.forumID,
            "forumgerID": item.userID,
            "commentComment": text,
            "apiType": "Android",
            "apiVersion": "2.0"
        }
        this.props.ForumAddComment(body)
    }

    addReport(text, item) {
        this.setState({ forumID: item.forumID })
        var body = {
            "loginuserID": global.userID,
            "languageID":global.languageID,
            "forumID": item.forumID,
            "reportReason": text,
            "apiType": "Android",
            "apiVersion": "2.0"
        }
        console.log('add report body',body)
        this.props.AddReport(body)
    }

    btnReportAction(item,index){
        if(global.user){
            var searchMyForum = this.state.searchMyForum
            searchMyForum[index].showReport = !searchMyForum[index].showReport
            searchMyForum[index].showComment = false
            searchMyForum[index].showEdit = false
            this.setState({ searchMyForum })
        }else{
            var ut = new Utility()
            ut.loginAlert(this.props)
        }
    }

    btnCommentAction(item,index){
        if(global.user){
            var searchMyForum = this.state.searchMyForum
            searchMyForum[index].showComment = !searchMyForum[index].showComment
            searchMyForum[index].showReport = false
            searchMyForum[index].showEdit = false
            this.setState({ searchMyForum })
        }else{
            var ut = new Utility()
            ut.loginAlert(this.props)
        }
    }

    btnEditAction(item,index){
        if(global.user){
            var searchMyForum = this.state.searchMyForum
            for(var i=0;i<searchMyForum.length;i++){
                searchMyForum[i].showComment = false
                searchMyForum[i].showReport = false
                // searchMyForum[i].showEdit = false
            }
            
            searchMyForum[index].showEdit = !searchMyForum[index].showEdit
            this.setState({ searchMyForum })
        }else{
            var ut = new Utility()
            ut.loginAlert(this.props)
        }
    }

    onEditForum(item,index){
        console.log('item is,',item)
        var searchMyForum = this.state.searchMyForum
        searchMyForum[index].showEdit = !searchMyForum[index].showEdit
        this.setState({ searchMyForum })
        global.isEditForum = true
        global.isFromForumList = false
        global.dictEditForum = item
        this.props.navigation.navigate('askquestion')
    }

    deleteForumApi(item){
        this.setState({forumID:item.forumID})
        var body = {
            "loginuserID":  global.user ? global.userID:'0',
            "languageID": "1",
            "forumID": item.forumID,
            "apiType": "Android",
            "apiVersion": "2.0"
        }
        console.log('forum delete body',body)
        this.props.DeleteForum(body)
    }

    btnEditCommentAction(item,index){
        if(global.user){

            this.setState({txtComment:item.commentComment,selectedComment:item,forumID: item.forumID })
            var searchMyForum = this.state.searchMyForum

            setTimeout(() => {
                console.log('data is',this.state.selectedComment)
            }, 300);
            
            // searchMyForum[index].isCommentEdit = true
            this.setState({ searchMyForum })
        }else{
            var ut = new Utility()
            ut.loginAlert(this.props)
        }
    }

    btnOpenImageAction(item,index){
        console.log('item is,',item)
        global.isImageLoad = true
        this.setState({selectedImage:item,isModalOpen:true,selectedIndex:index})   
        // setTimeout(() => {
        //     console.log('scrollToIndex called')
        //     this.flatListRef.scrollToIndex({animated: true, index: index});
        // }, 300);
        
       
    }

    // setModalView(){
    //     var arr = this.state.selectedImage
    //     return <Modal isVisible={this.state.isModalOpen} style={{
    //         backgroundColor: 'black', width: width + 10, marginLeft: -10,

    //     }} backdropColor={'rgb(0,0,0)'} backdropOpacity={1}>

    //         <View style={{ flex: 1, justifyContent: 'space-between' }}>
    //             <TouchableOpacity onPress={() => this.setState({ isModalOpen: false })} style={{ marginTop: 25 }}>
    //                 <Image source={require('../assets/close_white.png')} style={{ height: 25, width: 25, resizeMode: 'contain', marginLeft: 20, }} />
    //             </TouchableOpacity>
    //             <FlatList
    //         data={arr}
    //         style={{ width: width }}
    //         horizontal={true}
    //         pagingEnabled={true}
    //         ref={ref => this.flatListRef = ref}
    //         showsHorizontalScrollIndicator={false}
    //         onScrollToIndexFailed={(error) => {
    //             this.flatListRef.scrollToOffset({ offset: error.averageItemLength * error.index, animated: true });
    //             setTimeout(() => {
    //               if (arr !== 0 && this.flatListRef !== null) {
    //                 this.flatListRef.scrollToIndex({ index: error.index, animated: true });
    //               }
    //             }, 100);
    //           }}
    //         renderItem={({ item, index }) =>
    //         <ImageZoom
    //         cropWidth={Dimensions.get('window').width}
    //         cropHeight={Dimensions.get('window').height}
    //         imageWidth={width}
    //         imageHeight={height}>
    //         <Image
    //             source={{ uri:BaseUrlProfilePic + item }}
    //             style={{
    //                 width: width,
    //                 height: height - 100,
    //                 resizeMode: 'contain',
    //             }}
    //         />
    //     </ImageZoom> 
            
    //         }/>
           
                 
    //         </View>
    //     </Modal>
    // }

    setCommentView(item){
        var comment = ''
        if(item.showComment){
        return (
            <View style={{ backgroundColor: colors.lightgrey, flex: 1, margin: 10, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                <TextInput
                    placeholder={this.state.lbl_Type_your_comment_here}
                    value={this.state.txtComment}
                    onChangeText={(txtComment) => {
                        this.setState({txtComment})
                    }}
                    ref={ref => this.refComment = ref}
                    multiline={true}
                    style={{ padding: 0, flex: 0.8,}}
                />
                <TouchableOpacity onPress={() => {
                    this.state.txtComment.length==0
                        ? SimpleToast.show("Please enter your comment")
                        : this.state.selectedComment==''?this.addComment(this.state.txtComment, item):this.editCommnetForumApi()
                }} >
                    <Image source={require('../assets/send_enabled.png')}
                        style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 5, marginTop: 5 }} />
                </TouchableOpacity>
            </View>
        )
    }
    }

    reportView(item) {
        var report = ''
        return (
            <View style={{ backgroundColor: colors.lightgrey, flex: 1, margin: 10, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                <TextInput
                    placeholder={this.state.lbl_Type_your_report_reason_here}
                    onChangeText={(txtReport) => {
                        this.setState({txtReport})
                    }}
                    
                    
                    ref={ref => this.refReport = ref}
                    multiline={true}
                    style={{ padding: 0, flex: 1 }}
                />
                <TouchableOpacity onPress={() => {
                    this.state.txtReport.length==0
                        ? SimpleToast.show(this.state.lbl_Please_enter_your_report_reason)
                        :
                        this.addReport(this.state.txtReport, item)
                    null
                }} >
                    <Image source={require('../assets/send_enabled.png')}
                        style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 5, marginTop: 5 }} />
                </TouchableOpacity>
            </View>
        )
    }

    btnRightAction=()=>{
        global.isImageLoad = false
        if(this.state.selectedImage.length ==this.state.selectedIndex+1){
            console.log('length is',this.state.selectedImage.length,this.state.selectedIndex)
        }else{
            this.setState({selectedIndex:this.state.selectedIndex+1})
        }
    }

    btnLeftAction=()=>{
        global.isImageLoad = false
        if(this.state.selectedIndex ==0){

        }else{
            this.setState({selectedIndex:this.state.selectedIndex-1})
        }
    }

   

    setForumImages(item,index){
        var arrImages = String(item.forumMediaFile).split(',')
        return(
            // <Image source={{uri: BaseUrlProfilePic + item.forumMediaFile }} style={{ width: 55, height: 55,marginTop:10,marginBottom:8, borderRadius: 5 }} />
            <FlatList
            data={arrImages}
            style={{ width: width-30 }}
            horizontal={true}
            pagingEnabled={true}

            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) =>
            <TouchableOpacity onPress={()=>this.btnOpenImageAction(arrImages,index)}>
                {/* <Image source={{uri: BaseUrlProfilePic + item,cache:'force-cache'}} onLoadStart={()=>console.log('image loading',index)} onError={()=>console.log('image loading error',index)} style={{ width: 55, height: 55,marginTop:10,marginBottom:8,marginRight:10, borderRadius: 5 }} /> */}
                <FastImage
                    style={{ width: 55, height: 55,marginTop:10,marginBottom:8,marginRight:10, borderRadius: 5}} resizeMode='cover'
                    source={{
                        uri: BaseUrlProfilePic + item,
                        priority: FastImage.priority.normal,
                    }}
                    // resizeMode={FastImage.resizeMode.contain}
            />
            
            </TouchableOpacity>
            
            }/>
        )
    }

    render() {

        return (
            <Fragment>
                {Platform.OS=='ios'?<LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
            style={{height:global.notchHeight}}/>:null}
            <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.75)" }}>
                {/* {this.setModalView()} */}
                <ImageZoomModal arrImages={this.state.selectedImage} isModalOpen={this.state.isModalOpen} 
                selectedIndex={this.state.selectedIndex} btnRightAction={this.btnRightAction} btnLeftAction={this.btnLeftAction} closeModalAction={()=>{global.isImageLoad = false,this.setState({isModalOpen:false})}}/>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <Header name={global.languageData.Forum} props={this.props} navName={'myaccount'} showHome={true}/>
                <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                    <SearchAndFilter filterAction={() => this.modal.current.open()} onChangeText={(text) => { this.searchFromList(text) }} />
                </View>

                <FlatList
                    data={this.state.searchMyForum}
                    keyExtractor={item => item.forumID}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    style={{marginBottom:65}}
                    renderItem={({ item, index }) => (
                        <View style={{ backgroundColor: colors.white, margin: 10, elevation: 1, borderRadius: 5 }}>
                            <View style={{ padding: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Image source={isEmpty(item.userProfilePicture) ? require('../assets/user_green_big.png') : { uri: BaseUrlProfilePic + item.userProfilePicture }} style={{ width: 27, height: 27, borderRadius: 30 }} />
                                    <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 15, width: '60%' }}>{item.userFullName}</Text>
                                    <Text style={{ color: colors.lightgrey1, fontSize: 12 }}>{moment(item.forumCreatedDate).format("DD-MM-YYYY")}</Text>
                                </View>
                                
                                {item.forumMediaFile ==''?null:this.setForumImages(item)
                                }
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <View>
                                        <Text style={{ marginTop: 8 }}>{item.forumTitle}</Text>
                                        <Text style={{ marginTop: 1, fontSize: 13,width:width-70 }}>{item.forumDescription}</Text>
                                    </View>
                                    {/* <TouchableOpacity onPress={()=>this.btnEditAction(item,index)} style={{flexDirection:'row',marginTop:10,height:35,width:35,justifyContent:"flex-end"}}>
                                    <Image source={require('../assets/3_dot_menu_vertical_black.png')} style={{ width: 18, height: 18, resizeMode: 'contain', marginRight: 0 }} />
                                    </TouchableOpacity> */}
                                     <Menu>
                            <MenuTrigger>
                                <Image source={require('../assets/3_dots_menu_black.png')}
                                    style={{ width: 10, height: 15, resizeMode: 'contain', marginHorizontal: 5 }} />
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={{ width: 100, padding: 4, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: 18, }}>
                                <MenuOption onSelect={() => this.onEditForum(item,index)} text={global.languageData.Edit} />
                                <MenuOption onSelect={() => { this.deleteForumApi(item) }} text={global.languageData.Remove} />
                            </MenuOptions>
                        </Menu>
                                </View>

                                {/* {item.showEdit?<View>
                                    <TouchableOpacity onPress={()=>this.onEditForum(item,index)} 
                                    style={{padding:5,borderColor:'lightgray',marginRight:5,justifyContent:'center',alignContent:'center',alignItems:'center',flexDirection:'row',alignSelf:'flex-end',borderWidth:1,width:60}}>
                                        <Text style={{fontSize:14}}>Edit</Text>
                                    </TouchableOpacity>
                                </View>:null} */}

                                
                                
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                                <Text style={{ marginTop: 1, fontSize: 13, color: colors.green }}>{item.categoryName}</Text>
                                <TouchableOpacity onPress={()=>this.setTranslate(item,index)}>
                                <Text style={{ marginTop: 1, fontSize: 13, color: colors.blueCalendar }}>{global.languageData.translate}</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderTopWidth: 1.5, borderTopColor: colors.lightgrey }}>
                                <TouchableOpacity onPress={() => this.likeOrUnlikeForum(item)}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={item.isLikedbyMe == "No" ? require('../assets/like_default.png') : require('../assets/like_selected.png')} style={{ width: 18, height: 18, resizeMode: 'contain', marginRight: 8 }} />
                                    < Text style={{ fontSize: 12 }}>{this.state.lbl_Like}</Text>
                                    <Text style={{ fontSize: 12,marginLeft:3 }}>{item.forumLikeCount=='0'?'':"("+item.forumLikeCount+")"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {this.btnReportAction(item,index)
                                   
                                }}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../assets/flag.png')} style={{ width: 18, height: 18, resizeMode: 'contain', marginRight: 8 }} />
                                    <Text style={{ fontSize: 12 }}>{this.state.lbl_Report_it}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                   this.btnCommentAction(item,index)
                                }}
                                    style={{ flexDirection: 'row', alignItems: 'center',alignContent:'center' }}>
                                    <Image source={require('../assets/comment.png')} style={{ width: 18, height: 18, resizeMode: 'contain', marginRight: 8 }} />
                                    <Text style={{ fontSize: 12 }}>{this.state.lbl_Comment}</Text>
                                    <Text style={{ fontSize: 12,marginLeft:3 }}>{item.forumCommentCount=='0'?'':"("+item.forumCommentCount+")"}</Text>
                                </TouchableOpacity>
                            </View>

                            {item.showReport ? this.reportView(item) : null}

                            {item.showComment ?
                                <FlatList
                                    data={item.comments}
                                    keyExtractor={item => item.commentID}
                                    renderItem={({ item, index }) => (
                                        <View style={{ marginTop: 20, flexDirection: 'row',}}>
                                            <Image source={isEmpty(item.userProfilePicture) ? require('../assets/user_green_big.png') : { uri: BaseUrlProfilePic + item.userProfilePicture }}
                                                style={{ width: 25, height: 25, borderRadius: 30, margin: 10 }} />
                                            <View style={{ width: '73%' }}>
                                                <Text style={{ fontFamily: OpenSansSemiBold }}>{item.userFullName} {item.userID == global.userID ? <Text style={{ color: colors.lightgrey1, fontSize: 13 }}>({this.state.lbl_You})</Text> : null}</Text>
                                                <Text style={{}}>{item.commentComment}</Text>
                                                <TouchableOpacity onPress={()=>this.setCommentTranslate(item,index)} style={{flexDirection:'row',justifyContent:'flex-end'}}>
                                                    <Text style={{ marginTop: 10, fontSize: 13, color: colors.blueCalendar }}>{global.languageData.translate}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {item.userID == global.userID ?
                                                <TouchableOpacity onPress={() =>this.btnEditCommentAction(item,index)}>
                                                    <Image source={require('../assets/edit_black.png')} style={{ width: 18, height: 18,marginRight:12, resizeMode: 'contain' }} />
                                                </TouchableOpacity>
                                                : null}
                                            {item.userID == global.userID ?
                                                <TouchableOpacity onPress={() => {
                                                    Alert.alert(
                                                        "",
                                                        this.state.lbl_Do_you_want_to_delete_this_comment,
                                                        [
                                                            {
                                                                text:this.state.lbl_No,
                                                                onPress: () => console.log("Cancel Pressed"),
                                                            },
                                                            {
                                                                text: this.state.lbl_Yes, onPress: () => {
                                                                    this.setState({ forumID: item.forumID, commentIndex: index })
                                                                    var body = {
                                                                        "loginuserID": global.userID,
                                                                        "languageID": global.languageID,
                                                                        "commentID": item.commentID,
                                                                        "apiType": "Android",
                                                                        "apiVersion": "2.0"
                                                                    }
                                                                    setTimeout(() => {
                                                                        this.props.ForumDeleteComment(body)  
                                                                    }, 300);
                                                                    
                                                                }
                                                            }
                                                        ]
                                                    );
                                                }}>
                                                    <Image source={require('../assets/delete_red.png')} style={{ width: 15, height: 18, resizeMode: 'contain' }} />
                                                </TouchableOpacity>
                                                : null}
                                                
                                        </View>
                                    )}
                                    ListEmptyComponent={() => (
                                        <Text style={{ color: colors.lightgrey1, textAlign: 'center', fontSize: 12 }}>{this.state.lbl_No_comment_found}{"\n"}{this.state.lbl_Be_the_first_to_comment}</Text>
                                    )}
                                   
                                    // ListFooterComponent={() => {
                                       
                                    // }}
                                />
                                : null}
                                 {this.setCommentView(item)}
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <Text style={{ color: colors.lightgrey1, textAlign: 'center', marginTop: height / 4 }}>{this.state.isLoading?'':this.state.lbl_No_records_found}</Text>
                    )}
                    

                />
                {/* <AddButton props={this.props} nav={"askquestion"} refresh={this.componentWillMount.bind(this)} /> */}

                <FilterByCategoryModal modal={this.modal} resetAction={this.reset}
                    selectedCategory={(text) => { this.searchFromList(text), this.modal.current.close() }} />
            </SafeAreaView>
            </Fragment>
        )
    }

}



function mapStateToProps(state) {
    return {
        GetMyForumListInfo: state.GetForumList,
        GetMyForumListSuccess: state.GetForumList.success,

        ForumLikeInfo: state.ForumLike,
        ForumLikeSuccess: state.ForumLike.success,

        ForumUnlikeInfo: state.ForumUnlike,
        ForumUnlikeSuccess: state.ForumUnlike.success,

        ForumAddCommentInfo: state.ForumAddComment,
        ForumAddCommentSuccess: state.ForumAddComment.success,

        AddReportInfo: state.AddReport,
        AddReportSuccess: state.AddReport.success,

        ForumDeleteCommentInfo: state.ForumDeleteComment,
        ForumDeleteCommentSuccess: state.ForumDeleteComment.success,

        EditCommnetForumInfo: state.EditCommnetForum,
        EditCommnetForumSuccess: state.EditCommnetForum.success,

        DeleteMyForumInfo: state.DeleteForum,
        DeleteMyForumSuccess: state.DeleteForum.success,

    };
}


export default compose(connect(mapStateToProps, {
    ...ForumActions
}))(MyForum);