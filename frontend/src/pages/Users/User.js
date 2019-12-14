import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLoader from '../../components/PageLoader';
import ErrorMessage from '../../components/ErrorMessage';
import { connect } from 'react-redux';
import { loadUser } from '../../redux/actions/users';

const User = ({ user, isLoading, error, loadUser }) => {
  const { id } = useParams();

  useEffect(() => {
    loadUser(id);
  }, [id, loadUser]);

  if (isLoading || !user) {
    return <PageLoader size={80}/>;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div>
      <h1>User #{id}</h1>
      {user.username}
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  user: users.user,
  isLoading: users.loading,
  error: users.error,
});

export default connect(mapStateToProps, { loadUser })(User);
