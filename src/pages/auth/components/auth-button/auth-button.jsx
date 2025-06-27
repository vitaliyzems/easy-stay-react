import styled from 'styled-components';

const AuthButtonContainer = ({ className, type, ...props }) => {
  return (
    <button type="submit" className={className} {...props}>
      {type === 'signIn' && 'Войти'}
      {type === 'signUp' && 'Зарегистрироваться'}
    </button>
  );
};

export const AuthButton = styled(AuthButtonContainer)`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #bbb;
  }
`;
