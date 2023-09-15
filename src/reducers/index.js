import { combineReducers } from "redux";
import {
	LoginWithOtp,
	OTP_Verification,
	RegisterUser,
	ResendOtp,
	OTP_VerificationRegister,
	UpdateProfileData,
	GetCountryList
} from './loginReducers';
import NetWorkStatus from "./networkState";
import {
	AllLanguages,
	AllCities,
	AllStates,
	GetAskQuestionCategory,
	GetAskQuestionSubCategory,
	GetHomeBanner,
	GetPostSubCategory,
	GetPostSubSubCategory,
	PostCategoryList,GetMapCategoryList
} from './commonReducers'
import {
	AskQuestion,
	CreateForum,
	GetForumList,
	ForumLike,
	ForumUnlike,
	ForumAddComment,
	ForumDeleteComment,
	AddReport,
	EditCommnetForum,
	EditForum,DeleteForum
} from './forumReducers'
import {
	PostNewAdvertisement,
	GetAdvertisement,
	GetMyAdvertisement,
	EditAdvertisement,
	DeleteAdvertisement
} from './buysellrentReducers'

import {
	GetNotifications,
	DeleteNotifications,
	UpdateReadNotifications
} from './notificationReducers'
import {
	ImportantLink,
	GeneralKnowledge,
	EcoFriendly,
	OrganicFarming,
	HarvestToStorage,
	HarvestToStorageFlowers,
	DiseasesManagement,
	MilkingToTransport,
	OrganicProducts,
	Breeding,
	LoanApplication,
	MaintenanceHygiene,
	CaptureToTransport,
	LicenseGuidelines,
	Schemes,
	Workshops,
	SchemeIncentives,
	NGOs,
	MarketPrice,GetEnamList,GetFPOList,GetFarmFacilityList,GetAgriFiananceList,GetFarmInsuranceList
} from './homeReducers'
import {
	GetNews
} from './newsReducers'

const appReducer = combineReducers({
	NetWorkStatus,
	LoginWithOtp,
	OTP_Verification,
	RegisterUser,
	ResendOtp,
	AllLanguages,
	AllCities,
	AllStates,
	OTP_VerificationRegister,
	UpdateProfileData,
	GetAskQuestionCategory,
	GetAskQuestionSubCategory,
	AskQuestion,
	PostNewAdvertisement,
	
	GetHomeBanner,
	GetAdvertisement,
	GetMyAdvertisement,
	GetNotifications,
	DeleteNotifications,
	UpdateReadNotifications,
	ImportantLink,
	GeneralKnowledge,
	EcoFriendly,
	OrganicFarming,
	HarvestToStorage,
	HarvestToStorageFlowers,
	DiseasesManagement,
	MilkingToTransport,
	OrganicProducts,
	Breeding,
	LoanApplication,
	MaintenanceHygiene,
	CaptureToTransport,
	LicenseGuidelines,
	Schemes,
	Workshops,
	SchemeIncentives,
	NGOs,
	CreateForum,
	GetForumList,
	ForumLike,
	ForumUnlike,
	ForumAddComment,
	ForumDeleteComment,
	GetNews,
	AddReport,
	GetCountryList,
	EditAdvertisement,
	DeleteAdvertisement,
	MarketPrice,
	GetPostSubCategory,
	GetPostSubSubCategory,
	EditCommnetForum,
	EditForum,
	PostCategoryList,
	DeleteForum,
	GetEnamList,GetFPOList,GetFarmFacilityList,GetAgriFiananceList,GetFarmInsuranceList,
	GetMapCategoryList

});

const rootReducer = (state, action) => {

	return appReducer(state, action);
};

export default rootReducer;
