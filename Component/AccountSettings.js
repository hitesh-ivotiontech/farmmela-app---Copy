import React,{Fragment} from 'react';
import { View, StatusBar, Image, SafeAreaView, ImageBackground,Platform, Dimensions, Text, FlatList, TouchableOpacity, TextInput,BackHandler } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { colors } from '../colors';
import Header from '../ReuseableComponent.js/Header';
import { isEmpty,  OpenSansSemiBold } from '../src/validations';
import LinearGradient from 'react-native-linear-gradient'

const { width, height } = Dimensions.get('window')

class AccountSettings extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            category: [
                {
                    image: require('../assets/change_language.png'),
                    name: global.languageData.Change_Language,
                    nav: 'selectlanguage',
                    data: { from: 'setting' }
                },
                {
                    image: require('../assets/change_location.png'),
                    name: global.languageData.Change_Location,
                    nav: 'location',
                    data: { from: 'setting' }
                },

            ]
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        console.disableYellowBox = true;

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        console.log('back click')
        //this.props.navigation.push('myaccount')
        this.props.navigation.navigate('myaccount')
        return true;
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
                <Header props={this.props} name={global.languageData.Account_Settings} isSetting={true} showHome={true} navName={'myaccount'}/>
                {/* <Header name={global.languageData.Account_Settings} props={this.props} showHome={true}/> */}
                <FlatList
                    data={this.state.category}
                    keyExtractor={item => item.name}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { isEmpty(item.nav) ? SimpleToast.show('Not available') : this.props.navigation.push(item.nav, item.data,{from:'setting'}) }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: colors.white, borderRadius: 5, elevation: 2, margin: 10 }}>
                            <Image source={item.image} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                            <Text style={{ width: '60%', fontSize: 17, fontFamily: OpenSansSemiBold }}>{item.name}</Text>
                            <Image source={require('../assets/arrow_right_black.png')} style={{ width: 12, height: 12, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    )}
                />

            


            </SafeAreaView>
            </Fragment>
        )
    }

}



function mapStateToProps(state) {
    return {


    };
}


export default compose(connect(mapStateToProps, {

}))(AccountSettings);