import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';
import { Button } from '../components/button.tsx';

export const MePage = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Me Page</h1>

      <div className="flex flex-col items-center justify-center">
        <div>{user?.fullName}</div>
        <div>{user?.email}</div>
      </div>
      <Link to="/">
        <Button className="mt-5" title="Go back to home page" />
      </Link>
    </div>
  );
};
