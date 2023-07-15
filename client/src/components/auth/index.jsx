import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { errorHelper, Loader } from '../../utils/tools';
import { authUser } from '../../store/actions/users'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Auth = () => {
  const [register, setRegister] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const notifications = useSelector(state => state.notifications);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (notifications && notifications.global.success) {
      navigate('/dashboard');
    }
  }, [notifications]);

  useEffect(() => {
    if (users.auth) {
      navigate('/dashboard', { replace: true, state: { from: location } });
    }
  }, []);

  const formik = useFormik({
    initialValues: { email: 'lbuduendev@gmail.com', password: 'testing123' },
    validationSchema: Yup.object({
      email: Yup.string().required('Sorry, the email is required').email('Sorry, the email is invalid'),
      password: Yup.string().required('Sorry, the password is required')
    }),
    onSubmit: (values) => {
      dispatch(authUser({ values, register }));
    }
  });

  return (
    <div className='auth_container'>
      <h1>Authenticate</h1>
      {users.loading ?
        <Loader />
        :
        <Box sx={{ '& .MuiTextField-root': { width: '100%', marginTop: '20px' } }} component="form" onSubmit={formik.handleSubmit}>
          <TextField
            name='email'
            label='Enter your email'
            variant='outlined'
            {...formik.getFieldProps('email')}
            {...errorHelper(formik, 'email')}
          />

          <TextField
            name='password'
            type="password"
            label='Enter your password'
            variant='outlined'
            {...formik.getFieldProps('password')}
            {...errorHelper(formik, 'password')}
          />
          <div className="mt-2">
            <Button variant='contained' color='primary' type='submit' size='large'>
              {register ? 'Register' : 'Log in'}
            </Button>
            <Button variant='outlined' color='secondary' size='small' className='mt-2' onClick={() => setRegister(!register)}>
              Want to {!register ? 'Register' : 'Log in'}
            </Button>
          </div>
        </Box>
      }
    </div>
  )
}

export default Auth;