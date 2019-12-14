import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import React from 'react';
import CreateUserForm from './Form';
import { connect } from 'react-redux';
import { createUser } from '../../../redux/actions/users';

function FormDialog({ onClose, open, createUser }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      fullScreen={fullScreen}
    >
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <CreateUserForm onSubmit={createUser}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" type="submit" form="create-user-form">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { createUser })(FormDialog);
