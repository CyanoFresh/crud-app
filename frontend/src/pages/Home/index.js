import React from 'react';
import { connect } from 'react-redux';

function HomeIndexPage({ isConnecting, connected, connectingError }) {
  let content;

  if (isConnecting) {
    content = 'Connecting...';
  } else if (connectingError) {
    content = 'Error: ' + connectingError;
  } else if (connected) {
    content = 'Online';
  }

  return (
    <div>
      <h1>Home</h1>

      {content}
    </div>
  );
}

const mapStateToProps = ({ socket }) => ({
  connected: socket.connected,
  isConnecting: socket.isConnecting,
  connectingError: socket.connectingError,
});
export default connect(mapStateToProps, null)(HomeIndexPage);
