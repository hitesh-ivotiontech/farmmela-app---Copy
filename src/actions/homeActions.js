import serverData from '../api/ServerData'

export const IMPORTANT_LINKS = 'IMPORTANT_LINKS';
export const IMPORTANT_LINKS_SUCCESS = 'IMPORTANT_LINKS_SUCCESS';
export const IMPORTANT_LINKS_FAILED = 'IMPORTANT_LINKS_FAILED';

export const GENERAL_KNOWLEDGE = 'GENERAL_KNOWLEDGE';
export const GENERAL_KNOWLEDGE_SUCCESS = 'GENERAL_KNOWLEDGE_SUCCESS';
export const GENERAL_KNOWLEDGE_FAILED = 'GENERAL_KNOWLEDGE_FAILED';

export const ECO_FRIENDLY = 'ECO_FRIENDLY';
export const ECO_FRIENDLY_SUCCESS = 'ECO_FRIENDLY_SUCCESS';
export const ECO_FRIENDLY_FAILED = 'ECO_FRIENDLY_FAILED';

export const ORGANIC_FARMING = 'ORGANIC_FARMING';
export const ORGANIC_FARMING_SUCCESS = 'ORGANIC_FARMING_SUCCESS';
export const ORGANIC_FARMING_FAILED = 'ORGANIC_FARMING_FAILED';

export const HARVEST_TO_STORAGE = 'HARVEST_TO_STORAGE';
export const HARVEST_TO_STORAGE_SUCCESS = 'HARVEST_TO_STORAGE_SUCCESS';
export const HARVEST_TO_STORAGE_FAILED = 'HARVEST_TO_STORAGE_FAILED';

export const HARVEST_TO_STORAGE_FLOWERS = 'HARVEST_TO_STORAGE_FLOWERS';
export const HARVEST_TO_STORAGE_FLOWERS_SUCCESS = 'HARVEST_TO_STORAGE_FLOWERS_SUCCESS';
export const HARVEST_TO_STORAGE_FLOWERS_FAILED = 'HARVEST_TO_STORAGE_FLOWERS_FAILED';

export const DISEASES_MANAGEMENT = 'DISEASES_MANAGEMENT';
export const DISEASES_MANAGEMENT_SUCCESS = 'DISEASES_MANAGEMENT_SUCCESS';
export const DISEASES_MANAGEMENT_FAILED = 'DISEASES_MANAGEMENT_FAILED';

export const MILKING_TO_TRANSPORT = 'MILKING_TO_TRANSPORT';
export const MILKING_TO_TRANSPORT_SUCCESS = 'MILKING_TO_TRANSPORT_SUCCESS';
export const MILKING_TO_TRANSPORT_FAILED = 'MILKING_TO_TRANSPORT_FAILED';

export const ORGANIC_PRODUCTS = 'ORGANIC_PRODUCTS';
export const ORGANIC_PRODUCTS_SUCCESS = 'ORGANIC_PRODUCTS_SUCCESS';
export const ORGANIC_PRODUCTS_FAILED = 'ORGANIC_PRODUCTS_FAILED';

export const BREEDING = 'BREEDING';
export const BREEDING_SUCCESS = 'BREEDING_SUCCESS';
export const BREEDING_FAILED = 'BREEDING_FAILED';

export const LOAN_APPLICATION = 'LOAN_APPLICATION';
export const LOAN_APPLICATION_SUCCESS = 'LOAN_APPLICATION_SUCCESS';
export const LOAN_APPLICATION_FAILED = 'LOAN_APPLICATION_FAILED';

export const MAINTENANCE_HYGIENE = 'MAINTENANCE_HYGIENE';
export const MAINTENANCE_HYGIENE_SUCCESS = 'MAINTENANCE_HYGIENE_SUCCESS';
export const MAINTENANCE_HYGIENE_FAILED = 'MAINTENANCE_HYGIENE_FAILED';

export const CAPTURE_TO_TRANSPORT = 'CAPTURE_TO_TRANSPORT';
export const CAPTURE_TO_TRANSPORT_SUCCESS = 'CAPTURE_TO_TRANSPORT_SUCCESS';
export const CAPTURE_TO_TRANSPORT_FAILED = 'CAPTURE_TO_TRANSPORT_FAILED';

export const LICENSE_GUIDELINES = 'LICENSE_GUIDELINES';
export const LICENSE_GUIDELINES_SUCCESS = 'LICENSE_GUIDELINES_SUCCESS';
export const LICENSE_GUIDELINES_FAILED = 'LICENSE_GUIDELINES_FAILED';

export const SCHEMES = 'SCHEMES';
export const SCHEMES_SUCCESS = 'SCHEMES_SUCCESS';
export const SCHEMES_FAILED = 'SCHEMES_FAILED';

export const WORKSHOPS = 'WORKSHOPS';
export const WORKSHOPS_SUCCESS = 'WORKSHOPS_SUCCESS';
export const WORKSHOPS_FAILED = 'WORKSHOPS_FAILED';

