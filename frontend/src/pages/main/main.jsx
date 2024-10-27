import styled from 'styled-components';
import { SearchForm } from '../../components';

const MainContainer = ({ className }) => {
  return (
    <div className={className}>
      <SearchForm />
    </div>
  );
};

export const Main = styled(MainContainer)``;
