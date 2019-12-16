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
import { changeUserModal, createUser } from '../../../redux/actions/users';
import ErrorMessage from '../../../components/ErrorMessage';
import CircularProgress from '@material-ui/core/CircularProgress';

function CreateUserDialog({ open, createUser, changeUserModal, error, loading }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onClose = () => changeUserModal(false);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      fullScreen={fullScreen}
    >
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        {error && <ErrorMessage error={error}/>}
        <CreateUserForm onSubmit={createUser}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" type="submit" form="create-user-form" disabled={loading}>
          {loading ? <CircularProgress size={30}/> : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({ users }) => ({
  ...users.newUser,
});

export default connect(mapStateToProps, { createUser, changeUserModal })(CreateUserDialog);
