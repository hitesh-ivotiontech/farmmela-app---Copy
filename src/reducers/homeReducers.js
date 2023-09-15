


const initialState = { fetching: false, success: false, error: false };

import {
    IMPORTANT_LINKS,
    IMPORTANT_LINKS_SUCCESS,
    IMPORTANT_LINKS_FAILED,
    GENERAL_KNOWLEDGE,
    GENERAL_KNOWLEDGE_SUCCESS,
    GENERAL_KNOWLEDGE_FAILED,
    ECO_FRIENDLY,
    ECO_FRIENDLY_SUCCESS,
    ECO_FRIENDLY_FAILED,
    ORGANIC_FARMING,
    ORGANIC_FARMING_SUCCESS,
    ORGANIC_FARMING_FAILED,
    HARVEST_TO_STORAGE,
    HARVEST_TO_STORAGE_SUCCESS,
    HARVEST_TO_STORAGE_FAILED,
    HARVEST_TO_STORAGE_FLOWERS,
    HARVEST_TO_STORAGE_FLOWERS_SUCCESS,
    HARVEST_TO_STORAGE_FLOWERS_FAILED,
    DISEASES_MANAGEMENT,
    DISEASES_MANAGEMENT_SUCCESS,
    DISEASES_MANAGEMENT_FAILED,
    MILKING_TO_TRANSPORT,
    MILKING_TO_TRANSPORT_SUCCESS,
    MILKING_TO_TRANSPORT_FAILED,

    ORGANIC_PRODUCTS,
    ORGANIC_PRODUCTS_SUCCESS,
    ORGANIC_PRODUCTS_FAILED,
    BREEDING,
    BREEDING_SUCCESS,
    BREEDING_FAILED,
    LOAN_APPLICATION,
    LOAN_APPLICATION_SUCCESS,
    LOAN_APPLICATION_FAILED,
    MAINTENANCE_HYGIENE,
    MAINTENANCE_HYGIENE_SUCCESS,
    MAINTENANCE_HYGIENE_FAILED,
    CAPTURE_TO_TRANSPORT,
    CAPTURE_TO_TRANSPORT_SUCCESS,
    CAPTURE_TO_TRANSPORT_FAILED,
    LICENSE_GUIDELINES,
    LICENSE_GUIDELINES_SUCCESS,
    LICENSE_GUIDELINES_FAILED,

    SCHEMES,
    SCHEMES_SUCCESS,
    SCHEMES_FAILED,
    WORKSHOPS,
    WORKSHOPS_SUCCESS,
    WORKSHOPS_FAILED,
    SCHEME_INCENTIVES,
    SCHEME_INCENTIVES_SUCCESS,
    SCHEME_INCENTIVES_FAILED,
    NGOS,
    NGOS_SUCCESS,
    NGOS_FAILED,
    MARKET_PRICE,
    MARKET_PRICE_SUCCESS,
    MARKET_PRICE_FAILED,

    GET_ENAM_LIST,
    GET_ENAM_LIST_SUCCESS,
    GET_ENAM_LIST_FAILED,

    GET_FPO_LIST,
    GET_FPO_LIST_SUCCESS,
    GET_FPO_LIST_FAILED,

    GET_FARM_FACILITY_LIST,
    GET_FARM_FACILITY_LIST_SUCCESS,
    GET_FARM_FACILITY_LIST_FAILED,

    GET_AGRI_FIANANCE_LIST,
    GET_AGRI_FIANANCE_LIST_SUCCESS,
    GET_AGRI_FIANANCE_LIST_FAILED,

    GET_FARM_INSURANCE_LIST,
    GET_FARM_INSURANCE_LIST_SUCCESS,
    GET_FARM_INSURANCE_LIST_FAILED

} from '../actions/homeActions'



