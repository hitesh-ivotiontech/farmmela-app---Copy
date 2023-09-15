import AsyncStorage from '@react-native-community/async-storage';
import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView, Dimensions,Platform, Text, FlatList, TouchableOpacity,BackHandler, ImageBackground, TextInput, ScrollView, ActivityIndicator, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import { DegreeSign, isServerSuccess, OpenSansSemiBold,searchFilter} from '../src/validations';
import AppIntroSlider from 'react-native-app-intro-slider';
import HomeHeader from '../ReuseableComponent.js/HomeHeader';
import SimpleToast from 'react-native-simple-toast';
import { CommonActions } from '../src/actions';
import { BaseUrlImages } from '../src/api/ServerConfig';
var { width, height } = Dimensions.get('window')
import firebase, {RemoteMessage} from 'react-native-firebase';

import  type { Notification, NotificationOpen} from 'react-native-firebase';
import { translateText } from '../src/LanguageTranslation';

const cashCrops = [
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
]

const fruits = [
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
]


const dairy = [
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
]


const livestock = [
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
]


const fishery = [
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
]


const handicraft = [
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

]


const naarishakti = [
    {
        image: require('../assets/important_links.png'),
        name: global.languageData?global.languageData.Important_Links:'',
        nav: 'importantlinks'
    },
    {
        image: require('../assets/women_empowerment.png'),
        name: global.languageData?global.languageData.Empowerment:'',
        nav: 'categorydetails',
        data: {
            name: global.languageData?global.languageData.Empowerment:'', isRowWise: true, category: [{
                image: require('../assets/social_equality.png'),
                name:global.languageData?global.languageData.Social_Equality:'',
                nav: 'dropdowntext'
            },
            {
                image: require('../assets/economic_equality.png'),
                name: global.languageData?global.languageData.Economic_Equality:'',
                nav: 'dropdowntext'
            },
            {
                image: require('../assets/politics_equality.png'),
                name: global.languageData?global.languageData.Political_Equality:'',
                nav: 'dropdowntext'
            },
            {
                image: require('../assets/psychological_equality.png'),
                name: global.languageData?global.languageData.Psychological_Equality:'',
                nav: 'dropdowntext'
            },
            ]
        }
    },
    {
        image: require('../assets/schemes_incentives.png'),
        name: global.languageData?global.languageData.Schemes_Incentives:'',
        nav: 'dropdowntext'
    },
    {
        image: require('../assets/ngo.png'),
        name: global.languageData?global.languageData.NGOs:'',
        nav: 'dropdowntext'
    },
    {
        image: require('../assets/articles.png'),
        name: global.languageData?global.languageData.Articles:'',
        nav: 'articles'
    },
]



