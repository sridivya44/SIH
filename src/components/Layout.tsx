import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">{title}</h1>
      </div>
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '800px', borderRadius: '20px' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
