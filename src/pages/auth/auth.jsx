import { useState } from 'react';
import { SignIn } from './components';
import { SignUp } from './components';
import styled from 'styled-components';

const AuthContainer = ({ className }) => {
  const [type, setType] = useState('signIn');

  return (
    <div className={className}>
      <div className="auth-container">
        {type === 'signIn' ? (
          <SignIn type={type} setType={setType} />
        ) : (
          <SignUp type={type} setType={setType} />
        )}
      </div>
    </div>
  );
};

export const Auth = styled(AuthContainer)`
  background-color: #f7f7f7;

  & .auth-container {
    width: 960px;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
