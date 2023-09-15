import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { View, StatusBar, Image, Dimensions, Text, TouchableOpacity, Alert,ImageBackground,Platform } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { colors } from '../colors';
import TnCPPAcceptModal from '../ReuseableComponent.js/TnCPrivacyPolicyAcceptModal';
import { OpenSansSemiBold } from '../src/validations';


const { width, height } = Dimensions.get('window')

class AppIntro extends React.Component {
    tncModal = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    key: 1,
                    image: require('../assets/intro_screen_with_logo.png'),
                    title: "Welcome to FarmMela",
                    description: ''
                },
                {
                    key: 2,
                    image: require('../assets/intro_screen_with_logo.png'),
                    title: "Welcome to FarmMela",
                    description: ''
                }, {
                    key: 2,
                    image: require('../assets/intro_screen_with_logo.png'),
                    title: "Welcome to FarmMela",
                    description: ''
                },
            ],
            activeSlide: 0
        }
        console.disableYellowBox = true;
    }


    componentDidMount() {
        this.timeout = setInterval(() => {
            this.tick();
        }, 5000)
        AsyncStorage.setItem('intro', 'seen')
    }
    componentWillUnmount() {
        clearInterval(this.timeout)
    }
    tick = () => {
        if (this.state.activeSlide == this.state.data.length - 1) {
            this.setState({ activeSlide: 0 })
            this.slider.goToSlide(0)
        } else {
            var i = this.state.activeSlide + 1
            this.setState({ activeSlide: i })
            this.slider.goToSlide(i)
        }

    };

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <StatusBar translucent={true} backgroundColor="transparent" />
                <AppIntroSlider
                    ref={ref => this.slider = ref}
                    data={this.state.data}
                    keyExtractor={item => item.description}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1,height:height }}>
                            <ImageBackground source={item.image} style={{ width: '100%', height: '100%',justifyContent:'flex-end'}}>

                            <View style={{ alignSelf:'flex-end',marginBottom:Platform.OS=='ios'?50:0,width: '100%', padding: 10,}}>
                                <Text style={{ width: "70%", fontFamily: OpenSansSemiBold, fontSize: 23, color: colors.white }}>{item.title}</Text>
                                <Text style={{ color: colors.white, width: '90%', marginTop: 5 }}>{item.description}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    {this.state.data.map((data, index) => (
                                        this.state.activeSlide == index ?
                                            <Image source={require('../assets/carousel_dot_white_selected.png')} style={{ width: 7, height: 7, resizeMode: 'contain', marginRight: 5 }} />
                                            : <Image source={require('../assets/carousel_dot_white_unselected.png')} style={{ width: 7, height: 7, resizeMode: 'contain', marginRight: 5 }} />
                                    ))}
                                </View>

                                <TouchableOpacity>
                                    <Text style={{ color: 'white', fontFamily: OpenSansSemiBold, textDecorationLine: 'underline', marginTop: 20 }}
                                        // onPress={() => { AsyncStorage.setItem('intro', 'seen'), this.props.navigation.replace("login") }}
                                        onPress={() => {
                                            this.tncModal.current.open()
                                        }}
                                    >Continue as Guest User</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{height:30, marginTop: 20}}>
                                    <Text style={{ color: 'white', fontFamily: OpenSansSemiBold, textDecorationLine: 'underline', }}
                                        onPress={() => { global.isSignIn = true,this.props.navigation.navigate("selectlanguage", { from: 'intro' }) }}
                                    >Sign In</Text>
                                </TouchableOpacity>

                            </View>
                                    </ImageBackground>

                        </View>
                    )}
                    onSlideChange={(activeSlide => this.setState({ activeSlide }))}
                    showNextButton={false}
                    dotStyle={{ display: 'none' }}
                    activeDotStyle={{ display: 'none' }}
                    showDoneButton={false}
                />
                <TnCPPAcceptModal modal={this.tncModal} navigation={this.props.navigation} action={() => {
                    global.isGuestLogin = true
                    global.isSignIn = false
                    this.props.navigation.replace("selectlanguage", { from: 'intro', })
                }} />

            </View>
        )
    }

}



export default AppIntro;