import SignInPage from '@src/pages/sign-in';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path='/sign-in' element={<SignInPage />} />
    </Routes>
  );
};

export default PublicRoutes;
