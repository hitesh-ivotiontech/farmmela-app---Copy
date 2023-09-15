import React, { Fragment } from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground, BackHandler, Dimensions, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Animated, ScrollView, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import Button from '../ReuseableComponent.js/Button';
import Header from '../ReuseableComponent.js/Header';
import { isEmpty, OpenSansSemiBold } from '../src/validations';
import ActionSheet from 'react-native-actionsheet';
import SimpleToast from 'react-native-simple-toast';
import { Modalize } from 'react-native-modalize';
import { Calendar } from 'react-native-calendars';
import Utility from '../ReuseableComponent.js/Utility';
import moment from 'moment';
import { translateText } from '../src/LanguageTranslation';
import AsyncStorage from '@react-native-community/async-storage';
const { width, height } = Dimensions.get('window')
var maxDate = ''
class InputData extends React.Component {
    filterModal = React.createRef();
    calendarModal = React.createRef();
    calendarModalwater = React.createRef();
    calendarModalCulti = React.createRef();
    calendarModalSowing = React.createRef();
    calendarModalfertilized = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: {},
            selectedSubCategory: {},
            date: '',
            yearSowed: {},
            totalAcres: '',
            soilType: '',
            daysLeftEmpty: '',
            waterProvided: '',
            canalTubewell: {},
            canalTubewellArray: [{ name: 'Canal' }, { name: 'Tubewell' }],
            groundWaterLevel: '',
            cultivated: '',
            tractorUsed: '',
            seedSowing: '',
            seedBrandUsed: {},
            seedQuantityUsedNum: '',
            seedQuantityUsedUnit: {},
            seedQuantityUnitArray: [{ name: 'Gram' }, { name: 'Kilogram' }],
            fertilizedOn: '',
            fertilizerBrand: {},
            fertilizerQuantityNum: '',
            fertilizerUsedUnit: {},
            fertilizerUsedUnitArray: [{ name: 'Gram' }, { name: 'Kilogram' }],
            categoryList: [],
            subCategoryList: [],
            lbl_Category: global.languageData.Category,
            lbl_Select_Category: global.languageData.Select_Category,
            lbl_Sub_Category: global.languageData.Sub_Category,
            lbl_Please_Select_Category: global.languageData.Please_Select_Category,
            lbl_Select_Sub_Category: global.languageData.Select_Sub_Category,
            lbl_Please_Select_Category: global.languageData.Please_Select_Category,
            lbl_Select_Sub_Category: global.languageData.Select_Sub_Category,
            lbl_Please_select_a_sub_category: global.languageData.Please_select_a_sub_category,
            lbl_Select_Brand: "Select Brand",
            SeedList: [],
            FertilizerList: [],
            PestisideList: [],
            yearOptionsList: [
                {year:new Date().getFullYear()-1},
                {year:new Date().getFullYear()},
                {year:new Date().getFullYear()+1},
            ],
            datenew: {},
            selectedDate: '',
            waterdatenew: {},
            selectedDatewater: '',
            datenewculti: {},
            selectedDateculti: '',
            datenewSowing: {},
            selectedDateSowing: '',
            datenewfertilized: {},
            selectedDatefertilized: '',

