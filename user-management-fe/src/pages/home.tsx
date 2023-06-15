import { Button } from '../components/button.tsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

export const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1 className="my-5 w-[300px]">Home Page</h1>
      <div className="flex items-center justify-around">
        {!user ? (
          <>
            <Link to="/login">
              <Button title="Login" />
            </Link>
            <Link to="/register">
              <Button title="Register" />{' '}
            </Link>
          </>
        ) : (
          <>
            <Link to="/me">
              <Button title="Visit my profile" />{' '}
            </Link>
            <Button onClick={logout} title="Logout" />
          </>
        )}
      </div>
    </div>
  );
};
