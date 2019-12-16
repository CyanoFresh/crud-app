import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLoader from '../../components/PageLoader';
import ErrorMessage from '../../components/ErrorMessage';
import { connect } from 'react-redux';
import { loadUser, updateUser } from '../../redux/actions/users';
import CreateUserForm from './CreateUser/Form';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
  },
}));

const User = ({ user, loading, error, loadUser, updateUser, updatingUser }) => {
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    loadUser(id);
  }, [id, loadUser]);

  if (loading || !user) {
    return <PageLoader size={80}/>;
  }

  if (error) {
    return <ErrorMessage error={error}/>;
  }

  return (
    <Grid item md={6}>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h3">
          User {user.username}
        </Typography>

        {updatingUser.error && <ErrorMessage error={updatingUser.error}/>}

        <CreateUserForm initialValues={user} onSubmit={updateUser} isCreating={false}/>

        <Button
          color="primary"
          variant="contained"
          type="submit"
          form="create-user-form"
          disabled={updatingUser.loading}
        >
          {updatingUser.loading && <CircularProgress size={25}/>} Save
        </Button>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = ({ users }) => ({
  ...users.user,
  updatingUser: users.updatingUser,
});

export default connect(mapStateToProps, { loadUser, updateUser })(User);
