import { Outlet } from 'react-router-dom';
import { Header, Footer, BackToTop } from '../components/common';
import './MainLayout.css';

function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default MainLayout;
