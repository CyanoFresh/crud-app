import React, { Component } from 'react';
import { loadUsers } from '../../actions/users';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Users extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const { users, isLoading, error } = this.props;

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
            <Link to={'/users/' + user.id}>{user.name}</Link>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users.users,
  isLoading: state.users.loading,
  error: state.users.error,
});

export default connect(mapStateToProps, { loadUsers })(Users);
