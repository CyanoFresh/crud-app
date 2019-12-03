import mqtt from 'mqtt';
import {
  SOCKET_CONNECT,
  SOCKET_CONNECTED,
  SOCKET_CONNECTING,
  SOCKET_DISCONNECT,
  SOCKET_DISCONNECTED,
  SOCKET_ERROR,
  SOCKET_PUBLISH,
} from '../actions/types';
import { logout } from '../actions/auth';

/**
 * @type MqttClient
 */
export let client;

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
      if (client) {
        client.end(true);
      }

      client = mqtt.connect(process.env.REACT_APP_SOCKET_URL, {
        // reconnectPeriod: 0,
      });

      client.on('connect', () => {
        console.log('Socket opened');

        store.dispatch({
          type: SOCKET_CONNECTED,
        });
      });

      client.on('error', (error) => {
        if (error.code === 4) {
          return store.dispatch(logout(false));
        }

        console.error('Socket error: ', error);

        store.dispatch({
          type: SOCKET_ERROR,
          error,
        });
      });

      client.on('close', () => {
        console.log('Socket closed');

        store.dispatch({
          type: SOCKET_DISCONNECTED,
        });
      });

      break;
    case SOCKET_DISCONNECT:
      if (client) {
        client.end();
      }
      client = null;
      break;
    case SOCKET_PUBLISH:
      client.publish(action.topic, action.payload);
      break;
    default:
      return next(action);
  }
};
