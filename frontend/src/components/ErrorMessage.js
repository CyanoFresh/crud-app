import React from 'react';
import Box from '@material-ui/core/Box';

export default ({ error }) => (
  <Box bgcolor="error.main" color="background.paper" p={2}>
    {error}
  </Box>
);
