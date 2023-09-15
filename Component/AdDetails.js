import moment from 'moment';
import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground,Platform,Keyboard, Dimensions, Text, FlatList,BackHandler,TouchableOpacity, TextInput, StyleSheet, Animated, ScrollView, Linking, } from 'react-native';
import { Modalize } from 'react-native-modalize';
import SimpleToast from 'react-native-simple-toast';
import { TabView } from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import Button from '../ReuseableComponent.js/Button';
import Header from '../ReuseableComponent.js/Header';
import { BaseUrlImages, BaseUrlProfilePic } from '../src/api/ServerConfig';
import { isEmpty, OpenSansSemiBold } from '../src/validations';
const { width, height } = Dimensions.get('window')
import { translateText } from '../src/LanguageTranslation';
import ImageZoomModal from '../ReuseableComponent.js/ImageZoomModal';
import FastImage from 'react-native-fast-image'
import { GiftedChat, } from 'react-native-gifted-chat'
import LinearGradient from 'react-native-linear-gradient'

import Fire from './Fire';

class AdDetails extends React.Component {
    registerModal = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            item: {},
            from: '',
            message: '',
            lblTypeHer:global.languageData.Type_here,
            lblYouAre:global.languageData.Youre_not_registered,
            lblSubmit:global.languageData.Review,
            lblOkay:global.languageData.Okay,
            lblThisFeature:global.languageData.This_feature_will,
            lblAlert:global.languageData.Alert,
            lblTitle:'',
            isModalOpen:false,
            selectedImage:'',
            selectedIndex:0,
            messages: [],
            arrMessages:[],
            lblTypeMessage:'Type a message'
        }
        console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }


    componentWillMount() {
        var { item, from } = this.props.route.params
        global.dicPost=item
        if(from == 'Buy'){
            this.setState({ lblTitle:global.languageData.Buy })
        }else if(from == 'Sell'){
            this.setState({ lblTitle:global.languageData.Sell })
        }else if(from == 'Rent'){
            this.setState({ lblTitle:global.languageData.Rent })
        }else{
            this.setState({ lblTitle:global.languageData.Advertisements })
        }

       // lblTitle
        this.setState({ item, from })
        console.log(item)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }


    componentDidMount(){
        this.setLable()

        // if (Platform.OS === 'ios') {
        //     this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this._handleKeyboardShow);
        //     this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this._handleKeyboardHide);
        //  } else {
        //     this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this._handleKeyboardShow);
        //     this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this._handleKeyboardHide);
        //  }

        if(global.user){
            Fire.shared.on(message =>
                this.setState(previousState => ({
                  messages: GiftedChat.append(previousState.messages, message),
                }))
              );
        }
       

          
         
    }

    componentWillUnmount(){
        // global.dicPost = {}
        // if (Platform.OS === 'ios') {
        //     this.keyboardWillShow?.remove();
        //     this.keyboardWillHide?.remove();
        //  } else {
        //     this.keyboardDidShow?.remove();
        //     this.keyboardDidHide?.remove();
        //  }
        if(global.user){
            Fire.shared.off();
        }
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick = () => {
        this.props.navigation.goBack()
       
        
        return true;
    }

    setLable=async()=>{
        await translateText('Type a message', (result) => {

            console.log('result id is',result)
            this.setState({lblTypeMessage:result[0].translatedText})
            
        }, (err) => {
            
        })//:null
    }
    

     get user() {
        console.log('user id is',Fire.shared.uid)
        return {
          name:global.user.userFullName,
          _id: global.userID,
        };
        
      }

     onTranslate=async(item)=>{
        // global.isLanguageOtherThanEnglish ?
     await translateText([item.advertiseTitle,item.advertiseDescription,item.cityName,item.postcatName] , (result) => {

            item.advertiseTitle = result[0].translatedText
            item.advertiseDescription = result[1].translatedText
            item.cityName = result[2].translatedText
            if(result[3].translatedText == 'null'){
                item.postcatName = ''
            }else{
                item.postcatName = result[3].translatedText
            }
           
            this.setState({})
            
        }, (err) => {
            
        })//:null

    }

    btnOpenImageAction(item,index){
        console.log('item is,',item)
       
        this.setState({selectedImage:item,isModalOpen:true,selectedIndex:index})   
      
        
       
    }

    btnRightAction=()=>{
        if(this.state.selectedImage.length ==this.state.selectedIndex+1){
            console.log('length is',this.state.selectedImage.length,this.state.selectedIndex)
        }else{
            this.setState({selectedIndex:this.state.selectedIndex+1})
        }
    }

    btnLeftAction=()=>{
        if(this.state.selectedIndex ==0){

        }else{
            this.setState({selectedIndex:this.state.selectedIndex-1})
        }
    }

    btnSendAction(message){
        

        setTimeout(() => {
            if(Number(this.state.item.userID>global.userID)){
                global.childId = global.userID+'_'+this.state.item.userID+'_'+this.state.item.advertiseID
               }else{
                global.childId = this.state.item.userID+'_'+global.userID+'_'+this.state.item.advertiseID
              }
              console.log('path is',global.childId)
              Fire.shared.send(message)
              global.isFromAdDetail = true
            this.props.navigation.push('chatView')
        }, 400);
    }


    render() {
        const item = this.state.item
        var arrImages = String(item.advertiseImages).split(',')
        if(Platform.OS=='android'){
            return (
                <Fragment>
                {Platform.OS=='ios'?
                <LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
            style={{height:global.notchHeight}}/>:null}
                <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>
                    <ImageZoomModal arrImages={this.state.selectedImage} btnRightAction={this.btnRightAction} btnLeftAction={this.btnLeftAction} isModalOpen={this.state.isModalOpen} selectedIndex={this.state.selectedIndex} closeModalAction={()=>this.setState({isModalOpen:false})}/>
                    <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                    <Header name={this.state.lblTitle} props={this.props} />
                     <View style={{flex:1,}}>
                    <View style={{ margin: 10, height:Platform.OS=='ios' && height>568?height-270:height-230, backgroundColor: colors.white, borderRadius: 5, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: colors.greenFrom }}>
                            <Image source={isEmpty(item.userProfilePicture) ? require('../assets/user_green_big.png') : { uri: BaseUrlProfilePic + item.userProfilePicture }} style={{ width: 25, height: 25, borderRadius: 40 }} />
                            <View style={{ width: '60%' }}>
                                <Text style={{ fontFamily: OpenSansSemiBold }}>{item.userFullName}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <Image source={require('../assets/location_green_small.png')}
                                        style={{ width: 12, height: 12, resizeMode: 'contain', marginRight: 5 }} />
                                    <Text style={{ color: colors.green, fontSize: 12 }}>{item.cityName} {global.languageData.City}</Text>
                                </View>
                            </View>
                            <Text style={{ color: colors.lightgrey1, fontSize: 12, }}>{moment(item.advertiseCreatedDate).format("DD MMM YYYY")}</Text>
                        </View>
                        <View style={{ padding: 10, justifyContent: 'space-between',}}>
                            <View>
                               
                                    {item.advertiseImages==''?null:<View style={{ width: '100%', }}>
                  
    
                <FlatList
                data={arrImages}
                style={{ width: width-30 }}
                horizontal={true}
                pagingEnabled={true}
    
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                <TouchableOpacity onPress={()=>this.btnOpenImageAction(arrImages,index)}>
                <FastImage
                       style={{ width: 55, height: 55,marginTop:10,marginBottom:8,marginRight:10, borderRadius: 5 }}
                        source={{
                            uri: BaseUrlProfilePic + item,
                            priority: FastImage.priority.normal,
                        }}
                />
            </TouchableOpacity>
                }/>
                </View>}
                                <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 13 }}>{item.advertiseTitle}</Text>
                                <Text style={{ fontSize: 13 }}>{item.advertiseDescription}</Text>
                            </View>
    
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                    <Text style={{ color: colors.black, fontSize: 12,marginTop:5 }}>{item.postcatName}</Text>
                    <TouchableOpacity onPress={()=>this.onTranslate(item)}>
                                    <Text style={{ marginTop: 1, fontSize: 13, color: colors.blueCalendar }}>{global.languageData.translate}</Text>
                    </TouchableOpacity>
                    </View>
    
                           
    
                        </View>
                        
                    </View>
                    
                    
                    
                    
                   
                    {item.userShowContactDetails=='No'?null:item.userEmail==''?<TouchableOpacity disabled={item.userID == global.userID?true:false} style={{opacity:item.userID == global.userID?0.5:1,marginBottom:10}} onPress={() => { global.user ? Linking.openURL(`tel:${item.userMobile}`) : this.registerModal.current.open() }}>
                                <LinearGradient start={{ x: 0.0, y: 0 }} end={{ x: 0.7, y: 0.1 }}
                                    colors={[colors.greenFrom, colors.greenTo]}
                                    style={{ height: 40, borderRadius: 15, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                                    <Image source={require('../assets/call_circular_white.png')}
                                        style={{ width: 18, height: 18, resizeMode: 'contain', marginRight: 5 }} />
                                    <Text style={{ fontSize: 15, color: colors.white }}>+{item.userCountryCode} {global.user ? item.userMobile : "xxxxx xxxxx"}</Text>
                                </LinearGradient>
                            </TouchableOpacity>:<TouchableOpacity disabled={item.userID == global.userID?true:false} style={{opacity:item.userID == global.userID?0.5:1,bottom:10}} onPress={() => { global.user ? Linking.openURL(`mailto:${item.userEmail}`) : this.registerModal.current.open() }}>
                                <LinearGradient start={{ x: 0.0, y: 0 }} end={{ x: 0.7, y: 0.1 }}
                                    colors={[colors.greenFrom, colors.greenTo]}
                                    style={{ height: 40, borderRadius: 15, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                                    <Image source={require('../assets/contact_mail_white.png')}
                                        style={{ width: 22, height: 20, resizeMode: 'contain', marginRight: 5,}} />
                                        
                                    <Text style={{ fontSize: 15, color: colors.white }}>{global.user ? item.userEmail : "xxxxx xxxxx"}</Text>
                                </LinearGradient>
                            </TouchableOpacity>}
                           
                   
                    </View> 
                    <Modalize ref={this.registerModal} handlePosition="inside"
                        adjustToContentHeight={true}
                        useNativeDriver={true} closeOnOverlayTap={true}
                        modalStyle={{ padding: 10, }}>
                        <View style={{ alignItems: 'center' }} >
                            <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16, textAlign: 'center', margin: 10 }}>{this.state.lblAlert}</Text>
                            <Text style={{ paddingBottom: 20 }}>{this.state.lblYouAre}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginVertical: 20 }}>
                                <TouchableOpacity onPress={() => { this.registerModal.current.close() }}
                                    style={{ padding: 12, borderRadius: 10, borderWidth: 1, borderColor: colors.green, fontSize: 16, color: colors.green, width: '45%', textAlign: 'center' }}>
                                    <Text style={{ fontSize: 16, color: colors.green, textAlign: 'center' }}>{this.state.lblOkay}</Text>
                                </TouchableOpacity>
                                <View style={{ width: '45%' }}>
                                    <Button name={this.state.lblSubmit} width="100%"
                                        onPress={() => { this.props.navigation.navigate("login", { mobile: '', countryCode: '' })}} />
                                </View>
                            </View>
                        </View>
                    </Modalize>
                    <View style={{height:50}}>
                    {global.userID == item.userID?null: global.user?<GiftedChat 
                    // messages={this.state.messages}
                        messagesContainerStyle={{}}
                        placeholder={this.state.lblTypeMessage}
                        onSend={(message)=>this.btnSendAction(message)}
                        user={this.user}
                        />:null}
                        </View>
                </SafeAreaView>
                </Fragment>
            )
        }else{
            return (
                <Fragment>
                {Platform.OS=='ios'?
                <LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
            style={{height:global.notchHeight}}/>:null}
                <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>
                    <ImageZoomModal arrImages={this.state.selectedImage} btnRightAction={this.btnRightAction} btnLeftAction={this.btnLeftAction} isModalOpen={this.state.isModalOpen} selectedIndex={this.state.selectedIndex} closeModalAction={()=>this.setState({isModalOpen:false})}/>
                    <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                    <Header name={this.state.lblTitle} props={this.props} />
                     <TouchableOpacity style={{flex:1,}} onPress={()=>Keyboard.dismiss()}>
                    <View style={{ margin: 10, height:Platform.OS=='ios' && height>568?height-270:height-230, backgroundColor: colors.white, borderRadius: 5, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: colors.greenFrom }}>
                            <Image source={isEmpty(item.userProfilePicture) ? require('../assets/user_green_big.png') : { uri: BaseUrlProfilePic + item.userProfilePicture }} style={{ width: 25, height: 25, borderRadius: 40 }} />
                            <View style={{ width: '60%' }}>
                                <Text style={{ fontFamily: OpenSansSemiBold }}>{item.userFullName}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <Image source={require('../assets/location_green_small.png')}
                                        style={{ width: 12, height: 12, resizeMode: 'contain', marginRight: 5 }} />
                                    <Text style={{ color: colors.green, fontSize: 12 }}>{item.cityName} {global.languageData.City}</Text>
                                </View>
                            </View>
                            <Text style={{ color: colors.lightgrey1, fontSize: 12, }}>{moment(item.advertiseCreatedDate).format("DD MMM YYYY")}</Text>
                        </View>
                        <View style={{ padding: 10, justifyContent: 'space-between',}}>
                            <View>
                               
                                    {item.advertiseImages==''?null:<View style={{ width: '100%', }}>
                  
    
                <FlatList
                data={arrImages}
                style={{ width: width-30 }}
                horizontal={true}
                pagingEnabled={true}
    
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                <TouchableOpacity onPress={()=>this.btnOpenImageAction(arrImages,index)}>
                <FastImage
                       style={{ width: 55, height: 55,marginTop:10,marginBottom:8,marginRight:10, borderRadius: 5 }}
                        source={{
                            uri: BaseUrlProfilePic + item,
                            priority: FastImage.priority.normal,
                        }}
                />
            </TouchableOpacity>
                }/>
                </View>}
                                <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 13 }}>{item.advertiseTitle}</Text>
                                <Text style={{ fontSize: 13 }}>{item.advertiseDescription}</Text>
                            </View>
    
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                    <Text style={{ color: colors.black, fontSize: 12,marginTop:5 }}>{item.postcatName}</Text>
                    <TouchableOpacity onPress={()=>this.onTranslate(item)}>
                                    <Text style={{ marginTop: 1, fontSize: 13, color: colors.blueCalendar }}>{global.languageData.translate}</Text>
                    </TouchableOpacity>
                    </View>
    
                           
    
                        </View>
                        
                    </View>
                    
                    
                    
                    
                   
                    {item.userShowContactDetails=='No'?null:item.userEmail==''?<TouchableOpacity disabled={item.userID == global.userID?true:false} style={{opacity:item.userID == global.userID?0.5:1,marginBottom:10}} onPress={() => { global.user ? Linking.openURL(`tel:${item.userMobile}`) : this.registerModal.current.open() }}>
                                <LinearGradient start={{ x: 0.0, y: 0 }} end={{ x: 0.7, y: 0.1 }}
                                    colors={[colors.greenFrom, colors.greenTo]}
                                    style={{ height: 40, borderRadius: 15, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                                    <Image source={require('../assets/call_circular_white.png')}
                                        style={{ width: 18, height: 18, resizeMode: 'contain', marginRight: 5 }} />
                                    <Text style={{ fontSize: 15, color: colors.white }}>+{item.userCountryCode} {global.user ? item.userMobile : "xxxxx xxxxx"}</Text>
                                </LinearGradient>
                            </TouchableOpacity>:<TouchableOpacity disabled={item.userID == global.userID?true:false} style={{opacity:item.userID == global.userID?0.5:1,bottom:10}} onPress={() => { global.user ? Linking.openURL(`mailto:${item.userEmail}`) : this.registerModal.current.open() }}>
                                <LinearGradient start={{ x: 0.0, y: 0 }} end={{ x: 0.7, y: 0.1 }}
                                    colors={[colors.greenFrom, colors.greenTo]}
                                    style={{ height: 40, borderRadius: 15, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                                    <Image source={require('../assets/contact_mail_white.png')}
                                        style={{ width: 22, height: 20, resizeMode: 'contain', marginRight: 5,}} />
                                        
                                    <Text style={{ fontSize: 15, color: colors.white }}>{global.user ? item.userEmail : "xxxxx xxxxx"}</Text>
                                </LinearGradient>
                            </TouchableOpacity>}
                           
                   
                    </TouchableOpacity> 
                    <Modalize ref={this.registerModal} handlePosition="inside"
                        adjustToContentHeight={true}
                        useNativeDriver={true} closeOnOverlayTap={true}
                        modalStyle={{ padding: 10, }}>
                        <View style={{ alignItems: 'center' }} >
                            <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16, textAlign: 'center', margin: 10 }}>{this.state.lblAlert}</Text>
                            <Text style={{ paddingBottom: 20 }}>{this.state.lblYouAre}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginVertical: 20 }}>
                                <TouchableOpacity onPress={() => { this.registerModal.current.close() }}
                                    style={{ padding: 12, borderRadius: 10, borderWidth: 1, borderColor: colors.green, fontSize: 16, color: colors.green, width: '45%', textAlign: 'center' }}>
                                    <Text style={{ fontSize: 16, color: colors.green, textAlign: 'center' }}>{this.state.lblOkay}</Text>
                                </TouchableOpacity>
                                <View style={{ width: '45%' }}>
                                    <Button name={this.state.lblSubmit} width="100%"
                                        onPress={() => { this.props.navigation.navigate("login", { mobile: '', countryCode: '' })}} />
                                </View>
                            </View>
                        </View>
                    </Modalize>
                    <View style={{height:50}}>
                    {global.userID == item.userID?null: global.user?
                    <GiftedChat 
                    // messages={this.state.messages}
                        messagesContainerStyle={{}}
                        placeholder={this.state.lblTypeMessage}
                        onSend={(message)=>this.btnSendAction(message)}
                        user={this.user}
                        />:null}
                        </View>
                </SafeAreaView>
                </Fragment>
            )
        }
       
    }

}


