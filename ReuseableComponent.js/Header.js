import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { OpenSansSemiBold } from '../src/validations'

export default function Header({ props, name, showRightIcon, rightAction, showLocationBelow, isArticle, showHome, showRefresh, showList, showFilter, showEdit, showCalendar,isSetting,navName,isChat }) {
    const { state, city } = global.location || { state: '', city: '' }
    return (
        <LinearGradient start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
            style={{ height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomRightRadius: 30, paddingTop: 10, paddingHorizontal: 10 }}>
            <TouchableOpacity onPress={() => isSetting?props.navigation.navigate(navName):isChat?props.navigation.navigate(navName):isArticle?props.navigation.navigate(navName):navName == 'home'?props.navigation.push('home'):props.navigation.goBack()} style={{height:35,width:35,justifyContent:'center'}}>
                <Image source={require('../assets/back_header.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
            </TouchableOpacity>
            <View>
                <Text style={{ fontSize: 18, fontFamily: OpenSansSemiBold, textAlign: 'center' }}>{name}</Text>
                {showLocationBelow ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../assets/location_header.png')} style={{ width: 12, height: 12, resizeMode: 'contain' }} />
                        <Text style={{ fontSize: 12, textAlign: 'center' }}> {city.cityName}, {state.stateName}  </Text>
                        <Image source={require('../assets/arrow_down_location.png')} style={{ width: 8, height: 8, resizeMode: 'contain' }} />
                    </View>
                    : null}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {showRightIcon ? <TouchableOpacity onPress={rightAction}>
                    <Image source={require('../assets/question_header.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                </TouchableOpacity> : <View style={{width:5}}/>}
                {showRefresh ? <TouchableOpacity onPress={rightAction}>
                    <Image source={require('../assets/change_header.png')} style={{ width: 18, height: 18, resizeMode: 'contain', marginRight: 10 }} />
                </TouchableOpacity> : <View style={{width:5}}/>}
                {showHome ? <TouchableOpacity onPress={() => { props.navigation.push('home') }}>
                    <Image source={require('../assets/home_header.png')} style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                </TouchableOpacity> : <View style={{width:5}}/>}
                {showList ? <TouchableOpacity onPress={rightAction}>
                    <Image source={require('../assets/list_header.png')} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                </TouchableOpacity> : <View style={{width:5}}/>}
                {showFilter ? <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../assets/filter_header.png')} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                </TouchableOpacity> : <View style={{width:5}}/>}
                {showEdit ? <TouchableOpacity onPress={rightAction}>
                    <Image source={require('../assets/edit_header.png')} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                </TouchableOpacity> : <View style={{width:5}}/>}
                {showCalendar ? <TouchableOpacity onPress={rightAction}>
                    <Image source={require('../assets/calendar_header.png')} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                </TouchableOpacity> : <View style={{width:5}}/>}
            </View>
        </LinearGradient>

    )
}