class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            banner: [],
            activeSlide: 0,
            categories: [
                {
                    name: global.languageData.Buy, image: require("../assets/buy_icon.png"), color: '#C6BFEF', nav: 'buy', isComingSoon: false,
                   
                },
                {
                    name: global.languageData.Sell, image: require("../assets/sell_icon.png"), color: '#FCE876', nav: 'sell', isComingSoon: false,
                  
                },
                {
                    name: global.languageData.Rent, image: require("../assets/rent_icons.png"), color: '#BDE38D', nav: 'rent', isComingSoon: false,
                   
                },
                {
                    name: global.languageData.Forum, image: require("../assets/forum_icon.png"), color: '#FFDAA9', nav: 'forum', isComingSoon: false,
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
                    name: global.languageData.Farm_Management, image: require("../assets/farm_management_icon.png"), color: '#C2F1FE', nav: 'categorydetails', isComingSoon: false,
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
                    name: global.languageData.Farm_Accounting, image: require("../assets/farm_accounting_icon.png"), color: '#FFE9B5', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Farm_Accounting, isRowWise: true, category: [{
                            image: require('../assets/expense.png'),
                            name: 'Expense',
                            nav: 'addexpense'
                        },
                        {
                            image: require('../assets/revenue.png'),
                            name: 'Revenue',
                            nav: 'addrevenue'
                        },
                        {
                            image: require('../assets/summary.png'),
                            name: 'Summary',
                            nav: 'addsummary'
                        },]
                    }
                },
                {
                    name: global.languageData.News_Feed, image: require("../assets/newsfeed_icon.png"), color: '#E0DADA', nav: 'newsfeed', isComingSoon: false,
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
                // {
                //     name:global.languageData.Flowers, image: require("../assets/grid_flowers.png"), color: '#E0DDFC', nav: 'categorydetails', isComingSoon: false,
                //     data: {
                //         name: global.languageData.Flowers, category: [
                //             {
                //                 image: require('../assets/important_links.png'),
                //                 name: global.languageData?global.languageData.Important_Links:'',
                //                 nav: 'importantlinks'
                //             },
                //             {
                //                 image: require('../assets/general_knowledge.png'),
                //                 name: global.languageData?global.languageData.General_Knowledge:'',
                //                 nav: 'generalknowledge'
                //             },
                //             {
                //                 image: require('../assets/harvest_to_storage.png'),
                //                 name:global.languageData?global.languageData.Harvest_to_Storage:'',
                //                 nav: 'dropdowntext'
                //             },
                //             {
                //                 image: require('../assets/organic_farming.png'),
                //                 name: global.languageData?global.languageData.Organic_Farming:'',
                //                 nav: 'dropdowntext',
                //                 label: 'Oragnic Farming'
                //             },
                //         ], categoryID: "8", color: colors.FlowersGrid
                //     }
                // },
                // {
                //     name: global.languageData.Handicraft, image: require("../assets/grid_handicraft.png"), color: '#E3D273', nav: 'categorydetails', isComingSoon: false,
                //     data: {
                //         name: global.languageData.Handicraft, category: [
                //             {
                //                 image: require('../assets/important_links.png'),
                //                 name: global.languageData?global.languageData.Important_Links:'',
                //                 nav: 'importantlinks'
                //             },
                //             {
                //                 image: require('../assets/schemes.png'),
                //                 name:  global.languageData?global.languageData.Schemes:'',
                //                 nav: 'dropdowntext'
                //             },
                //             {
                //                 image: require('../assets/general_knowledge.png'),
                //                 name: global.languageData?global.languageData.General_Knowledge:'',
                //                 nav: 'generalknowledge'
                //             },
                //             {
                //                 image: require('../assets/workshops.png'),
                //                 name: global.languageData?global.languageData.Workshops:'',
                //                 nav: 'importantlinks',
                //             },
                        
                //         ], categoryID: "9", color: colors.HandicraftGrid
                //     }
                // },
                { name: global.languageData.Weather, image: require("../assets/grid_weather.png"), color: '#B2DAFB', nav: 'weather', isComingSoon: false, },
                   { name: global.languageData.Nearby, image: require("../assets/grid_nearby.png"), color: '#65E5D7', nav: 'nearby', isComingSoon: false, },
             
                {
                    name: global.languageData.Nari_Shakti, image: require("../assets/grid_naari_shakti.png"), color: '#FDB4D1', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name:global.languageData.Nari_Shakti, category: [
                            {
                                image: require('../assets/important_links.png'),
                                name: global.languageData?global.languageData.Important_Links:'',
                                nav: 'importantlinks'
                            },
                            {
                                image: require('../assets/women_empowerment.png'),
                                name: global.languageData?global.languageData.Empowerment:'',
                                nav: 'categorydetails',
                                data: {
                                    name: global.languageData?global.languageData.Empowerment:'', isRowWise: true, category: [{
                                        image: require('../assets/social_equality.png'),
                                        name:global.languageData?global.languageData.Social_Equality:'',
                                        nav: 'dropdowntext'
                                    },
                                    {
                                        image: require('../assets/economic_equality.png'),
                                        name: global.languageData?global.languageData.Economic_Equality:'',
                                        nav: 'dropdowntext'
                                    },
                                    {
                                        image: require('../assets/politics_equality.png'),
                                        name: global.languageData?global.languageData.Political_Equality:'',
                                        nav: 'dropdowntext'
                                    },
                                    {
                                        image: require('../assets/psychological_equality.png'),
                                        name: global.languageData?global.languageData.Psychological_Equality:'',
                                        nav: 'dropdowntext'
                                    },
                                    ]
                                }
                            },
                            {
                                image: require('../assets/schemes_incentives.png'),
                                name: global.languageData?global.languageData.Schemes_Incentives:'',
                                nav: 'dropdowntext'
                            },
                            {
                                image: require('../assets/ngo.png'),
                                name: global.languageData?global.languageData.NGOs:'',
                                nav: 'dropdowntext'
                            },
                            {
                                image: require('../assets/articles.png'),
                                name: global.languageData?global.languageData.Articles:'',
                                nav: 'articles'
                            },
                        ], categoryID: "10",
                    }
                },
                { name: "Farm Schemes", image: require("../assets/farm_scheme.png"), color: '#B2DAFB', nav: 'farmschemes', isComingSoon: false, },
             //   { name: global.languageData.Nearby, image: require("../assets/grid_nearby.png"), color: '#65E5D7', nav: 'nearby', isComingSoon: false, },
            ],

            categories123: [
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
             
                {
                    name: global.languageData.Nari_Shakti, image: require("../assets/grid_naari_shakti.png"), color: '#FDB4D1', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name:global.languageData.Nari_Shakti, category: [
                            {
                                image: require('../assets/important_links.png'),
                                name: global.languageData?global.languageData.Important_Links:'',
                                nav: 'importantlinks'
                            },
                            {
                                image: require('../assets/women_empowerment.png'),
                                name: global.languageData?global.languageData.Empowerment:'',
                                nav: 'categorydetails',
                                data: {
                                    name: global.languageData?global.languageData.Empowerment:'', isRowWise: true, category: [{
                                        image: require('../assets/social_equality.png'),
                                        name:global.languageData?global.languageData.Social_Equality:'',
                                        nav: 'dropdowntext'
                                    },
                                    {
                                        image: require('../assets/economic_equality.png'),
                                        name: global.languageData?global.languageData.Economic_Equality:'',
                                        nav: 'dropdowntext'
                                    },
                                    {
                                        image: require('../assets/politics_equality.png'),
                                        name: global.languageData?global.languageData.Political_Equality:'',
                                        nav: 'dropdowntext'
                                    },
                                    {
                                        image: require('../assets/psychological_equality.png'),
                                        name: global.languageData?global.languageData.Psychological_Equality:'',
                                        nav: 'dropdowntext'
                                    },
                                    ]
                                }
                            },
                            {
                                image: require('../assets/schemes_incentives.png'),
                                name: global.languageData?global.languageData.Schemes_Incentives:'',
                                nav: 'dropdowntext'
                            },
                            {
                                image: require('../assets/ngo.png'),
                                name: global.languageData?global.languageData.NGOs:'',
                                nav: 'dropdowntext'
                            },
                            {
                                image: require('../assets/articles.png'),
                                name: global.languageData?global.languageData.Articles:'',
                                nav: 'articles'
                            },
                        ], categoryID: "10",
                    }
                },
                { name: global.languageData.Weather, image: require("../assets/grid_weather.png"), color: '#B2DAFB', nav: 'weather', isComingSoon: false, },
                { name: global.languageData.Nearby, image: require("../assets/grid_nearby.png"), color: '#65E5D7', nav: 'nearby', isComingSoon: false, },
            ],

            arrMain:[
                {
                    name: global.languageData.Cash_Crops, image: require("../assets/grid_cash_crops.png"), color: '#C6BFEF', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Cash_Crops, category: cashCrops, categoryID: "1", color: colors.CashCropsGrid
                    }
                },
                {
                    name: global.languageData.Fruits, image: require("../assets/grid_fruits.png"), color: '#FCE876', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Fruits, category: fruits, categoryID: "2", color: colors.FruitsGrid
                    }
                },
                {
                    name: global.languageData.Vegetables, image: require("../assets/grid_vegetables.png"), color: '#BDE38D', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Vegetables, category: fruits, categoryID: "3", color: colors.VegetablesGrid
                    }
                },
                {
                    name: global.languageData.Spices, image: require("../assets/grid_spices.png"), color: '#FFDAA9', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Spices, category: fruits, categoryID: "4", color: colors.SpicesGrid
                    }
                },
                {
                    name: global.languageData.Dairy, image: require("../assets/grid_dairy.png"), color: '#C2F1FE', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Dairy, category: dairy, categoryID: "5", color: colors.DairyGrid
                    }
                },
                {
                    name: global.languageData.Livestock, image: require("../assets/grid_livestock.png"), color: '#FFE9B5', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Livestocks, category: livestock, categoryID: "6", color: colors.LivestocksGrid
                    }
                },
                {
                    name: global.languageData.Fishery, image: require("../assets/grid_fishery.png"), color: '#E0DADA', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Fishery, category: fishery, categoryID: "7", color: colors.FisheryGrid
                    }
                },
                {
                    name: global.languageData.Flowers, image: require("../assets/grid_flowers.png"), color: '#E0DDFC', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Flowers, category: fruits, categoryID: "8", color: colors.FlowersGrid
                    }
                },
                {
                    name: global.languageData.Handicraft, image: require("../assets/grid_handicraft.png"), color: '#E3D273', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name: global.languageData.Handicraft, category: handicraft, categoryID: "9", color: colors.HandicraftGrid
                    }
                },
                {
                    name: global.languageData.Nari_Shakti, image: require("../assets/grid_naari_shakti.png"), color: '#FDB4D1', nav: 'categorydetails', isComingSoon: false,
                    data: {
                        name:global.languageData.Nari_Shakti, category: naarishakti, categoryID: "10",
                    }
                },
                { name: global.languageData.Weather, image: require("../assets/grid_weather.png"), color: '#B2DAFB', nav: 'weather', isComingSoon: false, },
                { name: global.languageData.Nearby, image: require("../assets/grid_nearby.png"), color: '#65E5D7', nav: 'nearby', isComingSoon: false, },
            ]
        }
        console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }


    componentDidMount(){
        global.isChatOpen = false
        console.log('componentDidMount home',)
        this.createNotificationListeners()
       if(global.user){
           this.updateDeviceTokenApi()
       }
    }


    
    componentWillMount() {
        console.log('componentWillMount home',height)
        var body = {
            "loginuserID": global.userID || "1",
            "languageID": global.languageID,
            "cityName": global.location.city.cityName || "Bayad",
            "latitude": 11,
            "longitude": 11,
            "apiType": "Android",
            "apiVersion": "2.0",
            "page": 0,
            "pagesize": "50"
        }
        this.props.GetHomeBanner(body)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        console.log('home componentWillUnmount called new')
        // this.notificationOpenedListener();
        clearInterval(this.timeout)
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    async createNotificationListeners(){    
        const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
        const badgeCount = await firebase.notifications().getBadge();
        console.log('badge count is home',badgeCount)
        this.notificationOpenedListener =  await firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen, ) => {
            // Get the action triggered by the notification being opened
            console.log('badge count is home called',badgeCount)
            // triger in foreground
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;  
            var body = notification._data.type
    
            if (body.includes('chat')){
                this.props.navigation.push('myMessage')
            } 
            firebase.notifications().removeDeliveredNotification(notification.notificationId);
        });
    }

    updateDeviceTokenApi(){
        var body = {
            "loginuserID": global.userID,
            "userDeviceType": "Android",
            "userDeviceID": global.deviceToken,
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


    
    handleBackButtonClick = () => {
        BackHandler.exitApp()
        return true;
    }

    getCategory(){
        var body = {
            "loginuserID": global.userID,
            "languageID": global.languageID,
            "searchWord": "",
            "apiType": "Android",
            "apiVersion": "2.0"
        }
        this.props.GetAskQuestionCategory(body)
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('UNSAFE_componentWillReceiveProps home')
        if (nextProps.GetAskQuestionCategorySuccess) {
            var data = nextProps.GetAskQuestionCategoryInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    this.setState({ categoryList: response.data })
                }
            })
        }

        if (nextProps.GetHomeBannerSuccess) {
            var data = nextProps.GetHomeBannerInfo.details
            isServerSuccess(data, this.props, (response) => {
                if (response.status == "true") {
                    console.log('banner data',response)
                    let banner = response.banners
                    this.setState({ banner })
                    if (banner.length > 0) {
                        this.timeout = setInterval(() => {
                            this.changeSlide();
                        }, 5000)
                    }
                }
            })
        }

        
    }


   
    
    changeSlide = () => {
        if (this.state.activeSlide == this.state.banner.length - 1) {
            this.setState({ activeSlide: 0 })
            if(this.slider){
                this.slider.goToSlide(0)
            }
            
        } else {
            var i = this.state.activeSlide + 1
            this.setState({ activeSlide: i })
            if(this.slider){
            this.slider.goToSlide(i)
            }
        }

    };

    searchFromList(text) {
        this.setState({categories:searchFilter(text, this.state.categories)})
        if(text.length == 0){
            // this.setState({categories:this.state.arrMain})
        }
    }

    btnAdvertiseAction(item,index){
        this.props.navigation.navigate('advertisements', { data: this.state.banner,index })
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <HomeHeader props={this.props} showSearch={false} showImage={true} onChangeText={(text)=>this.searchFromList(text)} />

                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <AppIntroSlider
                        ref={ref => this.slider = ref}
                        data={this.state.banner}
                        keyExtractor={item => item.bannerImage}
                        renderItem={({ item,index }) => (
                            <TouchableOpacity onPress={() => this.btnAdvertiseAction(item,index)}
                                style={{}} >
                                <Image source={{ uri: BaseUrlImages + 'banners/' + item.bannerImage }} style={{ width: '100%', height:Platform.OS=='ios'?height*0.2376:(height - 160) / 2.14 / 1.5}} resizeMode="stretch" />
                                <View style={{ position: 'absolute', bottom: 5, width: '100%', padding: 10, alignSelf: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'center' }}>
                                        {this.state.banner.map((data, index) => (
                                            this.state.activeSlide == index ?
                                                <Image source={require('../assets/carousel_dot_green_selected.png')} style={{ width: 7, height: 7, resizeMode: 'contain', marginRight: 5 }} />
                                                : <Image source={require('../assets/carousel_dot_green_unselected.png')} style={{ width: 7, height: 7, resizeMode: 'contain', marginRight: 5 }} />
                                        ))}
                                        {this.state.banner.length > 7 ? <Text style={{ color: colors.green, fontFamily: OpenSansSemiBold }}>More</Text>
                                            : null}
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )}
                        style={{ marginTop: 10 }}
                        onSlideChange={(activeSlide => this.setState({ activeSlide }))}
                        showNextButton={false}
                        dotStyle={{ display: 'none' }}
                        activeDotStyle={{ display: 'none' }}
                        showDoneButton={false}
                        ListEmptyComponent={() => (
                            <View style={{ width: width, height: (height - 160) / 2.14 / 2.076, backgroundColor: colors.lightgrey, justifyContent: 'center' }} >
                                <ActivityIndicator animating={true} size={'large'} color={colors.green} />
                            </View>


                        )}
                    />

                    <FlatList
                        data={this.state.categories}
                        numColumns={3}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => { item.nav ? this.props.navigation.push(item.nav, { item }) : SimpleToast.show('Service not available') }}
                                style={{ backgroundColor: item.color, borderRadius: 10, marginEnd:5,marginStart:5,  flex:1, height: Platform.OS=='ios'?height*0.1056:(height - 60) / 1.87 / 4 - 8.5, alignItems: 'center', justifyContent: 'center', opacity: 1 }}>
                                <Image source={item.image} style={{ width: '100%', height: '60%', resizeMode: 'contain' }} />
                                <Text>{item.name}</Text>
                                {/* {item.isComingSoon ? <Text style={{ position: 'absolute', right: 0, top: '32%', backgroundColor: 'red', color: colors.white, padding: 5, textAlign: 'center', fontSize: 12, width: '100%' }}>Coming Soon</Text> : null} */}
                            </TouchableOpacity>
                        )}

                        
                        columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 10  }}
                      
                    />

                    
                </ScrollView>



            </View>
        )
    }

}

