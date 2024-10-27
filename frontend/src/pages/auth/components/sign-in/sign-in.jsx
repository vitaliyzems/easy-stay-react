import styled from 'styled-components';
import { AuthButton } from '../auth-button/auth-button';
import { AuthLink } from '../auth-link/auth-link';
import { Input } from '../input/input';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { server } from '../../../../bff';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../../actions';
import { selectUserRole } from '../../../../selectors';
import { ROLE } from '../../../../constants';
import { Navigate, useLocation } from 'react-router-dom';
import { useResetForm } from '../../../../hooks';

const SignInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Заполните Email')
    .email('Введите корректный Email')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Введите корректный Email'
    ),
  password: yup
    .string()
    .required('Заполните пароль')
    .matches(
      /^[\w#%]+$/,
      'Неверно заполнен пароль. Допускаются буквы, цифры и знаки "# и %"'
    )
    .min(6, 'Неверный пароль. Минимум 6 символов')
    .max(30, 'Неверный пароль. Максимум 30 символов'),
});

const SignInContainer = ({ className, type, setType }) => {
  const location = useLocation();
  const roleId = useSelector(selectUserRole);
  const [serverError, setServerError] = useState(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(SignInFormSchema),
  });

  const dispatch = useDispatch();

  useResetForm(reset);

  const onSubmit = ({ email, password }) => {
    server.signIn(email, password).then(({ error, res: user }) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
        return;
      }

      dispatch(setUser(user));
      sessionStorage.setItem('userData', JSON.stringify(user));
    });
  };

  const formError = errors.email?.message || errors.password?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    if (location.state.from) {
      return (
        <Navigate
          to={`${location.state.from.pathname}${location.state.from.search}`}
        />
      );
    }
    return <Navigate to="/" />;
  }

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <h2>Вход в аккаунт</h2>
      <Input
        id="email"
        label="Email"
        type="email"
        register={{
          ...register('email', { onChange: () => setServerError(null) }),
        }}
        placeholder="Введите ваш Email"
      />
      <Input
        id="password"
        label="Пароль"
        type="password"
        register={{
          ...register('password', { onChange: () => setServerError(null) }),
        }}
        placeholder="Введите ваш пароль"
      />
      <span>{errorMessage}</span>
      <AuthButton type={type} disabled={!!formError} />
      <AuthLink type={type} setType={setType} />
    </form>
  );
};

export const SignIn = styled(SignInContainer)`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;

  & h2 {
    margin-bottom: 1.5rem;
  }

  & span {
    color: red;
  }
`;
