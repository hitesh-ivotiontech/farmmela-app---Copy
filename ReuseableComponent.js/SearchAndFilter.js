import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { colors } from '../colors'

export default function SearchAndFilter({ name,showSeacrh,filterAction, hideFilter, showCalendar, onChangeText }) {


    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                {showSeacrh?<View style={{ flex: hideFilter ? 1 : 0.95, height: 38, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.lightgrey, paddingHorizontal: 10, borderRadius: 20 }}>
                    <Image source={require('../assets/search_icon.png')}
                        style={{ width: 18, height: 18, resizeMode: 'contain', marginRight: 10 }} />
                    <TextInput
                        placeholder={name || "Search"}
                        style={{ flex: 1, padding: 0 }}
                        onChangeText={(text) => { onChangeText(text) }}
                    />
                </View>:<View style={{ flex: 0.95}}/>}
                {hideFilter ? null :
                    <TouchableOpacity onPress={filterAction}>
                        <Image source={require('../assets/filter_copy.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain',alignSelf:'flex-end'}}
                        />
                    </TouchableOpacity>
                }
                {showCalendar ? <TouchableOpacity onPress={filterAction}>
                    <Image source={require('../assets/calendar.png')}
                        style={{ width: 20, height: 20, resizeMode: 'contain', marginLeft: 12 }}
                    />
                </TouchableOpacity> : null

                }
            </View>

        </View>
    )
}