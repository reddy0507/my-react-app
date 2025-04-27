import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Types
interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm: React.FC = () => {
  const onSubmit = (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
    console.log('Form Data', values);
    alert(`Login Successful!\nEmail: ${values.email}`);
    actions.setSubmitting(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Login</h2>

          <div style={{ marginBottom: '10px' }}>
            <Field type="email" name="email" placeholder="Enter Email" style={{ width: '100%', padding: '8px' }} />
            <div style={{ color: 'red', fontSize: '12px' }}>
              <ErrorMessage name="email" />
            </div>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <Field type="password" name="password" placeholder="Enter Password" style={{ width: '100%', padding: '8px' }} />
            <div style={{ color: 'red', fontSize: '12px' }}>
              <ErrorMessage name="password" />
            </div>
          </div>

          <button type="submit" style={{ width: '100%', padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
