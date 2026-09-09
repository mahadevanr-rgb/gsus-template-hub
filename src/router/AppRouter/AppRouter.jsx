import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout/MainLayout';
import { routes } from '../routes.jsx';

export default function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Routes>
    </MainLayout>
  );
}
