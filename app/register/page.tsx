import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import PageBuilder from '../../components/PageBuilder';

const RegisterPage: React.FC = () => {

  return (
    <PageBuilder title="Register" width="sm">
      <RegisterForm />
    </PageBuilder>
  );
};

export default RegisterPage;