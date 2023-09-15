import AsyncStorage from "@react-native-community/async-storage"
import RNFetchBlob from "react-native-fetch-blob"
import SimpleToast from "react-native-simple-toast"
import { BaseUrl } from "./api/ServerConfig"
import { Alert } from "react-native"
import firebase, {RemoteMessage} from 'react-native-firebase';

export const OpenSansSemiBold = 'OpenSans-SemiBold'
export const RupeeSign = '₹'
export const DotSign = '•'
export const DegreeSign = "°"

// export const seFRMMGTEXPInAsync = async (body, success) => {
//     await AsyncStorage.setItem('FRMMGTEXP',JSON.stringify(body))
//     global.isEditMgtExp = body.value;
//     global.isEditMgtExpbody = body;
//     success()
// }
export const storeDataisEditMgtExp = async (value) => {
    try {
      await AsyncStorage.setItem('isEditMgtExp', JSON.stringify(value))
      global.isEditMgtExp = body.value;
    } catch (e) {
      // saving error
    }
  }

export const setUserInAsync = async (user, success) => {
    await AsyncStorage.setItem('user', JSON.stringify(user))
    global.user = user
    global.userID = user.userID
    global.auth = user.randomvalue
    success()
}

export const getUserFromAsync = async (success) => {
    var user = JSON.parse(await AsyncStorage.getItem('user'));
    if (user != null) {
        global.user = user
        global.userID = user.userID
        global.auth = user.randomvalue
    }
    success(user)
}

export const logoutUser = async (props, success) => {
    // await AsyncStorage.removeItem('user');
    updateDeviceTokenApi()
    await AsyncStorage.clear()
    global.user = null
    global.userID = null
    global.auth = null
    global.showRedDot = false
    // global.location = null
    props.navigation.reset({
        index: 0, routes: [{
            name: 'login'
        }
        ]
    })
    success()
}
export const updateDeviceTokenApi=()=>{
    var body = {
        "loginuserID": global.userID,
        "userDeviceType": "Android",
        "userDeviceID": '',
        "apiType": "Android",
        "apiVersion": "2.0",
        "languageID":"1"
 }
 console.log("device token body", body)
    let config = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'auth': global.auth, 
        })
    }
    if (body !== "") {
        let newBody = JSON.stringify(body)
        config = { ...config, body: newBody }
    }
     fetch(global.Url+'users/user-update-device-token', config)
        .then(response=> response.json())
        .then(result => {
            var arrData = result[0].data[0]
            console.log("update device token Data is", arrData)
        }).catch(err => {
            console.log("update device token Error", err)
            
        })
}



export const validateName = (name, msg) => {
    var nameExp = /^[a-zA-Z ]{2,30}$/;
    if (isEmpty(name)) {
        // SimpleToast.show((msg ? msg : "Name") + ' cannot be empty')
        SimpleToast.show(global.languageData.Please_enter_Full_name)
        return false;
    } else if (!nameExp.test(name.trim())) {
        SimpleToast.show('Please enter valid ' + (msg ? msg.toLowerCase() : "name"))
        return false;
    } else {
        return true;
    }
}

export const validateEmail = (email, msg) => {
    var emailExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (isEmpty(email)) {
        SimpleToast.show((msg || "Email") + ' cannot be empty')
        return false;
    } else if (!emailExp.test(email.trim())) {
        SimpleToast.show('Please enter valid ' + (msg ? msg.toLowerCase() : "Email"))
        return false;
    } else {
        return true;
    }
}


export const validatePhone = (phone) => {
    var phoneExp = /^\d{10}$/;
    if (isEmpty(phone)) {
        SimpleToast.show('Mobile number cannot be empty')
        return false;
    } else if (!phoneExp.test(phone.trim())) {
        SimpleToast.show('Please enter valid mobile number')
        return false;
    } else {
        return true;
    }
}


export const validateOTP = (otp, otpInput, that) => {
    var otpExp = /^\d{6}$/;
    if (isNaN(otp)) {
        SimpleToast.show('OTP cannot cantain any special character')
        that.setState({ otp: "" })
        return false;
    } else {
        if (isEmpty(otp)) {
            SimpleToast.show("Please enter OTP")
            otpInput.focusField(1)
            otpInput.focusField(0)
            return false;
        } else if (!otpExp.test(otp.trim())) {
            SimpleToast.show('Please enter valid 6 digit otp')
            return false;
        } else {
            return true;
        }
    }
}

export const validatePassword = (password) => {
    if (isEmpty(password)) {
        SimpleToast.show('Password cannot be empty')
        return false;
    } else if (password.length < 6) {
        SimpleToast.show('Password length should be greater than 5')
        return false;
    } else {
        return true;
    }
}

export const Image_Upload_To_Server = (filetype, FilePath, path, success) => {
    global.imageUploading = true
    RNFetchBlob.fetch('POST', BaseUrl + 'users/file-upload', {
        Authorization: "Bearer access-token",
        otherHeader: "foo",
        'Content-Type': 'multipart/form-data',
    }, [
        // element with property `filename` will be transformed into `file` in form data
        { name: 'FileField', filename: filetype, data: RNFetchBlob.wrap(path) },

        // elements without property `filename` will be sent as plain text
        { name: 'FilePath', data: FilePath },
        {
            name: 'json', data: JSON.stringify([{
                "loginuserID": global.userID,
                "apiType": "Android",
                "apiVersion": "2.0"
            }])
        },

    ]).then((resp) => {

        var data = resp.data;
        var substr = "true";
        var result = data.includes(substr) > -1;
        console.log('dataaas', result);

        if (result == false) {
            console.log('image not upload', data);
            // this.Image_Upload_To_Server();
            global.imageUploading = false
        }
        else {
            console.log('Image uploaded successfully', data);
            global.imageUploading = false
            success(filetype)

            // this.updateProfileApi()

        }
        console.log('response of image upload', resp);
    }).catch((err) => {
        SimpleToast.show(global.ErrorMsg, Toast.LONG);
        console.log('Error in image', err);
    })

};


