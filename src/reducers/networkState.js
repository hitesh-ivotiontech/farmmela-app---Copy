import {
  NETWORK_STATUS
} from '../actions/networkAction';

export default function NetWorkStatus(state = {apiNetworkError: false, connected: false}, action) {
  switch (action.type) {
    case "NETWORK_ERROR": {
      return Object.assign({}, {apiNetworkError: true } );
    }
    case NETWORK_STATUS: {
      return Object.assign({}, state, {
        connected: action.payload
      })
    }
    default: {
      return state;
    }
  }
}