function mapStateToProps(state) {
    return {


    };
}


export default compose(connect(mapStateToProps, {

}))(AdDetails);
{/* <View style={{ marginHorizontal: 10, backgroundColor: colors.white, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                    <Image source={global.user?isEmpty(global.user.userProfilePicture) ? require('../assets/user_green_big.png') : { uri: BaseUrlProfilePic + global.user.userProfilePicture }:require('../assets/user_green_big.png')}
                        style={{ width: 25, height: 25, borderRadius: 30, opacity: 0.6 }} />
                    <View style={{ backgroundColor: colors.lightgrey, flex: 1, marginHorizontal: 10, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
                        <TextInput
                            placeholder={this.state.lblTypeHer}
                            value={this.state.message}
                            onChangeText={(message) => this.setState({ message })}
                            style={{ padding: 0, flex: 1 }}
                        />
                        <TouchableOpacity disabled={!this.state.message} onPress={() => { SimpleToast.show(this.state.lblThisFeature) }}>
                            <Image source={this.state.message ? require('../assets/send_enabled.png') : require('../assets/send_disabled.png')}
                                style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 5 }} />
                        </TouchableOpacity>
                    </View>
                    <Image source={this.state.message ? require('../assets/mic_enabled.png') : require('../assets/mic_disabled.png')}
                        style={{ width: 20, height: 20, resizeMode: 'contain', }} />

                </View> */}