export const SCHEME_INCENTIVES = 'SCHEME_INCENTIVES';
export const SCHEME_INCENTIVES_SUCCESS = 'SCHEME_INCENTIVES_SUCCESS';
export const SCHEME_INCENTIVES_FAILED = 'SCHEME_INCENTIVES_FAILED';

export const NGOS = 'NGOS';
export const NGOS_SUCCESS = 'NGOS_SUCCESS';
export const NGOS_FAILED = 'NGOS_FAILED';

export const MARKET_PRICE = 'MARKET_PRICE';
export const MARKET_PRICE_SUCCESS = 'MARKET_PRICE_SUCCESS';
export const MARKET_PRICE_FAILED = 'MARKET_PRICE_FAILED';

export const GET_ENAM_LIST = 'GET_ENAM_LIST';
export const GET_ENAM_LIST_SUCCESS = 'GET_ENAM_LIST_SUCCESS';
export const GET_ENAM_LIST_FAILED = 'GET_ENAM_LIST_FAILED';

export const GET_FPO_LIST = 'GET_FPO_LIST';
export const GET_FPO_LIST_SUCCESS = 'GET_FPO_LIST_SUCCESS';
export const GET_FPO_LIST_FAILED = 'GET_FPO_LIST_FAILED';

export const GET_FARM_FACILITY_LIST = 'GET_FARM_FACILITY_LIST';
export const GET_FARM_FACILITY_LIST_SUCCESS = 'GET_FARM_FACILITY_LIST_SUCCESS';
export const GET_FARM_FACILITY_LIST_FAILED = 'GET_FARM_FACILITY_LIST_FAILED';

export const GET_AGRI_FIANANCE_LIST = 'GET_AGRI_FIANANCE_LIST';
export const GET_AGRI_FIANANCE_LIST_SUCCESS = 'GET_AGRI_FIANANCE_LIST_SUCCESS';
export const GET_AGRI_FIANANCE_LIST_FAILED = 'GET_AGRI_FIANANCE_LIST_FAILED';

export const GET_FARM_INSURANCE_LIST = 'GET_FARM_INSURANCE_LIST';
export const GET_FARM_INSURANCE_LIST_SUCCESS = 'GET_FARM_INSURANCE_LIST_SUCCESS';
export const GET_FARM_INSURANCE_LIST_FAILED = 'GET_FARM_INSURANCE_LIST_FAILED';

