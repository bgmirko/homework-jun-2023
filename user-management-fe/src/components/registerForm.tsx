import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks';
import { Button } from './button.tsx';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const res = await register(data);
    if (res) console.log('res', res);
    if (res?.status === 201) {
      navigate('/login');
    } else if (res?.status > 201) {
      setError('root.serverError', {
        type: res?.response?.message || res?.data?.message,
      });
    }
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.root?.serverError.type && (
          <p className="text-red-500">{errors.root?.serverError.type}</p>
        )}
        <div className="flex items-start flex-col mt-3">
          <label>Full Name</label>
          <input
            type="text"
            className="border-0 mt-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600  rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            {...registerField('fullName', {
              required: true,
            })}
          />
          {errors.fullName && errors.fullName.type === 'required' && (
            <p className="text-red-500">Full Name name is required.</p>
          )}
        </div>

        <div className="flex items-start flex-col mt-3">
          <label>Email</label>
          <input
            type="text"
            className="border-0 mt-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
        <div className="flex items-start flex-col mt-3">
          <label>Password</label>
          <input
            type="password"
            className="border-0 mt-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            {...registerField('password', {
              required: true,
            })}
          />
          {errors.password && errors.password.type === 'required' && (
            <p className="text-red-500">Password is required.</p>
          )}
        </div>
        <div className="flex items-center mt-3">
          <label></label>
          <Button type="submit" title="Register" />
        </div>
      </form>
    </div>
  );
};
