import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground,Platform, Dimensions, Text, FlatList,BackHandler, TouchableOpacity, TextInput, StyleSheet, Animated, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import firebase, {RemoteMessage} from 'react-native-firebase';
import moment from 'moment';
import Modal from 'react-native-modal';

import Header from '../ReuseableComponent.js/Header';
import { BuySellRentActions } from '../src/actions';
import { isServerSuccess, searchFilter } from '../src/validations';
const { width, height } = Dimensions.get('window')
import Fire from './Fire';
import { GiftedChat } from 'react-native-gifted-chat'
import LinearGradient from 'react-native-linear-gradient'

class MyMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           messages:[],
           arrUserDetail:[],
           isLoading:false
        }
        console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
   
    componentDidMount(){
        console.log('componentDidMount Message',global.isChatOpen)
        global.isChatOpen = false
        firebase.notifications().removeAllDeliveredNotifications();
        this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
            // Process your message as required
            global.isChatOpen = false
            console.log('Push Message app js',global.isChatOpen, message);
      
        });
          this.createNotificationListeners();
        this.setState({isLoading:true})
        this.onDatabase(message =>{
            console.log('my message are',message)
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
              }))
            }
          );

          setTimeout(() => {
              var arrTemp = []
              this.getUserIndexData(message=>{

                // var index = arrTemp.findIndex(item => item.postID == message.postID && item.user._id ==message.user._id  )
              
                // if(index == -1){
                //     if(message.user._id == global.userID){
                //         var indexOf = arrTemp.findIndex(item =>item.postID == message.postID && item.userName == message.user.name)
                //         if(indexOf == -1){ 
                //             arrTemp.push(message)
                //         }else{
                            
                //         }
                //     }else{
                        // arrTemp.push(message)
                //     }
                // }
                console.log('getUserIndexData called new',message)
                // var index = arrTemp.findIndex(item => item.postID == message.postID && item.userName == message.userName )
                // if(index == -1){
                    arrTemp.push(message)
                    console.log('data pushed new new',message)
                // }
                
                
              })

              setTimeout(() => {
                if(arrTemp.length>0){
                    for(var i=0;i<this.state.messages.length;i++){
                        arrTemp[i]['groupID'] = this.state.messages[i]._id
                    }
                }
                    
                
                var isFound = arrTemp.findIndex(item => item.readStatus == 'no')
                if(isFound>0){
                    global.showRedDot = true
                }else{
                    global.showRedDot = false
                }
                console.log('isFound called',isFound)
                var sortedData = arrTemp.sort((a, b) => moment(b.creationDate) - moment(a.creationDate))
                this.setState({arrUserDetail:sortedData})
                this.setState({isLoading:false})
             
               
              }, 1000);
             
          }, 3000);
         
          
    }

    getUserIndexData=callback=>{
        var arrNames = []
        const{messages}=this.state;
        
        for(var i=0;i<messages.length;i++){
            firebase.database().ref(global.userID).child(messages[i]._id).limitToLast(1).on('child_added', snapshot => callback(this.parseDatabase(snapshot)))
        }    
    }


    get refDatabase() {
        return firebase.database().ref(global.userID)
      }

    parseDatabase = snapshot => {
        console.log('get parse are my message')
        const { timestamp: numberStamp, text, user,postTopic,postID,userName,receiverID,creationDate,readStatus} = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
          _id,
          timestamp,
          text,
          user,
          postTopic,
          postID,userName,receiverID,creationDate,readStatus
        };
        console.log('messages are my message chat',message)
        return message;
      };

      onDatabase = callback =>
        this.refDatabase.limitToFirst(50).on('child_added', snapshot => callback(this.parseDatabase(snapshot)))


    componentWillMount() {
       
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        this.refDatabase.off()
        this.notificationListener();
       this.messageListener();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    // get user() {
    //     console.log('user id is',Fire.shared.uid)
    //     return {
    //       name: global.user.userFullName,
    //       _id: global.dicPost.userID,
    //     };
        
    //   }

    handleBackButtonClick = () => {
        console.log('back click')
        this.props.navigation.navigate('myaccount')
        return true;
    }

    async createNotificationListeners(){    
        const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
      
        console.log('notificationOpen', notificationOpen);
       
        if (notificationOpen) {
            const action = notificationOpen.action;
            const notification: Notification = notificationOpen.notification;
            console.log('notificationess', notification);   
        }
      
      
        const channel = new firebase.notifications.Android.Channel('FarmMela-test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
            .setDescription('My apps test channel');
        // Create the channel
        
        firebase.notifications().android.createChannel(channel);
      
          
        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // Process your notification as required
            //notification
            if(global.isChatOpen){}else{
            notification = new firebase.notifications.Notification()
                .android.setChannelId('Farmmela-test-channel')
      
                .setNotificationId(notification._notificationId)
                .setTitle(notification._title)
                
                .setBody(notification._body)
                .setSubtitle(notification._subtitle)
                .setSound('default')
                .android.setPriority(firebase.notifications.Android.Priority.High)
                .setData(notification._data);
            }
            this.refreshFlatList()
            if(global.isChatOpen){

            }else{
                console.log('display notification called my message',global.isChatOpen)
                firebase.notifications()
                .displayNotification(notification);
            }
                    
        });
      
       
      
      }


   refreshFlatList(){
        setTimeout(() => {
            var arrTemp = []
            this.getUserIndexData(message=>{
                arrTemp.push(message)
            })
            setTimeout(() => {
            if(arrTemp.length>0){
                for(var i=0;i<this.state.messages.length;i++){
                    arrTemp[i]['groupID'] = this.state.messages[i]._id
                }
            }
            var sortedData = arrTemp.sort((a, b) => moment(b.creationDate) - moment(a.creationDate))
            this.setState({arrUserDetail:sortedData})
            this.setState({isLoading:false})
            }, 500);
        }, 1000);
   }

    UNSAFE_componentWillReceiveProps(nextProps) {


    }

    componentWillReceiveProps(){
    }

    componentDidUpdate(){
    }

    btnUserAction(item,index){
       
        // if(Number(item.user._id>global.userID)){
        //     global.childId =  global.userID+'_'+item.user._id+'_'+item.postID
        //    }else{
        //     global.childId = item.user._id+'_'+global.userID+'_'+item.postID
        // }
        global.dicChat = item
        global.childId = item.groupID
        console.log('item is',global.childId,item,global.userID)
        global.dicPost = {}
        global.isFromAdDetail = false
        firebase.database().ref(global.userID).child(global.childId).child(item._id).update({readStatus:'yes'})
        this.props.navigation.push('chatView')
    }

    render() {

        if(this.state.isLoading && this.state.arrUserDetail.length == 0){
            return(
                <Fragment>
                {Platform.OS=='ios'?<LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
            style={{height:global.notchHeight}}/>:null}<SafeAreaView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.75)" }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <Header name={global.languageData.My_Messages} props={this.props} showHome={true}  isChat={true} navName={'myaccount'}/>
                {/* <Header name={global.languageData.My_Messages} props={this.props} showHome={true}/> */}
              
                <View style={{ padding: 10,marginBottom:70,backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center' }}>
                    {/* <Modal visible={this.state.isLoading} 
                    style={{ alignItems: 'center',backgroundColor:'red',marginTop:100 }}> */}
                    <Image source={require('../assets/loader.gif')} style={{ width: 50, height: 50, }} />
                {/* </Modal> */}
            </View>
                
            </SafeAreaView>
            </Fragment>)
        }

        return (
            <Fragment>
                {Platform.OS=='ios'?<LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
            style={{height:global.notchHeight}}/>:null}
            <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.75)" }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <Header name={global.languageData.My_Messages} props={this.props} showHome={true}  isChat={true} navName={'myaccount'}/>
                {/* <Header name={global.languageData.My_Messages} props={this.props} showHome={true}/> */}
             
                <View style={{ padding: 10,marginBottom:70 }}>
                    <FlatList
                        data={this.state.arrUserDetail}
                        renderItem={({ item,index }) => (
                            
                            <TouchableOpacity onPress={()=>this.btnUserAction(item,index)} style={{borderRadius:5,borderColor:'rgb(242,242,242)',
                            borderWidth:1,padding:10,marginBottom:15,backgroundColor:item.readStatus == 'no'?'rgb(255,204,203)':'white'}}>
                                
                                <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomColor:'rgb(242,242,242)',borderBottomWidth:1}}>
                                    <Text style={{fontSize:15}}>{item.postTopic}</Text>
                                    <Text style={{fontSize:15,marginBottom:10,color:colors.lightgrey1}}>{moment(item.creationDate).format('DD MMM YYYY')}</Text>
                                </View>
                                
                                <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                <Image source={require('../assets/user_green_big.png')} style={{ width: 25, height: 25,marginRight:10,borderRadius: 30}} />
                                    <Text style={{fontSize:16,fontWeight:'bold'}}>{item.user.name == global.user.userFullName?item.userName:item.user.name}</Text>
                                </View>
                                {/* {item.readStatus == 'no'?<View style={{backgroundColor:'red',height:10,width:10,borderRadius:360,flexDirection:'row',alignSelf:'flex-end'}}></View>:null} */}
                                <Text style={{fontSize:14,marginTop:10,marginRight:5}}><Text style={{fontSize:14,color:colors.lightgrey1}}>{item.user._id==global.userID?'You':item.user.name}: </Text>{item.text}</Text>
                            </TouchableOpacity>
                        )}
                        style={{ marginTop: 10,padding:5 }}
                        ListEmptyComponent={() => (
                            <Text style={{ color: colors.lightgrey1, textAlign: 'center', marginTop: height / 4 }}>{this.state.isLoading?'':global.languageData.No_records_found}</Text>
                        )}
                        // onEndReached={() => {
                        //     this.setState({ pageMyAds: this.state.pageMyAds + 1 }, () => this.getMyAds())
                        // }}
                    />


                </View>
              
            </SafeAreaView>
            </Fragment>
        )
    }

}


function mapStateToProps(state) {
    return {
       

    };
}


export default compose(connect(mapStateToProps, {

}))(MyMessage);

