import React from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground, Dimensions, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Animated, ScrollView, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import Button from '../ReuseableComponent.js/Button';
import Header from '../ReuseableComponent.js/Header';
import ActionSheet from 'react-native-actionsheet';
import { isEmpty, OpenSansSemiBold } from '../src/validations';
import { Modalize } from 'react-native-modalize';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import moment from 'moment';
import SimpleToast from 'react-native-simple-toast';
import { translateText } from '../src/LanguageTranslation';
import AsyncStorage from '@react-native-community/async-storage';
const { width, height } = Dimensions.get('window')

class InputDataNext extends React.Component {
    filterModal = React.createRef();
    calendarModalpestiside = React.createRef();
    calendarModalharvested = React.createRef();
    calendarModalSelling = React.createRef();
    calendarModalMoney = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            pestisideBrandUsed: {},
            PestisideList: [],
            lbl_Select_Brand: "Select Brand",
            pestisideUsedUnit: {},
            pestisideUsedUnitArray: [{ name: 'Gram' }, { name: 'Litter' }],
            sellingUsedUnit: {},
            sellingUsedUnitArray: [{ name: 'Kilogram' }, { name: 'Quintal' }, { name: 'Tonne' }],
            harvestedUsedUnit: {},
            harvestedUsedUnitArray: [{ name: 'Square Feet' }, { name: 'Square Meter' }, { name: 'Acre' }, { name: 'Hectare' }, { name: 'Gaj' }, { name: 'Kanal' }, { name: 'Bigha' }, { name: 'Biswa' }, { name: 'Killa' }, { name: 'Lessa' }, { name: 'Dhur' }, { name: 'Pura' }, { name: 'Chatak' }, { name: 'Marla' }, { name: 'Square Yard' }, { name: 'Katha' }, { name: 'Ground' }, { name: 'Cent' }, { name: 'Murabba' }, { name: 'Guntha' }, { name: 'Karam' }],
            datenewpestiside: {},
            selectedDatepestiside: '',

            datenewharvested: {},
            selectedDateharvested: '',
            datenewSelling: {},
            selectedDateSelling: '',
            datenewMoney: {},
            selectedDateMoney: '',
            PestisideQuantityUsedNum: '',
            harvestQuantityUsedNum: '',
            machineryQuantityUsedNum: '',
            sellingQuantityUsedNum: '',
            moneyQuantityUsedNum: '',
            commentsQuantityUsedNum: '',
            machineryUsed: '',
            soldUsed: '',

            body: {},
            isLoading: false,

            lbl_Enter_Quantity: "Enter Quantity",
            lbl_Select_any_one: "Select any one",
            lbl_Select_Date_of_Spraying: "Select Date of Spraying",
            yesnoarray: ["Yes", "No"],
            lbl_Select_Date_of_Harvesting: "Select Date of Harvesting",
            lbl_Brand_Used: "Brand Used",
            lbl_Quantity_Used: "Quantity Used",
            lbl_Unit: "Unit",
            lbl_Select_Unit: "Select Unit",

