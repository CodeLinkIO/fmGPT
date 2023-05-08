import { Navigate, Route, Routes } from 'react-router';

import ChatPage from '@src/pages/chat';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<ChatPage />} />
      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  );
};

export default PrivateRoutes;
