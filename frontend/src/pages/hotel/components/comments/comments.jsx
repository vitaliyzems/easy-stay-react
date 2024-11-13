import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  selectComments,
  selectHotel,
  selectUserId,
  selectUserRole,
} from '../../../../selectors';
import { Comment } from '../comment/comment';
import { useState } from 'react';
import { ROLE } from '../../../../constants';
import { createCommentAsync } from '../../../../actions';

const CommentsContainer = ({ className }) => {
  const { id: hotelId } = useSelector(selectHotel);
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const comments = useSelector(selectComments);

  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const handleCommentSave = (event) => {
    event.preventDefault();
    dispatch(createCommentAsync(content, hotelId, userId));
    setContent('');
  };

  return (
    <div className={className}>
      <h3>Отзывы об отеле</h3>
      {userId && userRole !== ROLE.GUEST && (
        <form className="add-comment-form" onSubmit={handleCommentSave}>
          <textarea
            value={content}
            onChange={({ target }) => setContent(target.value)}
          ></textarea>
          <button>Отправить</button>
        </form>
      )}
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
