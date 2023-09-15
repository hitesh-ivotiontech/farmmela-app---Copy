import { error } from 'react-native-gifted-chat/lib/utils';
import { BaseUrl, BaseUrlNews } from './ServerConfig';
import Server from './callServer';


const serverData = {

    OTP_Verification: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}users/otp-verification`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },


    ResendOtp: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}users/otp-resend`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },



    RegisterUser: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}users/user-registration`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    LoginWithOtp: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}users/user-login-otp`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    AllLanguages: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}language/get-language-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    AllStates: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}masters/get-state-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    AllCities: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}masters/get-city-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    UpdateProfileData: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}users/user-update-profile`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GetAskQuestionCategory: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}masters/get-category-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GetAskQuestionSubCategory: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}masters/get-subcatgory-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GetPostSubCategory: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}masters/get-postsubcategory-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GetPostSubSubCategory: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}masters/get-postsubsubcategory-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    AskQuestion: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}askquestion/ask-question`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    PostNewAdvertisement: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}advertisements/post-advertisement`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    // PostNewRevenu: async(body, success,error) => {

    //     await Server.request("POST", global.Url + 'farmmgt/farm-mgt-add-account-data', body, (result) => {
    //         success(result);
    //     },
    //         (err) => {
    //             error(err);
    //         })
    // },
    GetHomeBanner: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}users/user-home`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GetAdvertisement: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}advertisements/get-advertisements`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GetMyAdvertisement: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}advertisements/my-advertisements`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GetNotifications: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}notification/get-notification-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    DeleteNotifications: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}notification/delete-notification`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    UpdateReadNotifications: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}notification/update-notification-read-status`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    ImportantLink: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-importantlinks-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GeneralKnowledge: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-generalknowledge-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    EcoFriendly: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-ecofriendly-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },



    OrganicFarming: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-organicfarming-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    HarvestToStorage: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-harvests-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    HarvestToStorageFlowers: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-flowerharvest-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    DiseasesManagement: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-diseases-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    MilkingToTransport: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-transportations-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    OrganicProducts: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-organicproduct-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    Breeding: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-breeding-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    LoanApplication: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-loanapp-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    MaintenanceHygiene: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-maintainance-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    CaptureToTransport: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-capturetransport-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    LicenseGuidelines: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-guidelines-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    Schemes: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-schemes-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    Workshops: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-workshops-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    SchemeIncentives: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-incentives-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    NGOs: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-ngos-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    CreateForum: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}forum/create-forum`, body, (result) => {
            console.log('forum respomse',result)
            success(result);
        },
            (err) => {
                console.log('forum error',err)
                error(err);
            })
    },

    GetForumList: async (body, success, error) => {
        console.log('base url is',BaseUrl)
        await Server.request("POST", `${BaseUrl}forum/get-forum-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    ForumLike: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}forum/forum-like`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    ForumUnlike: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}forum/forum-un-like`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    ForumAddComment: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}forum/forum-add-comment`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    ForumDeleteComment: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}forum/forum-delete-comment`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GetNews: async (body, success, error) => {
        await Server.request("GET", `${BaseUrlNews}`, "", (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    AddReport: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}forum/forum-report`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GetCountryList: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}masters/get-country-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    EditAdvertisement: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}advertisements/edit-advertisement`, body, (result) => {
            success(result);
        },
            (err) => {
                error('edit error',err);
            })
    },

    DeleteAdvertisement: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}advertisements/delete-advertisement`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    MarketPrice: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-msp-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    EditCommnetForum: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}forum/forum-edit-comment`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    EditForum: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}forum/edit-forum`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    DeleteForum: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}forum/delete-forum`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    PostCategoryList: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}masters/get-postcategory-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GetEnamList: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-enam-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GetFPOList: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-fpo-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GetFarmFacilityList: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-farm-facility-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },


    GetAgriFiananceList: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-agrifiance-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GetFarmInsuranceList: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}categorycontents/get-farminsurance-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },

    GetMapCategoryList: async (body, success, error) => {
        await Server.request("POST", `${BaseUrl}masters/get-mapcategory-list`, body, (result) => {
            success(result);
        },
            (err) => {
                error(err);
            })
    },
    

}

export default serverData