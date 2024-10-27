import styled from 'styled-components';

const AuthLinkContainer = ({ className, type, setType }) => {
  return (
    <p className={className}>
      {type === 'signIn' && (
        <>
          Нет аккаунта?{' '}
          <button onClick={() => setType('signUp')}>Зарегистрируйтесь</button>
        </>
      )}
      {type === 'signUp' && (
        <>
          Есть аккаунт? <button onClick={() => setType('signIn')}>Войти</button>
        </>
      )}
    </p>
  );
};

export const AuthLink = styled(AuthLinkContainer)`
  margin-top: 1rem;
  font-size: 0.9rem;

  & button {
    color: #007bff;
    text-decoration: none;
    border: none;
    background-color: #fff;
    cursor: pointer;
  }

  & button:hover {
    text-decoration: underline;
  }
`;