            lbl_Date: "Date",
            lbl_SelectDate: "Select Date",
            lbl_Year_Sowed: "Year Sowed",
            lbl_Select_Year_Sowed: "Select Year Sowed",
            lbl_Total_Acres: "Total Acres",
            lbl_Enter_Total_Acres: "Enter Total Acres",
            lbl_Days_Left_Empty: "Days Left Empty",
            lbl_Enter_Quantity: "Enter Quantity",
            lbl_Water_Provided: "Water Provided",
            lbl_Select_Date_of_Watering: "Select Date of Watering",
            lbl_Canal_Tubewell: "Canal / Tubewell",
            lbl_Select_Type: "Select Type",
            lbl_Select_any_one: "Select any one",
            lbl_Cultivated: "Cultivated",
            lbl_Select_Date_of_Cultivation: "Select Date of Cultivation",
            lbl_Tractor_used: "Tractor used",
            yesnoarray: ["Yes", "No"],
            lbl_Seed: "Seed",
            lbl_Sowing: "Sowing",
            lbl_Select_Date_of_Sowing: "Select Date of Sowing",
            lbl_Brand_Used: "Brand Used",
            lbl_Quantity_Used: "Quantity Used",
            lbl_Unit: "Unit",
            lbl_Select_Unit: "Select Unit",
            lbl_Fertilizer:"Fertilizer",
            lbl_Fertilized_on:"Fertilized on",
            lbl_Save:"Save",
            lbl_Next:"Next",


        }
        console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    SaveData() {
       /*  if (isEmpty(this.state.selectedCategory.categoryName)) {
            SimpleToast.show(this.state.lbl_Please_Select_Category)
        } else if (isEmpty(this.state.selectedSubCategory.subcatName)) {
            SimpleToast.show(this.state.lbl_Please_select_a_sub_category)
        } else if (isEmpty(this.state.selectedDate)) {
            SimpleToast.show("Please select Date")
        } else if (isEmpty(this.state.yearSowed.year)) {
            SimpleToast.show("Please select Year Sowed")
        } else if (isEmpty(this.state.totalAcres)) {
            SimpleToast.show("Please enter total Acres")
        } else if (isEmpty(this.state.daysLeftEmpty)) {
            SimpleToast.show("Please enter DaysLeftEmpty")
        } else if (isEmpty(this.state.selectedDatewater)) {
            SimpleToast.show("Please select Date of Water Provider")
        } else if (isEmpty(this.state.canalTubewell.name)) {
            SimpleToast.show("Please select canal Tubewell types")
        } else if (isEmpty(this.state.selectedDateculti)) {
            SimpleToast.show("Please select Date of Cultivated")
        } else if (isEmpty(this.state.tractorUsed)) {
            SimpleToast.show("Please select Tractor Used")
        } else if (isEmpty(this.state.selectedDateSowing)) {
            SimpleToast.show("Please select Date of Sowing")
        } else if (isEmpty(this.state.seedBrandUsed.brandName)) {
            SimpleToast.show("Please select Seed Brand")
        } else if (isEmpty(this.state.seedQuantityUsedNum)) {
            SimpleToast.show("Please enter seed Quantity Used")
        } else if (isEmpty(this.state.seedQuantityUsedUnit.name)) {
            SimpleToast.show("Please select seed Quantity Used Unit")
        } else if (isEmpty(this.state.selectedDatefertilized)) {
            SimpleToast.show("Please select Date of Fertilized")
        } else if (isEmpty(this.state.fertilizerBrand.brandName)) {
            SimpleToast.show("Please select Fertilized Brand")
        } else if (isEmpty(this.state.fertilizerQuantityNum)) {
            SimpleToast.show("Please enter Fertilized Quantity Used")
        } else if (isEmpty(this.state.fertilizerUsedUnit.name)) {
            SimpleToast.show("Please select Fertilized Quantity Used Unit")
        } */
        //{  }
        

        if (isEmpty(this.state.selectedCategory.categoryName)) {
            SimpleToast.show(this.state.lbl_Please_Select_Category)
        } else if (isEmpty(this.state.selectedSubCategory.subcatName)) {
            SimpleToast.show(this.state.lbl_Please_select_a_sub_category)
        } 
        // else if (isEmpty(this.state.selectedDate)) {
        //     SimpleToast.show("Please select Date")
        // }
         else if (isEmpty(this.state.yearSowed.year)) {
            SimpleToast.show("Please select Year Sowed")
        }
        //  else if (isEmpty(this.state.totalAcres)) {
        //     SimpleToast.show("Please enter total Acres")
        // } else if (isEmpty(this.state.daysLeftEmpty)) {
        //     SimpleToast.show("Please enter DaysLeftEmpty")
        // } else if (isEmpty(this.state.selectedDatewater)) {
        //     SimpleToast.show("Please select Date of Water Provider")
        // } else if (isEmpty(this.state.canalTubewell.name)) {
        //     SimpleToast.show("Please select canal Tubewell types")
        // } else if (isEmpty(this.state.selectedDateculti)) {
        //     SimpleToast.show("Please select Date of Cultivated")
        // } else if (isEmpty(this.state.tractorUsed)) {
        //     SimpleToast.show("Please select Tractor Used")
        // }
         else if (!isEmpty(this.state.selectedDateSowing) || !isEmpty(this.state.seedBrandUsed.brandName) || !isEmpty(this.state.seedQuantityUsedNum) || !isEmpty(this.state.seedQuantityUsedUnit.name)) {
            if (isEmpty(this.state.selectedDateSowing)) {
                SimpleToast.show("Please select Date of Sowing")
            }else if (isEmpty(this.state.seedBrandUsed.brandName)) {
                SimpleToast.show("Please select Seed Brand")
            } else if (isEmpty(this.state.seedQuantityUsedNum)) {
                SimpleToast.show("Please enter seed Quantity Used")
            } else if (isEmpty(this.state.seedQuantityUsedUnit.name)) {
                SimpleToast.show("Please select seed Quantity Used Unit")
            }  else if (!isEmpty(this.state.selectedDatefertilized) 
            || !isEmpty(this.state.fertilizerBrand.brandName) 
            || !isEmpty(this.state.fertilizerQuantityNum) 
            || !isEmpty(this.state.fertilizerUsedUnit.name)) {
                if (isEmpty(this.state.selectedDatefertilized)) {
                    SimpleToast.show("Please select Date of Fertilized")
                }else if (isEmpty(this.state.fertilizerBrand.brandName)) {
                    SimpleToast.show("Please select Fertilized Brand")
                } else if (isEmpty(this.state.fertilizerQuantityNum)) {
                    SimpleToast.show("Please enter Fertilized Quantity Used")
                } else if (isEmpty(this.state.fertilizerUsedUnit.name)) {
                    SimpleToast.show("Please select Fertilized Quantity Used Unit")
                } else {
                    var body = {
                        "loginuserID": global.userID,
                        "languageID": global.languageID,
                        "apiType": "Android",
                        "apiVersion": "2.0",
                        "value":"true",
                        "categoryID": this.state.selectedCategory.categoryID,
                        "categoryData": this.state.selectedCategory,
                        "subcatID": this.state.selectedSubCategory.subcatID,
                        "subcatDATA": this.state.selectedSubCategory,
                        "farmInputDate": this.state.selectedDate,
                        "farmInputDatearray": this.state.datenew,
                        "farmInputYearSowed": this.state.yearSowed,
                        "farmInputTotalAcres": this.state.totalAcres,
                        "farmInputDaysLeftEmpty": this.state.daysLeftEmpty,
                        "farmInputWaterProvided": this.state.selectedDatewater,
                        "farmInputWaterProvidedarray": this.state.waterdatenew,
                        "farmInputCanalTubewell": this.state.canalTubewell,
                        // "farmInputWaterLavel": this.state.groundWaterLevel,
                        "farmInputCultivated": this.state.selectedDateculti,
                        "farmInputCultivatedarray": this.state.datenewculti,
                        "farmInputTractorUsed": this.state.tractorUsed,
                        "seedSowingDate": this.state.selectedDateSowing,
                        "seedSowingDatearray": this.state.datenewSowing,
                        "seedBrand": this.state.seedBrandUsed,
                        "seedQuantity": this.state.seedQuantityUsedNum,
                        "seedUnit": this.state.seedQuantityUsedUnit,
                        "fertilizerOn": this.state.selectedDatefertilized,
                        "fertilizerOnarray": this.state.datenewfertilized,
                        "fertilizerBrand": this.state.fertilizerBrand,
                        "fertilizerQuantity": this.state.fertilizerQuantityNum,
                        "fertilizerUnit": this.state.fertilizerUsedUnit,
                    }
        
        
                    console.log("NextPage-->", JSON.stringify(body));
                    global.inputdataSave = body;
                   
                    this.saved(body)
                }
            }else {
                var body = {
                    "loginuserID": global.userID,
                "languageID": global.languageID,
                "apiType": "Android",
                "apiVersion": "2.0",
                "value":"true",
                "categoryID": this.state.selectedCategory.categoryID,
                "categoryData": this.state.selectedCategory,
                "subcatID": this.state.selectedSubCategory.subcatID,
                "subcatDATA": this.state.selectedSubCategory,
                "farmInputDate": this.state.selectedDate,
                "farmInputDatearray": this.state.datenew,
                "farmInputYearSowed": this.state.yearSowed,
                "farmInputTotalAcres": this.state.totalAcres,
                "farmInputDaysLeftEmpty": this.state.daysLeftEmpty,
                "farmInputWaterProvided": this.state.selectedDatewater,
                "farmInputWaterProvidedarray": this.state.waterdatenew,
                "farmInputCanalTubewell": this.state.canalTubewell,
                // "farmInputWaterLavel": this.state.groundWaterLevel,
                "farmInputCultivated": this.state.selectedDateculti,
                "farmInputCultivatedarray": this.state.datenewculti,
                "farmInputTractorUsed": this.state.tractorUsed,
                "seedSowingDate": this.state.selectedDateSowing,
                "seedSowingDatearray": this.state.datenewSowing,
                "seedBrand": this.state.seedBrandUsed,
                "seedQuantity": this.state.seedQuantityUsedNum,
                "seedUnit": this.state.seedQuantityUsedUnit,
                "fertilizerOn": this.state.selectedDatefertilized,
                "fertilizerOnarray": this.state.datenewfertilized,
                "fertilizerBrand": this.state.fertilizerBrand,
                "fertilizerQuantity": this.state.fertilizerQuantityNum,
                "fertilizerUnit": this.state.fertilizerUsedUnit,
                }
    
    
                console.log("NextPage-->", JSON.stringify(body));
                global.inputdataSave = body;
               
                    this.saved(body)
            }
        } 
            else if (!isEmpty(this.state.selectedDatefertilized) 
            || !isEmpty(this.state.fertilizerBrand.brandName) 
            || !isEmpty(this.state.fertilizerQuantityNum) 
            || !isEmpty(this.state.fertilizerUsedUnit.name)) {
            if (isEmpty(this.state.selectedDatefertilized)) {
                SimpleToast.show("Please select Date of Fertilized")
            }else if (isEmpty(this.state.fertilizerBrand.brandName)) {
                SimpleToast.show("Please select Fertilized Brand")
            } else if (isEmpty(this.state.fertilizerQuantityNum)) {
                SimpleToast.show("Please enter Fertilized Quantity Used")
            } else if (isEmpty(this.state.fertilizerUsedUnit.name)) {
                SimpleToast.show("Please select Fertilized Quantity Used Unit")
            } if (!isEmpty(this.state.selectedDateSowing) || !isEmpty(this.state.seedBrandUsed.brandName) || !isEmpty(this.state.seedQuantityUsedNum) || !isEmpty(this.state.seedQuantityUsedUnit.name)) {
                if (isEmpty(this.state.selectedDateSowing)) {
                    SimpleToast.show("Please select Date of Sowing")
                }else if (isEmpty(this.state.seedBrandUsed.brandName)) {
                    SimpleToast.show("Please select Seed Brand")
                } else if (isEmpty(this.state.seedQuantityUsedNum)) {
                    SimpleToast.show("Please enter seed Quantity Used")
                } else if (isEmpty(this.state.seedQuantityUsedUnit.name)) {
                    SimpleToast.show("Please select seed Quantity Used Unit")
                }else{
                    var body = {
                        "loginuserID": global.userID,
                    "languageID": global.languageID,
                    "apiType": "Android",
                    "apiVersion": "2.0",
                    "value":"true",
                    "categoryID": this.state.selectedCategory.categoryID,
                    "categoryData": this.state.selectedCategory,
                    "subcatID": this.state.selectedSubCategory.subcatID,
                    "subcatDATA": this.state.selectedSubCategory,
                    "farmInputDate": this.state.selectedDate,
                    "farmInputDatearray": this.state.datenew,
                    "farmInputYearSowed": this.state.yearSowed,
                    "farmInputTotalAcres": this.state.totalAcres,
                    "farmInputDaysLeftEmpty": this.state.daysLeftEmpty,
                    "farmInputWaterProvided": this.state.selectedDatewater,
                    "farmInputWaterProvidedarray": this.state.waterdatenew,
                    "farmInputCanalTubewell": this.state.canalTubewell,
                    // "farmInputWaterLavel": this.state.groundWaterLevel,
                    "farmInputCultivated": this.state.selectedDateculti,
                    "farmInputCultivatedarray": this.state.datenewculti,
                    "farmInputTractorUsed": this.state.tractorUsed,
                    "seedSowingDate": this.state.selectedDateSowing,
                    "seedSowingDatearray": this.state.datenewSowing,
                    "seedBrand": this.state.seedBrandUsed,
                    "seedQuantity": this.state.seedQuantityUsedNum,
                    "seedUnit": this.state.seedQuantityUsedUnit,
                    "fertilizerOn": this.state.selectedDatefertilized,
                    "fertilizerOnarray": this.state.datenewfertilized,
                    "fertilizerBrand": this.state.fertilizerBrand,
                    "fertilizerQuantity": this.state.fertilizerQuantityNum,
                    "fertilizerUnit": this.state.fertilizerUsedUnit,
                    }
        
        
                    console.log("NextPage-->", JSON.stringify(body));
                    global.inputdataSave = body;
                   
                    this.saved(body)
                }
            } else {
                var body = {
                    "loginuserID": global.userID,
                    "languageID": global.languageID,
                    "apiType": "Android",
                    "apiVersion": "2.0",
                    "value":"true",
                    "categoryID": this.state.selectedCategory.categoryID,
                    "categoryData": this.state.selectedCategory,
                    "subcatID": this.state.selectedSubCategory.subcatID,
                    "subcatDATA": this.state.selectedSubCategory,
                    "farmInputDate": this.state.selectedDate,
                    "farmInputDatearray": this.state.datenew,
                    "farmInputYearSowed": this.state.yearSowed,
                    "farmInputTotalAcres": this.state.totalAcres,
                    "farmInputDaysLeftEmpty": this.state.daysLeftEmpty,
                    "farmInputWaterProvided": this.state.selectedDatewater,
                    "farmInputWaterProvidedarray": this.state.waterdatenew,
                    "farmInputCanalTubewell": this.state.canalTubewell,
                    // "farmInputWaterLavel": this.state.groundWaterLevel,
                    "farmInputCultivated": this.state.selectedDateculti,
                    "farmInputCultivatedarray": this.state.datenewculti,
                    "farmInputTractorUsed": this.state.tractorUsed,
                    "seedSowingDate": this.state.selectedDateSowing,
                    "seedSowingDatearray": this.state.datenewSowing,
                    "seedBrand": this.state.seedBrandUsed,
                    "seedQuantity": this.state.seedQuantityUsedNum,
                    "seedUnit": this.state.seedQuantityUsedUnit,
                    "fertilizerOn": this.state.selectedDatefertilized,
                    "fertilizerOnarray": this.state.datenewfertilized,
                    "fertilizerBrand": this.state.fertilizerBrand,
                    "fertilizerQuantity": this.state.fertilizerQuantityNum,
                    "fertilizerUnit": this.state.fertilizerUsedUnit,
                }
    
    
                console.log("NextPage-->", JSON.stringify(body));
                global.inputdataSave = body;
             
                this.saved(body)
            }
        } else {
            var body = {
                "loginuserID": global.userID,
                "languageID": global.languageID,
                "apiType": "Android",
                "apiVersion": "2.0",
                "value":"true",
                "categoryID": this.state.selectedCategory.categoryID,
                "categoryData": this.state.selectedCategory,
                "subcatID": this.state.selectedSubCategory.subcatID,
                "subcatDATA": this.state.selectedSubCategory,
                "farmInputDate": this.state.selectedDate,
                "farmInputDatearray": this.state.datenew,
                "farmInputYearSowed": this.state.yearSowed,
                "farmInputTotalAcres": this.state.totalAcres,
                "farmInputDaysLeftEmpty": this.state.daysLeftEmpty,
                "farmInputWaterProvided": this.state.selectedDatewater,
                "farmInputWaterProvidedarray": this.state.waterdatenew,
                "farmInputCanalTubewell": this.state.canalTubewell,
                // "farmInputWaterLavel": this.state.groundWaterLevel,
                "farmInputCultivated": this.state.selectedDateculti,
                "farmInputCultivatedarray": this.state.datenewculti,
                "farmInputTractorUsed": this.state.tractorUsed,
                "seedSowingDate": this.state.selectedDateSowing,
                "seedSowingDatearray": this.state.datenewSowing,
                "seedBrand": this.state.seedBrandUsed,
                "seedQuantity": this.state.seedQuantityUsedNum,
                "seedUnit": this.state.seedQuantityUsedUnit,
                "fertilizerOn": this.state.selectedDatefertilized,
                "fertilizerOnarray": this.state.datenewfertilized,
                "fertilizerBrand": this.state.fertilizerBrand,
                "fertilizerQuantity": this.state.fertilizerQuantityNum,
                "fertilizerUnit": this.state.fertilizerUsedUnit,

              
            }


            console.log("NextPage-->", JSON.stringify(body));
            global.inputdataSave = body;
           
            this.saved(body)


        }



    }

    saved = async (value) => {
        try {
          await AsyncStorage.setItem(
            'isEditInputone',
            JSON.stringify(value),
          );
          //this.props.navigation.goBack();
        } catch (error) {
          // Error saving data
        }
      };
      _retrieveData = async () => {
        try {
            var values = JSON.parse(await AsyncStorage.getItem('isEditInputone'));
          const value = await AsyncStorage.getItem('isEditInputone');
          if (value !== null) {
            // We have data!!
            //console.log(value);
            global.isEditInputone = values.value;
            global.isEditInputonebody = values
            console.log("global.isEditInputonebody-->",  global.isEditInputonebody);
            if (global.isEditInputone === "true") {
                console.log("global.isEditInputone-->", global.isEditInputone);
               console.log("global.isEditInputonebody-->1", global.isEditInputonebody.categoryID);
              

               this.setState({
                categoryID: isEmpty(global.isEditInputonebody.categoryID) ? {} : global.isEditInputonebody.categoryID,
                subcatID: isEmpty(global.isEditInputonebody.subcatID) ? {} : global.isEditInputonebody.subcatID,
               
                selectedCategory: isEmpty(global.isEditInputonebody.categoryData) ? {} : global.isEditInputonebody.categoryData,
                selectedSubCategory: isEmpty(global.isEditInputonebody.subcatDATA) ? {} : global.isEditInputonebody.subcatDATA,
                selectedDate: global.isEditInputonebody.farmInputDate,
                datenew: isEmpty(global.isEditInputonebody.farmInputDatearray) ? {} : global.isEditInputonebody.farmInputDatearray,
                yearSowed: isEmpty(global.isEditInputonebody.farmInputYearSowed) ? {} : global.isEditInputonebody.farmInputYearSowed,
                totalAcres: global.isEditInputonebody.farmInputTotalAcres,
                daysLeftEmpty: global.isEditInputonebody.farmInputDaysLeftEmpty,
                selectedDatewater: global.isEditInputonebody.farmInputWaterProvided,
                waterdatenew:  isEmpty(global.isEditInputonebody.farmInputWaterProvidedarray) ? {} : global.isEditInputonebody.farmInputWaterProvidedarray,
                canalTubewell: isEmpty(global.isEditInputonebody.farmInputCanalTubewell) ? {} : global.isEditInputonebody.farmInputCanalTubewell,
                selectedDateculti: global.isEditInputonebody.farmInputCultivated,
                datenewculti: isEmpty(global.isEditInputonebody.farmInputCultivatedarray) ? {} : global.isEditInputonebody.farmInputCultivatedarray,
                tractorUsed: global.isEditInputonebody.farmInputTractorUsed,
                selectedDateSowing: global.isEditInputonebody.seedSowingDate,
                datenewSowing:isEmpty(global.isEditInputonebody.seedSowingDatearray) ? {} : global.isEditInputonebody.seedSowingDatearray,
                seedBrandUsed: isEmpty(global.isEditInputonebody.seedBrand) ? {} : global.isEditInputonebody.seedBrand,
                seedQuantityUsedNum: global.isEditInputonebody.seedQuantity,
                seedQuantityUsedUnit: isEmpty(global.isEditInputonebody.seedUnit) ? {} : global.isEditInputonebody.seedUnit,
                selectedDatefertilized: global.isEditInputonebody.fertilizerOn,
                datenewfertilized: isEmpty(global.isEditInputonebody.fertilizerOnarray) ? {} : global.isEditInputonebody.fertilizerOnarray,
                fertilizerBrand: isEmpty(global.isEditInputonebody.fertilizerBrand) ? {} : global.isEditInputonebody.fertilizerBrand,
                fertilizerQuantityNum: global.isEditInputonebody.fertilizerQuantity,
                fertilizerUsedUnit:isEmpty(global.isEditInputonebody.fertilizerUnit) ? {} : global.isEditInputonebody.fertilizerUnit,
            })

            this.getSubCategoryList(global.isEditInputonebody.categoryID)
            } else {
                console.log("global.isEditInputone-->1", global.isEditInputonebody);
    
            }
          }
        } catch (error) {
          // Error retrieving data
        }
      };



    componentWillMount() {


        const currentYear = new Date().getFullYear()-1; // 2020

      //  const previousYear =  currentYear-1;

    console.log("previousYear---",currentYear); // 2019


        var body = {
            "loginuserID": global.userID,
            "languageID": global.languageID,
            "searchWord": "",
            "apiType": "Android",
            "apiVersion": "2.0"
        }
        //this.props.GetAskQuestionCategory(body)
        this.GetMainCategoryList();
        //  this.getBrndType();
        this.getBrndTypeSeed();
        this.getBrndTypeFertilizer();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      //  this.setState({ yearOptionsList: this.yearOptions() })
        console.log("yeser-->", this.yearOptions());

        console.log("global.inputdataSave -->", global.inputdataSave);
        // if (!isEmpty(global.inputdataSave)) {
        //     this.setState({
        //         selectedCategory: isEmpty(global.inputdataSave.categoryData) ? {} : global.inputdataSave.categoryData,
        //         selectedSubCategory: isEmpty(global.inputdataSave.subcatDATA) ? {} : global.inputdataSave.subcatDATA,
        //         selectedDate: global.inputdataSave.farmInputDate,
        //         datenew: isEmpty(global.inputdataSave.farmInputDatearray) ? {} : global.inputdataSave.farmInputDatearray,
        //         yearSowed: isEmpty(global.inputdataSave.farmInputYearSowed) ? {} : global.inputdataSave.farmInputYearSowed,
        //         totalAcres: global.inputdataSave.farmInputTotalAcres,
        //         daysLeftEmpty: global.inputdataSave.farmInputDaysLeftEmpty,
        //         selectedDatewater: global.inputdataSave.farmInputWaterProvided,
        //         waterdatenew:  isEmpty(global.inputdataSave.farmInputWaterProvidedarray) ? {} : global.inputdataSave.farmInputWaterProvidedarray,
        //         canalTubewell: isEmpty(global.inputdataSave.farmInputCanalTubewell) ? {} : global.inputdataSave.farmInputCanalTubewell,
        //         selectedDateculti: global.inputdataSave.farmInputCultivated,
        //         datenewculti: isEmpty(global.inputdataSave.farmInputCultivatedarray) ? {} : global.inputdataSave.farmInputCultivatedarray,
        //         tractorUsed: global.inputdataSave.farmInputTractorUsed,
        //         selectedDateSowing: global.inputdataSave.seedSowingDate,
        //         datenewSowing:isEmpty(global.inputdataSave.seedSowingDatearray) ? {} : global.inputdataSave.seedSowingDatearray,
        //         seedBrandUsed: isEmpty(global.inputdataSave.seedBrand) ? {} : global.inputdataSave.seedBrand,
        //         seedQuantityUsedNum: global.inputdataSave.seedQuantity,
        //         seedQuantityUsedUnit: isEmpty(global.inputdataSave.seedUnit) ? {} : global.inputdataSave.seedUnit,
        //         selectedDatefertilized: global.inputdataSave.fertilizerOn,
        //         datenewfertilized: isEmpty(global.inputdataSave.fertilizerOnarray) ? {} : global.inputdataSave.fertilizerOnarray,
        //         fertilizerBrand: isEmpty(global.inputdataSave.fertilizerBrand) ? {} : global.inputdataSave.fertilizerBrand,
        //         fertilizerQuantityNum: global.inputdataSave.fertilizerQuantity,
        //         fertilizerUsedUnit:isEmpty(global.inputdataSave.fertilizerUnit) ? {} : global.inputdataSave.fertilizerUnit,
        //     })
        // }
        this._retrieveData()

        //maxDate = moment(currentDate).add(9,'days').format('YYYY-MM-DD')


        this.checktitle()
    }

    async checktitle() {
        if (global.isLanguageOtherThanEnglish) {
            await translateText([this.state.lbl_Select_Brand, this.state.lbl_Date, this.state.lbl_SelectDate, this.state.lbl_Year_Sowed,
            this.state.lbl_Select_Year_Sowed, this.state.lbl_Total_Acres, this.state.lbl_Enter_Total_Acres,
            this.state.lbl_Days_Left_Empty, this.state.lbl_Enter_Quantity, this.state.lbl_Water_Provided, this.state.lbl_Select_Date_of_Watering,
            this.state.lbl_Canal_Tubewell, this.state.lbl_Select_Type, this.state.lbl_Select_any_one, this.state.lbl_Cultivated, this.state.lbl_Select_Date_of_Cultivation,
            this.state.lbl_Tractor_used, "Yes", "No", this.state.lbl_Seed, this.state.lbl_Sowing,
            this.state.lbl_Select_Date_of_Sowing, this.state.lbl_Brand_Used, this.state.lbl_Quantity_Used, this.state.lbl_Unit,
            this.state.lbl_Select_Unit,this.state.lbl_Fertilizer,this.state.lbl_Fertilized_on,this.state.lbl_Save,this.state.lbl_Next], (result) => {


                console.log("lbl_Select_Brand -->", result[0].translatedText);
                this.setState({ lbl_Select_Brand: result[0].translatedText })
                this.setState({ lbl_Date: result[1].translatedText })
                this.setState({ lbl_SelectDate: result[2].translatedText })
                this.setState({ lbl_Year_Sowed: result[3].translatedText })
                this.setState({ lbl_Select_Year_Sowed: result[4].translatedText })
                this.setState({ lbl_Total_Acres: result[5].translatedText })
                this.setState({ lbl_Enter_Total_Acres: result[6].translatedText })
                this.setState({ lbl_Days_Left_Empty: result[7].translatedText })
                this.setState({ lbl_Enter_Quantity: result[8].translatedText })
                this.setState({ lbl_Water_Provided: result[9].translatedText })
                this.setState({ lbl_Select_Date_of_Watering: result[10].translatedText })
                this.setState({ lbl_Canal_Tubewell: result[11].translatedText })
                this.setState({ lbl_Select_Type: result[12].translatedText })
                this.setState({ lbl_Select_any_one: result[13].translatedText })
                this.setState({ lbl_Cultivated: result[14].translatedText })
                this.setState({ lbl_Select_Date_of_Cultivation: result[15].translatedText })
                this.setState({ lbl_Tractor_used: result[16].translatedText })
                this.setState({ yesnoarray: [result[17].translatedText, result[18].translatedText] })
                this.setState({ lbl_Seed: result[19].translatedText })
                this.setState({ lbl_Sowing: result[20].translatedText })
                this.setState({ lbl_Select_Date_of_Sowing: result[21].translatedText })
                this.setState({ lbl_Brand_Used: result[22].translatedText })
                this.setState({ lbl_Quantity_Used: result[23].translatedText })
                this.setState({ lbl_Unit: result[24].translatedText })
                this.setState({ lbl_Select_Unit: result[25].translatedText })
                this.setState({ lbl_Fertilizer: result[26].translatedText })
                this.setState({ lbl_Fertilized_on: result[27].translatedText })
                this.setState({ lbl_Save: result[28].translatedText })
                this.setState({ lbl_Next: result[29].translatedText })
                

                //this.setState({SeedList:resulta[0].data})

            }, (err) => {
                SimpleToast.show('Something went wrong with translation')
                // this.setState({SeedList:arrData})

                this.setState({ yesnoarray: ["Yes", "No"] })
            })
        } else {
            this.setState({ yesnoarray: ["Yes", "No"] })
            // this.setState({ SeedList: arrData })
        }
        var arrData = this.state.canalTubewellArray;
        var arrTemp = [];
        for (var i = 0; i < arrData.length; i++) {
            if (global.isLanguageOtherThanEnglish) {
                await translateText([arrData[i].name], (result) => {
                    var dict = {}

                    dict["name"] = result[0].translatedText

                    arrTemp.push(dict)
                    this.setState({ canalTubewellArray: arrTemp })
                    //this.setState({SeedList:resulta[0].data})
                }, (err) => {
                    SimpleToast.show('Something went wrong with translation')
                    console.log("canalTubewellArray", arrData[i].name)
                    // this.setState({SeedList:arrData})
                })
            }
        }

        var arrData1 = this.state.seedQuantityUnitArray;
        var arrTemp1 = [];
        for (var i = 0; i < arrData1.length; i++) {
            if (global.isLanguageOtherThanEnglish) {
                await translateText([arrData1[i].name], (result) => {
                    var dict = {}

                    dict["name"] = result[0].translatedText

                    arrTemp1.push(dict)
                    this.setState({ seedQuantityUnitArray: arrTemp1 })
                    //this.setState({SeedList:resulta[0].data})
                }, (err) => {
                    SimpleToast.show('Something went wrong with translation')
                    //console.log("canalTubewellArray", arrData[i].name)
                    // this.setState({SeedList:arrData})
                })
            }
        }


        

        var arrData2 = this.state.fertilizerUsedUnitArray;
        var arrTemp2 = [];
        for (var i = 0; i < arrData2.length; i++) {
            if (global.isLanguageOtherThanEnglish) {
                await translateText([arrData2[i].name], (result) => {
                    var dict = {}

                    dict["name"] = result[0].translatedText

                    arrTemp2.push(dict)
                    this.setState({ fertilizerUsedUnitArray: arrTemp2 })
                    //this.setState({SeedList:resulta[0].data})
                }, (err) => {
                    SimpleToast.show('Something went wrong with translation')
                    console.log("canalTubewellArray", arrData[i].name)
                    // this.setState({SeedList:arrData})
                })
            }
        }
        
    }


 

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.navigation.goBack()
        console.log('back click')
        //  this.props.navigation.navigate('forum')
        return true;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.GetAskQuestionCategorySuccess) {
            var data = nextProps.GetAskQuestionCategoryInfo.details

            isServerSuccess(data, this.props, async (response) => {
                if (response.status == "true") {
                    // this.setState({ categoryList: response.data })
                    var arrData = response.data
                    var arrTemp = []
                    //
                    for (var i = 0; i < arrData.length; i++) {
                        if (global.isLanguageOtherThanEnglish) {
                            await translateText([arrData[i].categoryID, arrData[i].categoryName, arrData[i].categoryArabicName, arrData[i].categoryImage, arrData[i].categoryStatus,
                            arrData[i].categoryCreatedDate, arrData[i].categoryDisplayOrder.replace(' ', '')], (result) => {

                                var dict = {}
                                dict["categoryID"] = result[0].translatedText.replace(' ', '')
                                dict["categoryName"] = result[1].translatedText
                                dict["categoryArabicName"] = result[2].translatedText
                                dict["categoryImage"] = result[3].translatedText
                                dict["categoryStatus"] = result[4].translatedText
                                dict["categoryCreatedDate"] = result[5].translatedText
                                dict["categoryDisplayOrder"] = result[6].translatedText
                                if (result[0].translatedText == '10') {

                                } else {

                                    arrTemp.push(dict)
                                }
                                var sortedData = arrTemp.sort((a, b) => a.categoryDisplayOrder - b.categoryDisplayOrder)
                                this.setState({ categoryList: sortedData })

                            }, (err) => {
                                SimpleToast.show('Something went wrong with translation')

                            })
                        } else {
                            var dict = {}
                            dict["categoryID"] = arrData[i].categoryID
                            dict["categoryName"] = arrData[i].categoryName
                            dict["categoryArabicName"] = arrData[i].categoryArabicName
                            dict["categoryImage"] = arrData[i].categoryImage
                            dict["categoryStatus"] = arrData[i].categoryStatus
                            dict["categoryCreatedDate"] = arrData[i].categoryCreatedDate
                            dict["categoryDisplayOrder"] = arrData[i].categoryDisplayOrder
                            if (arrData[i].categoryName == 'Narishakti') {

                            } else {
                                arrTemp.push(dict)
                            }
                            this.setState({ categoryList: arrTemp })
                        }

                    }
                    // setTimeout(() => {
                    //     this.getSubCategoryList(arrTemp[0].categoryID)
                    // }, 700); 

                }
            })
        }

        if (nextProps.GetAskQuestionSubCategorySuccess) {

            var data = nextProps.GetAskQuestionSubCategoryInfo.details

            isServerSuccess(data, this.props, async (response) => {
                if (response.status == "true") {
                    console.log('sub cateory response', response)

                    var arrData = response.data
                    var dict = {}
                    dict["subcatID"] = '111'
                    dict["categoryID"] = '111'
                    dict["subcatName"] = 'Other'
                    dict["subcatImage"] = 'other.png'
                    dict["subcatStatus"] = 'Active'
                    dict["categoryCreatedDate"] = '2022-02-09'
                    dict["subcatDisplayOrder"] = '111'
                    arrData.push(dict)
                    var arrTemp = []
                    for (var i = 0; i < arrData.length; i++) {
                        if (global.isLanguageOtherThanEnglish) {
                            await translateText([arrData[i].subcatID, arrData[i].categoryID, arrData[i].subcatName, arrData[i].subcatImage, arrData[i].subcatStatus,
                            arrData[i].subcatCreatedDate, arrData[i].subcatDisplayOrder], (result) => {

                                var dict = {}
                                dict["subcatID"] = result[0].translatedText
                                dict["categoryID"] = result[1].translatedText
                                dict["subcatName"] = result[2].translatedText
                                dict["subcatImage"] = result[3].translatedText
                                dict["subcatStatus"] = result[4].translatedText
                                dict["categoryCreatedDate"] = result[5].translatedText
                                dict["subcatDisplayOrder"] = result[6].translatedText

                                arrTemp.push(dict)
                                var sortedData = arrTemp.sort((a, b) => a.subcatDisplayOrder - b.subcatDisplayOrder)
                                this.setState({ subCategoryList: sortedData })

                            }, (err) => {
                                SimpleToast.show('Something went wrong with translation')

                            })
                        } else {
                            this.setState({ subCategoryList: response.data })
                        }

                    }

                }
            })
        }

    }


    yearOptions = () => {
        const currentYear = new Date().getFullYear();
        const yearArray = [];
        for (let year = 1; year <= 50; year++) {
            yearArray.push({ year });
        }
        return yearArray;
    };

    GetMainCategoryList() {
        var body = {
            "loginuserID": global.userID,
            "languageID": global.languageID,
            "searchWord": "",
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
        fetch(global.Url + 'masters/get-category-list', config)
            .then(response => response.json())
            .then(async resulta => {

                console.log("categoryList-->", JSON.stringify(resulta));



                if (resulta[0].status == "true") {
                    // this.setState({ categoryList: response.data })
                    var arrData = resulta[0].data

                    var arrTemp = []
                    //
                    for (var i = 0; i < arrData.length; i++) {

                        if (arrData[i].categoryName == 'Dairy' || arrData[i].categoryName == 'Livestock' || arrData[i].categoryName == 'Fishery'
                       || arrData[i].categoryName == 'Flowers' || arrData[i].categoryName == 'Handicraft' || arrData[i].categoryName == 'Narishakti' || arrData[i].categoryName == 'Others'
                        ) {
                            
                        } else {
                            if (global.isLanguageOtherThanEnglish) {
                                await translateText([arrData[i].categoryID, arrData[i].categoryName, arrData[i].categoryArabicName, arrData[i].categoryImage, arrData[i].categoryStatus,
                                arrData[i].categoryCreatedDate, arrData[i].categoryDisplayOrder.replace(' ', '')], (result) => {
    
                                    var dict = {}
                                    dict["categoryID"] = result[0].translatedText.replace(' ', '')
                                    dict["categoryName"] = result[1].translatedText
                                    dict["categoryArabicName"] = result[2].translatedText
                                    dict["categoryImage"] = result[3].translatedText
                                    dict["categoryStatus"] = result[4].translatedText
                                    dict["categoryCreatedDate"] = result[5].translatedText
                                    dict["categoryDisplayOrder"] = result[6].translatedText
                                    if (result[0].translatedText == '10') {
    
                                    } else {
    
                                        arrTemp.push(dict)
                                    }
                                    var sortedData = arrTemp.sort((a, b) => a.categoryDisplayOrder - b.categoryDisplayOrder)
    
                                    this.setState({ categoryList: sortedData })
    
                                }, (err) => {
                                    SimpleToast.show('Something went wrong with translation')
    
                                })
                            } else {
                                var dict = {}
                                dict["categoryID"] = arrData[i].categoryID
                                dict["categoryName"] = arrData[i].categoryName
                                dict["categoryArabicName"] = arrData[i].categoryArabicName
                                dict["categoryImage"] = arrData[i].categoryImage
                                dict["categoryStatus"] = arrData[i].categoryStatus
                                dict["categoryCreatedDate"] = arrData[i].categoryCreatedDate
                                dict["categoryDisplayOrder"] = arrData[i].categoryDisplayOrder
                                if (arrData[i].categoryName == 'Narishakti') {
    
                                } else {
                                    arrTemp.push(dict)
                                }
    
    
                                this.setState({ categoryList: arrTemp })
                            }  
                        }
                        

                    }
                   
                    // setTimeout(() => {
                    //     this.getSubCategoryList(arrTemp[0].categoryID)
                    // }, 700); 

                }

            }).catch(err => {

                console.log("language/list-labels Error", err)
            })

    }

    getSubCategoryList(catID) {
        console.log("farmhelp/get-farmhelp-list------1111", catID)
        this.setState({ subCategoryList: [] })
        var body = {
            "loginuserID": global.userID,
            "languageID": global.languageID,
            "searchWord": "",
            "categoryID": catID,
            "page": 0,
            "pagesize": 10,
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
        fetch(global.Url + 'masters/get-subcatgory-list', config)
            .then(response => response.json())
            .then(async resulta => {

                console.log("farmhelp/get-farmhelp-list------1111", resulta)

                if (resulta[0].status == "true") {
                    // this.setState({ categoryList: response.data })
                    var arrData = resulta[0].data

                    var dict = {}
                    dict["subcatID"] = '111'
                    dict["categoryID"] = '111'
                    dict["subcatName"] = 'Other'
                    dict["subcatImage"] = 'other.png'
                    dict["subcatStatus"] = 'Active'
                    dict["categoryCreatedDate"] = '2022-02-09'
                    dict["subcatDisplayOrder"] = '111'
                    arrData.push(dict)
                    var arrTemp = []
                    for (var i = 0; i < arrData.length; i++) {
                        if (global.isLanguageOtherThanEnglish) {
                            await translateText([arrData[i].subcatID, arrData[i].categoryID, arrData[i].subcatName, arrData[i].subcatImage, arrData[i].subcatStatus,
                            arrData[i].subcatCreatedDate, arrData[i].subcatDisplayOrder], (result) => {

                                var dict = {}
                                dict["subcatID"] = result[0].translatedText
                                dict["categoryID"] = result[1].translatedText
                                dict["subcatName"] = result[2].translatedText
                                dict["subcatImage"] = result[3].translatedText
                                dict["subcatStatus"] = result[4].translatedText
                                dict["categoryCreatedDate"] = result[5].translatedText
                                dict["subcatDisplayOrder"] = result[6].translatedText

                                arrTemp.push(dict)
                                var sortedData = arrTemp.sort((a, b) => a.subcatDisplayOrder - b.subcatDisplayOrder)
                                this.setState({ subCategoryList: sortedData })

                            }, (err) => {
                                SimpleToast.show('Something went wrong with translation')

                            })
                        } else {
                            this.setState({ subCategoryList: resulta[0].data })
                        }

                    }

                    // setTimeout(() => {
                    //     this.getSubCategoryList(arrTemp[0].categoryID)
                    // }, 700); 

                }

            }).catch(err => {

                console.log("language/list-labels Error", err)
            })
    }

    getBrndType() {
        // SeedList:[],
        // FertilizerList:[],
        // PestisideList:[],
        this.setState({ SeedList: [], FertilizerList: [], PestisideList: [] })
        var body = {
            "loginuserID": global.userID,
            "languageID": global.languageID,
            "searchWord": "",
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
        console.log("farmhelp/get-farmhelp-list------1111", global.Url + 'masters/get-brand-list', config)
        fetch(global.Url + 'masters/get-brand-list', config)
            .then(response => response.json())
            .then(async resulta => {



                if (resulta[0].status == "true") {
                    var arrData = resulta[0].data
                    var arrTemp = []
                    for (var i = 0; i < arrData.length; i++) {
                        if (arrData[i].brandType === 'Seed') {
                            console.log("arrData[i].brandType------1111", arrData[i].brandType)

                            if (global.isLanguageOtherThanEnglish) {
                                await translateText([arrData[i].brandID, arrData[i].brandName, arrData[i].brandType], (result) => {
                                    var dict = {}
                                    dict["brandID"] = result[0].translatedText
                                    dict["brandName"] = result[1].translatedText
                                    dict["brandType"] = result[2].translatedText
                                    arrTemp.push(dict)
                                    //   var sortedData = arrTemp.sort((a, b) => a.subcatDisplayOrder - b.subcatDisplayOrder)
                                    this.setState({ SeedList: arrTemp })
                                }, (err) => {
                                    SimpleToast.show('Something went wrong with translation')

                                })
                            } else {
                                this.setState({ SeedList: resulta[0].data })
                            }
                        } else if (arrData[i].brandType === 'Fertilizer') {
                            console.log("arrData[i].brandType------222", arrData[i].brandType)

                            if (global.isLanguageOtherThanEnglish) {
                                await translateText([arrData[i].brandID, arrData[i].brandName, arrData[i].brandType], (result) => {

                                    var dict = {}
                                    dict["brandID"] = result[0].translatedText
                                    dict["brandName"] = result[1].translatedText
                                    dict["brandType"] = result[2].translatedText


                                    arrTemp.push(dict)
                                    //   var sortedData = arrTemp.sort((a, b) => a.subcatDisplayOrder - b.subcatDisplayOrder)
                                    this.setState({ FertilizerList: arrTemp })

                                }, (err) => {
                                    SimpleToast.show('Something went wrong with translation')

                                })
                            } else {
                                this.setState({ FertilizerList: resulta[0].data })
                            }
                        } else if (arrData[i].brandType === 'Pestiside') {

                            console.log("arrData[i].brandType-----333", arrData[i].brandType)

                            if (global.isLanguageOtherThanEnglish) {
                                await translateText([arrData[i].brandID, arrData[i].brandName, arrData[i].brandType], (result) => {

                                    var dict = {}
                                    dict["brandID"] = result[0].translatedText
                                    dict["brandName"] = result[1].translatedText
                                    dict["brandType"] = result[2].translatedText


                                    arrTemp.push(dict)
                                    //   var sortedData = arrTemp.sort((a, b) => a.subcatDisplayOrder - b.subcatDisplayOrder)
                                    this.setState({ PestisideList: arrTemp })

                                }, (err) => {
                                    SimpleToast.show('Something went wrong with translation')

                                })
                            } else {
                                this.setState({ PestisideList: resulta[0].data })
                            }
                        }



                    }


                    this.setState({ SeedList: this.state.SeedList.filter((x) => (x.brandType === 'Seed')) });
                    this.setState({ FertilizerList: this.state.FertilizerList.filter((x) => (x.brandType === 'Fertilizer')) });
                    this.setState({ PestisideList: this.state.PestisideList.filter((x) => (x.brandType === 'Pestiside')) });

                    console.log("PestisideList-->", this.state.PestisideList);
                    // setTimeout(() => {
                    //     this.getSubCategoryList(arrTemp[0].categoryID)
                    // }, 700); 

                }

            }).catch(err => {

                console.log("language/list-labels Error", err)
            })
    }

    getBrndTypeSeed() {
        // SeedList:[],
        // FertilizerList:[],
        // PestisideList:[],
        this.setState({ SeedList: [] })
        var body = {
            "loginuserID": global.userID,
            "languageID": global.languageID,
            "searchWord": "",
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
        console.log("farmhelp/get-farmhelp-list------1111", global.Url + 'masters/get-brand-list', config)
        fetch(global.Url + 'masters/get-brand-list', config)
            .then(response => response.json())
            .then(async resulta => {
                if (resulta[0].status == "true") {
                    var arrData = resulta[0].data
                    var arrTemp = []
                    for (var i = 0; i < arrData.length; i++) {
                        if (arrData[i].brandType === 'Seed') {


                            if (global.isLanguageOtherThanEnglish) {
                                await translateText([arrData[i].brandID, arrData[i].brandName, arrData[i].brandType], (result) => {
                                    var dict = {}

                                    dict["brandID"] = result[0].translatedText
                                    dict["brandName"] = result[1].translatedText
                                    dict["brandType"] = result[2].translatedText
                                    arrTemp.push(dict)
                                    //   var sortedData = arrTemp.sort((a, b) => a.subcatDisplayOrder - b.subcatDisplayOrder)

                                    var sortedData = arrTemp.sort((a, b) => b.brandID - a.brandID)

                                    this.setState({ SeedList: arrTemp })
                                    //this.setState({SeedList:resulta[0].data})
                                }, (err) => {
                                    SimpleToast.show('Something went wrong with translation')
                                    console.log("farmhelp.brandType------1111", arrData[i].brandType)
                                    this.setState({ SeedList: arrData })
                                    this.setState({ SeedList: this.state.SeedList.filter((x) => (x.brandType === 'Seed')) });
                                   
                                })
                            } else {
                                console.log("farmhelp.brandType------1111", arrData[0].brandType)
                                this.setState({ SeedList: arrData })
                                this.setState({ SeedList: this.state.SeedList.filter((x) => (x.brandType === 'Seed')) });
                                   
                            }
                        }
                    }



                }

            }).catch(err => {

                console.log("language/list-labels Error", err)
            })
    }

    getBrndTypeFertilizer() {
        // SeedList:[],
        // FertilizerList:[],
        // PestisideList:[],
        this.setState({ FertilizerList: [] })
        var body = {
            "loginuserID": global.userID,
            "languageID": global.languageID,
            "searchWord": "",
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
        console.log("farmhelp/get-farmhelp-list------1111", global.Url + 'masters/get-brand-list', config)
        fetch(global.Url + 'masters/get-brand-list', config)
            .then(response => response.json())
            .then(async resulta => {



                if (resulta[0].status == "true") {
                    var arrData = resulta[0].data
                    var arrTemp = []
                    for (var i = 0; i < arrData.length; i++) {
                        if (arrData[i].brandType === 'Fertilizer') {
                            console.log("arrData[i].brandType------222", arrData[i].brandType)

                            if (global.isLanguageOtherThanEnglish) {
                                await translateText([arrData[i].brandID, arrData[i].brandName, arrData[i].brandType], (result) => {

                                    var dict = {}
                                    dict["brandID"] = result[0].translatedText
                                    dict["brandName"] = result[1].translatedText
                                    dict["brandType"] = result[2].translatedText


                                    arrTemp.push(dict)
                                    //   var sortedData = arrTemp.sort((a, b) => a.subcatDisplayOrder - b.subcatDisplayOrder)
                                    this.setState({ FertilizerList: arrTemp })

                                }, (err) => {
                                    SimpleToast.show('Something went wrong with translation')
                                    this.setState({ FertilizerList: arrData })
                                    this.setState({ FertilizerList: this.state.FertilizerList.filter((x) => (x.brandType === 'Fertilizer')) });
                  
                                })
                            } else {
                                this.setState({ FertilizerList: arrData })
                                this.setState({ FertilizerList: this.state.FertilizerList.filter((x) => (x.brandType === 'Fertilizer')) });
                  
                            }
                        }




                    }



                    //   this.setState({ FertilizerList: this.state.FertilizerList.filter((x) => (x.brandType === 'Fertilizer')) });


                }

            }).catch(err => {

                console.log("language/list-labels Error", err)
            })
    }

    filterData(data) {
        return data.filter((x) => (x.brandType === 'Seed'));
    }


    btnSubcategoryAction() {
        if (isEmpty(this.state.selectedCategory.categoryName)) {
            SimpleToast.show(this.state.lbl_Please_Select_Category)
        } else if (this.state.subCategoryList.length == 0) {
            SimpleToast.show(global.languageData.No_records_found)
        } else {
            this.subCategoryAction.show()
        }
    }

    NextPage() {
        if (global.user) {

            //this.props.navigation.navigate('inputdatanext', { body: "" })
            this.NextPageSubmit()
        } else {
            alertLogin(this.props)
        }
    }

    NextPageSubmit() {
        /* if (isEmpty(this.state.selectedCategory.categoryName)) {
            SimpleToast.show(this.state.lbl_Please_Select_Category)
        } else if (isEmpty(this.state.selectedSubCategory.subcatName)) {
            SimpleToast.show(this.state.lbl_Please_select_a_sub_category)
        } else if (isEmpty(this.state.selectedDate)) {
            SimpleToast.show("Please select Date")
        } else if (isEmpty(this.state.yearSowed.year)) {
            SimpleToast.show("Please select Year Sowed")
        } else if (isEmpty(this.state.totalAcres)) {
            SimpleToast.show("Please enter total Acres")
        } else if (isEmpty(this.state.daysLeftEmpty)) {
            SimpleToast.show("Please enter DaysLeftEmpty")
        } else if (isEmpty(this.state.selectedDatewater)) {
            SimpleToast.show("Please select Date of Water Provider")
        } else if (isEmpty(this.state.canalTubewell.name)) {
            SimpleToast.show("Please select canal Tubewell types")
        } else if (isEmpty(this.state.selectedDateculti)) {
            SimpleToast.show("Please select Date of Cultivated")
        } else if (isEmpty(this.state.tractorUsed)) {
            SimpleToast.show("Please select Tractor Used")
        } else if (isEmpty(this.state.selectedDateSowing)) {
            SimpleToast.show("Please select Date of Sowing")
        } else if (isEmpty(this.state.seedBrandUsed.brandName)) {
            SimpleToast.show("Please select Seed Brand")
        } else if (isEmpty(this.state.seedQuantityUsedNum)) {
            SimpleToast.show("Please enter seed Quantity Used")
        } else if (isEmpty(this.state.seedQuantityUsedUnit.name)) {
            SimpleToast.show("Please select seed Quantity Used Unit")
        } else if (isEmpty(this.state.selectedDatefertilized)) {
            SimpleToast.show("Please select Date of Fertilized")
        } else if (isEmpty(this.state.fertilizerBrand.brandName)) {
            SimpleToast.show("Please select Fertilized Brand")
        } else if (isEmpty(this.state.fertilizerQuantityNum)) {
            SimpleToast.show("Please enter Fertilized Quantity Used")
        } else if (isEmpty(this.state.fertilizerUsedUnit.name)) {
            SimpleToast.show("Please select Fertilized Quantity Used Unit")
        } */
        //{  }
        if (isEmpty(this.state.selectedCategory.categoryName)) {
            SimpleToast.show(this.state.lbl_Please_Select_Category)
        } else if (isEmpty(this.state.selectedSubCategory.subcatName)) {
            SimpleToast.show(this.state.lbl_Please_select_a_sub_category)
        } 
        // else if (isEmpty(this.state.selectedDate)) {
        //     SimpleToast.show("Please select Date")
        // }
         else if (isEmpty(this.state.yearSowed.year)) {
            SimpleToast.show("Please select Year Sowed")
        } 
        // else if (isEmpty(this.state.totalAcres)) {
        //     SimpleToast.show("Please enter total Acres")
        // } else if (isEmpty(this.state.daysLeftEmpty)) {
        //     SimpleToast.show("Please enter DaysLeftEmpty")
        // } else if (isEmpty(this.state.selectedDatewater)) {
        //     SimpleToast.show("Please select Date of Water Provider")
        // } else if (isEmpty(this.state.canalTubewell.name)) {
        //     SimpleToast.show("Please select canal Tubewell types")
        // } else if (isEmpty(this.state.selectedDateculti)) {
        //     SimpleToast.show("Please select Date of Cultivated")
        // } else if (isEmpty(this.state.tractorUsed)) {
        //     SimpleToast.show("Please select Tractor Used")
        // }
        else if (!isEmpty(this.state.selectedDateSowing) || !isEmpty(this.state.seedBrandUsed.brandName) || !isEmpty(this.state.seedQuantityUsedNum) || !isEmpty(this.state.seedQuantityUsedUnit.name)) {
            if (isEmpty(this.state.selectedDateSowing)) {
                SimpleToast.show("Please select Date of Sowing")
            }else if (isEmpty(this.state.seedBrandUsed.brandName)) {
                SimpleToast.show("Please select Seed Brand")
            } else if (isEmpty(this.state.seedQuantityUsedNum)) {
                SimpleToast.show("Please enter seed Quantity Used")
            } else if (isEmpty(this.state.seedQuantityUsedUnit.name)) {
                SimpleToast.show("Please select seed Quantity Used Unit")
            } 
             else if (!isEmpty(this.state.selectedDatefertilized) 
            || !isEmpty(this.state.fertilizerBrand.brandName) 
            || !isEmpty(this.state.fertilizerQuantityNum) 
            || !isEmpty(this.state.fertilizerUsedUnit.name)) {
                if (isEmpty(this.state.selectedDatefertilized)) {
                    SimpleToast.show("Please select Date of Fertilized")
                }else if (isEmpty(this.state.fertilizerBrand.brandName)) {
                    SimpleToast.show("Please select Fertilized Brand")
                } else if (isEmpty(this.state.fertilizerQuantityNum)) {
                    SimpleToast.show("Please enter Fertilized Quantity Used")
                } else if (isEmpty(this.state.fertilizerUsedUnit.name)) {
                    SimpleToast.show("Please select Fertilized Quantity Used Unit")
                } else {
                    var body = {
                        "loginuserID": global.userID,
                    "languageID": global.languageID,
                    "apiType": "Android",
                    "apiVersion": "2.0",
                    "categoryID": this.state.selectedCategory.categoryID,
                    "subcatID": this.state.selectedSubCategory.subcatID,
                    "farmInputDate": this.state.selectedDate,
                    "farmInputYearSowed": this.state.yearSowed.year,
                    "farmInputTotalAcres": this.state.totalAcres,
                    "farmInputDaysLeftEmpty": this.state.daysLeftEmpty,
                    "farmInputWaterProvided": this.state.selectedDatewater,
                    "farmInputCanalTubewell": this.state.canalTubewell.name,
                    "farmInputCultivated": this.state.selectedDateculti,
                    "farmInputTractorUsed": this.state.tractorUsed,
                    "seedSowingDate": this.state.selectedDateSowing,
                    "seedBrand": this.state.seedBrandUsed.brandName,
                    "seedQuantity": this.state.seedQuantityUsedNum,
                    "seedUnit": this.state.seedQuantityUsedUnit.name,
                    "fertilizerOn": this.state.selectedDatefertilized,
                    "fertilizerBrand": this.state.fertilizerBrand.brandName,
                    "fertilizerQuantity": this.state.fertilizerQuantityNum,
                    "fertilizerUnit": this.state.fertilizerUsedUnit.name,
                    }
        
        
                    console.log("NextPage-->", JSON.stringify(body));
                    this.props.navigation.navigate('inputdatanext', { body: body })
                }
            }else {
                var body = {
                    "loginuserID": global.userID,
                    "languageID": global.languageID,
                    "apiType": "Android",
                    "apiVersion": "2.0",
                    "categoryID": this.state.selectedCategory.categoryID,
                    "subcatID": this.state.selectedSubCategory.subcatID,
                    "farmInputDate": this.state.selectedDate,
                    "farmInputYearSowed": this.state.yearSowed.year,
                    "farmInputTotalAcres": this.state.totalAcres,
                    "farmInputDaysLeftEmpty": this.state.daysLeftEmpty,
                    "farmInputWaterProvided": this.state.selectedDatewater,
                    "farmInputCanalTubewell": this.state.canalTubewell.name,
                    "farmInputCultivated": this.state.selectedDateculti,
                    "farmInputTractorUsed": this.state.tractorUsed,
                    "seedSowingDate": this.state.selectedDateSowing,
                    "seedBrand": this.state.seedBrandUsed.brandName,
                    "seedQuantity": this.state.seedQuantityUsedNum,
                    "seedUnit": this.state.seedQuantityUsedUnit.name,
                    "fertilizerOn": this.state.selectedDatefertilized,
                    "fertilizerBrand": this.state.fertilizerBrand.brandName,
                    "fertilizerQuantity": this.state.fertilizerQuantityNum,
                    "fertilizerUnit": this.state.fertilizerUsedUnit.name,
                }
    
    
                console.log("NextPage-->", JSON.stringify(body));
                this.props.navigation.navigate('inputdatanext', { body: body })
            }
        }else if (!isEmpty(this.state.selectedDatefertilized) 
        || !isEmpty(this.state.fertilizerBrand.brandName) 
        || !isEmpty(this.state.fertilizerQuantityNum) 
        || !isEmpty(this.state.fertilizerUsedUnit.name)) {
        if (isEmpty(this.state.selectedDatefertilized)) {
            SimpleToast.show("Please select Date of Fertilized")
        }else if (isEmpty(this.state.fertilizerBrand.brandName)) {
            SimpleToast.show("Please select Fertilized Brand")
        } else if (isEmpty(this.state.fertilizerQuantityNum)) {
            SimpleToast.show("Please enter Fertilized Quantity Used")
        } else if (isEmpty(this.state.fertilizerUsedUnit.name)) {
            SimpleToast.show("Please select Fertilized Quantity Used Unit")
        } if (!isEmpty(this.state.selectedDateSowing) || !isEmpty(this.state.seedBrandUsed.brandName) || !isEmpty(this.state.seedQuantityUsedNum) || !isEmpty(this.state.seedQuantityUsedUnit.name)) {
            if (isEmpty(this.state.selectedDateSowing)) {
                SimpleToast.show("Please select Date of Sowing")
            }else if (isEmpty(this.state.seedBrandUsed.brandName)) {
                SimpleToast.show("Please select Seed Brand")
            } else if (isEmpty(this.state.seedQuantityUsedNum)) {
                SimpleToast.show("Please enter seed Quantity Used")
            } else if (isEmpty(this.state.seedQuantityUsedUnit.name)) {
                SimpleToast.show("Please select seed Quantity Used Unit")
            }else{
                var body = {
                    "loginuserID": global.userID,
                    "languageID": global.languageID,
                    "apiType": "Android",
                    "apiVersion": "2.0",
                    "categoryID": this.state.selectedCategory.categoryID,
                    "subcatID": this.state.selectedSubCategory.subcatID,
                    "farmInputDate": this.state.selectedDate,
                    "farmInputYearSowed": this.state.yearSowed.year,
                    "farmInputTotalAcres": this.state.totalAcres,
                    "farmInputDaysLeftEmpty": this.state.daysLeftEmpty,
                    "farmInputWaterProvided": this.state.selectedDatewater,
                    "farmInputCanalTubewell": this.state.canalTubewell.name,
                    "farmInputCultivated": this.state.selectedDateculti,
                    "farmInputTractorUsed": this.state.tractorUsed,
                    "seedSowingDate": this.state.selectedDateSowing,
                    "seedBrand": this.state.seedBrandUsed.brandName,
                    "seedQuantity": this.state.seedQuantityUsedNum,
                    "seedUnit": this.state.seedQuantityUsedUnit.name,
                    "fertilizerOn": this.state.selectedDatefertilized,
                    "fertilizerBrand": this.state.fertilizerBrand.brandName,
                    "fertilizerQuantity": this.state.fertilizerQuantityNum,
                    "fertilizerUnit": this.state.fertilizerUsedUnit.name,
                }
    
    
                console.log("NextPage-->", JSON.stringify(body));
                this.props.navigation.navigate('inputdatanext', { body: body })
            }
        } else {
            var body = {
                "loginuserID": global.userID,
                "languageID": global.languageID,
                "apiType": "Android",
                "apiVersion": "2.0",
                "categoryID": this.state.selectedCategory.categoryID,
                "subcatID": this.state.selectedSubCategory.subcatID,
                "farmInputDate": this.state.selectedDate,
                "farmInputYearSowed": this.state.yearSowed.year,
                "farmInputTotalAcres": this.state.totalAcres,
                "farmInputDaysLeftEmpty": this.state.daysLeftEmpty,
                "farmInputWaterProvided": this.state.selectedDatewater,
                "farmInputCanalTubewell": this.state.canalTubewell.name,
                "farmInputCultivated": this.state.selectedDateculti,
                "farmInputTractorUsed": this.state.tractorUsed,
                "seedSowingDate": this.state.selectedDateSowing,
                "seedBrand": this.state.seedBrandUsed.brandName,
                "seedQuantity": this.state.seedQuantityUsedNum,
                "seedUnit": this.state.seedQuantityUsedUnit.name,
                "fertilizerOn": this.state.selectedDatefertilized,
                "fertilizerBrand": this.state.fertilizerBrand.brandName,
                "fertilizerQuantity": this.state.fertilizerQuantityNum,
                "fertilizerUnit": this.state.fertilizerUsedUnit.name,
            }


            console.log("NextPage-->", JSON.stringify(body));
            this.props.navigation.navigate('inputdatanext', { body: body })
        }
    } else {
            var body = {
                "loginuserID": global.userID,
                "languageID": global.languageID,
                "apiType": "Android",
                "apiVersion": "2.0",
                "categoryID": this.state.selectedCategory.categoryID,
                "subcatID": this.state.selectedSubCategory.subcatID,
                "farmInputDate": this.state.selectedDate,
                "farmInputYearSowed": this.state.yearSowed.year,
                "farmInputTotalAcres": this.state.totalAcres,
                "farmInputDaysLeftEmpty": this.state.daysLeftEmpty,
                "farmInputWaterProvided": this.state.selectedDatewater,
                "farmInputCanalTubewell": this.state.canalTubewell.name,
                "farmInputCultivated": this.state.selectedDateculti,
                "farmInputTractorUsed": this.state.tractorUsed,
                "seedSowingDate": this.state.selectedDateSowing,
                "seedBrand": this.state.seedBrandUsed.brandName,
                "seedQuantity": this.state.seedQuantityUsedNum,
                "seedUnit": this.state.seedQuantityUsedUnit.name,
                "fertilizerOn": this.state.selectedDatefertilized,
                "fertilizerBrand": this.state.fertilizerBrand.brandName,
                "fertilizerQuantity": this.state.fertilizerQuantityNum,
                "fertilizerUnit": this.state.fertilizerUsedUnit.name,

              
            }


            console.log("NextPage-->", JSON.stringify(body));
            this.props.navigation.navigate('inputdatanext', { body: body })



        }

    }

    render() {

        return (
            <Fragment>
                {Platform.OS == 'ios' ? <LinearGradient start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
                    style={{ height: global.notchHeight }} /> : null}
                <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.75)" }}>
                    <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                    <Header name={"Input Data"} props={this.props} />

                    <ScrollView style={{}}>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ marginTop: 10 }}>{this.state.lbl_Select_Category}</Text>
                            <TouchableOpacity onPress={() => { this.categoryAction.show() }}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ color: isEmpty(this.state.selectedCategory.categoryName) ? colors.lightgrey1 : colors.black }}>{this.state.selectedCategory.categoryName || this.state.lbl_Select_Category}</Text>
                                <Ionicons name="caret-down-outline" size={16} />
                            </TouchableOpacity>

                            <Text style={{ marginTop: 10 }}>{this.state.lbl_Please_select_a_sub_category}</Text>
                            {/* <TouchableOpacity onPress={() => { }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ color: isEmpty(this.state.selectedSubCategory) ? colors.lightgrey1 : colors.black }}>{this.state.selectedSubCategory || "Select Sub-Category"}</Text>
                            <Ionicons name="caret-down-outline" size={16} />
                        </TouchableOpacity> */}

                            <TouchableOpacity onPress={() => this.btnSubcategoryAction()}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ color: isEmpty(this.state.selectedSubCategory.subcatName) ? colors.lightgrey1 : colors.black }}>{this.state.selectedSubCategory.subcatName || this.state.lbl_Select_Sub_Category}</Text>
                                <Ionicons name="caret-down-outline" size={16} />
                            </TouchableOpacity>

                            <Text style={{ marginTop: 10 }}>{this.state.lbl_Year_Sowed}</Text>
                            <TouchableOpacity onPress={() => this.YearAction.show()}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ color: isEmpty(this.state.yearSowed.year) ? colors.lightgrey1 : colors.black }}>{this.state.yearSowed.year || this.state.lbl_Select_Year_Sowed}</Text>
                                <Ionicons name="caret-down-outline" size={16} />
                            </TouchableOpacity>

                            <Text style={{ marginTop: 10 }}>{this.state.lbl_Date}</Text>
                            <TouchableOpacity onPress={() => this.calendarModal.current.open()}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ color: isEmpty(this.state.selectedDate) ? colors.lightgrey1 : colors.black }}>{this.state.selectedDate || this.state.lbl_SelectDate}</Text>
                                <Image source={require('../assets/calendar.png')} style={{ width: 17, height: 17, resizeMode: 'contain' }} />
                            </TouchableOpacity>

                           

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 0.48 }}>
                                    <Text style={{ marginTop: 10, marginBottom: 5 }}>{this.state.lbl_Total_Acres}</Text>
                                    <TextInput
                                        keyboardType='numeric'
                                        placeholder={this.state.lbl_Enter_Total_Acres}
                                        value={this.state.totalAcres}
                                        onChangeText={(totalAcres) => { this.setState({ totalAcres }) }}
                                        style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, }}
                                    />
                                </View>
                                <View style={{ flex: 0.48 }}>
                                    <Text style={{ marginTop: 10, marginBottom: 5 }}>{this.state.lbl_Days_Left_Empty}</Text>
                                    <TextInput
                                        keyboardType='numeric'
                                        placeholder={this.state.lbl_Enter_Quantity}
                                        value={this.state.daysLeftEmpty}
                                        onChangeText={(daysLeftEmpty) => { this.setState({ daysLeftEmpty }) }}
                                        style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, }}
                                    />
                                </View>
                            </View>

                            {/* <Text style={{ marginTop: 10, marginBottom: 5 }}>Soil Type</Text>
                            <TextInput
                                placeholder="Enter Soil Type"
                                value={this.state.soilType}
                                onChangeText={(soilType) => { this.setState({ soilType }) }}
                                multiline={true}
                                style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 80, textAlignVertical: 'top' }}
                            /> */}
                            <Text style={{ marginTop: 10 }}>{this.state.lbl_Water_Provided}</Text>
                            <TouchableOpacity onPress={() => this.calendarModalwater.current.open()}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ color: isEmpty(this.state.selectedDatewater) ? colors.lightgrey1 : colors.black }}>{this.state.selectedDatewater || this.state.lbl_Select_Date_of_Watering}</Text>
                                <Image source={require('../assets/calendar.png')} style={{ width: 17, height: 17, resizeMode: 'contain' }} />
                            </TouchableOpacity>

                            <Text style={{ marginTop: 10 }}>{this.state.lbl_Canal_Tubewell}</Text>
                            <TouchableOpacity onPress={() => this.CanalAction.show()}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ color: isEmpty(this.state.canalTubewell.name) ? colors.lightgrey1 : colors.black }}>{this.state.canalTubewell.name || this.state.lbl_Select_any_one}</Text>
                                <Ionicons name="caret-down-outline" size={16} />
                            </TouchableOpacity>

                            {/* <Text style={{ marginTop: 10 }}>Ground Water level</Text> */}
                            {/* <TouchableOpacity onPress={() => { }}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ color: isEmpty(this.state.groundWaterLevel) ? colors.lightgrey1 : colors.black }}>{this.state.groundWaterLevel || "Select any one"}</Text>
                                <Ionicons name="caret-down-outline" size={16} />
                            </TouchableOpacity> */}
                            {/* <TextInput
                                        placeholder="Enter Water level"
                                        value={this.state.groundWaterLevel}
                                        onChangeText={(groundWaterLevel) => { this.setState({ groundWaterLevel }) }}
                                        style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}
                                    /> */}

                            <Text style={{ marginTop: 10 }}>{this.state.lbl_Cultivated}</Text>
                            <TouchableOpacity onPress={() => this.calendarModalCulti.current.open()}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ color: isEmpty(this.state.selectedDateculti) ? colors.lightgrey1 : colors.black }}>{this.state.selectedDateculti || this.state.lbl_Select_Date_of_Cultivation}</Text>
                                <Image source={require('../assets/calendar.png')} style={{ width: 17, height: 17, resizeMode: 'contain' }} />
                            </TouchableOpacity>

                            <Text style={{ marginTop: 10 }}>{this.state.lbl_Tractor_used}</Text>
                            <FlatList
                                data={this.state.yesnoarray}
                                horizontal={true}
                                keyExtractor={item => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => this.setState({ tractorUsed: item })}
                                        style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20, marginVertical: 10 }}>
                                        <Image source={this.state.tractorUsed == item ? require('../assets/radio_btn_selected.png') : require('../assets/radio_btn_unselected.png')}
                                            style={{ width: 15, height: 15, resizeMode: 'contain', marginRight: 8 }} />
                                        <Text>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>

                        <View style={{ paddingVertical: 15, marginTop: 10, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: colors.lightgrey1 }}>
                            <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16 }}>{this.state.lbl_Seed}</Text>

                            <Text style={{ marginTop: 10 }}>{this.state.lbl_Sowing}</Text>
                            <TouchableOpacity onPress={() => this.calendarModalSowing.current.open()}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ color: isEmpty(this.state.selectedDateSowing) ? colors.lightgrey1 : colors.black }}>{this.state.selectedDateSowing || this.state.lbl_Select_Date_of_Sowing}</Text>
                                <Image source={require('../assets/calendar.png')} style={{ width: 17, height: 17, resizeMode: 'contain' }} />
                            </TouchableOpacity>

                            <Text style={{ marginTop: 10 }}>{this.state.lbl_Brand_Used}</Text>
                            <TouchableOpacity onPress={() => this.SeedAction.show()}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ color: isEmpty(this.state.seedBrandUsed.brandName) ? colors.lightgrey1 : colors.black }}>{this.state.seedBrandUsed.brandName || this.state.lbl_Select_any_one}</Text>
                                <Ionicons name="caret-down-outline" size={16} />
                            </TouchableOpacity>

                            {/* <TouchableOpacity onPress={() =>this.btnSubcategoryAction()}
                        style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                        <Text style={{ color: isEmpty(this.state.selectedSubCategory.subcatName) ? colors.lightgrey1 : colors.black }}>{this.state.selectedSubCategory.subcatName || this.state.lbl_Select_Sub_Category}</Text>
                        <Ionicons name="caret-down-outline" size={16} />
                    </TouchableOpacity> */}

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 0.57 }}>
                                    <Text style={{ marginTop: 10, marginBottom: 5 }}>{this.state.lbl_Quantity_Used}</Text>
                                    <TextInput
                                        keyboardType='numeric'
                                        placeholder={this.state.lbl_Enter_Quantity}
                                        value={this.state.seedQuantityUsedNum}
                                        onChangeText={(seedQuantityUsedNum) => { this.setState({ seedQuantityUsedNum }) }}
                                        style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 8, paddingHorizontal: 10 }}
                                    />
                                </View>
                                <View style={{ flex: 0.4 }}>
                                    <Text style={{ marginTop: 10, marginBottom: 5 }}></Text>
                                    <TouchableOpacity onPress={() => this.SeedUnitAction.show()}
                                        style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                        <Text style={{ color: isEmpty(this.state.seedQuantityUsedUnit.name) ? colors.lightgrey1 : colors.black }}>{this.state.seedQuantityUsedUnit.name || this.state.lbl_Unit}</Text>
                                        <Ionicons name="caret-down-outline" size={16} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{ paddingVertical: 15, marginTop: 10, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: colors.lightgrey1 }}>
                            <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16 }}>{this.state.lbl_Fertilizer}</Text>

                            <Text style={{ marginTop: 10 }}>{this.state.lbl_Fertilized_on}</Text>
                            <TouchableOpacity onPress={() => this.calendarModalfertilized.current.open()}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ color: isEmpty(this.state.selectedDatefertilized) ? colors.lightgrey1 : colors.black }}>{this.state.selectedDatefertilized || this.state.lbl_SelectDate}</Text>
                                <Image source={require('../assets/calendar.png')} style={{ width: 17, height: 17, resizeMode: 'contain' }} />
                            </TouchableOpacity>

                            <Text style={{ marginTop: 10 }}>{this.state.lbl_Brand_Used}</Text>
                            <TouchableOpacity onPress={() => this.fertilizedAction.show()}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                <Text style={{ color: isEmpty(this.state.fertilizerBrand.brandName) ? colors.lightgrey1 : colors.black }}>{this.state.fertilizerBrand.brandName || this.state.lbl_Select_any_one}</Text>
                                <Ionicons name="caret-down-outline" size={16} />
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 0.57 }}>
                                    <Text style={{ marginTop: 10, marginBottom: 5 }}>{this.state.lbl_Quantity_Used}</Text>
                                    <TextInput
                                        keyboardType='numeric'
                                        placeholder={this.state.lbl_Enter_Quantity}
                                        value={this.state.fertilizerQuantityNum}
                                        onChangeText={(fertilizerQuantityNum) => { this.setState({ fertilizerQuantityNum }) }}
                                        style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 8, paddingHorizontal: 10 }}
                                    />
                                </View>
                                <View style={{ flex: 0.4 }}>
                                    <Text style={{ marginTop: 10, marginBottom: 5 }}></Text>
                                    <TouchableOpacity onPress={() => this.fertilizedUnitAction.show()}
                                        style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                        <Text style={{ color: isEmpty(this.state.fertilizerUsedUnit.name) ? colors.lightgrey1 : colors.black }}>{this.state.fertilizerUsedUnit.name || this.state.lbl_Unit}</Text>
                                        <Ionicons name="caret-down-outline" size={16} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 15 }}>
                            <TouchableOpacity onPress={() => this.SaveData()}
                                style={{ padding: 12, borderRadius: 10, borderWidth: 1, borderColor: colors.green, fontSize: 16, color: colors.green, flex: 0.5, textAlign: 'center' }}>
                                <Text style={{ fontSize: 16, color: colors.green, textAlign: 'center' }}>{this.state.lbl_Save}</Text>
                            </TouchableOpacity>
                            <View style={{ flex: 0.75 }}>
                                <Button name={this.state.lbl_Next}
                                    onPress={() => this.NextPage()} />
                            </View>
                        </View>

                    </ScrollView>

                    <ActionSheet
                        ref={ref => this.categoryAction = ref}
                        options={[global.languageData.cancel].concat(this.state.categoryList.map(item => item.categoryName))}
                        title={this.state.lbl_Select_Category}
                        cancelButtonIndex={0}
                        onPress={(index) => {
                            if (index) {
                                this.setState({ selectedCategory: this.state.categoryList[index - 1], selectedSubCategory: {} })
                                // var body = {
                                //     "loginuserID": global.userID,
                                //     "languageID": "1",
                                //     "searchWord": "",
                                //     "categoryID": this.state.categoryList[index - 1].categoryID,
                                //     "page": 0,
                                //     "pagesize": 50,
                                //     "apiType": "Android",
                                //     "apiVersion": "2.0"
                                // }
                                // this.props.GetAskQuestionSubCategory(body)
                                this.getSubCategoryList(this.state.categoryList[index - 1].categoryID,)
                            }
                        }}
                    />

                    <ActionSheet
                        ref={ref => this.subCategoryAction = ref}
                        options={[global.languageData.cancel].concat(this.state.subCategoryList.map(item => item.subcatName))}
                        title={this.state.lbl_Select_Sub_Category}
                        cancelButtonIndex={0}
                        onPress={(index) => {
                            if (index) {
                                this.setState({ selectedSubCategory: this.state.subCategoryList[index - 1] })
                            }
                        }}
                    />

                    <ActionSheet
                        ref={ref => this.YearAction = ref}
                        options={[global.languageData.cancel].concat(this.state.yearOptionsList.map(item => item.year))}
                        title={'Select Year'}
                        cancelButtonIndex={0}
                        onPress={(index) => {
                            if (index) {
                                console.log("seedBrandUsed--11", this.state.yearOptionsList[index - 1])
                                this.setState({ yearSowed: this.state.yearOptionsList[index - 1] })

                            }
                        }}
                    />


                    <ActionSheet
                        ref={ref => this.CanalAction = ref}
                        options={[global.languageData.cancel].concat(this.state.canalTubewellArray.map(item => item.name))}
                        title={this.state.lbl_Select_Type}
                        cancelButtonIndex={0}
                        onPress={(index) => {
                            if (index) {
                                console.log("seedBrandUsed--11", this.state.canalTubewellArray[index - 1])
                                this.setState({ canalTubewell: this.state.canalTubewellArray[index - 1] })

                            }
                        }}
                    />

                    <ActionSheet
                        ref={ref => this.SeedUnitAction = ref}
                        options={[global.languageData.cancel].concat(this.state.seedQuantityUnitArray.map(item => item.name))}
                        title={this.state.lbl_Select_Unit}
                        cancelButtonIndex={0}
                        onPress={(index) => {
                            if (index) {
                                console.log("seedBrandUsed--11", this.state.seedQuantityUnitArray[index - 1])
                                this.setState({ seedQuantityUsedUnit: this.state.seedQuantityUnitArray[index - 1] })

                            }
                        }}
                    />


                    <ActionSheet
                        ref={ref => this.SeedAction = ref}
                        options={[global.languageData.cancel].concat(this.state.SeedList.map(item => item.brandName))}
                        title={this.state.lbl_Select_Brand}
                        cancelButtonIndex={0}
                        onPress={(index) => {
                            if (index) {
                                console.log("seedBrandUsed--11", this.state.SeedList[index - 1])
                                this.setState({ seedBrandUsed: this.state.SeedList[index - 1] })

                            }
                        }}
                    />
                    <ActionSheet
                        ref={ref => this.fertilizedUnitAction = ref}
                        options={[global.languageData.cancel].concat(this.state.fertilizerUsedUnitArray.map(item => item.name))}
                        title={this.state.lbl_Select_Unit}
                        cancelButtonIndex={0}
                        onPress={(index) => {
                            if (index) {
                                console.log("seedBrandUsed--11", this.state.fertilizerUsedUnitArray[index - 1])
                                this.setState({ fertilizerUsedUnit: this.state.fertilizerUsedUnitArray[index - 1] })

                            }
                        }}
                    />


                    <ActionSheet
                        ref={ref => this.fertilizedAction = ref}
                        options={[global.languageData.cancel].concat(this.state.FertilizerList.map(item => item.brandName))}
                        title={this.state.lbl_Select_Brand}
                        cancelButtonIndex={0}
                        onPress={(index) => {
                            if (index) {
                                this.setState({ fertilizerBrand: this.state.FertilizerList[index - 1] })
                            }
                        }}
                    />

                    <Modalize ref={this.calendarModal} handlePosition="inside"
                        adjustToContentHeight={true}
                        useNativeDriver={true}
                        modalStyle={{ borderRadius: 30 }} >
                        <View style={{ marginTop: 10, marginBottom: Platform.OS == 'ios' ? 40 : 0 }}>
                            <Calendar
                                ref={ref => this.calendar = ref}
                                // Collection of dates that have to be marked. Default = {}
                                markedDates={this.state.datenew}
                               // maxDate={new Date()}
                                enableSwipeMonths={true}
                                renderArrow={(direction) => (direction == 'left' ? <Image source={require('../assets/arrow_calendar_left.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} /> : <Image source={require('../assets/arrow_calendar_right.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />)}
                                onDayPress={(date) => {
                                    var json = {}
                                    json[moment(date.timestamp).format('YYYY-MM-DD')] = { selected: true, selectedColor: colors.green }
                                    this.setState({
                                        datenew: json,
                                        selectedDate: moment(date.timestamp).format("YYYY-MM-DD")
                                    })
                                    console.log("dateWiseForecast is", this.state.selectedDate)
                                    this.calendarModal.current.close();
                                }}
                                // minDate={}
                                hideExtraDays={true}
                            />
                        </View>
                    </Modalize>

                    <Modalize ref={this.calendarModalwater} handlePosition="inside"
                        adjustToContentHeight={true}
                        useNativeDriver={true}
                        modalStyle={{ borderRadius: 30 }} >
                        <View style={{ marginTop: 10, marginBottom: Platform.OS == 'ios' ? 40 : 0 }}>
                            <Calendar
                                ref={ref => this.calendar = ref}
                                // Collection of dates that have to be marked. Default = {}
                                markedDates={this.state.waterdatenew}
                              //  maxDate={new Date()}
                                enableSwipeMonths={true}
                                renderArrow={(direction) => (direction == 'left' ? <Image source={require('../assets/arrow_calendar_left.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} /> : <Image source={require('../assets/arrow_calendar_right.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />)}
                                onDayPress={(date) => {
                                    var json = {}
                                    json[moment(date.timestamp).format('YYYY-MM-DD')] = { selected: true, selectedColor: colors.green }
                                    this.setState({
                                        waterdatenew: json,
                                        selectedDatewater: moment(date.timestamp).format("YYYY-MM-DD")
                                    })
                                    console.log("dateWiseForecast is", this.state.selectedDatewater)
                                    this.calendarModalwater.current.close();
                                }}
                                // minDate={}
                                hideExtraDays={true}
                            />
                        </View>
                    </Modalize>

                    <Modalize ref={this.calendarModalCulti} handlePosition="inside"
                        adjustToContentHeight={true}
                        useNativeDriver={true}
                        modalStyle={{ borderRadius: 30 }} >
                        <View style={{ marginTop: 10, marginBottom: Platform.OS == 'ios' ? 40 : 0 }}>
                            <Calendar
                                ref={ref => this.calendar = ref}
                                // Collection of dates that have to be marked. Default = {}
                                markedDates={this.state.datenewculti}
                               // maxDate={new Date()}
                                enableSwipeMonths={true}
                                renderArrow={(direction) => (direction == 'left' ? <Image source={require('../assets/arrow_calendar_left.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} /> : <Image source={require('../assets/arrow_calendar_right.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />)}
                                onDayPress={(date) => {
                                    var json = {}
                                    json[moment(date.timestamp).format('YYYY-MM-DD')] = { selected: true, selectedColor: colors.green }
                                    this.setState({
                                        datenewculti: json,
                                        selectedDateculti: moment(date.timestamp).format("YYYY-MM-DD")
                                    })
                                    console.log("dateWiseForecast is", this.state.selectedDateculti)
                                    this.calendarModalCulti.current.close();
                                }}
                                // minDate={}
                                hideExtraDays={true}
                            />
                        </View>
                    </Modalize>

                    <Modalize ref={this.calendarModalSowing} handlePosition="inside"
                        adjustToContentHeight={true}
                        useNativeDriver={true}
                        modalStyle={{ borderRadius: 30 }} >
                        <View style={{ marginTop: 10, marginBottom: Platform.OS == 'ios' ? 40 : 0 }}>
                            <Calendar
                                ref={ref => this.calendar = ref}
                                // Collection of dates that have to be marked. Default = {}
                                markedDates={this.state.datenewSowing}
                              //  maxDate={new Date()}
                                enableSwipeMonths={true}
                                renderArrow={(direction) => (direction == 'left' ? <Image source={require('../assets/arrow_calendar_left.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} /> : <Image source={require('../assets/arrow_calendar_right.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />)}
                                onDayPress={(date) => {
                                    var json = {}
                                    json[moment(date.timestamp).format('YYYY-MM-DD')] = { selected: true, selectedColor: colors.green }
                                    this.setState({
                                        datenewSowing: json,
                                        selectedDateSowing: moment(date.timestamp).format("YYYY-MM-DD")
                                    })
                                    console.log("dateWiseForecast is", this.state.selectedDateSowing)
                                    this.calendarModalSowing.current.close();
                                }}
                                // minDate={}
                                hideExtraDays={true}
                            />
                        </View>
                    </Modalize>

                    <Modalize ref={this.calendarModalfertilized} handlePosition="inside"
                        adjustToContentHeight={true}
                        useNativeDriver={true}
                        modalStyle={{ borderRadius: 30 }} >
                        <View style={{ marginTop: 10, marginBottom: Platform.OS == 'ios' ? 40 : 0 }}>
                            <Calendar
                                ref={ref => this.calendar = ref}
                                // Collection of dates that have to be marked. Default = {}
                                markedDates={this.state.datenewfertilized}
                               // maxDate={new Date()}
                                enableSwipeMonths={true}
                                renderArrow={(direction) => (direction == 'left' ? <Image source={require('../assets/arrow_calendar_left.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} /> : <Image source={require('../assets/arrow_calendar_right.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />)}
                                onDayPress={(date) => {
                                    var json = {}
                                    json[moment(date.timestamp).format('YYYY-MM-DD')] = { selected: true, selectedColor: colors.green }
                                    this.setState({
                                        datenewfertilized: json,
                                        selectedDatefertilized: moment(date.timestamp).format("YYYY-MM-DD")
                                    })
                                    console.log("dateWiseForecast is", this.state.selectedDatefertilized)
                                    this.calendarModalfertilized.current.close();
                                }}
                                // minDate={}
                                hideExtraDays={true}
                            />
                        </View>
                    </Modalize>


                </SafeAreaView>
            </Fragment>
        )
    }


}

function alertLogin(props) {
    var ut = new Utility()
    ut.loginAlert(props)
}
function mapStateToProps(state) {
    return {

        GetAskQuestionCategoryInfo: state.GetAskQuestionCategory,
        GetAskQuestionCategorySuccess: state.GetAskQuestionCategory.success,

        GetAskQuestionSubCategoryInfo: state.GetAskQuestionSubCategory,
        GetAskQuestionSubCategorySuccess: state.GetAskQuestionSubCategory.success,
    };
}


export default compose(connect(mapStateToProps, {

}))(InputData);


const styles = StyleSheet.create({


});