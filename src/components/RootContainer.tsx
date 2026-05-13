import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from './Layout/DashboardLayout';

export default function RootContainer() {
  return (
    <DashboardLayout>
      <React.Suspense fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }>
        <Outlet />
      </React.Suspense>
    </DashboardLayout>
  );
}
