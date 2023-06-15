import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks';
import { Button } from './button';
import { Link, useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    const res = await login(data);

    if (res.success) {
      navigate('/');
    }
  };
  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start flex-col">
          <label>Email</label>
          <input
            className="border-0 my-3 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            type="text"
            {...registerField('email', {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
          {errors.email && errors.email.type === 'required' && (
            <p className="text-red-500">Email is required.</p>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <p className="text-red-500">Email is not valid.</p>
          )}
        </div>
        <div className="flex items-start flex-col">
          <label>Password</label>
          <input
            className="border-0 mt-3 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            type="password"
            {...registerField('password', {
              required: true,
            })}
          />
          {errors.password && errors.password.type === 'required' && (
            <p className="text-red-500">Password is required.</p>
          )}
        </div>
        <Link to="/reset-password">
          <div className="text-blue-300 hover:text-blue-500 cursor-pointer">
            Forgot password?{' '}
          </div>
        </Link>
        <div className="mt-3">
          <label></label>
          <Button type="submit" title="Login" />
        </div>
      </form>
    </div>
  );
};
