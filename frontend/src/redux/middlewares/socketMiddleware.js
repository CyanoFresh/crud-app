import mqtt from 'mqtt';
import { SOCKET_CONNECT, SOCKET_CONNECTED, SOCKET_CONNECTING, SOCKET_DISCONNECT, SOCKET_ERROR } from '../actions/types';

let client;

// const onOpen = dispatch => (event) => {
//   console.log('websocket open', event.target.url);
//   dispatch(actions.wsConnected(event.target.url));
// };
//
// const onClose = dispatch => () => {
//   dispatch(actions.wsDisconnected());
// };
//
// const onMessage = dispatch => (event) => {
//   const payload = JSON.parse(event.data);
//   console.log('receiving server message');
//
//   switch (payload.type) {
//     case 'update_game_players':
//       dispatch(updateGame(payload.game, payload.current_player));
//       break;
//     default:
//       break;
//   }
// };

export default store => next => action => {
  switch (action.type) {
    case SOCKET_CONNECT:
      store.dispatch({
        type: SOCKET_CONNECTING,
      });

      // TODO:
      if (client !== null) {
        client.close();
      }

      client = mqtt.connect(process.env.REACT_APP_SOCKET_URL, {
        reconnectPeriod: 0,
      });

      client.on('connect', () => {
        console.log('Socket started');

        store.dispatch({
          type: SOCKET_CONNECTED,
        });
      });

      client.on('error', (error) => {
        console.log('Socket error', error);

        store.dispatch({
          type: SOCKET_ERROR,
          error,
        });
      });

      break;
    case SOCKET_DISCONNECT:
      if (client !== null) {
        client.end();
      }
      client = null;
      console.log('Socket closed');
      break;
    case 'NEW_MESSAGE': // TODO
      console.log('sending a message', action.msg);
      client.send(JSON.stringify({ command: 'NEW_MESSAGE', message: action.msg }));
      break;
    default:
      console.log('the next action:', action);
      return next(action);
  }
};
