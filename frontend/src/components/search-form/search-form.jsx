import { useEffect, useState } from 'react';
import { formatDate } from '../../utils';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchFormContainer = ({
  className,
  startDateProps = '',
  endDateProps = '',
}) => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (startDateProps && endDateProps) {
      setFromValue(startDateProps);
      setToValue(endDateProps);
    } else {
      setFromValue(formatDate(Date.now()));
      setToValue(formatDate(Date.now() + 86400000));
    }
  }, [startDateProps, endDateProps]);

  const onFromDateChange = ({ target }) => {
    setFromValue(target.value);
    setToValue(formatDate(Date.parse(target.value) + 86400000));
  };

  const submitHandle = (event) => {
    event.preventDefault();
    setError(null);
    if (!fromValue || !toValue) {
      setError('Укажите с какой даты по какую вы хотите найти отель');
      return;
    }
    navigate(`/founded-hotels?startDate=${fromValue}&endDate=${toValue}`);
  };

  return (
    <div className={className}>
      <h1>Введите даты для поиска</h1>
      <form onSubmit={submitHandle}>
        <input
          type="date"
          min={formatDate(Date.now())}
          value={fromValue}
          onChange={onFromDateChange}
        />
        <input
          type="date"
          min={formatDate(Date.parse(fromValue) + 86400000)}
          value={toValue}
          onChange={({ target }) => setToValue(target.value)}
        />
        <input type="submit" value="Поиск..." />
      </form>
      {error && <span>{error}</span>}
    </div>
  );
};

export const SearchForm = styled(SearchFormContainer)`
  & form {
    display: flex;
    justify-content: space-between;
    height: 40px;
    margin-bottom: 10px;
  }

  & input {
    font-size: 18px;
    border: 1px solid #666;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      background-color: #cccccc;
    }
  }

  & input[type='date'] {
    flex: auto;
    margin-right: 20px;
    padding: 0 20px;
  }

  & input[type='submit'] {
    width: 200px;
  }

  & span {
    color: red;
  }
`;
