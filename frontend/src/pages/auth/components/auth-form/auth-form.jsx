import { useState } from 'react';
import { SignIn } from '../sign-in/sign-in';
import { SignUp } from '../sign-up/sign-up';

export const AuthForm = () => {
  const [type, setType] = useState('signIn');

  return type === 'signIn' ? (
    <SignIn type={type} setType={setType} />
  ) : (
    <SignUp type={type} setType={setType} />
  );
};
