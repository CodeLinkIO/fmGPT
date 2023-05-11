import { Navigate, Route, Routes } from 'react-router';

import ChatPage from '@src/pages/chat';
import EmailContentPage from '@src/pages/email-content';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<ChatPage />} />
      <Route path='/email-content' element={<EmailContentPage />} />
      <Route path='*' element={<Navigate replace to='/' />} />
    </Routes>
  );
};

export default PrivateRoutes;
