import React, { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className = '' }: PageContainerProps) => {
  return (
    <div className={`flex flex-col min-h-screen bg-gray-50 ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;