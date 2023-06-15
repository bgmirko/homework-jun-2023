import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks';
import { Button } from './button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

export const ResetPasswordForm = () => {
  const [token, setToken] = useState('');
  const [requestedSuccess, setRequestedSucess] = useState(false); // [1
  const [email, setEmail] = useState('');
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  };
  const navigate = useNavigate();

  const params = useQuery();

  const getToken = params.get('token');
  const getEmail = params.get('email');

  useEffect(() => {
    if (getToken) setToken(getToken);
    if (getEmail) setEmail(getEmail);
  }, [getToken, getEmail]);

  const { resetPassword, requestResetPassword } = useAuth();

  const onSubmitRequestResetPass = async (data: any) => {
    const res = await requestResetPassword({ email: data.email });

    if (res.status === 201) setRequestedSucess(true);
  };

  const onSubmitReset = async (data: any) => {
    const res = await resetPassword({
      email: email,
      token,
      password: data.password,
    });
    if (res.status === 201) navigate('/login');
    return res;
  };

  return (
    <div className="mt-5">
      {token ? (
        <form onSubmit={handleSubmit(onSubmitReset)}>
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

          <div className="mt-3">
            <label></label>
            <Button type="submit" title="Submit" />
          </div>
        </form>
      ) : !requestedSuccess ? (
        <form onSubmit={handleSubmit(onSubmitRequestResetPass)}>
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

          <div className="mt-3">
            <label></label>
            <Button type="submit" title="Submit" />
          </div>
        </form>
      ) : (
        <p className="text-green-500">
          Please check your email to reset password
        </p>
      )}
    </div>
  );
};