export const setLanguageInAsync = async (lang, success) => {
    await AsyncStorage.setItem('lang', JSON.stringify(lang))
    console.log('selected language is',lang)
    global.language = lang
    global.languageID = lang.languageID
    global.languageName = lang.languageName
    if (lang.languageName != "English") {
        global.isLanguageOtherThanEnglish = true
        global.targetLanguage = lang.languageCode
        global.sourceLanguage = 'en'
    }else{
        global.isLanguageOtherThanEnglish = false
        global.targetLanguage = lang.languageCode
        global.sourceLanguage = 'hi'
    }

    var body =   {
        "langLabelModule": "Customer",
        "languageID": global.languageID,
        "apiType": "Android",
        "apiVersion": "2.0"
      }
      console.log("language/list-labels", JSON.stringify(body))
    let config = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
        })
    }
    if (body !== "") {
        let newBody = JSON.stringify(body)
        config = { ...config, body: newBody }
    }
     fetch(global.Url+'language/list-labels', config)
        .then(response=> response.json())
        .then(result => {
            console.log("language/list-labels", result)
            if(result[0].status == 'false'){
                SimpleToast.show(global.languageData.No_records_found)
            }else{
                var arrData = result[0].data[0]
                global.languageData = arrData
                success()
            }
           
        }).catch(err => {
              console.log("language/list-labels Error", err)
        })
    
   
}

export const getLanguageFromAsync = async (success) => {
    var lang = JSON.parse(await AsyncStorage.getItem('lang'));
    if (lang != null) {
        global.language = lang
        global.languageID = lang.languageID
        global.languageName = lang.languageName
        if (lang.languageName != "English") {
            global.isLanguageOtherThanEnglish = true
            global.targetLanguage = lang.languageCode
            global.sourceLanguage = 'en'
            
        }else{
            global.isLanguageOtherThanEnglish = false
            global.targetLanguage = lang.languageCode
            global.sourceLanguage = 'hi'
        }

        var body =   {
            "langLabelModule": "Customer",
            "languageID": global.languageID,
            "apiType": "Android",
            "apiVersion": "2.0"
          }
       
        let config = {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            })
        }
        if (body !== "") {
            let newBody = JSON.stringify(body)
            config = { ...config, body: newBody }
        }
         fetch(global.Url+'language/list-labels', config)
            .then(response=> response.json())
            .then(result => {
                console.log("language/list-labels", result)
                if(result[0].status == 'false'){
                    SimpleToast.show(global.languageData.No_records_found)
                }else{
                    var arrData = result[0].data[0]
                    global.languageData = arrData
                    success(lang)
                }
               
            }).catch(err => {
                  console.log("language/list-labels Error", err)
            })
    
    }else{
        success(lang)
    }
   
    
}

export const getLanguageForLabelUpdate = async (success) => {
    var lang = JSON.parse(await AsyncStorage.getItem('lang'));
    if (lang != null) {
        global.language = lang
        global.languageID = lang.languageID
        global.languageName = lang.languageName
        if (lang.languageName != "English") {
            global.isLanguageOtherThanEnglish = true
            // global.targetLanguage = 'hi'
            global.sourceLanguage = 'en'
            global.targetLanguage = lang.languageCode
                    
        }else{
            global.isLanguageOtherThanEnglish = false
            global.targetLanguage = lang.languageCode
            global.sourceLanguage = 'hi'
        }    
        success(lang)
    }else{
        success(lang)
    }
   
    
}



export const isServerSuccess = ({ code, data }, props, success) => {
    console.log('Something went wrong',data)
    if (code == 200) {
        success(data[0])
    }
    if (code == 401) {
        global.user ?SimpleToast.show('Your session is expire, please login again'):''
        
        console.log('Something went wrong',code)
        
        // logoutUser(props, () => { })
    }
}


export const setLocationInAsync = async (location, success) => {
    await AsyncStorage.setItem('location', JSON.stringify(location))
    global.location = location
    console.log('user location setLocationInAsync',global.location)
    success()
}

export const getLocationFromAsync = async (success) => {
    var location = JSON.parse(await AsyncStorage.getItem('location'));
    if (location != null) {
        global.location = location
    }
    console.log('user location',global.location)
    success(location)
}


export const isEmpty = (text) => {
    if (text == "" || text == null || text == undefined) {
        return true
    } else {
        return false
    }
}

export const searchFilter = (text, data) => {
    var newData = data
    newData = newData.filter(filterBy(text))
    console.log('new data',text,newData)
    return newData;
}

const escapeRegExp = (str) => // or better use 'escape-string-regexp' package
    str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")

const filterBy = (term) => {
    const re = new RegExp(escapeRegExp(term), 'i')
    return person => {
        for (let prop in person) {
            if (!person.hasOwnProperty(prop)) {
                continue;
            }
            if (re.test(person[prop])) {
                return true;
            }
        }
        return false;
    }
}