            lbl_Sprayed_on: "Sprayed on",
            lbl_Pesticide: "Pesticide",
            lbl_Harvest: "Harvest",
            lbl_Harvested_on: "Harvested on",
            lbl_Total_Quantity: "Total Quantity",
            lbl_Machinery_used: "Machinery used",
            lbl_Machinery_Type: "Machinery Type",
            lbl_Enter_Machinery_Type: "Enter Machinery Type",
            lbl_Selling: "Selling",
            lbl_Sold_on: "Sold on",
            lbl_Select_Date_of_Selling: "Select Date of Selling",
            lbl_Sold_to_Govt: "Sold to Govt.",
            yesnoarraya: ["Yes", "No", "No Answer"],
            lbl_Money_Received: "Money Received",
            lbl_SelectDate: "Select Date",
            lbl_Amount_Received: "Amount Received",
            lbl_Enter_Amount: "Enter Amount",
            lbl_Comments: "Comments",
            lbl_50_words_max: "50 words max",
            lbl_Write: "Write from here",
            lbl_Back: "Back",
            lbl_Save: "Save",
            lbl_Submit: "Submit",
        }
        console.disableYellowBox = true;

    }


    async checktitle() {
        if (global.isLanguageOtherThanEnglish) {
            await translateText([this.state.lbl_Enter_Quantity,
            this.state.lbl_Select_any_one,
            this.state.lbl_Select_Date_of_Spraying,
                "Yes", "No",
            this.state.lbl_Select_Date_of_Harvesting, this.state.lbl_Brand_Used, this.state.lbl_Quantity_Used, this.state.lbl_Unit,
            this.state.lbl_Select_Unit, this.state.lbl_Save, this.state.lbl_Sprayed_on, this.state.lbl_Pesticide,
            this.state.lbl_Harvest, this.state.lbl_Harvested_on, this.state.lbl_Total_Quantity,
            this.state.lbl_Machinery_used, this.state.lbl_Machinery_Type, this.state.lbl_Enter_Machinery_Type,
            this.state.lbl_Selling, this.state.lbl_Sold_on, this.state.lbl_Select_Date_of_Selling,
            this.state.lbl_Sold_to_Govt, "Yes", "No", "No Answer", this.state.lbl_Money_Received, this.state.lbl_SelectDate, this.state.lbl_Amount_Received,
            this.state.lbl_Enter_Amount, this.state.lbl_Comments, this.state.lbl_50_words_max, this.state.lbl_Write,
            this.state.lbl_Back, this.state.lbl_Save, this.state.lbl_Submit, this.state.lbl_Select_Brand], (result) => {


                console.log("lbl_Select_Brand -->", result[0].translatedText);

                this.setState({ lbl_Enter_Quantity: result[0].translatedText })
                this.setState({ lbl_Select_any_one: result[1].translatedText })
                this.setState({ lbl_Select_Date_of_Spraying: result[2].translatedText })
                this.setState({ yesnoarray: [result[3].translatedText, result[4].translatedText] })
                this.setState({ lbl_Select_Date_of_Harvesting: result[5].translatedText })
                this.setState({ lbl_Brand_Used: result[6].translatedText })
                this.setState({ lbl_Quantity_Used: result[7].translatedText })
                this.setState({ lbl_Unit: result[8].translatedText })
                this.setState({ lbl_Select_Unit: result[9].translatedText })
                this.setState({ lbl_Save: result[10].translatedText })
                this.setState({ lbl_Sprayed_on: result[11].translatedText })
                this.setState({ lbl_Pesticide: result[12].translatedText })
                this.setState({ lbl_Harvest: result[13].translatedText })
                this.setState({ lbl_Harvested_on: result[14].translatedText })
                this.setState({ lbl_Total_Quantity: result[15].translatedText })
                this.setState({ lbl_Machinery_used: result[16].translatedText })
                this.setState({ lbl_Machinery_Type: result[17].translatedText })
                this.setState({ lbl_Enter_Machinery_Type: result[18].translatedText })
                this.setState({ lbl_Selling: result[19].translatedText })
                this.setState({ lbl_Sold_on: result[20].translatedText })
                this.setState({ lbl_Select_Date_of_Selling: result[21].translatedText })
                this.setState({ lbl_Sold_to_Govt: result[22].translatedText })

                this.setState({ yesnoarraya: [result[23].translatedText, result[24].translatedText, result[25].translatedText] })
                this.setState({ lbl_Money_Received: result[26].translatedText })
                this.setState({ lbl_SelectDate: result[27].translatedText })
                this.setState({ lbl_Amount_Received: result[28].translatedText })
                this.setState({ lbl_Enter_Amount: result[29].translatedText })
                this.setState({ lbl_Comments: result[30].translatedText })
                this.setState({ lbl_50_words_max: result[31].translatedText })
                this.setState({ lbl_Write: result[32].translatedText })
                this.setState({ lbl_Back: result[33].translatedText })
                this.setState({ lbl_Save: result[34].translatedText })
                this.setState({ lbl_Submit: result[35].translatedText })

                this.setState({ lbl_Select_Brand: result[36].translatedText })


            }, (err) => {
                SimpleToast.show('Something went wrong with translation')
                // this.setState({SeedList:arrData})

                this.setState({ yesnoarray: ["Yes", "No"] })
                this.setState({ yesnoarraya: ["Yes", "No", "No Answer"] })
            })
        } else {
            this.setState({ yesnoarray: ["Yes", "No"] })
            this.setState({ yesnoarraya: ["Yes", "No", "No Answer"] })
            // this.setState({ SeedList: arrData })
        }
        var arrData = this.state.pestisideUsedUnitArray;
        var arrTemp = [];
        for (var i = 0; i < arrData.length; i++) {
            if (global.isLanguageOtherThanEnglish) {
                await translateText([arrData[i].name], (result) => {
                    var dict = {}

                    dict["name"] = result[0].translatedText

                    arrTemp.push(dict)
                    this.setState({ pestisideUsedUnitArray: arrTemp })
                    //this.setState({SeedList:resulta[0].data})
                }, (err) => {
                    SimpleToast.show('Something went wrong with translation')
                    console.log("canalTubewellArray", arrData[i].name)
                    // this.setState({SeedList:arrData})
                })
            }
        }

        var arrData1 = this.state.sellingUsedUnitArray;
        var arrTemp1 = [];
        for (var i = 0; i < arrData1.length; i++) {
            if (global.isLanguageOtherThanEnglish) {
                await translateText([arrData1[i].name], (result) => {
                    var dict = {}

                    dict["name"] = result[0].translatedText

                    arrTemp1.push(dict)
                    this.setState({ sellingUsedUnitArray: arrTemp1 })
                    //this.setState({SeedList:resulta[0].data})
                }, (err) => {
                    SimpleToast.show('Something went wrong with translation')
                    //console.log("canalTubewellArray", arrData[i].name)
                    // this.setState({SeedList:arrData})
                })
            }
        }

        var arrData2 = this.state.harvestedUsedUnitArray;
        var arrTemp2 = [];
        for (var i = 0; i < arrData2.length; i++) {
            if (global.isLanguageOtherThanEnglish) {
                await translateText([arrData2[i].name], (result) => {
                    var dict = {}

                    dict["name"] = result[0].translatedText

                    arrTemp2.push(dict)
                    this.setState({ harvestedUsedUnitArray: arrTemp2 })
                    //this.setState({SeedList:resulta[0].data})
                }, (err) => {
                    SimpleToast.show('Something went wrong with translation')
                    console.log("canalTubewellArray", arrData[i].name)
                    // this.setState({SeedList:arrData})
                })
            }
        }

    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.75)" }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <Header name={"Input Data"} props={this.props} />

                <ScrollView style={{}}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16, marginTop: 10 }}>{this.state.lbl_Pesticide}</Text>
                        <Text style={{ marginTop: 10 }}>{this.state.lbl_Sprayed_on}</Text>
                        <TouchableOpacity onPress={() => this.calendarModalpestiside.current.open()}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ color: isEmpty(this.state.selectedDatepestiside) ? colors.lightgrey1 : colors.black }}>{this.state.selectedDatepestiside || this.state.lbl_Select_Date_of_Spraying}</Text>
                            <Image source={require('../assets/calendar.png')} style={{ width: 17, height: 17, resizeMode: 'contain' }} />
                        </TouchableOpacity>

                        <Text style={{ marginTop: 10 }}>{this.state.lbl_Brand_Used}</Text>
                        <TouchableOpacity onPress={() => this.fertilizedAction.show()}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ color: isEmpty(this.state.pestisideBrandUsed.brandName) ? colors.lightgrey1 : colors.black }}>{this.state.pestisideBrandUsed.brandName || this.state.lbl_Select_any_one}</Text>
                            <Ionicons name="caret-down-outline" size={16} />
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flex: 0.57 }}>
                                <Text style={{ marginTop: 10, marginBottom: 5 }}>{this.state.lbl_Quantity_Used}</Text>
                                <TextInput
                                    keyboardType='numeric'
                                    placeholder={this.state.lbl_Enter_Quantity}
                                    value={this.state.PestisideQuantityUsedNum}
                                    onChangeText={(PestisideQuantityUsedNum) => { this.setState({ PestisideQuantityUsedNum }) }}
                                    style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 8, paddingHorizontal: 10 }}
                                />
                            </View>
                            <View style={{ flex: 0.4 }}>
                                <Text style={{ marginTop: 10, marginBottom: 5 }}></Text>
                                <TouchableOpacity onPress={() => this.pestisideUnitAction.show()}
                                    style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                    <Text style={{ color: isEmpty(this.state.pestisideUsedUnit.name) ? colors.lightgrey1 : colors.black }}>{this.state.pestisideUsedUnit.name || this.state.lbl_Unit}</Text>
                                    <Ionicons name="caret-down-outline" size={16} />
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>

                    <View style={{ paddingVertical: 15, marginTop: 10, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: colors.lightgrey1 }}>
                        <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16 }}>{this.state.lbl_Harvest}</Text>

                        <Text style={{ marginTop: 10 }}>{this.state.lbl_Harvested_on}</Text>
                        <TouchableOpacity onPress={() => this.calendarModalharvested.current.open()}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ color: isEmpty(this.state.selectedDateharvested) ? colors.lightgrey1 : colors.black }}>{this.state.selectedDateharvested || this.state.lbl_Select_Date_of_Harvesting}</Text>
                            <Image source={require('../assets/calendar.png')} style={{ width: 17, height: 17, resizeMode: 'contain' }} />
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flex: 0.57 }}>
                                <Text style={{ marginTop: 10, marginBottom: 5 }}>{this.state.lbl_Total_Quantity}</Text>
                                <TextInput
                                    keyboardType='numeric'
                                    placeholder={this.state.lbl_Enter_Quantity}
                                    value={this.state.harvestQuantityUsedNum}
                                    onChangeText={(harvestQuantityUsedNum) => { this.setState({ harvestQuantityUsedNum }) }}
                                    style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 8, paddingHorizontal: 10 }}
                                />
                            </View>
                            <View style={{ flex: 0.4 }}>
                                <Text style={{ marginTop: 10, marginBottom: 5 }}></Text>
                                <TouchableOpacity onPress={() => this.harvestedUsedUnitAction.show()}
                                    style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                    <Text style={{ color: isEmpty(this.state.harvestedUsedUnit.name) ? colors.lightgrey1 : colors.black }}>{this.state.harvestedUsedUnit.name || this.state.lbl_Unit}</Text>
                                    <Ionicons name="caret-down-outline" size={16} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{ marginTop: 10 }}>{this.state.lbl_Machinery_used}</Text>
                        <FlatList
                            data={this.state.yesnoarray}
                            horizontal={true}
                            keyExtractor={item => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { (item == "No") ? this.setState({ machineryQuantityUsedNum: '' }) : null, this.setState({ machineryUsed: item }) }}
                                    style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20, marginVertical: 10 }}>
                                    <Image source={this.state.machineryUsed == item ? require('../assets/radio_btn_selected.png') : require('../assets/radio_btn_unselected.png')}
                                        style={{ width: 15, height: 15, resizeMode: 'contain', marginRight: 8 }} />
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        {
                            (this.state.machineryUsed == 'Yes') ? <View>
                                <Text style={{ marginTop: 10, marginBottom: 5 }}>{this.state.lbl_Machinery_Type}</Text>
                                <TextInput
                                    placeholder={this.state.lbl_Enter_Machinery_Type}
                                    value={this.state.machineryQuantityUsedNum}
                                    onChangeText={(machineryQuantityUsedNum) => { this.setState({ machineryQuantityUsedNum }) }}
                                    style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 8, paddingHorizontal: 10 }}
                                />
                            </View> : null
                        }

                    </View>

                    <View style={{ paddingVertical: 15, marginTop: 10, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: colors.lightgrey1 }}>
                        <Text style={{ fontFamily: OpenSansSemiBold, fontSize: 16 }}>{this.state.lbl_Selling}</Text>

                        <Text style={{ marginTop: 10 }}>{this.state.lbl_Sold_on}</Text>
                        <TouchableOpacity onPress={() => this.calendarModalSelling.current.open()}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ color: isEmpty(this.state.selectedDateSelling) ? colors.lightgrey1 : colors.black }}>{this.state.selectedDateSelling || this.state.lbl_Select_Date_of_Selling}</Text>
                            <Image source={require('../assets/calendar.png')} style={{ width: 17, height: 17, resizeMode: 'contain' }} />
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flex: 0.57 }}>
                                <Text style={{ marginTop: 10, marginBottom: 5 }}>{this.state.lbl_Total_Quantity}</Text>
                                <TextInput
                                    keyboardType='numeric'
                                    placeholder={this.state.lbl_Enter_Quantity}
                                    value={this.state.sellingQuantityUsedNum}
                                    onChangeText={(sellingQuantityUsedNum) => { this.setState({ sellingQuantityUsedNum }) }}
                                    style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 8, paddingHorizontal: 10 }}
                                />
                            </View>
                            <View style={{ flex: 0.4 }}>
                                <Text style={{ marginTop: 10, marginBottom: 5 }}></Text>
                                <TouchableOpacity onPress={() => this.sellingUnitAction.show()}
                                    style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                                    <Text style={{ color: isEmpty(this.state.sellingUsedUnit.name) ? colors.lightgrey1 : colors.black }}>{this.state.sellingUsedUnit.name || this.state.lbl_Unit}</Text>
                                    <Ionicons name="caret-down-outline" size={16} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{ marginTop: 10 }}>{this.state.lbl_Sold_to_Govt}</Text>
                        <FlatList
                            data={this.state.yesnoarraya}
                            horizontal={true}
                            keyExtractor={item => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.setState({ soldUsed: item })}
                                    style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20, marginVertical: 10 }}>
                                    <Image source={this.state.soldUsed == item ? require('../assets/radio_btn_selected.png') : require('../assets/radio_btn_unselected.png')}
                                        style={{ width: 15, height: 15, resizeMode: 'contain', marginRight: 8 }} />
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        <Text style={{ marginTop: 10 }}>{this.state.lbl_Money_Received}</Text>
                        <TouchableOpacity onPress={() => this.calendarModalMoney.current.open()}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.lightgrey, borderRadius: 10, padding: 12, height: 45, alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ color: isEmpty(this.state.selectedDateMoney) ? colors.lightgrey1 : colors.black }}>{this.state.selectedDateMoney || this.state.lbl_SelectDate}</Text>
                            <Image source={require('../assets/calendar.png')} style={{ width: 17, height: 17, resizeMode: 'contain' }} />
                        </TouchableOpacity>

                        <Text style={{ marginTop: 10, marginBottom: 5 }}>{this.state.lbl_Amount_Received}</Text>
                        <TextInput
                            keyboardType='numeric'
                            placeholder={this.state.lbl_Enter_Amount}
                            value={this.state.moneyQuantityUsedNum}
                            onChangeText={(moneyQuantityUsedNum) => { this.setState({ moneyQuantityUsedNum }) }}
                            style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 8, paddingHorizontal: 10 }}
                        />

                    </View>

                    <View style={{ paddingVertical: 15, marginTop: 10, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: colors.lightgrey1 }}>
                        <Text style={{ marginTop: 10, marginBottom: 5 }}>{this.state.lbl_Comments} <Text style={{ color: colors.lightgrey1 }}>({this.state.lbl_50_words_max})</Text></Text>
                        <TextInput
                            placeholder={this.state.lbl_Write}
                            value={this.state.commentsQuantityUsedNum}
                            multiline={true}
                            onChangeText={(commentsQuantityUsedNum) => { this.setState({ commentsQuantityUsedNum }) }}
                            style={{ backgroundColor: colors.lightgrey, borderRadius: 10, padding: 8, paddingHorizontal: 10, height: 100, textAlignVertical: 'top' }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, marginTop: 15 }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}
                            style={{ width: '48%', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: colors.green, fontSize: 16, color: colors.green, textAlign: 'center' }}>
                            <Text style={{ fontSize: 16, color: colors.green, textAlign: 'center' }}>{this.state.lbl_Back}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.SubmitDATASave()}
                            style={{ width: '48%', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: colors.green, fontSize: 16, color: colors.green, textAlign: 'center' }}>
                            <Text style={{ fontSize: 16, color: colors.green, textAlign: 'center' }}>{this.state.lbl_Save}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: 15, marginHorizontal: 30 }}>
                        <Button name={this.state.lbl_Submit} width="100%"
                            onPress={() => this.SubmitDATA()} />
                    </View>
                </ScrollView>

                <ActionSheet
                    ref={ref => this.fertilizedAction = ref}
                    options={[global.languageData.cancel].concat(this.state.PestisideList.map(item => item.brandName))}
                    title={this.state.lbl_Select_Brand}
                    cancelButtonIndex={0}
                    onPress={(index) => {
                        if (index) {
                            this.setState({ pestisideBrandUsed: this.state.PestisideList[index - 1] })
                        }
                    }}
                />

                <ActionSheet
                    ref={ref => this.pestisideUnitAction = ref}
                    options={[global.languageData.cancel].concat(this.state.pestisideUsedUnitArray.map(item => item.name))}
                    title={this.state.lbl_Select_Unit}
                    cancelButtonIndex={0}
                    onPress={(index) => {
                        if (index) {
                            console.log("seedBrandUsed--11", this.state.pestisideUsedUnitArray[index - 1])
                            this.setState({ pestisideUsedUnit: this.state.pestisideUsedUnitArray[index - 1] })

                        }
                    }}
                />
                <ActionSheet
                    ref={ref => this.sellingUnitAction = ref}
                    options={[global.languageData.cancel].concat(this.state.sellingUsedUnitArray.map(item => item.name))}
                    title={this.state.lbl_Select_Unit}
                    cancelButtonIndex={0}
                    onPress={(index) => {
                        if (index) {
                            console.log("seedBrandUsed--11", this.state.sellingUsedUnitArray[index - 1])
                            this.setState({ sellingUsedUnit: this.state.sellingUsedUnitArray[index - 1] })

                        }
                    }}
                />
                <ActionSheet
                    ref={ref => this.harvestedUsedUnitAction = ref}
                    options={[global.languageData.cancel].concat(this.state.harvestedUsedUnitArray.map(item => item.name))}
                    title={this.state.lbl_Select_Unit}
                    cancelButtonIndex={0}
                    onPress={(index) => {
                        if (index) {
                            console.log("seedBrandUsed--11", this.state.harvestedUsedUnitArray[index - 1])
                            this.setState({ harvestedUsedUnit: this.state.harvestedUsedUnitArray[index - 1] })

                        }
                    }}
                />

                <Modalize ref={this.calendarModalpestiside} handlePosition="inside"
                    adjustToContentHeight={true}
                    useNativeDriver={true}
                    modalStyle={{ borderRadius: 30 }} >
                    <View style={{ marginTop: 10, marginBottom: Platform.OS == 'ios' ? 40 : 0 }}>
                        <Calendar
                            ref={ref => this.calendar = ref}
                            // Collection of dates that have to be marked. Default = {}
                            markedDates={this.state.datenewpestiside}
                          //  maxDate={new Date()}
                            enableSwipeMonths={true}
                            renderArrow={(direction) => (direction == 'left' ? <Image source={require('../assets/arrow_calendar_left.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} /> : <Image source={require('../assets/arrow_calendar_right.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />)}
                            onDayPress={(date) => {
                                var json = {}
                                json[moment(date.timestamp).format('YYYY-MM-DD')] = { selected: true, selectedColor: colors.green }
                                this.setState({
                                    datenewpestiside: json,
                                    selectedDatepestiside: moment(date.timestamp).format("YYYY-MM-DD")
                                })
                                console.log("dateWiseForecast is", this.state.selectedDatepestiside)
                                this.calendarModalpestiside.current.close();
                            }}
                            // minDate={}
                            hideExtraDays={true}
                        />
                    </View>
                </Modalize>

                <Modalize ref={this.calendarModalharvested} handlePosition="inside"
                    adjustToContentHeight={true}
                    useNativeDriver={true}
                    modalStyle={{ borderRadius: 30 }} >
                    <View style={{ marginTop: 10, marginBottom: Platform.OS == 'ios' ? 40 : 0 }}>
                        <Calendar
                            ref={ref => this.calendar = ref}
                            // Collection of dates that have to be marked. Default = {}
                            markedDates={this.state.datenewharvested}
                           // maxDate={new Date()}
                            enableSwipeMonths={true}
                            renderArrow={(direction) => (direction == 'left' ? <Image source={require('../assets/arrow_calendar_left.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} /> : <Image source={require('../assets/arrow_calendar_right.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />)}
                            onDayPress={(date) => {
                                var json = {}
                                json[moment(date.timestamp).format('YYYY-MM-DD')] = { selected: true, selectedColor: colors.green }
                                this.setState({
                                    datenewharvested: json,
                                    selectedDateharvested: moment(date.timestamp).format("YYYY-MM-DD")
                                })
                                console.log("dateWiseForecast is", this.state.selectedDateharvested)
                                this.calendarModalharvested.current.close();
                            }}
                            // minDate={}
                            hideExtraDays={true}
                        />
                    </View>
                </Modalize>

                <Modalize ref={this.calendarModalSelling} handlePosition="inside"
                    adjustToContentHeight={true}
                    useNativeDriver={true}
                    modalStyle={{ borderRadius: 30 }} >
                    <View style={{ marginTop: 10, marginBottom: Platform.OS == 'ios' ? 40 : 0 }}>
                        <Calendar
                            ref={ref => this.calendar = ref}
                            // Collection of dates that have to be marked. Default = {}
                            markedDates={this.state.datenewSelling}
                           // maxDate={new Date()}
                            enableSwipeMonths={true}
                            renderArrow={(direction) => (direction == 'left' ? <Image source={require('../assets/arrow_calendar_left.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} /> : <Image source={require('../assets/arrow_calendar_right.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />)}
                            onDayPress={(date) => {
                                var json = {}
                                json[moment(date.timestamp).format('YYYY-MM-DD')] = { selected: true, selectedColor: colors.green }
                                this.setState({
                                    datenewSelling: json,
                                    selectedDateSelling: moment(date.timestamp).format("YYYY-MM-DD")
                                })
                                console.log("dateWiseForecast is", this.state.selectedDateSelling)
                                this.calendarModalSelling.current.close();
                            }}
                            // minDate={}
                            hideExtraDays={true}
                        />
                    </View>
                </Modalize>

                <Modalize ref={this.calendarModalMoney} handlePosition="inside"
                    adjustToContentHeight={true}
                    useNativeDriver={true}
                    modalStyle={{ borderRadius: 30 }} >
                    <View style={{ marginTop: 10, marginBottom: Platform.OS == 'ios' ? 40 : 0 }}>
                        <Calendar
                            ref={ref => this.calendar = ref}
                            // Collection of dates that have to be marked. Default = {}
                            markedDates={this.state.datenewMoney}
                         //   maxDate={new Date()}
                            enableSwipeMonths={true}
                            renderArrow={(direction) => (direction == 'left' ? <Image source={require('../assets/arrow_calendar_left.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} /> : <Image source={require('../assets/arrow_calendar_right.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />)}
                            onDayPress={(date) => {
                                var json = {}
                                json[moment(date.timestamp).format('YYYY-MM-DD')] = { selected: true, selectedColor: colors.green }
                                this.setState({
                                    datenewMoney: json,
                                    selectedDateMoney: moment(date.timestamp).format("YYYY-MM-DD")
                                })
                                console.log("dateWiseForecast is", this.state.selectedDateMoney)
                                this.calendarModalMoney.current.close();
                            }}
                            // minDate={}
                            hideExtraDays={true}
                        />
                    </View>
                </Modalize>
                <Modal visible={this.state.isLoading}
                    style={{ alignItems: 'center' }}>
                    <Image source={require('../assets/loader.gif')} style={{ width: 50, height: 50, }} />
                </Modal>

            </SafeAreaView>
        )
    }

  
    SeveDataInput(){
        var body = {

            "value":"true",
            "pestisideSprayedOn": this.state.selectedDatepestiside,
            "pestisideSprayedOnarray": this.state.datenewpestiside,
            "pestisideBrand": this.state.pestisideBrandUsed,
            "pestisideQuantity": this.state.PestisideQuantityUsedNum,
            "pestisideUnit": this.state.pestisideUsedUnit,
            "harvestOn": this.state.selectedDateharvested,
            "harvestOnarray": this.state.datenewharvested,
            "harvestQuantity": this.state.harvestQuantityUsedNum,
            "harvestUnit": this.state.harvestedUsedUnit,
            "machineryType": this.state.machineryQuantityUsedNum,
            "machineryUsed": this.state.machineryUsed,
            "soldOn": this.state.selectedDateSelling,
            "soldOnarrya": this.state.datenewSelling,
            "soldQuantity": this.state.sellingQuantityUsedNum,
            "soldUnit": this.state.sellingUsedUnit,
            "soldToGovt": this.state.soldUsed,
            "soldMoneyReceived": this.state.selectedDateMoney,
            "soldMoneyReceivedarray": this.state.datenewMoney,
            "soldAmountReceived": this.state.moneyQuantityUsedNum,
            "comments": this.state.commentsQuantityUsedNum
        }


        console.log("NextPage-->0000", JSON.stringify(body));
        // this.props.navigation.navigate('inputdatanext', { body: body })
        global.inputdataSaveSecond = body;

        this.saved(body)
    }

    saved = async (value) => {
        try {
          await AsyncStorage.setItem(
            'isEditInputtwo',
            JSON.stringify(value),
          );

          console.log("NextPage-->0000", JSON.stringify(value));
         // this.props.navigation.goBack();
        } catch (error) {
          // Error saving data
        }
      };
      savedone = async (value) => {
        try {
          await AsyncStorage.setItem(
            'isEditInputone',
            JSON.stringify(value),
          );
          this.props.navigation.navigate('home')
        } catch (error) {
          // Error saving data
        }
      };
      _retrieveData = async () => {
        try {
            var values = JSON.parse(await AsyncStorage.getItem('isEditInputtwo'));
          const value = await AsyncStorage.getItem('isEditInputtwo');
          if (value !== null) {
            // We have data!!
            //console.log(value);
            global.isEditInputtwo = values.value;
            global.isEditInputtwobody = values
            console.log("global.isEditInputtwobody-->",  global.isEditInputtwobody);
            if (global.isEditInputtwo === "true") {
                console.log("global.isEditInputtwo-->", global.isEditInputone);
               console.log("global.isEditInputtwobody-->1", global.isEditInputtwobody);
               
               this.setState({
                selectedDatepestiside: global.isEditInputtwobody.pestisideSprayedOn,

                datenewpestiside: isEmpty(global.isEditInputtwobody.pestisideSprayedOnarray) ? {} : global.isEditInputtwobody.pestisideSprayedOnarray ,

                pestisideBrandUsed: isEmpty(global.isEditInputtwobody.pestisideBrand) ? {} : global.isEditInputtwobody.pestisideBrand,
                
                PestisideQuantityUsedNum: global.isEditInputtwobody.pestisideQuantity,

                pestisideUsedUnit: isEmpty(global.isEditInputtwobody.pestisideUnit) ? {} : global.isEditInputtwobody.pestisideUnit,

                selectedDateharvested: global.isEditInputtwobody.harvestOn,

                datenewharvested:isEmpty(global.isEditInputtwobody.harvestOnarray) ? {} : global.isEditInputtwobody.harvestOnarray,

                harvestQuantityUsedNum: global.isEditInputtwobody.harvestQuantity,

                harvestedUsedUnit: isEmpty(global.isEditInputtwobody.harvestUnit) ? {} : global.isEditInputtwobody.harvestUnit,

                machineryQuantityUsedNum: global.isEditInputtwobody.machineryType,

                machineryUsed: global.isEditInputtwobody.machineryUsed,

                selectedDateSelling: global.isEditInputtwobody.soldOn,

                datenewSelling:  isEmpty(global.isEditInputtwobody.soldOnarrya) ? {} : global.isEditInputtwobody.soldOnarrya,

                sellingQuantityUsedNum: global.isEditInputtwobody.soldQuantity,

                sellingUsedUnit: isEmpty(global.isEditInputtwobody.soldUnit) ? {} : global.isEditInputtwobody.soldUnit,

                soldUsed: global.isEditInputtwobody.soldToGovt,

                selectedDateMoney: global.isEditInputtwobody.soldMoneyReceived,
                datenewMoney:  isEmpty(global.isEditInputtwobody.soldMoneyReceivedarray) ? {} : global.isEditInputtwobody.soldMoneyReceivedarray,
                moneyQuantityUsedNum: global.isEditInputtwobody.soldAmountReceived,
                commentsQuantityUsedNum: global.isEditInputtwobody.comments,


            })


            } else {
                console.log("global.isEditInputone-->1", global.isEditInputtwobody);
    
            }
          }
        } catch (error) {
          // Error retrieving data
        }
      };


    SubmitDATASave() {
      

        if (!isEmpty(this.state.selectedDatepestiside) || !isEmpty(this.state.pestisideBrandUsed.brandName)
            || !isEmpty(this.state.PestisideQuantityUsedNum) || !isEmpty(this.state.pestisideUsedUnit.name)) {
            if (isEmpty(this.state.selectedDatepestiside)) {
                SimpleToast.show("Please select Date of Sprayed")
            } else if (isEmpty(this.state.pestisideBrandUsed.brandName)) {
                SimpleToast.show("Please select Pesticide Brand")
            } else if (isEmpty(this.state.PestisideQuantityUsedNum)) {
                SimpleToast.show("Please enter Pesticide Quantity Used")
            } else if (isEmpty(this.state.pestisideUsedUnit.name)) {
                SimpleToast.show("Please select Pesticide Quantity Used Unit")
            } else if (!isEmpty(this.state.selectedDateharvested) || !isEmpty(this.state.harvestedUsedUnit.name)
                || !isEmpty(this.state.harvestQuantityUsedNum) || !isEmpty(this.state.machineryUsed)) {
                if (isEmpty(this.state.selectedDateharvested)) {
                    SimpleToast.show("Please select Date of Harvested")
                } else if (isEmpty(this.state.harvestQuantityUsedNum)) {
                    SimpleToast.show("Please enter Harvested Quantity Used")
                } else if (isEmpty(this.state.harvestedUsedUnit.name)) {
                    SimpleToast.show("Please select Harvested Quantity Used Unit")
                } else if (isEmpty(this.state.machineryUsed)) {
                    SimpleToast.show("Please select Machinery Used")
                } else if (this.state.machineryUsed === 'Yes' && isEmpty(this.state.machineryQuantityUsedNum)) {
                    SimpleToast.show("Please enter Machinery Type")
                } else if (!isEmpty(this.state.selectedDateSelling) || !isEmpty(this.state.sellingUsedUnit.name)
                    || !isEmpty(this.state.sellingQuantityUsedNum) || !isEmpty(this.state.soldUsed) || !isEmpty(this.state.selectedDateMoney) || !isEmpty(this.state.moneyQuantityUsedNum)) {
                    if (isEmpty(this.state.selectedDateSelling)) {
                        SimpleToast.show("Please select Date of Sold")
                    } else if (isEmpty(this.state.sellingQuantityUsedNum)) {
                        SimpleToast.show("Please enter Sold Quantity Used")
                    } else if (isEmpty(this.state.sellingUsedUnit.name)) {
                        SimpleToast.show("Please select Sold Quantity Used Unit")
                    } else if (isEmpty(this.state.soldUsed)) {
                        SimpleToast.show("Please select Sold to")
                    } else if (isEmpty(this.state.selectedDateMoney)) {
                        SimpleToast.show("Please select Date of Money Received")
                    } else if (isEmpty(this.state.moneyQuantityUsedNum)) {
                        SimpleToast.show("Please enter Amount Money Received ")
                    } else {
                       
                        this.SeveDataInput();
                    }
                } else {
                  
                    this.SeveDataInput();
                }
            } else if (!isEmpty(this.state.selectedDateSelling) || !isEmpty(this.state.sellingUsedUnit.name)
                || !isEmpty(this.state.sellingQuantityUsedNum) || !isEmpty(this.state.soldUsed) || !isEmpty(this.state.selectedDateMoney) || !isEmpty(this.state.moneyQuantityUsedNum)) {
                if (isEmpty(this.state.selectedDateSelling)) {
                    SimpleToast.show("Please select Date of Sold")
                } else if (isEmpty(this.state.sellingQuantityUsedNum)) {
                    SimpleToast.show("Please enter Sold Quantity Used")
                } else if (isEmpty(this.state.sellingUsedUnit.name)) {
                    SimpleToast.show("Please select Sold Quantity Used Unit")
                } else if (isEmpty(this.state.soldUsed)) {
                    SimpleToast.show("Please select Sold to")
                } else if (isEmpty(this.state.selectedDateMoney)) {
                    SimpleToast.show("Please select Date of Money Received")
                } else if (isEmpty(this.state.moneyQuantityUsedNum)) {
                    SimpleToast.show("Please enter Amount Money Received ")
                } else {
                  
                    this.SeveDataInput();
                }
            } else {
              
                this.SeveDataInput();
            }
        } else if (!isEmpty(this.state.selectedDateharvested) || !isEmpty(this.state.harvestedUsedUnit.name)
            || !isEmpty(this.state.harvestQuantityUsedNum) || !isEmpty(this.state.machineryUsed)) {
            if (isEmpty(this.state.selectedDateharvested)) {
                SimpleToast.show("Please select Date of Harvested")
            } else if (isEmpty(this.state.harvestQuantityUsedNum)) {
                SimpleToast.show("Please enter Harvested Quantity Used")
            } else if (isEmpty(this.state.harvestedUsedUnit.name)) {
                SimpleToast.show("Please select Harvested Quantity Used Unit")
            } else if (isEmpty(this.state.machineryUsed)) {
                SimpleToast.show("Please select Machinery Used")
            } else if (this.state.machineryUsed === 'Yes' && isEmpty(this.state.machineryQuantityUsedNum)) {
                SimpleToast.show("Please enter Machinery Type")
            } else if (!isEmpty(this.state.selectedDatepestiside) || !isEmpty(this.state.pestisideBrandUsed.brandName)
                || !isEmpty(this.state.PestisideQuantityUsedNum) || !isEmpty(this.state.pestisideUsedUnit.name)) {
                if (isEmpty(this.state.selectedDatepestiside)) {
                    SimpleToast.show("Please select Date of Sprayed")
                } else if (isEmpty(this.state.pestisideBrandUsed.brandName)) {
                    SimpleToast.show("Please select Pesticide Brand")
                } else if (isEmpty(this.state.PestisideQuantityUsedNum)) {
                    SimpleToast.show("Please enter Pesticide Quantity Used")
                } else if (isEmpty(this.state.pestisideUsedUnit.name)) {
                    SimpleToast.show("Please select Pesticide Quantity Used Unit")
                } else if (!isEmpty(this.state.selectedDateSelling) || !isEmpty(this.state.sellingUsedUnit.name)
                    || !isEmpty(this.state.sellingQuantityUsedNum) || !isEmpty(this.state.soldUsed) || !isEmpty(this.state.selectedDateMoney) || !isEmpty(this.state.moneyQuantityUsedNum)) {
                    if (isEmpty(this.state.selectedDateSelling)) {
                        SimpleToast.show("Please select Date of Sold")
                    } else if (isEmpty(this.state.sellingQuantityUsedNum)) {
                        SimpleToast.show("Please enter Sold Quantity Used")
                    } else if (isEmpty(this.state.sellingUsedUnit.name)) {
                        SimpleToast.show("Please select Sold Quantity Used Unit")
                    } else if (isEmpty(this.state.soldUsed)) {
                        SimpleToast.show("Please select Sold to")
                    } else if (isEmpty(this.state.selectedDateMoney)) {
                        SimpleToast.show("Please select Date of Money Received")
                    } else if (isEmpty(this.state.moneyQuantityUsedNum)) {
                        SimpleToast.show("Please enter Amount Money Received ")
                    } else {
                      
                        this.SeveDataInput();
                    }
                } else {
                  
                    this.SeveDataInput();
                }

            } else if (!isEmpty(this.state.selectedDateSelling) || !isEmpty(this.state.sellingUsedUnit.name)
                || !isEmpty(this.state.sellingQuantityUsedNum) || !isEmpty(this.state.soldUsed) || !isEmpty(this.state.selectedDateMoney) || !isEmpty(this.state.moneyQuantityUsedNum)) {
                if (isEmpty(this.state.selectedDateSelling)) {
                    SimpleToast.show("Please select Date of Sold")
                } else if (isEmpty(this.state.sellingQuantityUsedNum)) {
                    SimpleToast.show("Please enter Sold Quantity Used")
                } else if (isEmpty(this.state.sellingUsedUnit.name)) {
                    SimpleToast.show("Please select Sold Quantity Used Unit")
                } else if (isEmpty(this.state.soldUsed)) {
                    SimpleToast.show("Please select Sold to")
                } else if (isEmpty(this.state.selectedDateMoney)) {
                    SimpleToast.show("Please select Date of Money Received")
                } else if (isEmpty(this.state.moneyQuantityUsedNum)) {
                    SimpleToast.show("Please enter Amount Money Received ")
                } else {
                 
                    this.SeveDataInput();
                }
            } else {
              
                this.SeveDataInput();
            }
        } else if (!isEmpty(this.state.selectedDateSelling) || !isEmpty(this.state.sellingUsedUnit.name)
            || !isEmpty(this.state.sellingQuantityUsedNum) || !isEmpty(this.state.soldUsed) || !isEmpty(this.state.selectedDateMoney) || !isEmpty(this.state.moneyQuantityUsedNum)) {
            if (isEmpty(this.state.selectedDateSelling)) {
                SimpleToast.show("Please select Date of Sold")
            } else if (isEmpty(this.state.sellingQuantityUsedNum)) {
                SimpleToast.show("Please enter Sold Quantity Used")
            } else if (isEmpty(this.state.sellingUsedUnit.name)) {
                SimpleToast.show("Please select Sold Quantity Used Unit")
            } else if (isEmpty(this.state.soldUsed)) {
                SimpleToast.show("Please select Sold to")
            } else if (isEmpty(this.state.selectedDateMoney)) {
                SimpleToast.show("Please select Date of Money Received")
            } else if (isEmpty(this.state.moneyQuantityUsedNum)) {
                SimpleToast.show("Please enter Amount Money Received ")
            } else if (!isEmpty(this.state.selectedDatepestiside) || !isEmpty(this.state.pestisideBrandUsed.brandName)
                || !isEmpty(this.state.PestisideQuantityUsedNum) || !isEmpty(this.state.pestisideUsedUnit.name)) {
                if (isEmpty(this.state.selectedDatepestiside)) {
                    SimpleToast.show("Please select Date of Sprayed")
                } else if (isEmpty(this.state.pestisideBrandUsed.brandName)) {
                    SimpleToast.show("Please select Pesticide Brand")
                } else if (isEmpty(this.state.PestisideQuantityUsedNum)) {
                    SimpleToast.show("Please enter Pesticide Quantity Used")
                } else if (isEmpty(this.state.pestisideUsedUnit.name)) {
                    SimpleToast.show("Please select Pesticide Quantity Used Unit")
                } else if (!isEmpty(this.state.selectedDateharvested) || !isEmpty(this.state.harvestedUsedUnit.name)
                    || !isEmpty(this.state.harvestQuantityUsedNum) || !isEmpty(this.state.machineryUsed)) {
                    if (isEmpty(this.state.selectedDateharvested)) {
                        SimpleToast.show("Please select Date of Harvested")
                    } else if (isEmpty(this.state.harvestQuantityUsedNum)) {
                        SimpleToast.show("Please enter Harvested Quantity Used")
                    } else if (isEmpty(this.state.harvestedUsedUnit.name)) {
                        SimpleToast.show("Please select Harvested Quantity Used Unit")
                    } else if (isEmpty(this.state.machineryUsed)) {
                        SimpleToast.show("Please select Machinery Used")
                    } else if (this.state.machineryUsed === 'Yes' && isEmpty(this.state.machineryQuantityUsedNum)) {
                        SimpleToast.show("Please enter Machinery Type")
                    } else {
                      
                        this.SeveDataInput();
                    }

                } else {
                   
                    this.SeveDataInput();
                }
            } if (!isEmpty(this.state.selectedDateharvested) || !isEmpty(this.state.harvestedUsedUnit.name)
                || !isEmpty(this.state.harvestQuantityUsedNum) || !isEmpty(this.state.machineryUsed)) {
                if (isEmpty(this.state.selectedDateharvested)) {
                    SimpleToast.show("Please select Date of Harvested")
                } else if (isEmpty(this.state.harvestQuantityUsedNum)) {
                    SimpleToast.show("Please enter Harvested Quantity Used")
                } else if (isEmpty(this.state.harvestedUsedUnit.name)) {
                    SimpleToast.show("Please select Harvested Quantity Used Unit")
                } else if (isEmpty(this.state.machineryUsed)) {
                    SimpleToast.show("Please select Machinery Used")
                } else if (this.state.machineryUsed === 'Yes' && isEmpty(this.state.machineryQuantityUsedNum)) {
                    SimpleToast.show("Please enter Machinery Type")
                } else {
                  
                    this.SeveDataInput();
                }

            } else {
               
                this.SeveDataInput();
            }
        } else {
          
            this.SeveDataInput();
        }



    }


    SubmitDATA() {
        // console.log("body-->", this.state.body);

        var body = {
            "loginuserID": global.userID,
            "languageID": global.languageID,
            "apiType": "Android",
            "apiVersion": "2.0",
            "categoryID": isEmpty(this.state.body.categoryID) ? '' : this.state.body.categoryID,
            "subcatID": isEmpty(this.state.body.subcatID) ? '' : this.state.body.subcatID,
            "farmInputDate": isEmpty(this.state.body.farmInputDate) ? '' : this.state.body.farmInputDate,
            "farmInputYearSowed": isEmpty(this.state.body.farmInputYearSowed) ? '' : this.state.body.farmInputYearSowed,
            "farmInputTotalAcres": isEmpty(this.state.body.farmInputTotalAcres) ? '' : this.state.body.farmInputTotalAcres,
            "farmInputDaysLeftEmpty": isEmpty(this.state.body.farmInputDaysLeftEmpty) ? '' : this.state.body.farmInputDaysLeftEmpty,
            "farmInputWaterProvided": isEmpty(this.state.body.farmInputWaterProvided) ? '' : this.state.body.farmInputWaterProvided,
            "farmInputCanalTubewell": isEmpty(this.state.body.farmInputCanalTubewell) ? '' : this.state.body.farmInputCanalTubewell,
            // "farmInputWaterLavel": this.state.groundWaterLevel,
            "farmInputCultivated": isEmpty(this.state.body.farmInputCultivated) ? '' : this.state.body.farmInputCultivated,
            "farmInputTractorUsed": isEmpty(this.state.body.farmInputTractorUsed) ? '' : this.state.body.farmInputTractorUsed,
            "seedSowingDate": isEmpty(this.state.body.seedSowingDate) ? '' : this.state.body.seedSowingDate,
            "seedBrand": isEmpty(this.state.body.seedBrand) ? '' : this.state.body.seedBrand,
            "seedQuantity": isEmpty(this.state.body.seedQuantity) ? '' : this.state.body.seedQuantity,
            "seedUnit": isEmpty(this.state.body.seedUnit) ? '' : this.state.body.seedUnit,
            "fertilizerOn": isEmpty(this.state.body.fertilizerOn) ? '' : this.state.body.fertilizerOn,
            "fertilizerBrand": isEmpty(this.state.body.fertilizerBrand) ? '' : this.state.body.fertilizerBrand,
            "fertilizerQuantity": isEmpty(this.state.body.fertilizerQuantity) ? '' : this.state.body.fertilizerQuantity,
            "fertilizerUnit": isEmpty(this.state.body.fertilizerUnit) ? '' : this.state.body.fertilizerUnit,

            "pestisideSprayedOn": isEmpty(this.state.selectedDatepestiside) ? '' : this.state.selectedDatepestiside,
            "pestisideBrand": isEmpty(this.state.pestisideBrandUsed.brandName) ? '' : this.state.pestisideBrandUsed.brandName,
            "pestisideQuantity": isEmpty(this.state.PestisideQuantityUsedNum) ? '' : this.state.PestisideQuantityUsedNum,
            "pestisideUnit": isEmpty(this.state.pestisideUsedUnit.name) ? '' : this.state.pestisideUsedUnit.name,
            "harvestOn": isEmpty(this.state.selectedDateharvested) ? '' : this.state.selectedDateharvested,
            "harvestQuantity": isEmpty(this.state.harvestQuantityUsedNum) ? '' : this.state.harvestQuantityUsedNum,
            "harvestUnit": isEmpty(this.state.harvestedUsedUnit.name) ? '' : this.state.harvestedUsedUnit.name,
            "machineryType": isEmpty(this.state.machineryQuantityUsedNum) ? '' : this.state.machineryQuantityUsedNum,
            "machineryUsed": isEmpty(this.state.machineryUsed) ? '' : this.state.machineryUsed,
            "soldOn": isEmpty(this.state.body.selectedDateSelling) ? '' : this.state.selectedDateSelling,
            "soldQuantity": isEmpty(this.state.body.categoryID) ? '' : this.state.sellingQuantityUsedNum,
            "soldUnit": isEmpty(this.state.body.categoryID) ? '' : this.state.sellingUsedUnit.name,
            "soldToGovt": isEmpty(this.state.body.categoryID) ? '' : this.state.soldUsed,
            "soldMoneyReceived": isEmpty(this.state.body.categoryID) ? '' : this.state.selectedDateMoney,
            "soldAmountReceived": isEmpty(this.state.body.categoryID) ? '' : this.state.moneyQuantityUsedNum,
            "comments": isEmpty(this.state.body.categoryID) ? '' : this.state.commentsQuantityUsedNum
        }
        console.log("farmmgt/farm-input-data", (body))
        if (!isEmpty(this.state.selectedDatepestiside) || !isEmpty(this.state.pestisideBrandUsed.brandName)
            || !isEmpty(this.state.PestisideQuantityUsedNum) || !isEmpty(this.state.pestisideUsedUnit.name)) {
            if (isEmpty(this.state.selectedDatepestiside)) {
                SimpleToast.show("Please select Date of Sprayed")
            } else if (isEmpty(this.state.pestisideBrandUsed.brandName)) {
                SimpleToast.show("Please select Pesticide Brand")
            } else if (isEmpty(this.state.PestisideQuantityUsedNum)) {
                SimpleToast.show("Please enter Pesticide Quantity Used")
            } else if (isEmpty(this.state.pestisideUsedUnit.name)) {
                SimpleToast.show("Please select Pesticide Quantity Used Unit")
            } else if (!isEmpty(this.state.selectedDateharvested) || !isEmpty(this.state.harvestedUsedUnit.name)
                || !isEmpty(this.state.harvestQuantityUsedNum) || !isEmpty(this.state.machineryUsed)) {
                if (isEmpty(this.state.selectedDateharvested)) {
                    SimpleToast.show("Please select Date of Harvested")
                } else if (isEmpty(this.state.harvestQuantityUsedNum)) {
                    SimpleToast.show("Please enter Harvested Quantity Used")
                } else if (isEmpty(this.state.harvestedUsedUnit.name)) {
                    SimpleToast.show("Please select Harvested Quantity Used Unit")
                } else if (isEmpty(this.state.machineryUsed)) {
                    SimpleToast.show("Please select Machinery Used")
                } else if (this.state.machineryUsed === 'Yes' && isEmpty(this.state.machineryQuantityUsedNum)) {
                    SimpleToast.show("Please enter Machinery Type")
                } else if (!isEmpty(this.state.selectedDateSelling) || !isEmpty(this.state.sellingUsedUnit.name)
                    || !isEmpty(this.state.sellingQuantityUsedNum) || !isEmpty(this.state.soldUsed) || !isEmpty(this.state.selectedDateMoney) || !isEmpty(this.state.moneyQuantityUsedNum)) {
                    if (isEmpty(this.state.selectedDateSelling)) {
                        SimpleToast.show("Please select Date of Sold")
                    } else if (isEmpty(this.state.sellingQuantityUsedNum)) {
                        SimpleToast.show("Please enter Sold Quantity Used")
                    } else if (isEmpty(this.state.sellingUsedUnit.name)) {
                        SimpleToast.show("Please select Sold Quantity Used Unit")
                    } else if (isEmpty(this.state.soldUsed)) {
                        SimpleToast.show("Please select Sold to")
                    } else if (isEmpty(this.state.selectedDateMoney)) {
                        SimpleToast.show("Please select Date of Money Received")
                    } else if (isEmpty(this.state.moneyQuantityUsedNum)) {
                        SimpleToast.show("Please enter Amount Money Received ")
                    } else {
                        this.setState({ isLoading: true })
                        this.SeveData1();
                    }
                } else {
                    this.setState({ isLoading: true })
                    this.SeveData1();
                }
            } else if (!isEmpty(this.state.selectedDateSelling) || !isEmpty(this.state.sellingUsedUnit.name)
                || !isEmpty(this.state.sellingQuantityUsedNum) || !isEmpty(this.state.soldUsed) || !isEmpty(this.state.selectedDateMoney) || !isEmpty(this.state.moneyQuantityUsedNum)) {
                if (isEmpty(this.state.selectedDateSelling)) {
                    SimpleToast.show("Please select Date of Sold")
                } else if (isEmpty(this.state.sellingQuantityUsedNum)) {
                    SimpleToast.show("Please enter Sold Quantity Used")
                } else if (isEmpty(this.state.sellingUsedUnit.name)) {
                    SimpleToast.show("Please select Sold Quantity Used Unit")
                } else if (isEmpty(this.state.soldUsed)) {
                    SimpleToast.show("Please select Sold to")
                } else if (isEmpty(this.state.selectedDateMoney)) {
                    SimpleToast.show("Please select Date of Money Received")
                } else if (isEmpty(this.state.moneyQuantityUsedNum)) {
                    SimpleToast.show("Please enter Amount Money Received ")
                } else {
                    this.setState({ isLoading: true })
                    this.SeveData1();
                }
            } else {
                this.setState({ isLoading: true })
                this.SeveData1();
            }
        } else if (!isEmpty(this.state.selectedDateharvested) || !isEmpty(this.state.harvestedUsedUnit.name)
            || !isEmpty(this.state.harvestQuantityUsedNum) || !isEmpty(this.state.machineryUsed)) {
            if (isEmpty(this.state.selectedDateharvested)) {
                SimpleToast.show("Please select Date of Harvested")
            } else if (isEmpty(this.state.harvestQuantityUsedNum)) {
                SimpleToast.show("Please enter Harvested Quantity Used")
            } else if (isEmpty(this.state.harvestedUsedUnit.name)) {
                SimpleToast.show("Please select Harvested Quantity Used Unit")
            } else if (isEmpty(this.state.machineryUsed)) {
                SimpleToast.show("Please select Machinery Used")
            } else if (this.state.machineryUsed === 'Yes' && isEmpty(this.state.machineryQuantityUsedNum)) {
                SimpleToast.show("Please enter Machinery Type")
            } else if (!isEmpty(this.state.selectedDatepestiside) || !isEmpty(this.state.pestisideBrandUsed.brandName)
                || !isEmpty(this.state.PestisideQuantityUsedNum) || !isEmpty(this.state.pestisideUsedUnit.name)) {
                if (isEmpty(this.state.selectedDatepestiside)) {
                    SimpleToast.show("Please select Date of Sprayed")
                } else if (isEmpty(this.state.pestisideBrandUsed.brandName)) {
                    SimpleToast.show("Please select Pesticide Brand")
                } else if (isEmpty(this.state.PestisideQuantityUsedNum)) {
                    SimpleToast.show("Please enter Pesticide Quantity Used")
                } else if (isEmpty(this.state.pestisideUsedUnit.name)) {
                    SimpleToast.show("Please select Pesticide Quantity Used Unit")
                } else if (!isEmpty(this.state.selectedDateSelling) || !isEmpty(this.state.sellingUsedUnit.name)
                    || !isEmpty(this.state.sellingQuantityUsedNum) || !isEmpty(this.state.soldUsed) || !isEmpty(this.state.selectedDateMoney) || !isEmpty(this.state.moneyQuantityUsedNum)) {
                    if (isEmpty(this.state.selectedDateSelling)) {
                        SimpleToast.show("Please select Date of Sold")
                    } else if (isEmpty(this.state.sellingQuantityUsedNum)) {
                        SimpleToast.show("Please enter Sold Quantity Used")
                    } else if (isEmpty(this.state.sellingUsedUnit.name)) {
                        SimpleToast.show("Please select Sold Quantity Used Unit")
                    } else if (isEmpty(this.state.soldUsed)) {
                        SimpleToast.show("Please select Sold to")
                    } else if (isEmpty(this.state.selectedDateMoney)) {
                        SimpleToast.show("Please select Date of Money Received")
                    } else if (isEmpty(this.state.moneyQuantityUsedNum)) {
                        SimpleToast.show("Please enter Amount Money Received ")
                    } else {
                        this.setState({ isLoading: true })
                        this.SeveData1();
                    }
                } else {
                    this.setState({ isLoading: true })
                    this.SeveData1();
                }

            } else if (!isEmpty(this.state.selectedDateSelling) || !isEmpty(this.state.sellingUsedUnit.name)
                || !isEmpty(this.state.sellingQuantityUsedNum) || !isEmpty(this.state.soldUsed) || !isEmpty(this.state.selectedDateMoney) || !isEmpty(this.state.moneyQuantityUsedNum)) {
                if (isEmpty(this.state.selectedDateSelling)) {
                    SimpleToast.show("Please select Date of Sold")
                } else if (isEmpty(this.state.sellingQuantityUsedNum)) {
                    SimpleToast.show("Please enter Sold Quantity Used")
                } else if (isEmpty(this.state.sellingUsedUnit.name)) {
                    SimpleToast.show("Please select Sold Quantity Used Unit")
                } else if (isEmpty(this.state.soldUsed)) {
                    SimpleToast.show("Please select Sold to")
                } else if (isEmpty(this.state.selectedDateMoney)) {
                    SimpleToast.show("Please select Date of Money Received")
                } else if (isEmpty(this.state.moneyQuantityUsedNum)) {
                    SimpleToast.show("Please enter Amount Money Received ")
                } else {
                    this.setState({ isLoading: true })
                    this.SeveData1();
                }
            } else {
                this.setState({ isLoading: true })
                this.SeveData1();
            }
        } else if (!isEmpty(this.state.selectedDateSelling) || !isEmpty(this.state.sellingUsedUnit.name)
            || !isEmpty(this.state.sellingQuantityUsedNum) || !isEmpty(this.state.soldUsed) || !isEmpty(this.state.selectedDateMoney) || !isEmpty(this.state.moneyQuantityUsedNum)) {
            if (isEmpty(this.state.selectedDateSelling)) {
                SimpleToast.show("Please select Date of Sold")
            } else if (isEmpty(this.state.sellingQuantityUsedNum)) {
                SimpleToast.show("Please enter Sold Quantity Used")
            } else if (isEmpty(this.state.sellingUsedUnit.name)) {
                SimpleToast.show("Please select Sold Quantity Used Unit")
            } else if (isEmpty(this.state.soldUsed)) {
                SimpleToast.show("Please select Sold to")
            } else if (isEmpty(this.state.selectedDateMoney)) {
                SimpleToast.show("Please select Date of Money Received")
            } else if (isEmpty(this.state.moneyQuantityUsedNum)) {
                SimpleToast.show("Please enter Amount Money Received ")
            } else if (!isEmpty(this.state.selectedDatepestiside) || !isEmpty(this.state.pestisideBrandUsed.brandName)
                || !isEmpty(this.state.PestisideQuantityUsedNum) || !isEmpty(this.state.pestisideUsedUnit.name)) {
                if (isEmpty(this.state.selectedDatepestiside)) {
                    SimpleToast.show("Please select Date of Sprayed")
                } else if (isEmpty(this.state.pestisideBrandUsed.brandName)) {
                    SimpleToast.show("Please select Pesticide Brand")
                } else if (isEmpty(this.state.PestisideQuantityUsedNum)) {
                    SimpleToast.show("Please enter Pesticide Quantity Used")
                } else if (isEmpty(this.state.pestisideUsedUnit.name)) {
                    SimpleToast.show("Please select Pesticide Quantity Used Unit")
                } else if (!isEmpty(this.state.selectedDateharvested) || !isEmpty(this.state.harvestedUsedUnit.name)
                    || !isEmpty(this.state.harvestQuantityUsedNum) || !isEmpty(this.state.machineryUsed)) {
                    if (isEmpty(this.state.selectedDateharvested)) {
                        SimpleToast.show("Please select Date of Harvested")
                    } else if (isEmpty(this.state.harvestQuantityUsedNum)) {
                        SimpleToast.show("Please enter Harvested Quantity Used")
                    } else if (isEmpty(this.state.harvestedUsedUnit.name)) {
                        SimpleToast.show("Please select Harvested Quantity Used Unit")
                    } else if (isEmpty(this.state.machineryUsed)) {
                        SimpleToast.show("Please select Machinery Used")
                    } else if (this.state.machineryUsed === 'Yes' && isEmpty(this.state.machineryQuantityUsedNum)) {
                        SimpleToast.show("Please enter Machinery Type")
                    } else {
                        this.setState({ isLoading: true })
                        this.SeveData1();
                    }

                } else {
                    this.setState({ isLoading: true })
                    this.SeveData1();
                }
            } if (!isEmpty(this.state.selectedDateharvested) || !isEmpty(this.state.harvestedUsedUnit.name)
                || !isEmpty(this.state.harvestQuantityUsedNum) || !isEmpty(this.state.machineryUsed)) {
                if (isEmpty(this.state.selectedDateharvested)) {
                    SimpleToast.show("Please select Date of Harvested")
                } else if (isEmpty(this.state.harvestQuantityUsedNum)) {
                    SimpleToast.show("Please enter Harvested Quantity Used")
                } else if (isEmpty(this.state.harvestedUsedUnit.name)) {
                    SimpleToast.show("Please select Harvested Quantity Used Unit")
                } else if (isEmpty(this.state.machineryUsed)) {
                    SimpleToast.show("Please select Machinery Used")
                } else if (this.state.machineryUsed === 'Yes' && isEmpty(this.state.machineryQuantityUsedNum)) {
                    SimpleToast.show("Please enter Machinery Type")
                } else {
                    this.setState({ isLoading: true })
                    this.SeveData1();
                }

            } else {
                this.setState({ isLoading: true })
                this.SeveData1();
            }
        } else {
            this.setState({ isLoading: true })
            this.SeveData1();
        }




        // else if (isEmpty(this.state.selectedDateharvested)) {
        //     SimpleToast.show("Please select Date of Harvested")
        // } else if (isEmpty(this.state.harvestQuantityUsedNum)) {
        //     SimpleToast.show("Please enter Harvested Quantity Used")
        // } else if (isEmpty(this.state.harvestedUsedUnit.name)) {
        //     SimpleToast.show("Please select Harvested Quantity Used Unit")
        // } else if (isEmpty(this.state.machineryUsed)) {
        //     SimpleToast.show("Please select Machinery Used")
        // } else if (this.state.machineryUsed === 'Yes' && isEmpty(this.state.machineryQuantityUsedNum)) {
        //     SimpleToast.show("Please enter Machinery Type")
        // } else if (isEmpty(this.state.selectedDateSelling)) {
        //     SimpleToast.show("Please select Date of Sold")
        // } else if (isEmpty(this.state.sellingQuantityUsedNum)) {
        //     SimpleToast.show("Please enter Sold Quantity Used")
        // } else if (isEmpty(this.state.sellingUsedUnit.name)) {
        //     SimpleToast.show("Please select Sold Quantity Used Unit")
        // } else if (isEmpty(this.state.soldUsed)) {
        //     SimpleToast.show("Please select Sold to")
        // } else if (isEmpty(this.state.selectedDateMoney)) {
        //     SimpleToast.show("Please select Date of Money Received")
        // } else if (isEmpty(this.state.moneyQuantityUsedNum)) {
        //     SimpleToast.show("Please enter Amount Money Received ")
        // } else {
        //     // if (this.state.machineryUsed === 'No'){
        //     //     if (!isEmpty(this.state.machineryQuantityUsedNum)) {
        //     //     this.setState({machineryQuantityUsedNum :''});
        //     // }
        //     // } 

        //     this.setState({ isLoading: true })
        //     this.SeveData1();
        // }

    }

    componentWillMount() {



        var { body } = this.props.route.params

        console.log("body-->", body);


        this.setState({ body: body })
        // console.log("PestisideList-->",this.state.pestisideList);
        this.getBrndTypePestiside();

        this._retrieveData();
        //console.log("global.inputdataSave -->", global.inputdataSaveSecond);
        // if (!isEmpty(global.inputdataSaveSecond)) {
        //     this.setState({
        //         selectedDatepestiside: global.inputdataSaveSecond.pestisideSprayedOn,

        //         datenewpestiside: isEmpty(global.inputdataSaveSecond.pestisideSprayedOnarray) ? {} : global.inputdataSaveSecond.pestisideSprayedOnarray ,

        //         pestisideBrandUsed: isEmpty(global.inputdataSaveSecond.pestisideBrand) ? {} : global.inputdataSaveSecond.pestisideBrand,
                
        //         PestisideQuantityUsedNum: global.inputdataSaveSecond.pestisideQuantity,

        //         pestisideUsedUnit: isEmpty(global.inputdataSaveSecond.pestisideUnit) ? {} : global.inputdataSaveSecond.pestisideUnit,

        //         selectedDateharvested: global.inputdataSaveSecond.harvestOn,

        //         datenewharvested:isEmpty(global.inputdataSaveSecond.harvestOnarray) ? {} : global.inputdataSaveSecond.harvestOnarray,

        //         harvestQuantityUsedNum: global.inputdataSaveSecond.harvestQuantity,

        //         harvestedUsedUnit: isEmpty(global.inputdataSaveSecond.harvestUnit) ? {} : global.inputdataSaveSecond.harvestUnit,

        //         machineryQuantityUsedNum: global.inputdataSaveSecond.machineryType,

        //         machineryUsed: global.inputdataSaveSecond.machineryUsed,

        //         selectedDateSelling: global.inputdataSaveSecond.soldOn,

        //         datenewSelling:  isEmpty(global.inputdataSaveSecond.soldOnarrya) ? {} : global.inputdataSaveSecond.soldOnarrya,

        //         sellingQuantityUsedNum: global.inputdataSaveSecond.soldQuantity,

        //         sellingUsedUnit: isEmpty(global.inputdataSaveSecond.soldUnit) ? {} : global.inputdataSaveSecond.soldUnit,

        //         soldUsed: global.inputdataSaveSecond.soldToGovt,

        //         selectedDateMoney: global.inputdataSaveSecond.soldMoneyReceived,
        //         datenewMoney:  isEmpty(global.inputdataSaveSecond.soldMoneyReceivedarray) ? {} : global.inputdataSaveSecond.soldMoneyReceivedarray,
        //         moneyQuantityUsedNum: global.inputdataSaveSecond.soldAmountReceived,
        //         commentsQuantityUsedNum: global.inputdataSaveSecond.comments,


        //     })

        // }

        this.checktitle();
    }


    getBrndTypePestiside() {

        this.setState({ PestisideList: [] })
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
                        if (arrData[i].brandType === 'Pestiside') {


                            if (global.isLanguageOtherThanEnglish) {

                                await translateText([arrData[i].brandID, arrData[i].brandName, arrData[i].brandType], (result) => {

                                    var dict = {}
                                    dict["brandID"] = result[0].translatedText
                                    dict["brandName"] = result[1].translatedText
                                    dict["brandType"] = result[2].translatedText
                                    console.log("arrData------11", dict["brandName"])
                                    arrTemp.push(dict)
                                    //   var sortedData = arrTemp.sort((a, b) => a.subcatDisplayOrder - b.subcatDisplayOrder)
                                    this.setState({ PestisideList: arrTemp })

                                }, (err) => {
                                    //  console.log("arrData------222", arrData[i].brandType)
                                    SimpleToast.show('Something went wrong with translation')
                                    this.setState({ PestisideList: arrData })
                                    this.setState({ PestisideList: this.state.PestisideList.filter((x) => (x.brandType === 'Pestiside')) });

                                })
                            } else {
                                // console.log("arrData------333", arrData[i].brandType)
                                this.setState({ PestisideList: arrData })
                                this.setState({ PestisideList: this.state.PestisideList.filter((x) => (x.brandType === 'Pestiside')) });

                            }
                        }
                    }
                }

            }).catch(err => {
                console.log("language/list-labels Error", err)
            })
    }

    SeveData1() {

        var body = {
            "loginuserID": global.userID,
            "languageID": global.languageID,
            "apiType": "Android",
            "apiVersion": "2.0",
            "categoryID": isEmpty(this.state.body.categoryID) ? '' : this.state.body.categoryID,
            "subcatID": isEmpty(this.state.body.subcatID) ? '' : this.state.body.subcatID,
            "farmInputDate": isEmpty(this.state.body.farmInputDate) ? '' : this.state.body.farmInputDate,
            "farmInputYearSowed": isEmpty(this.state.body.farmInputYearSowed) ? '' : this.state.body.farmInputYearSowed,
            "farmInputTotalAcres": isEmpty(this.state.body.farmInputTotalAcres) ? '' : this.state.body.farmInputTotalAcres,
            "farmInputDaysLeftEmpty": isEmpty(this.state.body.farmInputDaysLeftEmpty) ? '' : this.state.body.farmInputDaysLeftEmpty,
            "farmInputWaterProvided": isEmpty(this.state.body.farmInputWaterProvided) ? '' : this.state.body.farmInputWaterProvided,
            "farmInputCanalTubewell": isEmpty(this.state.body.farmInputCanalTubewell) ? '' : this.state.body.farmInputCanalTubewell,
            // "farmInputWaterLavel": this.state.groundWaterLevel,
            "farmInputCultivated": isEmpty(this.state.body.farmInputCultivated) ? '' : this.state.body.farmInputCultivated,
            "farmInputTractorUsed": isEmpty(this.state.body.farmInputTractorUsed) ? '' : this.state.body.farmInputTractorUsed,
            "seedSowingDate": isEmpty(this.state.body.seedSowingDate) ? '' : this.state.body.seedSowingDate,
            "seedBrand": isEmpty(this.state.body.seedBrand) ? '' : this.state.body.seedBrand,
            "seedQuantity": isEmpty(this.state.body.seedQuantity) ? '' : this.state.body.seedQuantity,
            "seedUnit": isEmpty(this.state.body.seedUnit) ? '' : this.state.body.seedUnit,
            "fertilizerOn": isEmpty(this.state.body.fertilizerOn) ? '' : this.state.body.fertilizerOn,
            "fertilizerBrand": isEmpty(this.state.body.fertilizerBrand) ? '' : this.state.body.fertilizerBrand,
            "fertilizerQuantity": isEmpty(this.state.body.fertilizerQuantity) ? '' : this.state.body.fertilizerQuantity,
            "fertilizerUnit": isEmpty(this.state.body.fertilizerUnit) ? '' : this.state.body.fertilizerUnit,

            "pestisideSprayedOn": isEmpty(this.state.selectedDatepestiside) ? '' : this.state.selectedDatepestiside,
            "pestisideBrand": isEmpty(this.state.pestisideBrandUsed.brandName) ? '' : this.state.pestisideBrandUsed.brandName,
            "pestisideQuantity": isEmpty(this.state.PestisideQuantityUsedNum) ? '' : this.state.PestisideQuantityUsedNum,
            "pestisideUnit": isEmpty(this.state.pestisideUsedUnit.name) ? '' : this.state.pestisideUsedUnit.name,
            "harvestOn": isEmpty(this.state.selectedDateharvested) ? '' : this.state.selectedDateharvested,
            "harvestQuantity": isEmpty(this.state.harvestQuantityUsedNum) ? '' : this.state.harvestQuantityUsedNum,
            "harvestUnit": isEmpty(this.state.harvestedUsedUnit.name) ? '' : this.state.harvestedUsedUnit.name,
            "machineryType": isEmpty(this.state.machineryQuantityUsedNum) ? '' : this.state.machineryQuantityUsedNum,
            "machineryUsed": isEmpty(this.state.machineryUsed) ? '' : this.state.machineryUsed,
            "soldOn": isEmpty(this.state.selectedDateSelling) ? '' : this.state.selectedDateSelling,
            "soldQuantity": isEmpty(this.state.sellingQuantityUsedNum) ? '' : this.state.sellingQuantityUsedNum,
            "soldUnit": isEmpty(this.state.sellingUsedUnit.name) ? '' : this.state.sellingUsedUnit.name,
            "soldToGovt": isEmpty(this.state.soldUsed) ? '' : this.state.soldUsed,
            "soldMoneyReceived": isEmpty(this.state.selectedDateMoney) ? '' : this.state.selectedDateMoney,
            "soldAmountReceived": isEmpty(this.state.moneyQuantityUsedNum) ? '' : this.state.moneyQuantityUsedNum,
            "comments": isEmpty(this.state.commentsQuantityUsedNum) ? '' : this.state.commentsQuantityUsedNum
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

        console.log("farmmgt/farm-input-data-Server", JSON.stringify(body))
        fetch(global.Url + 'farmmgt/farm-input-data', config)
            .then(response => response.json())
            .then(async resulta => {

                console.log("farmmgt/farm-input-data", resulta)

                if (resulta[0].status == "true") {
                    SimpleToast.show(resulta[0].message)
                    // this.props.navigation.push('summary');
                    global.inputdataSave = '',
                        global.inputdataSaveSecond = '';
                       

                        var body = {
                            "value":"false",
                        }
    
                        this.saved(body)
                        this.savedone(body)
                }
                this.setState({ isLoading: false })
            }).catch(err => {
                this.setState({ isLoading: false })
                console.log("language/list-labels Error", err)
            })
    }

    SeveData() {

        var body = {
            "loginuserID": global.userID,
            "languageID": global.languageID,
            "apiType": "Android",
            "apiVersion": "2.0",
            "categoryID": this.state.body.categoryID,
            "subcatID": this.state.body.subcatID,
            "farmInputDate": this.state.body.farmInputDate,
            "farmInputYearSowed": this.state.body.farmInputYearSowed,
            "farmInputTotalAcres": this.state.body.farmInputTotalAcres,
            "farmInputDaysLeftEmpty": this.state.body.farmInputDaysLeftEmpty,
            "farmInputWaterProvided": this.state.body.farmInputWaterProvided,
            "farmInputCanalTubewell": this.state.body.farmInputCanalTubewell,
            // "farmInputWaterLavel": this.state.groundWaterLevel,
            "farmInputCultivated": this.state.body.farmInputCultivated,
            "farmInputTractorUsed": this.state.body.farmInputTractorUsed,
            "seedSowingDate": this.state.body.seedSowingDate,
            "seedBrand": isEmpty(this.state.body.seedBrand) ? this.state.body.seedBrand : '',
            "seedQuantity": this.state.body.seedQuantity,
            "seedUnit": this.state.body.seedUnit,
            "fertilizerOn": this.state.body.fertilizerOn,
            "fertilizerBrand": this.state.body.fertilizerBrand,
            "fertilizerQuantity": this.state.body.fertilizerQuantity,
            "fertilizerUnit": this.state.body.fertilizerUnit,

            "pestisideSprayedOn": this.state.selectedDatepestiside,
            "pestisideBrand": this.state.pestisideBrandUsed.brandName,
            "pestisideQuantity": this.state.PestisideQuantityUsedNum,
            "pestisideUnit": this.state.pestisideUsedUnit.name,
            "harvestOn": this.state.selectedDateharvested,
            "harvestQuantity": this.state.harvestQuantityUsedNum,
            "harvestUnit": this.state.harvestedUsedUnit.name,
            "machineryType": this.state.machineryQuantityUsedNum,
            "machineryUsed": this.state.machineryUsed,
            "soldOn": this.state.selectedDateSelling,
            "soldQuantity": this.state.sellingQuantityUsedNum,
            "soldUnit": this.state.sellingUsedUnit.name,
            "soldToGovt": this.state.soldUsed,
            "soldMoneyReceived": this.state.selectedDateMoney,
            "soldAmountReceived": this.state.moneyQuantityUsedNum,
            "comments": this.state.commentsQuantityUsedNum
        }
        console.log("farmmgt/farm-input-data", (body))
    }

    SaveDatainside() {
        //{  }
        if (isEmpty(this.state.selectedDatepestiside)) {
            SimpleToast.show("Please select Date of Sprayed")
        } else if (isEmpty(this.state.pestisideBrandUsed.brandName)) {
            SimpleToast.show("Please select Pesticide Brand")
        } else if (isEmpty(this.state.PestisideQuantityUsedNum)) {
            SimpleToast.show("Please enter Pesticide Quantity Used")
        } else if (isEmpty(this.state.pestisideUsedUnit.name)) {
            SimpleToast.show("Please select Pesticide Quantity Used Unit")
        }
        else if (isEmpty(this.state.selectedDateharvested)) {
            SimpleToast.show("Please select Date of Harvested")
        } else if (isEmpty(this.state.harvestQuantityUsedNum)) {
            SimpleToast.show("Please enter Harvested Quantity Used")
        } else if (isEmpty(this.state.harvestedUsedUnit.name)) {
            SimpleToast.show("Please select Harvested Quantity Used Unit")
        } else if (isEmpty(this.state.machineryUsed)) {
            SimpleToast.show("Please select Machinery Used")
        } else if (this.state.machineryUsed === 'Yes' && isEmpty(this.state.machineryQuantityUsedNum)) {
            SimpleToast.show("Please enter Machinery Type")
        } else if (isEmpty(this.state.selectedDateSelling)) {
            SimpleToast.show("Please select Date of Sold")
        } else if (isEmpty(this.state.sellingQuantityUsedNum)) {
            SimpleToast.show("Please enter Sold Quantity Used")
        } else if (isEmpty(this.state.sellingUsedUnit.name)) {
            SimpleToast.show("Please select Sold Quantity Used Unit")
        } else if (isEmpty(this.state.soldUsed)) {
            SimpleToast.show("Please select Sold to")
        } else if (isEmpty(this.state.selectedDateMoney)) {
            SimpleToast.show("Please select Date of Money Received")
        } else if (isEmpty(this.state.moneyQuantityUsedNum)) {
            SimpleToast.show("Please enter Amount Money Received ")
        } else {
            // if (this.state.machineryUsed === 'No'){
            //     console.log("condtiob-->", "true");
            //     this.setState({machineryQuantityUsedNum :''});
            // } 
            var body = {


                "pestisideSprayedOn": this.state.selectedDatepestiside,
                "pestisideSprayedOnarray": this.state.datenewpestiside,
                "pestisideBrand": this.state.pestisideBrandUsed,
                "pestisideQuantity": this.state.PestisideQuantityUsedNum,
                "pestisideUnit": this.state.pestisideUsedUnit,
                "harvestOn": this.state.selectedDateharvested,
                "harvestOnarray": this.state.datenewharvested,
                "harvestQuantity": this.state.harvestQuantityUsedNum,
                "harvestUnit": this.state.harvestedUsedUnit,
                "machineryType": this.state.machineryQuantityUsedNum,
                "machineryUsed": this.state.machineryUsed,
                "soldOn": this.state.selectedDateSelling,
                "soldOnarrya": this.state.datenewSelling,
                "soldQuantity": this.state.sellingQuantityUsedNum,
                "soldUnit": this.state.sellingUsedUnit,
                "soldToGovt": this.state.soldUsed,
                "soldMoneyReceived": this.state.selectedDateMoney,
                "soldMoneyReceivedarray": this.state.datenewMoney,
                "soldAmountReceived": this.state.moneyQuantityUsedNum,
                "comments": this.state.commentsQuantityUsedNum
            }


            console.log("NextPage-->", JSON.stringify(body));
            // this.props.navigation.navigate('inputdatanext', { body: body })
            global.inputdataSaveSecond = body;



        }

    }

}


function mapStateToProps(state) {
    return {


    };
}


export default compose(connect(mapStateToProps, {

}))(InputDataNext);


const styles = StyleSheet.create({


});