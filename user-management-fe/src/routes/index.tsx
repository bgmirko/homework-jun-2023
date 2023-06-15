import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useAuth } from '../hooks';
import { commonRoutes } from './common';

export const AppRoutes = () => {
  const auth = useAuth();
  console.log('auth', auth);

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
