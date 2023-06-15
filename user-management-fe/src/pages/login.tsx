import { LoginForm } from '../components/loginForm';
import { Button } from '../components/button.tsx';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm />
      <Link to="/">
        <Button className="mt-5" title="Go back to home page" />
      </Link>
    </div>
  );
};
