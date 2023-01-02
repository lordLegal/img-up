import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

function Login() {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const response = await axios.post('/login', {
            username: values.username,
            password: values.password,
          }, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          });
          const jwt = response.data.jwt;
          localStorage.setItem('jwt', jwt);
          window.location.href = '/files';
        } catch (error) {
          setErrors({ form: 'Invalid username or password' });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form>
          {errors.form && <div>{errors.form}</div>}
          <Field type="text" name="username" placeholder="Username" />
          <Field type="password" name="password" placeholder="Password" />
          <button type="submit" disabled={isSubmitting}>
            Log in
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;