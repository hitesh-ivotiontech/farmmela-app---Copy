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

class AgriServices extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            category: [
               
                { name: global.languageData.eNAM, image: require('../assets/agri_enam.png'), nav: 'dropdowntext', label: 'eNAM', agriPath: true, isComingSoon: false, },
                { name: global.languageData.FPO, image: require('../assets/agri_fpo.png'), nav: 'dropdowntext', label: 'FPO', showSearch: true, agriPath: true, isComingSoon: false },
                { name: global.languageData.Agri_Financing, image: require('../assets/agri_agri_financing.png'), nav: 'dropdowntext', label: 'Agri Financing', isComingSoon: false, },
                { name: global.languageData.Farm_Insurance, image: require('../assets/agri_farm_insurance.png'), nav: 'dropdowntext', label: 'Farm Insurance', isComingSoon: false, },
                {
                    name: global.languageData.Eco_Farm_Facilities, image: require('../assets/agri_eco_farm_facilities.png'), nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Eco_Farm_Facilities, isRowWise: true, category: [{
                            image: require('../assets/solar_schemes.png'),
                            name: global.languageData.Solar_Schemes,
                            nav: 'dropdowntext'
                        },
                        {
                            image: require('../assets/soil_testing.png'),
                            name: global.languageData.Soil_Testing,
                            nav: 'dropdowntext'
                        },
                        {
                            image: require('../assets/water_testing.png'),
                            name: global.languageData.Water_Testing,
                            nav: 'dropdowntext'
                        },
                        {
                            image: require('../assets/micro_irrigation.png'),
                            name: global.languageData.Micro_Irrigation,
                            nav: 'dropdowntext'
                        },]
                    }
                },
               
            ],


            category1234: [
                {
                    name: global.languageData.Farm_Management, image: require('../assets/agri_farm_management.png'), nav: 'categorydetails', isComingSoon: true,
                    data: {
                        name:global.languageData.Farm_Management, category: [{
                            image: require('../assets/farming_input_data.png'),
                            name: 'Input Data',
                            nav: 'inputdata'
                        },
                        {
                            image: require('../assets/farming_schedule.png'),
                            name: 'Schedule',
                            nav: 'schedule'
                        },
                        {
                            image: require('../assets/farming_summary.png'),
                            name: 'Summary',
                            nav: 'summary'
                        },]
                    }
                },
                {
                    name: global.languageData.Farm_Accounting, image: require('../assets/agri_farm_accounting.png'), nav: 'categorydetails', isComingSoon: true,
                    data: {
                        name: global.languageData.Farm_Accounting, isRowWise: true, category: [{
                            image: require('../assets/expense.png'),
                            name: 'Expense',
                            nav: 'expense'
                        },
                        {
                            image: require('../assets/revenue.png'),
                            name: 'Revenue',
                            nav: 'revenue'
                        },
                        {
                            image: require('../assets/summary.png'),
                            name: 'Summary',
                            nav: ''
                        },]
                    }
                },
                { name: global.languageData.eNAM, image: require('../assets/agri_enam.png'), nav: 'dropdowntext', label: 'eNAM', agriPath: true, isComingSoon: false, },
                { name: global.languageData.FPO, image: require('../assets/agri_fpo.png'), nav: 'dropdowntext', label: 'FPO', showSearch: true, agriPath: true, isComingSoon: false },
                { name: global.languageData.Agri_Financing, image: require('../assets/agri_agri_financing.png'), nav: 'dropdowntext', label: 'Agri Financing', isComingSoon: false, },
                { name: global.languageData.Farm_Insurance, image: require('../assets/agri_farm_insurance.png'), nav: 'dropdowntext', label: 'Farm Insurance', isComingSoon: false, },
                {
                    name: global.languageData.Eco_Farm_Facilities, image: require('../assets/agri_eco_farm_facilities.png'), nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Eco_Farm_Facilities, isRowWise: true, category: [{
                            image: require('../assets/solar_schemes.png'),
                            name: global.languageData.Solar_Schemes,
                            nav: 'dropdowntext'
                        },
                        {
                            image: require('../assets/soil_testing.png'),
                            name: global.languageData.Soil_Testing,
                            nav: 'dropdowntext'
                        },
                        {
                            image: require('../assets/water_testing.png'),
                            name: global.languageData.Water_Testing,
                            nav: 'dropdowntext'
                        },
                        {
                            image: require('../assets/micro_irrigation.png'),
                            name: global.languageData.Micro_Irrigation,
                            nav: 'dropdowntext'
                        },]
                    }
                },
                {
                    name: global.languageData.Farmers_Help, image: require('../assets/agri_farmer_help.png'), nav: 'dropdowntext', label: 'Farmers Help',
                    showSearch: true,
                    hideBelowArrow: true, isComingSoon: true,
                },
            ]
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


export default compose(connect(mapStateToProps, {

}))(AgriServices);