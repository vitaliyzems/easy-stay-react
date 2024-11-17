import styled from 'styled-components';
import { HotelCard, SearchForm } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPreview } from '../../actions';
import {
  selectHotels,
  selectHotelsLoading,
  selectRandomComments,
} from '../../selectors';

const MainContainer = ({ className }) => {
  const hotels = useSelector(selectHotels);
  const comments = useSelector(selectRandomComments);
  const loading = useSelector(selectHotelsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPreview());
  }, [dispatch]);

  console.log(hotels);
  console.log(comments);

  return (
    <div className={className}>
      <SearchForm />
      {loading ? (
        <h2>Загрузка...</h2>
      ) : (
        <>
          <h2>Отели которые ждут вас</h2>
          <div className="hotels-list">
            {hotels.map((hotel) => (
              <HotelCard preview={true} key={hotel.id} hotel={hotel} />
            ))}
          </div>
          <h2>Что говорят о нас наши постояльцы</h2>
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-body">
                  <i className="fa fa-user-circle" style={{ fontSize: 50 }} />
                  <div className="comment-main">
                    <span className="comment-author">{comment.author}, </span>
                    <span className="publish-date">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                    <p className="comment-content">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const Main = styled(MainContainer)`
  & h2 {
    margin-top: 50px;
  }

  & .hotels-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 20px 0;
    gap: 20px;
  }

  & .comment {
    border: 1px solid #aaa;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
  }

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
