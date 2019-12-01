import { SOCKET_CONNECTING, SOCKET_CONNECTED, SOCKET_DISCONNECTED, SOCKET_ERROR } from '../actions/types';

const initialState = {
  connected: false,
  isConnecting: false,
  connectingError: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SOCKET_CONNECTING:
      return {
        ...state,
        connected: false,
        isConnecting: true,
      };
    case SOCKET_CONNECTED:
      return {
        ...state,
        connected: true,
        connectingError: null,
        isConnecting: false,
      };
    case SOCKET_ERROR:
      return {
        ...state,
        connected: false,
        connectingError: action.error,
        isConnecting: false,
      };
    case SOCKET_DISCONNECTED:
      return {
        ...state,
        connected: false,
        connectingError: null,
        isConnecting: false,
      };
    default:
      return state;
  }
}
