import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { DegreeSign, isEmpty, OpenSansSemiBold } from '../src/validations'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { BaseUrlProfilePic, WeatherApiKey } from '../src/api/ServerConfig'
import firebase, {RemoteMessage} from 'react-native-firebase';
import { GiftedChat } from 'react-native-gifted-chat'

var { width, height } = Dimensions.get('window')
height = (height - 80) / 3.14


export default function HomeHeader({ props, showSearch, showImage, showHome,onChangeText,showDot }) {

    const [temperature, setTemperature] = useState('')

    const [isundreadFound,getUnreadList] = useState(Boolean)
    const [messages, setMessage] = useState([])
    const [state, setState] = useState({
        item:[]
    })

    useEffect(() => {

        fetch(`http://api.weatherapi.com/v1/current.json?key=${WeatherApiKey}&q=${global.location.city.cityName}&aqi=no`).then(res =>
            res.json()).then(data => {
                setTemperature(data.current)
                console.log('location found',data,`http://api.weatherapi.com/v1/current.json?key=${WeatherApiKey}&q=${global.location.city.cityName}&aqi=no`)
            }).catch(err => { console.log('location error',err) });

            if(global.user){
                this.onDatabase(message =>{
                    setMessage(previousState => ({
                        messages: GiftedChat.append(previousState.messages, message),
                      }))
                    }
                  );
    
                  setTimeout(() => {
                    var arrTemp = []
                    this.getUserIndexData(message=>{
                          arrTemp.push(message)
                          console.log('home message added',message)
                    })
                    setTimeout(() => {
                      var isFound = arrTemp.findIndex(item => item.readStatus == 'no')
                      if(isFound == -1){
                          global.showRedDot = false
                        //   getUnreadList(true)
                      }else{
                          global.showRedDot = true
                        //   getUnreadList(true)
                      }
                      setState({})
                      console.log('isFound called home',isFound)
                    }, 1000);
                }, 4000);
            }
    }, [])

    onDatabase = callback =>
    firebase.database().ref(global.userID).limitToFirst(100).on('child_added', snapshot => callback(this.parseDatabase(snapshot)))

    getUserIndexData=callback=>{

        let arrNew = messages.messages
        console.log('arrNew found', messages)
        var isDictEmpty = Object.keys(messages).length===0?true:false
            if(isDictEmpty == false){
                for(var i=0;i<arrNew.length;i++){
                    console.log('for loop',arrNew[i]._id)
                    firebase.database().ref(global.userID).child(arrNew[i]._id).limitToLast(1).on('child_added', snapshot => callback(this.parseDatabase(snapshot)))
                }    
            }
            
        
        
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



     

    return (
        showImage ?
            <ImageBackground source={require('../assets/header_illstration.png')}
                style={{ width: '100%', height: height / 1.928, justifyContent: 'space-evenly', paddingBottom: 12 }} imageStyle={{ resizeMode: 'stretch', }}>
                {locationView(props, temperature, showHome)}
                {showSearch ?
                    <View style={{ width: '90%', alignSelf: 'center', borderRadius: 20, backgroundColor: "rgba(255,255,255,0.8)", paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../assets/search_icon.png')} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 15 }} />
                        <TextInput placeholder="Search"
                         onChangeText={(text) => { onChangeText(text) }}
                            style={{ padding: 0, flex: 1 }} />
                    </View> : null}
            </ImageBackground>
            :
            <LinearGradient start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
                style={{ paddingBottom: 12, borderBottomRightRadius: 30 }}>
                {locationView(props, temperature, showHome)}

            </LinearGradient>
    )
}

function locationView(props, temperature, showHome) {
    const { state, city } = global.location
    const user = global.user
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 30, paddingHorizontal: 10 }}>
            <View>
            <Image source={require('../assets/FarmMela_logo.png')} style={{ width: 50, height: 50, resizeMode: 'contain',marginBottom:10 }} />
            </View>
            <View
                style={{ width: '55%' }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={()=>props.navigation.navigate('location', { from: 'home' },{from:'home'})}>
                    <Image source={require('../assets/location_header.png')} style={{ width: 13, height: 13, resizeMode: 'contain' }} />
                    <Text style={{ marginHorizontal: 5, fontFamily: OpenSansSemiBold, fontSize: 13 }}>{city.cityName}, {state.stateName}</Text>
                    <Image source={require('../assets/arrow_down_location.png')} style={{ width: 10, height: 10, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 12 }}>{temperature ? parseInt(temperature.temp_c) : '_'}{DegreeSign} C</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                {showHome ? <TouchableOpacity onPress={() => { props.navigation.navigate('home') }} style={{ padding: 10 }}>
                    <Image source={require('../assets/home_header.png')} style={{ width: 22, height: 22, resizeMode: 'contain', }} />
                </TouchableOpacity> : null}
                <TouchableOpacity onPress={() => { props.navigation.push('notification') }} style={{ padding: 10 }}>
                <Image source={require('../assets/notification_header.png')} style={{ width: 20, height: 20, resizeMode: 'contain',top:global.showRedDot?5:0 }} />
                {global.showRedDot?<View style={{backgroundColor:'red',height:10,width:10,borderRadius:360,bottom:20,left:5,flexDirection:'row',alignSelf:'flex-end'}}></View>:null}
                    
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => { props.navigation.push('myaccount') }} style={{ padding: 10, marginRight: -10 }}>
                    <Image source={isEmpty(user) ? require('../assets/user_green_big.png') : { uri: BaseUrlProfilePic + user.userProfilePicture }} style={{ width: 22, height: 22, borderRadius: 60, }} />
                </TouchableOpacity> */}

            </View>
        </View>
    )
}