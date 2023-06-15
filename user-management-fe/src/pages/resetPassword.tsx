import { ResetPasswordForm } from '../components/resetPasswordForm.tsx';
import { Button } from '../components/button.tsx';
import { Link } from 'react-router-dom';

export const ResetPasswordPage = () => {
  return (
    <div>
      <h1>Reset Password Page</h1>
      <ResetPasswordForm />
      <Link to="/">
        <Button className="mt-5" title="Go back to home page" />
      </Link>
    </div>
  );
};
