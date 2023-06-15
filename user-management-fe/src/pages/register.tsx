import { RegisterForm } from '../components/registerForm.tsx';
import { Link } from 'react-router-dom';
import { Button } from '../components/button.tsx';

export const RegisterPage = () => {
  return (
    <div>
      <h1>Register Page</h1>
      <RegisterForm />
      <Link to="/">
        <Button className="mt-5" title="Go back to home page" />
      </Link>
    </div>
  );
};
