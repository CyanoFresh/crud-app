import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

export default ({ delay = 1000, ...params }) => (
  <Fade
    in
    style={{
      transitionDelay: delay ? `${delay}ms` : '0ms',
    }}
    unmountOnExit
  >
    <CircularProgress {...params}/>
  </Fade>
);
