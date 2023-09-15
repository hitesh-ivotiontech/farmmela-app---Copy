import React,{Component, useCallback}from 'react';
import NetInfo from "@react-native-community/netinfo";
import {Alert,Platform} from "react-native";
import { translateText } from '../src/LanguageTranslation';

 export default class Utility extends React.Component{
     constructor (props){
         super(props);
         this.state = {
            responseData:'',
            lblLogin:global.languageData.Login,
            lblYouNeedToLogin:global.languageData.You_need_to_login_for_use_this_module,
            lblCancel:global.languageData.cancel
            
        };
        
       
     }

     componentDidUpdate=async()=>{
        
     
        
     }

     sendRequestPost (data,actionName){
      
     
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                NetInfo.fetch().then(stateOf => {
                    if(stateOf.isConnected == true){
                        // if(stateOf.isInternetReachable == true){
                            fetch(''+actionName,{
                                method: 'POST',
                                headers: new Headers({
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'auth': global.auth, // <-- Specifying the Content-Type
                                },console.log(actionName+' Filled data is : ',data),console.log('action name is : ',global.Url+actionName)),
                                body:'json=' + data
                            })
                            .then((response) => response.json())
                                .then((responseJson) => {
                                    console.log(actionName+' true response',responseJson);
                                    var status_ = responseJson[0].status;
                                    var message =responseJson [0].message;
                                    if(status_ !== 'true' ){
                                        console.log('false response:',message);
                                        reject(message);
                                    }else{
                                        // console.log('true response',responseJson);
                                        resolve(responseJson)
                                    }
                                    
                                }).catch((error) => {
                                    console.log('error is:',error);
                                });
                        // }else{
                           
                        //     Alert.alert(
                        //         'No Internet Connection',
                        //         'Your internet connection is OFF, Please turn ON.',
                        //         [
                        //             {text: 'Ok', },
                        //         ],
                        //         {cancelable: false},
                        //     );
                        //     reject('No Internet Connection');
                        // }
                    }else{
                       
                        Alert.alert(
                            'No Internet Connection',
                            'Your internet connection is OFF, Please turn ON.',
                            [
                                {text: 'Ok', },
                            ],
                            {cancelable: false},
                        );
                        reject('No Internet Connection');
                    }
                })
                
            }, 1);
    })
}

loginAlert=(props)=>{
    Alert.alert(
        this.state.lblLogin,
        this.state.lblYouNeedToLogin,
        [{ text:  this.state.lblLogin, onPress: () => {props.navigation.navigate('login')} },
            { text:  this.state.lblCancel, onPress: () => {  } },
        ],
        { cancelable: false },
    );
  }

 }
 

