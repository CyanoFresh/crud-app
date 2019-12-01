import { SOCKET_CONNECT, SOCKET_DISCONNECT } from './types';

export const socketConnect = () => (dispatch) => {
  dispatch({
    type: SOCKET_CONNECT,
  });
};

export const socketDisconnect = () => (dispatch) => {
  dispatch({
    type: SOCKET_DISCONNECT,
  });
};
