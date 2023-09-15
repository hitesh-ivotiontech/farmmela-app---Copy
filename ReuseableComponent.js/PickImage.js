import React, { Component } from 'react';
import { Dimensions, Modal, Text, TouchableOpacity, View } from "react-native";
import { colors } from '../colors';
const { width, height } = Dimensions.get('window')
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker';
import { requestCameraPermission, requestGalleryPermission } from '../src/Requestpermissions';
import ImageResizer from 'react-native-image-resizer';
import SimpleToast from 'react-native-simple-toast';


export default class PickImage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    openCamera() {
        this.props.closeImageModal()
        requestCameraPermission((result) => {
            if (result == 'denied') {
                this.openCamera()
            }
            if (result == 'granted') {
                ImagePicker.openCamera({
                    cropping: true,
                    includeBase64: true, 
                    compressImageQuality:0.8,                   
                }).then(async image => {
                    console.log('image size',image.size);
                    let filetype = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length);
                    // console.log(image, 'image');
                    // console.log(filetype, 'filetype')
                    /* let disc={};
                     disc['imagesource']=image.path;
                     disc['imagename'] =filetype;
                     console.log('image dictionary',disc)*/
                     if(image.size > 5000000){
                        SimpleToast.show('Please select image less than 5 MB')
                    }else{
                        this.props.selectedImage(filetype, image)
                }

                    // this.Image_Upload_To_Server()
                });
            }
        })

    }

    openGallery() {

        console.log('openGallery 00',"openGallery");
         this.props.closeImageModal()
      
        requestGalleryPermission((result) => {
            if (result == 'denied') {
                console.log('openGallery 11',"openGallery");
                this.openGallery()
            }
            if (result == 'granted') {
                console.log('openGallery 22',"openGallery");
                ImagePicker.openPicker({
                    cropping: true,
                    includeBase64: true,
                    compressImageQuality:0.8,
                }).then(async image => {
                    console.log('image is',image.path);
                    console.log('image size',image.size);
                    // ImageResizer.createResizedImage(image.path,width,height,'jpg',100,0).then(response => {
                    //     console.log(response, 'createResizedImage response');
                    // }).catch(error=>
                    //     console.log(error, 'createResizedImage error'))
                    let filetype = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length);
                    // console.log(image, 'image');
                    // console.log(filetype, 'filetype')
                    /* let disc={};
                     disc['imagesource']=image.path;
                     disc['imagename'] =filetype;
                     console.log('image dictionary',disc)*/
                    // await this.setState({
                    //     avatarSource: { uri: image.path },
                    //     avatar_image_data: image.path,
                    //     avatar_image_name: filetype,
                    //     //isLoading:true
                    // });
                    if(image.size > 5000000){
                        SimpleToast.show('Please select image less than 5 MB')
                    }else{
                        this.props.selectedImage(filetype, image)
                    }
                    
                   
                   //  this.Image_Upload_To_Server()
                });
            }
        })
    }


    render() {
        return (
            <Modal visible={this.props.imageModal} transparent={true} animationType="slide" >

                <View style={{ width: width, height: width / 1.4, position: "absolute", bottom: -10 }}>
                    <View style={{ width: width, height: width / 7.2 }}>
                        <View style={{ alignSelf: "center", backgroundColor: colors.green, borderRadius: 30, padding: 5 }}>
                            <TouchableOpacity onPress={() => this.props.closeImageModal()}>
                                <Ionicons name="close" size={30} color={'white'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ backgroundColor: colors.green, width: width, height: width / 1.8, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                        <Text style={{ margin: 15, fontSize: 12, color: 'white' }}>{"Upload from"}</Text>

                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>

                            <View>
                                <TouchableOpacity onPress={() => {
                                    this.openCamera()
                                }}>
                                    <View style={{ backgroundColor: colors.white, width: 50, height: width / 7.2, justifyContent: "center", borderRadius: 25 }}>
                                        <Ionicons name="camera" size={25} style={{ alignSelf: "center", opacity: 1 }} color={colors.greenTo} />
                                    </View>
                                    <Text style={{ textAlign: "center", fontSize: 9, paddingTop: 10, color: 'white' }}>{"Camera"}</Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity onPress={() => 
                                    this.openGallery()
                                }>
                                    <View style={{ backgroundColor: colors.white, width: 50, height: width / 7.2, justifyContent: "center", borderRadius: 25 }}>
                                        <Ionicons name="image" size={25} style={{ alignSelf: "center", opacity: 1 }} color={colors.greenTo} />
                                    </View>
                                    <Text style={{ textAlign: "center", fontSize: 9, paddingTop: 10, color: 'white' }}>{"Gallery"}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}