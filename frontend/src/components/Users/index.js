import React, { useEffect } from 'react';
import { loadUsers } from '../../actions/users';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = ({ users, isLoading, error, loadUsers }) => {
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (isLoading && !users.length) {
    return <p>Loading...</p>;
  }

  if (error && !users.length) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <Link to={'/users/' + user.id}>{user.username}</Link>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: users.users,
  isLoading: users.loading,
  error: users.error,
});

export default connect(mapStateToProps, { loadUsers })(Users);
