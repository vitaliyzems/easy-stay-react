import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  selectComments,
  selectHotel,
  selectUserId,
  selectUserRole,
} from '../../../../selectors';
import { Comment } from '../comment/comment';
import { useEffect, useState } from 'react';
import { ROLE } from '../../../../constants';
import {
  CLOSE_MODAL,
  createCommentAsync,
  openModal,
} from '../../../../actions';
import { useLocation, useNavigate } from 'react-router-dom';

const CommentsContainer = ({ className }) => {
  const { id: hotelId } = useSelector(selectHotel);
  const location = useLocation();
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const comments = useSelector(selectComments);

  const [content, setContent] = useState('');

  useEffect(() => {
    if (location.state?.content) {
      setContent(location.state.content);
    }
  }, [location]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCommentSave = (event) => {
    event.preventDefault();

    if (userRole === ROLE.GUEST) {
      dispatch(
        openModal({
          text: 'Для продолжения необходимо авторизоваться',
          onConfirm: () => {
            navigate('/auth', { state: { from: location, content } });
            dispatch(CLOSE_MODAL);
          },
          onCancel: () => dispatch(CLOSE_MODAL),
        })
      );
      return;
    }

    dispatch(createCommentAsync(content, hotelId, userId));
    setContent('');
  };

  return (
    <div className={className}>
      <h3>Отзывы об отеле</h3>

      {/* {userId && userRole !== ROLE.GUEST && ( */}
      <form className="add-comment-form" onSubmit={handleCommentSave}>
        <textarea
          value={content}
          onChange={({ target }) => setContent(target.value)}
        ></textarea>
        <button>Отправить</button>
      </form>
      {/* )} */}

      {comments.length ? (
        <div className="comments-list">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              userRole={userRole}
              userId={userId}
            />
          ))}
        </div>
      ) : (
        <h4>Отзывов пока нет, станьте первым</h4>
      )}
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
  width: 100%;

  & .add-comment-form {
    display: flex;
    justify-content: space-between;

    textarea {
      resize: none;
      width: 800px;
      height: 100px;
      padding: 10px;
    }

    button {
      width: 100px;
      align-self: flex-end;
    }
  }
`;
