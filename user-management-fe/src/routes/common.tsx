import { HomePage } from '../pages';
import { ResetPasswordPage } from '../pages/resetPassword.tsx';

export const commonRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <HomePage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
];
