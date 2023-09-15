import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../colors'

export default function Button({ name, onPress, width, height, fontSize, borderRadius }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient start={{ x: 0.0, y: 0 }} end={{ x: 0.7, y: 0.1 }}
                colors={[colors.greenFrom, colors.greenTo]}
                style={{ height: height || 50, borderRadius: borderRadius || 10, width: width || '80%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                <Text style={{ fontSize: fontSize || 18, color: colors.white }}>{name}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}