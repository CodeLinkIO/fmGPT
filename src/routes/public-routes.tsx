import SignInPage from '@src/pages/sign-in';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path='*' element={<Navigate replace to='/sign-in' />} />
    </Routes>
  );
};

export default PublicRoutes;