export function ImportantLink(action) {
    return async dispatch => {
        dispatch({
            type: IMPORTANT_LINKS,
            payload: {},
        });
        await serverData.ImportantLink(
            action,
            data => {
                dispatch({
                    type: IMPORTANT_LINKS_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: IMPORTANT_LINKS_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function GeneralKnowledge(action) {
    return async dispatch => {
        dispatch({
            type: GENERAL_KNOWLEDGE,
            payload: {},
        });
        await serverData.GeneralKnowledge(
            action,
            data => {
                dispatch({
                    type: GENERAL_KNOWLEDGE_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GENERAL_KNOWLEDGE_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function EcoFriendly(action) {
    return async dispatch => {
        dispatch({
            type: ECO_FRIENDLY,
            payload: {},
        });
        await serverData.EcoFriendly(
            action,
            data => {
                dispatch({
                    type: ECO_FRIENDLY_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: ECO_FRIENDLY_FAILED,
                    payload: error,
                });
            },
        );
    };
}



export function OrganicFarming(action) {
    return async dispatch => {
        dispatch({
            type: ORGANIC_FARMING,
            payload: {},
        });
        await serverData.OrganicFarming(
            action,
            data => {
                dispatch({
                    type: ORGANIC_FARMING_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: ORGANIC_FARMING_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function HarvestToStorage(action) {
    return async dispatch => {
        dispatch({
            type: HARVEST_TO_STORAGE,
            payload: {},
        });
        await serverData.HarvestToStorage(
            action,
            data => {
                dispatch({
                    type: HARVEST_TO_STORAGE_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: HARVEST_TO_STORAGE_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function HarvestToStorageFlowers(action) {
    return async dispatch => {
        dispatch({
            type: HARVEST_TO_STORAGE_FLOWERS,
            payload: {},
        });
        await serverData.HarvestToStorageFlowers(
            action,
            data => {
                dispatch({
                    type: HARVEST_TO_STORAGE_FLOWERS_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: HARVEST_TO_STORAGE_FLOWERS_FAILED,
                    payload: error,
                });
            },
        );
    };
}



export function DiseasesManagement(action) {
    return async dispatch => {
        dispatch({
            type: DISEASES_MANAGEMENT,
            payload: {},
        });
        await serverData.DiseasesManagement(
            action,
            data => {
                dispatch({
                    type: DISEASES_MANAGEMENT_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: DISEASES_MANAGEMENT_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function MilkingToTransport(action) {
    return async dispatch => {
        dispatch({
            type: MILKING_TO_TRANSPORT,
            payload: {},
        });
        await serverData.MilkingToTransport(
            action,
            data => {
                dispatch({
                    type: MILKING_TO_TRANSPORT_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: MILKING_TO_TRANSPORT_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function OrganicProducts(action) {
    return async dispatch => {
        dispatch({
            type: ORGANIC_PRODUCTS,
            payload: {},
        });
        await serverData.OrganicProducts(
            action,
            data => {
                dispatch({
                    type: ORGANIC_PRODUCTS_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: ORGANIC_PRODUCTS_FAILED,
                    payload: error,
                });
            },
        );
    };
}



export function Breeding(action) {
    return async dispatch => {
        dispatch({
            type: BREEDING,
            payload: {},
        });
        await serverData.Breeding(
            action,
            data => {
                dispatch({
                    type: BREEDING_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: BREEDING_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function LoanApplication(action) {
    return async dispatch => {
        dispatch({
            type: LOAN_APPLICATION,
            payload: {},
        });
        await serverData.LoanApplication(
            action,
            data => {
                dispatch({
                    type: LOAN_APPLICATION_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: LOAN_APPLICATION_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function MaintenanceHygiene(action) {
    return async dispatch => {
        dispatch({
            type: MAINTENANCE_HYGIENE,
            payload: {},
        });
        await serverData.MaintenanceHygiene(
            action,
            data => {
                dispatch({
                    type: MAINTENANCE_HYGIENE_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: MAINTENANCE_HYGIENE_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function CaptureToTransport(action) {
    return async dispatch => {
        dispatch({
            type: CAPTURE_TO_TRANSPORT,
            payload: {},
        });
        await serverData.CaptureToTransport(
            action,
            data => {
                dispatch({
                    type: CAPTURE_TO_TRANSPORT_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: CAPTURE_TO_TRANSPORT_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function LicenseGuidelines(action) {
    return async dispatch => {
        dispatch({
            type: LICENSE_GUIDELINES,
            payload: {},
        });
        await serverData.LicenseGuidelines(
            action,
            data => {
                dispatch({
                    type: LICENSE_GUIDELINES_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: LICENSE_GUIDELINES_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function Schemes(action) {
    return async dispatch => {
        dispatch({
            type: SCHEMES,
            payload: {},
        });
        await serverData.Schemes(
            action,
            data => {
                dispatch({
                    type: SCHEMES_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: SCHEMES_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function Workshops(action) {
    return async dispatch => {
        dispatch({
            type: WORKSHOPS,
            payload: {},
        });
        await serverData.Workshops(
            action,
            data => {
                dispatch({
                    type: WORKSHOPS_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: WORKSHOPS_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function SchemeIncentives(action) {
    return async dispatch => {
        dispatch({
            type: SCHEME_INCENTIVES,
            payload: {},
        });
        await serverData.SchemeIncentives(
            action,
            data => {
                dispatch({
                    type: SCHEME_INCENTIVES_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: SCHEME_INCENTIVES_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function NGOs(action) {
    return async dispatch => {
        dispatch({
            type: NGOS,
            payload: {},
        });
        await serverData.NGOs(
            action,
            data => {
                dispatch({
                    type: NGOS_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: NGOS_FAILED,
                    payload: error,
                });
            },
        );
    };
}


export function MarketPrice(action) {
    return async dispatch => {
        dispatch({
            type: MARKET_PRICE,
            payload: {},
        });
        await serverData.MarketPrice(
            action,
            data => {
                dispatch({
                    type: MARKET_PRICE_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: MARKET_PRICE_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function GetEnamList(action) {
    return async dispatch => {
        dispatch({
            type: GET_ENAM_LIST,
            payload: {},
        });
        await serverData.GetEnamList(
            action,
            data => {
                dispatch({
                    type: GET_ENAM_LIST_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GET_ENAM_LIST_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function GetFPOList(action) {
    return async dispatch => {
        dispatch({
            type: GET_FPO_LIST,
            payload: {},
        });
        await serverData.GetFPOList(
            action,
            data => {
                dispatch({
                    type: GET_FPO_LIST_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GET_FPO_LIST_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function GetFarmFacilityList(action) {
    return async dispatch => {
        dispatch({
            type: GET_FARM_FACILITY_LIST,
            payload: {},
        });
        await serverData.GetFarmFacilityList(
            action,
            data => {
                dispatch({
                    type: GET_FARM_FACILITY_LIST_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GET_FARM_FACILITY_LIST_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function GetAgriFiananceList(action) {
    return async dispatch => {
        dispatch({
            type: GET_AGRI_FIANANCE_LIST,
            payload: {},
        });
        await serverData.GetAgriFiananceList(
            action,
            data => {
                dispatch({
                    type: GET_AGRI_FIANANCE_LIST_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GET_AGRI_FIANANCE_LIST_FAILED,
                    payload: error,
                });
            },
        );
    };
}

export function GetFarmInsuranceList(action) {
    return async dispatch => {
        dispatch({
            type: GET_FARM_INSURANCE_LIST,
            payload: {},
        });
        await serverData.GetFarmInsuranceList(
            action,
            data => {
                dispatch({
                    type: GET_FARM_INSURANCE_LIST_SUCCESS,
                    payload: data,
                });
            },
            error => {
                dispatch({
                    type: GET_FARM_INSURANCE_LIST_FAILED,
                    payload: error,
                });
            },
        );
    };
}