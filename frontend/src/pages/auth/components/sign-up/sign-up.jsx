import styled from 'styled-components';
import { AuthButton } from '../auth-button/auth-button';
import { AuthLink } from '../auth-link/auth-link';
import { Input } from '../input/input';
import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../../actions';
import { useResetForm } from '../../../../hooks';
import { selectUserRole } from '../../../../selectors';
import { METHOD, ROLE } from '../../../../constants';
import { Navigate, useLocation } from 'react-router-dom';
import { request } from '../../../../utils';

const SignUpFormSchema = yup.object().shape({
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
    .min(6, 'Неверный пароль. Минимум 6 символа')
    .max(30, 'Неверный пароль. Максимум 30 символов'),
  passcheck: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает'),
  name: yup
    .string()
    .required()
    .matches(
      /^[a-zA-ZА-Яа-яЁё]+$/,
      'Неверно заполнено имя. Допускаются только буквы'
    ),
});

const SignUpContainer = ({ className, type, setType }) => {
  const location = useLocation();
  const roleId = useSelector(selectUserRole);
  const [serverError, setServerError] = useState(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '', passcheck: '', name: '' },
    resolver: yupResolver(SignUpFormSchema),
  });

  const dispatch = useDispatch();

  useResetForm(reset);

  const onSubmit = ({ email, password, name }) => {
    request('/api/register', METHOD.POST, { email, name, password }).then(
      ({ error, res: user }) => {
        if (error) {
          setServerError(`Ошибка запроса: ${error}`);
          return;
        }

        dispatch(setUser(user));
        sessionStorage.setItem('userData', JSON.stringify(user));
      }
    );
  };

  const formError =
    errors.email?.message ||
    errors.password?.message ||
    errors.passcheck?.message ||
    errors.name?.message;
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
      <h2>Регистрация</h2>
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
      <Input
        id="passcheck"
        label="Повторите пароль"
        type="password"
        register={{
          ...register('passcheck', { onChange: () => setServerError(null) }),
        }}
        placeholder="Повторите пароль"
      />

      <Input
        id="name"
        label="Имя"
        type="text"
        register={{
          ...register('name', { onChange: () => setServerError(null) }),
        }}
        placeholder="Введите ваше имя"
      />
      <span>{errorMessage}</span>
      <AuthButton type={type} disabled={!!formError} />
      <AuthLink type={type} setType={setType} />
    </form>
  );
};

export const SignUp = styled(SignUpContainer)`
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
