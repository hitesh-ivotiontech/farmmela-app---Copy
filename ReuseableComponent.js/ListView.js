import moment from 'moment'
import React,{useEffect,useState,useCallback} from 'react'
import { Image, Text, TouchableOpacity, View,FlatList,Dimensions} from 'react-native'
import { colors } from '../colors'
import { BaseUrlProfilePic } from '../src/api/ServerConfig'
import { isServerSuccess, OpenSansSemiBold } from '../src/validations'
import Button from './Button'
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import { compose } from 'redux'
import { connect, useSelector } from 'react-redux'
import { BuySellRentActions } from '../src/actions'
import SimpleToast from 'react-native-simple-toast'
import { translateText } from '../src/LanguageTranslation';
import ImageZoomModal from '../ReuseableComponent.js/ImageZoomModal';
import FastImage from 'react-native-fast-image'
const { width, height } = Dimensions.get('window')



export default function ListView({ props, item, type, from, elevation, borderRadius, hideDate, refresh, deleteAdvertisemnt }) {
    const [state, setState] = useState({
        item:item,
    })
    const [isModalOpen, setisModalOpen] = useState(false);
    const [selectedImage, setselectedImage] = useState('');
    const [selectedIndex, setselectedIndex] = useState('');
    // let [lblViewMore,setlblViewMore] = useState('')
    
    // useEffect(
    //   async() => {
    //     global.isLanguageOtherThanEnglish ?
    //     await translateText('View More', (result) => {
    //         console.log("strTitle View Mor",result)
    //         // lblViewMore = result[0].translatedText
    //         setlblViewMore(result[0].translatedText)
    //     }, (err) => {
    //         setlblViewMore('View More')
    //     }):setlblViewMore('View More')
    //   },
    //   [lblViewMore],
    // )

     function btnOpenImageAction(item,index){
        console.log('item is,',item)
       global.isImageLoad = true
        // setState({selectedImage:item,isModalOpen:true,selectedIndex:index}) 
        console.log('btnOpenImageAction called',global.isImageLoad)  
        setTimeout(() => {
            setselectedImage(item)
            setisModalOpen(true)
            setselectedIndex(index)
        }, 300);
       
       
    }

    const btnRightAction=()=>{
        console.log('btnRightAction called',global.isImageLoad)
        global.isImageLoad = false
        if(selectedImage.length ==selectedIndex+1){
        }else{
            setselectedIndex(selectedIndex+1)
        }
    }

    const btnLeftAction=()=>{
        console.log('btnLeftAction called',global.isImageLoad)
        global.isImageLoad = false
        if(selectedIndex ==0){

        }else{
            setselectedIndex(selectedIndex-1)
        }
    }
    
    const onTranslate=async()=>{
        // global.isLanguageOtherThanEnglish ?
     await translateText([item.advertiseTitle,item.advertiseDescription,item.cityName,item.postcatName] , (result) => {

            item.advertiseTitle = result[0].translatedText
            item.advertiseDescription = result[1].translatedText
            item.cityName = result[2].translatedText
            item.categoryName = result[3].translatedText
            // setState({item.advertiseTitle:result[0].translatedText})
            setState({})
            // strTitle= result[0].translatedText
            console.log('tarnslated',result)
            
        }, (err) => {
            
        })//:null

    }
    // const onTranslate = setState(async() => {
    //     global.isLanguageOtherThanEnglish ?
    //     await translateText([item.advertiseTitle,] , (result) => {
    //         item.advertiseTitle = result[0].translatedText
            
    //         // strTitle= result[0].translatedText
    //         console.log('tarnslated',result)
            
    //     }, (err) => {
            
    //     }):null
    //   }, [item])
    
    
    var isImageAvailable = item.advertiseImages.split(',')[0]
    var arrImages = String(item.advertiseImages).split(',')

   // console.log("BaseUrlProfilePic--",BaseUrlProfilePic);
    
    return (
        <View style={{ width: '100%', flexDirection: 'row', elevation: elevation && 2, padding: 10, marginVertical: 10, backgroundColor: colors.white, borderRadius: borderRadius && 5 }}>
           <ImageZoomModal arrImages={selectedImage} isModalOpen={isModalOpen} selectedIndex={selectedIndex} 
           btnRightAction={btnRightAction} btnLeftAction={btnLeftAction} closeModalAction={()=>{console.log('closeModalAction called',global.isImageLoad)  ,global.isImageLoad = false,setisModalOpen(false)}}/>
            {/* <View style={{ width: isImageAvailable ? '76%' : '100%', }}> */}
            <View style={{ width:'100%', }}>
           
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontFamily: OpenSansSemiBold, width: '70%', }}>{item.advertiseTitle}</Text>
                    {hideDate ? null : <Text style={{ color: colors.lightgrey1, fontSize: 12, }}>{moment(item.advertiseCreatedDate).format("DD-MM-YYYY")}</Text>
                    }
                    {type == 'myads' ?
                        <Menu>
                            <MenuTrigger>
                                <Image source={require('../assets/3_dots_menu_black.png')}
                                    style={{ width: 10, height: 15, resizeMode: 'contain', marginHorizontal: 5 }} />
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={{ width: 100, padding: 4, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: 18, }}>
                                <MenuOption onSelect={() => { props.navigation.navigate("postnewad", { data: from, refresh: () => { refresh() }, isEdit: true, item }) }} text={global.languageData.Edit} />
                                <MenuOption onSelect={() => { deleteAdvertisemnt(item) }} text={global.languageData.Remove} />
                            </MenuOptions>
                        </Menu>
                        : null}
                </View>
                <Text style={{ fontSize: 13, }}>{item.advertiseDescription}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Image source={require('../assets/location_green_small.png')}
                        style={{ width: 12, height: 12, resizeMode: 'contain', marginRight: 5 }} />
                    <Text style={{ color: colors.green, fontSize: 12 }}>{item.cityName} {global.languageData.City}</Text>
                </View>
                <Text style={{ color: colors.black, fontSize: 12,marginTop:5 }}>{item.postcatName}</Text>
                {isImageAvailable ? <View style={{ width: '100%', }}>
                {/* <Image source={{ uri: BaseUrlProfilePic + item.advertiseImages.split(',')[0] }}
                    style={{ width: 60, height: 60, marginRight: 10, borderRadius: 10 }} /> */}

            <FlatList
            data={arrImages}
            style={{ width: width-30 }}
            horizontal={true}
            pagingEnabled={true}

            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) =>
            <TouchableOpacity onPress={()=>btnOpenImageAction(arrImages,index)}>
                {/* <Image source={{uri: BaseUrlProfilePic + item }} style={{ width: 55, height: 55,marginTop:10,marginBottom:8,marginRight:10, borderRadius: 5 }} /> */}
                <FastImage
                    style={{ width: 55, height: 55,marginTop:10,marginBottom:8,marginRight:10, borderRadius: 5 }}
                    source={{
                        uri: BaseUrlProfilePic + item,
                        priority: FastImage.priority.normal,
                    }}
                    // resizeMode={FastImage.resizeMode.contain}
            />
            </TouchableOpacity>
            }/>
            </View> : null}
                <View style={{flexDirection:'row',justifyContent:'flex-end',marginBottom:10}}>
                
                <TouchableOpacity onPress={onTranslate} style={{alignSelf:'flex-end'}}>
                                <Text style={{ marginTop: 1, fontSize: 13, color: colors.blueCalendar }}>{global.languageData.translate}</Text>
                </TouchableOpacity>
                </View>
               
                
                {type == 'buy' || type == 'sell' || type == 'rent' || type =='showadd'  ?
                    <View style={{ alignItems: 'flex-end' }}>
                        <Button name={global.languageData.View_More} width={130} height={35} fontSize={15} borderRadius={15}
                            onPress={() => { props.navigation.navigate('addetails', { item, from }) }} />
                    </View> : null}
                    
            </View>
        </View>
    )

}