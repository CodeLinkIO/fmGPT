import ChatPage from '@src/pages/chat';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<ChatPage />} />
      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  );
};

export default PrivateRoutes;