//<FlatList
//data={this.state.categories}
//numColumns={3}
//keyExtractor={item => item.name}
//renderItem={({ item }) => (
 //   <TouchableOpacity
  //      onPress={() => { item.nav ? this.props.navigation.push(item.nav, { item }) : SimpleToast.show('Service not available') }}
  //      style={{ backgroundColor: item.color, borderRadius: 10, width: '31.5%', height: Platform.OS=='ios'?height*0.1056:(height - 60) / 1.87 / 4 - 8.5, alignItems: 'center', justifyContent: 'center', opacity: 1 }}>
 //       <Image source={item.image} style={{ width: '100%', height: '60%', resizeMode: 'contain' }} />
 //       <Text>{item.name}</Text>
 //       {/* {item.isComingSoon ? <Text style={{ position: 'absolute', right: 0, top: '32%', backgroundColor: 'red', color: colors.white, padding: 5, textAlign: 'center', fontSize: 12, width: '100%' }}>Coming Soon</Text> : null} */}
 //   </TouchableOpacity>
////)}
//columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
//contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
///>

function mapStateToProps(state) {
    return {
        GetAskQuestionCategoryInfo: state.GetAskQuestionCategory,
        GetAskQuestionCategorySuccess: state.GetAskQuestionCategory.success,

        GetHomeBannerInfo: state.GetHomeBanner,
        GetHomeBannerSuccess: state.GetHomeBanner.success,


    };
}



export default compose(connect(mapStateToProps, {
    ...CommonActions
}))(Home);



