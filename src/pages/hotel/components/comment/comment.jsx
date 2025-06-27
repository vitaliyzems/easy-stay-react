import styled from 'styled-components';
import { ROLE } from '../../../../constants';
import { useDispatch } from 'react-redux';
import { editCommentAsync, removeCommentAsync } from '../../../../actions';
import { useState } from 'react';

const CommentContainer = ({ className, comment, userRole, userId }) => {
  const [content, setContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const editComment = () => {
    dispatch(editCommentAsync(comment.id, content)).finally(() =>
      setIsEditing(false)
    );
    // setIsEditing(false);
  };

  const deleteComment = () => {
    dispatch(removeCommentAsync(comment.id));
  };

  return (
    <div className={className}>
      <div className="comment-body">
        <i className="fa fa-user-circle" style={{ fontSize: 50 }} />
        <div className="comment-main">
          <span className="comment-author">{comment.author}, </span>
          <span className="publish-date">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
          {!isEditing && <p className="comment-content">{content}</p>}
          {isEditing && (
            <>
              <textarea
                type="text"
                className="edit-comment-content"
                value={content}
                onChange={({ target }) => setContent(target.value)}
              />
              <button onClick={editComment} className="edit-btn">
                Редактировать
              </button>
            </>
          )}
        </div>
      </div>
      <div className="comment-control">
        {userId === comment.authorId && (
          <i
            className="fa fa-pencil"
            style={{ fontSize: 20, cursor: 'pointer' }}
            onClick={() => setIsEditing(true)}
          />
        )}
        {(userRole === ROLE.ADMIN || userId === comment.authorId) && (
          <i
            className="fa fa-trash"
            style={{ fontSize: 20, marginTop: 10, cursor: 'pointer' }}
            onClick={deleteComment}
          />
        )}
      </div>
    </div>
  );
};

export const Comment = styled(CommentContainer)`
  border: 1px solid #aaa;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;

  & .comment-body {
    display: flex;
  }

  & .comment-main {
    padding: 0 10px;
  }

  & .comment-author {
    font-weight: bold;
  }

  & .publish-date {
    font-size: 12px;
    color: #333;
  }

  & .comment-content {
    margin: 10px 0 5px;
  }

  & .edit-comment-content {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    display: block;
    margin: 10px 0 5px;
    resize: none;
    width: 700px;
    height: 100px;
    padding: 10px;
  }

  & .edit-btn {
    float: right;
  }

  & .comment-control {
    display: flex;
    flex-direction: column;
  }
`;
