import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import  Utility  from '../ReuseableComponent.js/Utility';

export default function AddButton({ props, nav, data, refresh, isEdit }) {
    return (
        <TouchableOpacity onPress={() => {global.isEditForum = false,
            global.isEditArticle = false
            global.dictEditForum = {} ,
            global.user?nav == 'submitarticles'?props.navigation.push(nav):props.navigation.navigate((nav || "postnewad"),
             { data, refresh, isEdit, item: {} }):alertLogin(props)}}
            style={{ position: 'absolute', right: 0, bottom: 0 }} >
            <Image source={require('../assets/plus_circular_floating_btn.png')} style={{ width: 70, height: 70, resizeMode: 'contain', }} />
        </TouchableOpacity>

    )
}

function alertLogin(props){
    var ut = new Utility()
    ut.loginAlert(props)
}