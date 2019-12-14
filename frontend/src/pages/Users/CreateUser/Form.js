import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';

const renderTextField = ({
                           label,
                           input,
                           meta: { touched, invalid, error },
                           ...custom
                         }) => (
  <TextField
    label={label}
    error={touched && invalid}
    helperText={touched && error}
    variant="filled"
    margin="normal"
    fullWidth
    {...input}
    {...custom}
  />
);

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={!!input.value}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
);

const CreateUserForm = ({ handleSubmit, user }) => {
  return (
    <form onSubmit={handleSubmit} id="create-user-form">
      <div>
        <Field
          name="username"
          component={renderTextField}
          label="Username"
          required
        />
      </div>
      <div>
        <Field
          name="password"
          type="password"
          component={renderTextField}
          label="Password"
          required
        />
      </div>
      <div>
        <Field
          name="name"
          component={renderTextField}
          label="Name"
          required
        />
      </div>
      {user.isAdmin && (
        <div>
          <Field name="isAdmin" component={renderCheckbox} label="Admin"/>
        </div>
      )}
    </form>
  );
};

const mapDispatchToProps = ({ auth }) => ({
  user: auth.user,
});

export default reduxForm({
  form: 'create-user-form',
})(connect(mapDispatchToProps)(CreateUserForm));
