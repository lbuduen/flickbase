import { useDispatch } from 'react-redux';
import { checkPassword, changePassword } from '../../../store/actions/users';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { errorHelper } from '../../../utils/tools';


const PasswordForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: ''
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .required("This is required")
        .test('match', 'Invalid password', async (value) => (
          await dispatch(checkPassword(value)).unwrap() === "true"
        )),
      newPassword: Yup.string()
        .required("This is required")
        .min(8, "Password must contain at least 8 characters"),
      repeatNewPassword: Yup.string()
        .required("This is required")
        .test('equal', 'Passwords don\'t match', (value, ctx) => value === ctx.parent.newPassword),
    }),
    onSubmit: async (values) => {
      await dispatch(changePassword(values.newPassword)).unwrap();
      formik.resetForm();
      handleClose();
    }
  });

  /*   let timeout;
    const handleChange = (text, formik) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        formik.setFieldValue("oldPassword", text);
      }, 750);
    };
   */
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
      <DialogTitle>Change your password</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <TextField
              style={{ width: '100%' }}
              name='oldPassword'
              id='oldPassword'
              type='password'
              label="Enter your old password"
              variant='outlined'
              /* value={formik.values.oldPassword}
              onBlur={formik.handleBlur}
              onChange={(event) => { handleChange(event.target.name, formik) }} */
              {...formik.getFieldProps("oldPassword")}
              {...errorHelper(formik, 'oldPassword')}
            />
          </div>
          <Divider variant="middle" className='mt-3 mb-3'>New password</Divider>
          <div className="form-group">
            <TextField
              style={{ width: '100%' }}
              name='newPassword'
              id='newPassword'
              type='password'
              label="Enter your new password"
              variant='outlined'
              {...formik.getFieldProps('newPassword')}
              {...errorHelper(formik, 'newPassword')}
            />
          </div>
          <div className="form-group">
            <TextField
              style={{ width: '100%' }}
              name='repeatNewPassword'
              id='repeatNewPassword'
              type='password'
              label="Repeat new password"
              variant='outlined'
              {...formik.getFieldProps('repeatNewPassword')}
              {...errorHelper(formik, 'repeatNewPassword')}
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => formik.submitForm()}>Change password</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PasswordForm