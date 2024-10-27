import styled from 'styled-components';
import { AuthForm } from './components';

const AuthContainer = ({ className }) => {
  return (
    <div className={className}>
      <div className="auth-container">
        <AuthForm />
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