export function ImportantLink(state = initialState, action) {
    switch (action.type) {
        case IMPORTANT_LINKS: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case IMPORTANT_LINKS_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case IMPORTANT_LINKS_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function GeneralKnowledge(state = initialState, action) {
    switch (action.type) {
        case GENERAL_KNOWLEDGE: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GENERAL_KNOWLEDGE_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GENERAL_KNOWLEDGE_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function EcoFriendly(state = initialState, action) {
    switch (action.type) {
        case ECO_FRIENDLY: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case ECO_FRIENDLY_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case ECO_FRIENDLY_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}




export function OrganicFarming(state = initialState, action) {
    switch (action.type) {
        case ORGANIC_FARMING: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case ORGANIC_FARMING_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case ORGANIC_FARMING_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function HarvestToStorage(state = initialState, action) {
    switch (action.type) {
        case HARVEST_TO_STORAGE: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case HARVEST_TO_STORAGE_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case HARVEST_TO_STORAGE_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function HarvestToStorageFlowers(state = initialState, action) {
    switch (action.type) {
        case HARVEST_TO_STORAGE_FLOWERS: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case HARVEST_TO_STORAGE_FLOWERS_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case HARVEST_TO_STORAGE_FLOWERS_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function DiseasesManagement(state = initialState, action) {
    switch (action.type) {
        case DISEASES_MANAGEMENT: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case DISEASES_MANAGEMENT_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case DISEASES_MANAGEMENT_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function MilkingToTransport(state = initialState, action) {
    switch (action.type) {
        case MILKING_TO_TRANSPORT: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case MILKING_TO_TRANSPORT_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case MILKING_TO_TRANSPORT_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function OrganicProducts(state = initialState, action) {
    switch (action.type) {
        case ORGANIC_PRODUCTS: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case ORGANIC_PRODUCTS_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case ORGANIC_PRODUCTS_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function Breeding(state = initialState, action) {
    switch (action.type) {
        case BREEDING: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case BREEDING_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case BREEDING_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function LoanApplication(state = initialState, action) {
    switch (action.type) {
        case LOAN_APPLICATION: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case LOAN_APPLICATION_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case LOAN_APPLICATION_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function MaintenanceHygiene(state = initialState, action) {
    switch (action.type) {
        case MAINTENANCE_HYGIENE: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case MAINTENANCE_HYGIENE_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case MAINTENANCE_HYGIENE_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function CaptureToTransport(state = initialState, action) {
    switch (action.type) {
        case CAPTURE_TO_TRANSPORT: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case CAPTURE_TO_TRANSPORT_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case CAPTURE_TO_TRANSPORT_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function LicenseGuidelines(state = initialState, action) {
    switch (action.type) {
        case LICENSE_GUIDELINES: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case LICENSE_GUIDELINES_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case LICENSE_GUIDELINES_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function Schemes(state = initialState, action) {
    switch (action.type) {
        case SCHEMES: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case SCHEMES_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case SCHEMES_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function Workshops(state = initialState, action) {
    switch (action.type) {
        case WORKSHOPS: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case WORKSHOPS_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case WORKSHOPS_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function SchemeIncentives(state = initialState, action) {
    switch (action.type) {
        case SCHEME_INCENTIVES: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case SCHEME_INCENTIVES_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case SCHEME_INCENTIVES_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function NGOs(state = initialState, action) {
    switch (action.type) {
        case NGOS: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case NGOS_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case NGOS_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}


export function MarketPrice(state = initialState, action) {
    switch (action.type) {
        case MARKET_PRICE: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case MARKET_PRICE_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case MARKET_PRICE_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function GetEnamList(state = initialState, action) {
    switch (action.type) {
        case GET_ENAM_LIST: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GET_ENAM_LIST_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GET_ENAM_LIST_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function GetFPOList(state = initialState, action) {
    switch (action.type) {
        case GET_FPO_LIST: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GET_FPO_LIST_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GET_FPO_LIST_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function GetFarmFacilityList(state = initialState, action) {
    switch (action.type) {
        case GET_FARM_FACILITY_LIST: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GET_FARM_FACILITY_LIST_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GET_FARM_FACILITY_LIST_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function GetFarmInsuranceList(state = initialState, action) {
    switch (action.type) {
        case GET_FARM_INSURANCE_LIST: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GET_FARM_INSURANCE_LIST_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GET_FARM_INSURANCE_LIST_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}

export function GetAgriFiananceList(state = initialState, action) {
    switch (action.type) {
        case GET_AGRI_FIANANCE_LIST: {
            return Object.assign({}, state, { fetching: true, success: false, error: false });
        }
        case GET_AGRI_FIANANCE_LIST_SUCCESS: {
            return Object.assign({}, state, { fetching: false, success: true, error: false }, { details: action.payload });
        }
        case GET_AGRI_FIANANCE_LIST_FAILED: {
            return Object.assign({}, state, { fetching: false, success: false, error: true }, { details: action.payload });
        }
        default: {
            return initialState;
        }

    }
}
