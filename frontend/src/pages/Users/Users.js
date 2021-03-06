import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { changeUserModal, deleteUser, loadUsers } from '../../redux/actions/users';
import CircularProgress from '@material-ui/core/CircularProgress';
import PageLoader from '../../components/PageLoader';
import ErrorMessage from '../../components/ErrorMessage';
import CreateUserDialog from './CreateUser/Dialog';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2, 3),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Users = ({ users, isLoading, error, loadUsers, deletingId, deleteUser, changeUserModal }) => {
  const classes = useStyles();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (isLoading) {
    return <PageLoader size={80}/>;
  }

  if (error) {
    return <ErrorMessage error={error}/>;
  }

  return (
    <>
      <Grid item md={6}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h2">
            Users
          </Typography>
          <List>
            {users.map(user => (
              <ListItem button key={user.id} component={Link} to={`/users/${user.id}`}>
                <ListItemAvatar>
                  <Avatar>
                    <UserIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.username}/>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteUser(user.id)}>
                    {deletingId === user.id ? <CircularProgress size={30}/> : <DeleteIcon/>}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => changeUserModal(true)}
      >
        <AddIcon/>
      </Fab>

      <CreateUserDialog />
    </>
  );
};

const mapStateToProps = ({ users }) => ({
  users: users.users,
  isLoading: users.loading,
  error: users.error,
  deletingId: users.deletingId,
});

export default connect(mapStateToProps, { loadUsers, deleteUser, changeUserModal })(Users);
