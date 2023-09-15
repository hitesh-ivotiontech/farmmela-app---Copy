import React from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground, Dimensions, Text, FlatList,BackHandler, TouchableOpacity, TextInput, } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import Header from '../ReuseableComponent.js/Header';
import HomeHeader from '../ReuseableComponent.js/HomeHeader';
import { isEmpty, OpenSansSemiBold } from '../src/validations';
const { width, height } = Dimensions.get('window')
import { translateText } from '../src/LanguageTranslation';

class GeneralInfo extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            categories: [
                {
                    name: global.languageData.Cash_Crops, image: require("../assets/grid_cash_crops.png"), color: '#C6BFEF', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Cash_Crops, category: [
                            {
                                image: require('../assets/important_links.png'),
                                name:global.languageData?global.languageData.Important_Links:'',
                                nav: 'importantlinks'
                            },
                            {
                                image: require('../assets/market_rates_msp_information.png'),
                                name: global.languageData?global.languageData.Market_Rates:'',
                                nav: 'marketprice'
                            },
                            {
                                image: require('../assets/general_knowledge.png'),
                                name: global.languageData?global.languageData.General_Knowledge:'',
                                nav: 'generalknowledge'
                            },
                            {
                                image: require('../assets/eco_friendly.png'),
                                name: global.languageData?global.languageData.Eco_Friendly:'',
                                nav: 'dropdowntext',
                                label: 'Eco Friendly Practices'
                            },
                            {
                                image: require('../assets/organic_farming.png'),
                                name: global.languageData?global.languageData.Organic_Farming:'',
                                nav: 'dropdowntext',
                                label: 'Organic Farming'
                            },
                        ], categoryID: "1", color: colors.CashCropsGrid
                    }
                },
                {
                    name: global.languageData.Fruits, image: require("../assets/grid_fruits.png"), color: '#FCE876', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Fruits, category: [
                            {
                                image: require('../assets/important_links.png'),
                                name: global.languageData?global.languageData.Important_Links:'',
                                nav: 'importantlinks'
                            },
                            {
                                image: require('../assets/general_knowledge.png'),
                                name: global.languageData?global.languageData.General_Knowledge:'',
                                nav: 'generalknowledge'
                            },
                            {
                                image: require('../assets/harvest_to_storage.png'),
                                name:global.languageData?global.languageData.Harvest_to_Storage:'',
                                nav: 'dropdowntext'
                            },
                            {
                                image: require('../assets/organic_farming.png'),
                                name: global.languageData?global.languageData.Organic_Farming:'',
                                nav: 'dropdowntext',
                                label: 'Oragnic Farming'
                            },
                        ], categoryID: "2", color: colors.FruitsGrid
                    }
                },
                {
                    name: global.languageData.Vegetables, image: require("../assets/grid_vegetables.png"), color: '#BDE38D', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Vegetables, category: [
                            {
                                image: require('../assets/important_links.png'),
                                name: global.languageData?global.languageData.Important_Links:'',
                                nav: 'importantlinks'
                            },
                            {
                                image: require('../assets/general_knowledge.png'),
                                name: global.languageData?global.languageData.General_Knowledge:'',
                                nav: 'generalknowledge'
                            },
                            {
                                image: require('../assets/harvest_to_storage.png'),
                                name:global.languageData?global.languageData.Harvest_to_Storage:'',
                                nav: 'dropdowntext'
                            },
                            {
                                image: require('../assets/organic_farming.png'),
                                name: global.languageData?global.languageData.Organic_Farming:'',
                                nav: 'dropdowntext',
                                label: 'Oragnic Farming'
                            },
                        ], categoryID: "3", color: colors.VegetablesGrid
                    }
                },
                {
                    name: global.languageData.Spices, image: require("../assets/grid_spices.png"), color: '#FFDAA9', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Spices, category: [
                            {
                                image: require('../assets/important_links.png'),
                                name: global.languageData?global.languageData.Important_Links:'',
                                nav: 'importantlinks'
                            },
                            {
                                image: require('../assets/general_knowledge.png'),
                                name: global.languageData?global.languageData.General_Knowledge:'',
                                nav: 'generalknowledge'
                            },
                            {
                                image: require('../assets/harvest_to_storage.png'),
                                name:global.languageData?global.languageData.Harvest_to_Storage:'',
                                nav: 'dropdowntext'
                            },
                            {
                                image: require('../assets/organic_farming.png'),
                                name: global.languageData?global.languageData.Organic_Farming:'',
                                nav: 'dropdowntext',
                                label: 'Oragnic Farming'
                            },
                        ], categoryID: "4", color: colors.SpicesGrid
                    }
                },
                {
                    name: global.languageData.Dairy, image: require("../assets/grid_dairy.png"), color: '#C2F1FE', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Dairy, category: [
                            {
                                image: require('../assets/important_links.png'),
                                name: global.languageData?global.languageData.Important_Links:'',
                                nav: 'importantlinks'
                            },
                            {
                                image: require('../assets/general_knowledge.png'),
                                name: global.languageData?global.languageData.General_Knowledge:'',
                                nav: 'generalknowledge'
                            },
                            {
                                image: require('../assets/disease_management.png'),
                                name: global.languageData?global.languageData.Disease_Management:'',
                                nav: 'dropdowntext'
                            },
                            {
                                image: require('../assets/milking_to_transportation.png'),
                                name: global.languageData?global.languageData.Milking_to_Transportation:'',
                                nav: 'dropdowntext',
                            },
                            {
                                image: require('../assets/organic_farming.png'),
                                name:  global.languageData?global.languageData.Oragnic_Products:'',
                                nav: 'dropdowntext',
                            },
                        ], categoryID: "5", color: colors.DairyGrid
                    }
                },
                {
                    name: global.languageData.Livestock, image: require("../assets/grid_livestock.png"), color: '#FFE9B5', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Livestock, category: [
                            {
                                image: require('../assets/important_links.png'),
                                name: global.languageData?global.languageData.Important_Links:'',
                                nav: 'importantlinks'
                            },
                            {
                                image: require('../assets/general_knowledge.png'),
                                name: global.languageData?global.languageData.General_Knowledge:'',
                                nav: 'generalknowledge'
                            },
                            {
                                image: require('../assets/disease_management.png'),
                                name: global.languageData?global.languageData.Disease_Management:'',
                                nav: 'dropdowntext'
                            },
                            {
                                image: require('../assets/breeding.png'),
                                name: global.languageData?global.languageData.Breeding:'',
                                nav: 'dropdowntext',
                            },
                            {
                                image: require('../assets/loan_options.png'),
                                name: global.languageData?global.languageData.Loan_Options:'',
                                nav: 'dropdowntext',
                            },
                        ], categoryID: "6", color: colors.LivestocksGrid
                    }
                },
                {
                    name: global.languageData.Fishery, image: require("../assets/grid_fishery.png"), color: '#E0DADA', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Fishery, category: [
                            {
                                image: require('../assets/important_links.png'),
                                name: global.languageData?global.languageData.Important_Links:'',
                                nav: 'importantlinks'
                            },
                            {
                                image: require('../assets/general_knowledge.png'),
                                name: global.languageData?global.languageData.General_Knowledge:'',
                                nav: 'generalknowledge'
                            },
                            {
                                image: require('../assets/maintenance_hygiene.png'),
                                name: global.languageData?global.languageData.Maintenance_Hygiene:'',
                                nav: 'dropdowntext'
                            },
                            {
                                image: require('../assets/capture_to_transport.png'),
                                name: global.languageData?global.languageData.Capture_to_Transport:'',
                                nav: 'dropdowntext',
                            },
                            {
                                image: require('../assets/license_guidelines.png'),
                                name: global.languageData?global.languageData.License_Guidelines:'',
                                nav: 'dropdowntext',
                            },
                        ], categoryID: "7", color: colors.FisheryGrid
                    }
                },
                {
                    name:global.languageData.Flowers, image: require("../assets/grid_flowers.png"), color: '#E0DDFC', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Flowers, category: [
                            {
                                image: require('../assets/important_links.png'),
                                name: global.languageData?global.languageData.Important_Links:'',
                                nav: 'importantlinks'
                            },
                            {
                                image: require('../assets/general_knowledge.png'),
                                name: global.languageData?global.languageData.General_Knowledge:'',
                                nav: 'generalknowledge'
                            },
                            {
                                image: require('../assets/harvest_to_storage.png'),
                                name:global.languageData?global.languageData.Harvest_to_Storage:'',
                                nav: 'dropdowntext'
                            },
                            {
                                image: require('../assets/organic_farming.png'),
                                name: global.languageData?global.languageData.Organic_Farming:'',
                                nav: 'dropdowntext',
                                label: 'Oragnic Farming'
                            },
                        ], categoryID: "8", color: colors.FlowersGrid
                    }
                },
                {
                    name: global.languageData.Handicraft, image: require("../assets/grid_handicraft.png"), color: '#E3D273', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Handicraft, category: [
                            {
                                image: require('../assets/important_links.png'),
                                name: global.languageData?global.languageData.Important_Links:'',
                                nav: 'importantlinks'
                            },
                            {
                                image: require('../assets/schemes.png'),
                                name:  global.languageData?global.languageData.Schemes:'',
                                nav: 'dropdowntext'
                            },
                            {
                                image: require('../assets/general_knowledge.png'),
                                name: global.languageData?global.languageData.General_Knowledge:'',
                                nav: 'generalknowledge'
                            },
                            {
                                image: require('../assets/workshops.png'),
                                name: global.languageData?global.languageData.Workshops:'',
                                nav: 'importantlinks',
                            },
                        
                        ], categoryID: "9", color: colors.HandicraftGrid
                    }
                },
             
           
                
            ],
        }
        console.log('UNSAFE_componentWillReceiveProps called')
        console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount=async()=>{
      
         
    }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick = () => {
    this.props.navigation.push('home')
    return true;
}

    UNSAFE_componentWillReceiveProps(){
        console.log('UNSAFE_componentWillReceiveProps called')
    }

    componentWillReceiveProps(){
        console.log('componentWillReceiveProps called')
    }

    did


    render() {

        return (
            // <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.75)" }}>
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <HomeHeader props={this.props} showImage={true} showSearch={false} />
               
              

                            <FlatList
                            data={this.state.categories}
                            numColumns={3}
                            keyExtractor={item => item.name}
                            renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => { item.nav ? this.props.navigation.push(item.nav, { item }) : SimpleToast.show('Service not available') }}
                                style={{ backgroundColor: item.color, borderRadius: 10, width: '31.5%', height: Platform.OS=='ios'?height*0.1056:(height - 60) / 1.87 / 4 - 8.5, alignItems: 'center', justifyContent: 'center', opacity: 1 }}>
                                <Image source={item.image} style={{ width: '100%', height: '60%', resizeMode: 'contain' }} />
                                <Text>{item.name}</Text>
                                {/* {item.isComingSoon ? <Text style={{ position: 'absolute', right: 0, top: '32%', backgroundColor: 'red', color: colors.white, padding: 5, textAlign: 'center', fontSize: 12, width: '100%' }}>Coming Soon</Text> : null} */}
                            </TouchableOpacity>
                            )}
                            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
                            contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
                            />

                {/* <Text style={{ position: 'absolute', right: 0, top: '55%', backgroundColor: 'red', color: colors.white, padding: 10, textAlign: 'center', width: '100%', opacity: 0.7 }}>Coming Soon</Text> */}

                        
            {/* </SafeAreaView> */}
            </View>

        )
    }

}



function mapStateToProps(state) {
    return {


    };
}


{/* <FlatList
data={this.state.category}
keyExtractor={item => item.name}
numColumns={2}
renderItem={({ item }) => (
    <TouchableOpacity
        onPress={() => { item.nav ? this.props.navigation.push(item.nav, { item }) : SimpleToast.show('Service not available') }}
        style={{ backgroundColor: colors.white, alignItems: 'center', flex: 0.485, marginBottom: 10, elevation: 0.2, padding: 10 }}>
        <Image source={item.image} style={{ width: 45, height: 50, resizeMode: 'contain' }} />
        <Text style={{ fontFamily: OpenSansSemiBold }}>{item.name}</Text>
    </TouchableOpacity>
)}
columnWrapperStyle={{ justifyContent: 'space-between' }}
style={{ margin: 10, }}
/> */}

export default compose(connect(mapStateToProps, {

}))(GeneralInfo);