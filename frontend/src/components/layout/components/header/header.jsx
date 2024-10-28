import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  selectUserId,
  selectUserName,
  selectUserSession,
} from '../../../../selectors';
import { logout } from '../../../../actions';

const HeaderContainer = ({ className }) => {
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const session = useSelector(selectUserSession);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout(session));
    sessionStorage.removeItem('userData');
  };

  return (
    <div className={className}>
      <div className="header-wrapper">
        <div className="header-content">
          <div className="header-logo">
            <Link to="/">
              <img src="/logo.png" alt="Easy Stay" />
            </Link>
          </div>
          <div className="header-title">Бронируй отель легко вместе с нами</div>
        </div>
        <div className="header-buttons">
          {!userId && (
            <Link to="/auth">
              <button>Вход/Регистрация</button>
            </Link>
          )}
          {userId && (
            <>
              <div className="user-button">
                <Link to="/profile">
                  <i
                    style={{ marginRight: '5px' }}
                    className="fa fa-user-circle"
                  />
                  {userName}
                </Link>
              </div>
              <div className="logout-button" onClick={onLogout}>
                <i className="fa fa-sign-out" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const Header = styled(HeaderContainer)`
  height: 100px;
  background-color: #7fc7af;
  margin-bottom: 40px;

  & .header-wrapper {
    width: 960px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .header-content {
    display: flex;
    align-items: center;
  }

  & .header-logo {
    width: 150px;
    height: 100px;
    overflow: hidden;
    margin-right: 180px;

    & img {
      width: 150%;
      margin-left: -35px;
      margin-top: -61px;
    }
  }

  & .header-title {
    font-size: 18px;
  }

  & .header-buttons {
    display: flex;

    button {
      border: 1px solid black;
      height: 2rem;
      padding: 0 20px;
      border-radius: 10px;
      background-color: transparent;
      cursor: pointer;

      &:hover {
        border-color: #fff;
        color: #fff;
      }
    }
  }

  & .user-button,
  & .logout-button {
    font-size: 25px;
  }

  & .user-button {
    margin-right: 20px;
  }

  & .logout-button {
    cursor: pointer;
  }
`;
