import React, { Component, useState } from 'react'
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput,ActivityIndicator, TouchableOpacity, View,Animated } from 'react-native'
import { Modalize } from 'react-native-modalize';
import { colors } from '../colors'
import { OpenSansSemiBold } from '../src/validations';
import SimpleToast from 'react-native-simple-toast';
import ImageZoom from 'react-native-image-pan-zoom';
import Modal from "react-native-modal";
import { BaseUrlProfilePic } from '../src/api/ServerConfig';
import FastImage from 'react-native-fast-image'

const { width, height } = Dimensions.get('window')

export default class ImageZoomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen:false,
            isModalLoader:false
        }
    }

    
    componentDidMount(){
        global.isImageLoad = true
    }

    componentWillMount(){
    }

    btnRightAction=()=>{
        
        if( this.flatListRef !=null){
            if(this.props.arrImages.length == this.props.selectedIndex){
               
            }else{
                this.flatListRef.scrollToIndex({animated: true, index: this.props.selectedIndex});
            }
                
        }
    }

    btnLeftAction=()=>{
        console.log('index is left',this.props.selectedIndex)
        if( this.flatListRef !=null){
            if(this.props.selectedIndex == 0){
                console.log('index is left',this.props.selectedIndex)
            }else{
                this.flatListRef.scrollToIndex({animated: true, index: this.props.selectedIndex});
            }
            
        }
    }

    UNSAFE_componentWillReceiveProps(){
        
        if(this.props.selectedIndex == 0 && global.isImageLoad == false){
           
        }else{
           if(global.isImageLoad == false){
           }else{
                this.setState({isModalLoader:true})
           }
           
        }
         setTimeout(() => {
            
            if( this.flatListRef !=null){
                
                this.flatListRef.scrollToIndex({animated: false, index: this.props.selectedIndex});
                setTimeout(() => {
                    this.setState({isModalLoader:false})
                }, 300);
              
                
            }
            
        }, 300);
    }

    setLoaderModal(){
        return(
            <Modal isVisible={this.state.isModalLoader} style={{
                backgroundColor: 'black', width: width + 10, marginLeft: -5,
            }} backdropColor={'rgb(0,0,0)'} backdropOpacity={1}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator color={colors.lightgrey1} size="large" />
                </View>
            </Modal>
        )
    }

  
    render() {
        return (
            
            <Modal isVisible={this.props.isModalOpen} style={{
                backgroundColor: 'black', width: width + 10, marginLeft: -5,
    
            }} backdropColor={'rgb(0,0,0)'} backdropOpacity={1}>
                {this.setLoaderModal()}
                
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={this.props.closeModalAction} style={{ marginTop: 25 }}>
                        <Image source={require('../assets/close_white.png')} style={{ height: 25, width: 25, resizeMode: 'contain', marginLeft: 20, }} />
                    </TouchableOpacity>
                    <FlatList
                data={this.props.arrImages}
                style={{ width: Dimensions.get('window').width,marginTop:10}}
                horizontal={true}
                pagingEnabled={true}
                scrollEnabled={false}
                ref={ref => this.flatListRef = ref}
                showsHorizontalScrollIndicator={false}
                onScrollToIndexFailed={(error) => {
                    this.flatListRef.scrollToOffset({ offset: error.averageItemLength * error.index, animated: true });
                    setTimeout(() => {
                      if (this.props.arrImages !== 0 && this.flatListRef !== null) {
                        this.flatListRef.scrollToIndex({ index: error.index, animated: true });
                      }
                    }, 100);
                  }}
                renderItem={({ item, index }) =>
                <View style={{width:width,flex:1,marginLeft:10}}> 
                <ImageZoom
                cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height-200}
                imageWidth={Dimensions.get('window').width}
                imageHeight={height-200}
                >
                {/* <Image
                    source={{ uri:BaseUrlProfilePic + item }}
                    
                    style={{
                        width: Dimensions.get('window').width,
                        height: height - 200,
                        resizeMode: 'contain',
                    }}
                    
                /> */}
               <FastImage
                    style={{
                        width: Dimensions.get('window').width,
                        height: height - 200,
                        
                    }}
                    resizeMode='contain'
                    source={{
                        uri: BaseUrlProfilePic + item,
                        priority: FastImage.priority.normal,
                    }}
            />
            </ImageZoom> 
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:10,width:width-20}}>
                {this.props.selectedIndex ==0?<View style={{ height: 25, width: 25}}/>: <TouchableOpacity onPress={this.props.btnLeftAction} style={{ marginTop: 25 }}>
                        <Image source={require('../assets/arrow_left.png')} style={{ height: 25, width: 25, resizeMode: 'contain', marginLeft: 20, }} />
                    </TouchableOpacity>}
               
                    {this.props.arrImages.length ==this.props.selectedIndex+1?null:<TouchableOpacity onPress={this.props.btnRightAction} style={{ marginTop: 25 }}>
                        <Image source={require('../assets/arrow_right.png')} style={{ height: 25, width: 25, resizeMode: 'contain', marginLeft: 20, }} />
                    </TouchableOpacity>}
                    
                </View>
           </View>
                }/>

                {this.state.isModalLoader?<View style={{ width: Dimensions.get('window').width,
                marginTop:0,height:height,backgroundColor:'black',position:'absolute',justifyContent:'center'}}>
                    <ActivityIndicator color={colors.lightgrey1} size="large" />
                </View>:null}
               
                     
                </View>
                
            </Modal>
        )
    }
}


const styles = StyleSheet.create({
    activeFilter: {
        color: colors.green,
        backgroundColor: colors.white,
        height: 40,
        textAlignVertical: 'center',
        fontSize: 15,
        paddingLeft: 10
    },
    inActiveFilter: {
        color: colors.black,
        backgroundColor: colors.lightgrey,
        height: 40,
        textAlignVertical: 'center',
        fontSize: 15,
        paddingLeft: 10
    }
})