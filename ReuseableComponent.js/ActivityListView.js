import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../colors'
import { getLanguageFromAsync, OpenSansSemiBold, RupeeSign } from '../src/validations'
import HTML from 'react-native-render-html';
import { Linking } from 'react-native';
import { translateText } from '../src/LanguageTranslation';
import SimpleToast from 'react-native-simple-toast';
import moment from 'moment';
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';

const { screenWidth, screenHeight } = Dimensions.get('window')
const renderersProps = {
    a: {
      onPress(event, url, htmlAttribs, target) {
        // Do stuff
        console.log('url is',url)
        Linking.openURL(url)
      }
    }
  }
export default function ActivityListView({ props,from, item,refresh, icon, impLinkView, width,deleteAdvertisemnt }) {
    const [linkName, setLinkName] = useState(item.linkName || item.title || item.advertiseTitle);
    const [linkInfo, setLinkInfo] = useState(item.linkInfo);
    const [showLoading, setShowLoading] = useState(global.isLanguageOtherThanEnglish);
    const [linkUrl, setLinkUrl] = useState(item.linkUrl);
    const [state, setState] = useState({
        item:item
    })


    useEffect(() => {
        setTimeout(async () => {
            if (impLinkView) {
                global.isLanguageOtherThanEnglish ?
                    await translateText([item.linkInfo, item.linkName], (result) => {
                        setLinkInfo(result[0].translatedText)
                        setLinkName(result[1].translatedText)
                        setShowLoading(false)
                    }, (err) => {
                        // SimpleToast.show('Something went wrong with translation')
                        setShowLoading(false)
                    })
                    : setShowLoading(false)
            } else {
                setShowLoading(false)
            }
        }, 10);
    }, [])

    const onTranslate=async()=>{
        // global.isLanguageOtherThanEnglish ?
     await translateText([item.advertiseTitle,item.advertiseDescription,item.cityName,item.categoryName] , (result) => {
        setLinkName(result[0].translatedText)
            // item.advertiseTitle = result[0].translatedText
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

    return (
        showLoading ?
            <View style={{ height: 100, alignItems: 'center', justifyContent: 'center', elevation: 2, borderRadius: 5, marginBottom: 10, backgroundColor: colors.white }}>
                <ActivityIndicator color={colors.green} size="large" />
            </View>
            :
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.white, elevation: 2, borderRadius: 5, marginBottom: 10, padding: 10 }}>
                <Image source={icon || require('../assets/sales_list_circular.png')} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
                <View style={{ width: width || '90%',}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text numberOfLines={2} style={{ fontFamily: OpenSansSemiBold }}>{linkName}</Text>
                    {impLinkView ? null :
                    <Text style={{ color: colors.lightgrey1, fontSize: 12, }}>{moment(item.advertiseCreatedDate).format("DD-MM-YYYY")}</Text>
                
                }

                {from == 'purchase' || from == 'sales' || from == 'rented'?<Menu>
                            <MenuTrigger>
                                <Image source={require('../assets/3_dots_menu_black.png')}
                                    style={{ width: 10, height: 15, resizeMode: 'contain', marginHorizontal: 5 }} />
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={{ width: 100, padding: 4, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: 18, }}>
                                <MenuOption onSelect={() => { props.navigation.navigate("postnewad", { data: from, refresh: () => { refresh() }, isEdit: true, item }) }} text={global.languageData.Edit} />
                                <MenuOption onSelect={() => { deleteAdvertisemnt(item) }} text={global.languageData.Remove} />
                            </MenuOptions>
                        </Menu>:null}
                        
                    </View>
                   
                    {impLinkView ? <View>
                        <HTML source={{ html: linkInfo }} contentWidth={Dimensions.get('window').width - 100} renderersProps={renderersProps}/>
                        {/* <Text numberOfLines={1} onPress={() => Linking.openURL(linkUrl)}
                                        style={{ color: colors.green, fontSize: 12, textDecorationLine: 'underline', marginTop: 5 }}>{linkUrl}</Text> */}
                    </View> :
                        <View >
                            {/* <Text style={{ fontSize: 13 }}>{RupeeSign} {item.price}</Text> */}
                            <Text style={{ fontSize: 13, }}>{item.advertiseDescription}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <Image source={require('../assets/location_green_small.png')}
                                    style={{ width: 12, height: 12, resizeMode: 'contain', marginRight: 5 }} />
                                <Text style={{ color: colors.green, fontSize: 12 }}>{item.cityName} {global.languageData.City}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10,width:'100%'}}>
                                <Text style={{ color: colors.black, fontSize: 12,marginTop:5 }}>{item.categoryName}</Text>
                                <TouchableOpacity onPress={onTranslate} >
                                                <Text style={{ marginTop: 1, fontSize: 13, color: colors.blueCalendar }}>{global.languageData.translate}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}
                </View>
                
            </View>
    )
}