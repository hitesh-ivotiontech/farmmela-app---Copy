import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground,Platform, Dimensions, Text, FlatList, TouchableOpacity,BackHandler, TextInput, ScrollView, StyleSheet, } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import Header from '../ReuseableComponent.js/Header';
import SearchAndFilter from '../ReuseableComponent.js/SearchAndFilter';
import { HomeActions } from '../src/actions';
import HTML from 'react-native-render-html';
import { isServerSuccess, OpenSansSemiBold, RupeeSign } from '../src/validations';
const { width, height } = Dimensions.get('window')
import { translateText } from '../src/LanguageTranslation';
import LinearGradient from 'react-native-linear-gradient'

class MarketPrice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: [
                { name: "Wheat", price: '1,500', unit: 'Kuntal' },
                { name: "Rice", price: '1,200', unit: 'Kuntal' },
                { name: "Pulses", price: '2,500', unit: 'Kuntal' },
                { name: "Maize", price: '1,400', unit: 'Kuntal' },
            ],
            html: ''
        }
        console.disableYellowBox = true;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        var body = {
            "userID": global.userID,
            "languageID": global.languageID,
            "apiType": "Android",
            "apiVersion": "2.0",
            "categoryID": "1",
            "subcatID": ""
        }
        this.props.MarketPrice(body)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }


    handleBackButtonClick = () => {
        this.props.navigation.navigate('categorydetails')
        return true;
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.MarketPriceSuccess) {
            var data = nextProps.MarketPriceInfo.details
            isServerSuccess(data, this.props, async (response) => {
                if (response.status == "true") {

                    global.isLanguageOtherThanEnglish ?
                    await translateText([response.data[0].mspInfo] , (result) => {
                      
                        this.setState({ html: result[0].translatedText })
                    }, (err) => {
                        this.setState({ html: response.data[0].mspInfo })
                    }):this.setState({ html: response.data[0].mspInfo })
                    
                    this.setState({ html: response.data[0].mspInfo })

                    setTimeout(() => {
                        console.log("Response", this.state.html)
                    }, 300);
                }
            })
        }
    }

    render() {

        return (
            <Fragment>
            {Platform.OS=='ios'?<LinearGradient start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={[colors.greenHeaderFrom, colors.greenHeaderTo]}
        style={{height:global.notchHeight}}/>:null}
            <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.75)" }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <Header props={this.props} name={global.languageData.Market_Rates} showHome={true} />

                <View style={{ margin: 10, flex: 1 }}>
                    {/* <SearchAndFilter onChangeText={() => { }} /> */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <HTML source={{ html: this.state.html }} contentWidth={width} />
                    </ScrollView>
                    {/* <FlatList
                        data={this.state.category}
                        keyExtractor={item => item.name}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, }}>
                                <View style={styles.column1}>
                                    <Text style={{}}>{item.name}</Text>
                                </View>
                                <View style={styles.column2}>
                                    <Text style={{}}>{RupeeSign} {item.price}</Text>
                                </View>
                                <View style={styles.column3}>
                                    <Text style={{}}>{item.unit}</Text>
                                </View>
                            </View>
                        )}
                        ListHeaderComponent={() => (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: colors.FruitsGrid }}>
                                <View style={styles.column1}>
                                    <Text style={{ fontFamily: OpenSansSemiBold }}>Crop Name</Text>
                                </View>
                                <View style={styles.column2}>
                                    <Text style={{ fontFamily: OpenSansSemiBold }}>Rates</Text>
                                </View>
                                <View style={styles.column3}>
                                    <Text style={{ fontFamily: OpenSansSemiBold }}>UoM</Text>
                                </View>
                            </View>
                        )}
                        ItemSeparatorComponent={() => (<View style={{ height: 1, backgroundColor: colors.lightgrey }} />)}
                        style={{ backgroundColor: colors.white, marginTop: 10, elevation: 0.2 }}
                    /> */}
                </View>



            </SafeAreaView>
            </Fragment>
        )
    }

}



function mapStateToProps(state) {
    return {
        MarketPriceInfo: state.MarketPrice,
        MarketPriceSuccess: state.MarketPrice.success,

    };
}


export default compose(connect(mapStateToProps, {
    ...HomeActions
}))(MarketPrice);


const styles = StyleSheet.create({
    column1: {
        width: '45%',

    },
    column2: {
        width: '25%',


    },
    column3: {
        width: '30%',
        alignItems: 'flex-end'

    }
})