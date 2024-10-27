import styled from 'styled-components';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import { Modal } from '../modal/modal';

const Content = styled.div`
  flex: auto;
  width: 960px;
  margin: 0 auto;
`;

const LayoutContainer = ({ className }) => (
  <div className={className}>
    <Header />
    <Content>
      <Outlet />
    </Content>
    <Footer />
    <Modal />
  </div>
);

export const Layout = styled(LayoutContainer)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
