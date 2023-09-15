import { Platform } from "react-native";
import { PERMISSIONS, checkMultiple, request } from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings'
import Toast from 'react-native-simple-toast';
import { PermissionsAndroid } from 'react-native';

export const requestLocationPermission = (success) => {

    if (Platform.OS === "android") {
        checkMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then(
            (statuses) => {
                if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "denied") {
                    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
                        success('denied')
                        // requestLocationPermission();
                    });
                }
                if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "blocked") {
                    // alert("Allow Location access from settings")
                    Toast.show("Allow Location access from settings")
                    AndroidOpenSettings.appDetailsSettings()
                }
                if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "granted") {
                    success('granted')
                }

            },
        );
    } else {
        checkMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS,]).then(
            (statuses) => {
                if (statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === "denied") {
                    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
                        success('denied')
                    });
                }
                if (statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === "blocked") {
                    Toast.show("Allow Location access from settings")
                    // alert("Allow location access from settings")
                }
                if (statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === "granted") {
                    success('granted')
                }

            },
        );
    }

}



export const requestCameraPermission = (success) => {

    if (Platform.OS === "android") {
        checkMultiple([PERMISSIONS.ANDROID.CAMERA]).then(
            (statuses) => {
                if (statuses[PERMISSIONS.ANDROID.CAMERA] === "denied") {
                    request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
                        success('denied')
                        // requestLocationPermission();
                    });
                }
                if (statuses[PERMISSIONS.ANDROID.CAMERA] === "blocked") {
                    // alert("Allow Location access from settings")
                    Toast.show('Allow Camera permission from settings')
                    AndroidOpenSettings.appDetailsSettings()
                }
                if (statuses[PERMISSIONS.ANDROID.CAMERA] === "granted") {
                    success('granted')
                }

            },
        );
    } else {
        checkMultiple([PERMISSIONS.IOS.CAMERA,]).then(
            (statuses) => {
                if (statuses[PERMISSIONS.IOS.CAMERA] === "denied") {
                    request(PERMISSIONS.IOS.CAMERA).then((result) => {
                        success('denied')
                    });
                }
                if (statuses[PERMISSIONS.IOS.CAMERA] === "blocked") {
                    alert("Allow camera access from settings")
                }
                if (statuses[PERMISSIONS.IOS.CAMERA] === "granted") {
                    success('granted')
                }

            },
        );
    }

}



export const requestGalleryPermission = (success) => {

    if (Platform.OS === "android") {
        if(Platform.Version >= 33){
            
            success('granted')
        }else{
            checkMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then(
                (statuses) => {
                    if (statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "denied") {
                        request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
                            success('denied')
                            // requestLocationPermission();
                        });
                    }
                    if (statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "blocked") {
                        // alert("Allow Location access from settings")
                        Toast.show('Allow Storage permission from settings')
                        AndroidOpenSettings.appDetailsSettings()
                    }
                    if (statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "granted") {
                        success('granted')
                    }
    
                },
            );
        }
        
    } else {
        checkMultiple([PERMISSIONS.IOS.PHOTO_LIBRARY,]).then(
            (statuses) => {
                if (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === "denied") {
                    request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
                        success('denied')
                    });
                }
                if (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === "blocked") {
                    alert("Allow storage access from settings")
                }
                if (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === "granted") {
                    success('granted')
                }

            },
        );
    }

}

export const requestCchekPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        this._openCamera();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

export const requestGalleryPermissionNew = async (success) => {

    if (Platform.OS === "android") {
        if(Platform.Version >= 33){
            success('granted')
        }else{
            checkMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.CAMERA,]).then(
                (statuses) => {
                    if (statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] && statuses[PERMISSIONS.ANDROID.CAMERA] === "denied") {
                        request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.CAMERA).then((result) => {
                            success('denied')
                            // requestLocationPermission();
                        });
                    }
                    if (statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] && statuses[PERMISSIONS.ANDROID.CAMERA] === "blocked") {
                        // alert("Allow Location access from settings")
                        Toast.show('Allow Storage permission from settings')
                        AndroidOpenSettings.appDetailsSettings()
                    }
                    if (statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] && statuses[PERMISSIONS.ANDROID.CAMERA] === "granted") {
                        success('granted')
                    }

                },
            );
        }
        // checkMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,PERMISSIONS.ANDROID.CAMERA,]).then(
        //     (statuses) => {
        //         if (statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] && statuses[PERMISSIONS.ANDROID.CAMERA] === "denied") {
        //             request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,PERMISSIONS.ANDROID.CAMERA).then((result) => {
        //                 success('denied')
        //                 // requestLocationPermission();
        //             });
        //         }
        //         if (statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] && statuses[PERMISSIONS.ANDROID.CAMERA] === "blocked") {
        //             // alert("Allow Location access from settings")
        //             Toast.show('Allow Storage permission from settings')
        //             AndroidOpenSettings.appDetailsSettings()
        //         }
        //         if (statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] && statuses[PERMISSIONS.ANDROID.CAMERA] === "granted") {
        //             success('granted')
        //         }

        //     },
        // );

        // try {
        //     const granted = await PermissionsAndroid.request(
        //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        //       {
        //         title: "App Permission",
        //         message:"App needs access to your File ",
        //         buttonNeutral: "Ask Me Later",
        //         buttonNegative: "Cancel",
        //         buttonPositive: "OK"
        //       }
        //     );
        //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //       console.log("Camera permission given");
        //      // this._openCamera();
        //      success('granted')
        //     } else {
        //       console.log("Camera permission denied");
        //       success('denied')
        //     }
        //   } catch (err) {
        //     console.warn(err);

        //   }

        //   PermissionsAndroid.check(
        //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        //   ).then(granted => {
        //     if (!granted) {
        //       PermissionsAndroid.requestMultiple([
        //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        //       ]).then(result => {
        //         console.log("openGallery 333",result);
        //       });
        //     }
        //   });
    } else {
        checkMultiple([PERMISSIONS.IOS.PHOTO_LIBRARY,]).then(
            (statuses) => {
                if (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === "denied") {
                    request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
                        success('denied')
                    });
                }
                if (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === "blocked") {
                    alert("Allow storage access from settings")
                }
                if (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === "granted") {
                    success('granted')
                }

            },
        );
    }

}