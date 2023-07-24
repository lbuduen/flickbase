import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../store/actions/users';

import { useFormik } from 'formik';
import { errorHelper } from '../../../utils/tools';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UserProfile = () => {
  const user = useSelector(state => state.users.data);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age
    },
    onSubmit: (values) => {
      dispatch(updateProfile(values));
    }
  });

  return (
    <>
      <form
        className='mt-3 article_form'
        style={{ maxWidth: '250px' }}
        onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <TextField
            style={{ maxWidth: '100%' }}
            id='firstname'
            label='Enter your firstname'
            variant='outlined'
            {...formik.getFieldProps('firstname')}
            {...errorHelper(formik, 'firstname')}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{ maxWidth: '100%' }}
            id='lastname'
            label='Enter your lastname'
            variant='outlined'
            {...formik.getFieldProps('lastname')}
            {...errorHelper(formik, 'lastname')}
          />
        </div>
        <div className="form-group">
          <TextField
            style={{ maxWidth: '100%' }}
            id='age'
            type='number'
            label='Enter your age'
            variant='outlined'
            {...formik.getFieldProps('age')}
            {...errorHelper(formik, 'age')}
          />
        </div>
        <Button className='mt-3' variant='contained' color='primary' type='submit'>
          Edit profile
        </Button>
      </form>
    </>
  )
}

export default UserProfile;