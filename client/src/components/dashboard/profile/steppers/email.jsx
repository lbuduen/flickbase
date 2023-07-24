import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserEmail } from '../../../../store/actions/users'

import { useFormik } from "formik";
import * as Yup from 'yup';

import { errorHelper, Loader } from '../../../../utils/tools';

import { TextField, Button, Stepper, Step, StepLabel } from '@mui/material';

const EmailStepper = ({ user, closeModal }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Enter old email', 'Enter new email', 'Confirm'];

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      newEmail: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('This is required')
        .email('Invalid email')
        .test('match', 'Please check your email', email => email === user.data.email),
      newEmail: Yup.string()
        .required('This is required')
        .email('Invalid email')
        .test('equal', 'The email is the same', newEmail => newEmail !== user.data.email),
    }),
    onSubmit: async (values) => {
      await dispatch(updateUserEmail(values));
      closeModal();
    }
  });

  const handleNextStep = () => setActiveStep(prev => prev + 1);
  const handleBackStep = () => setActiveStep(prev => prev - 1);

  const getNextBtn = () => (
    <Button className="mt-3" variant="contained" color="primary" onClick={handleNextStep}>
      Next
    </Button>
  );
  const getBackBtn = () => (
    <Button className="mt-3 me-3" variant="outlined" color="primary" onClick={handleBackStep}>
      Back
    </Button>
  );


  return (
    <>
      {user.loading ?
        <Loader />
        :
        <>
          <Stepper activeStep={activeStep}>
            {steps.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
          <form className="mt-3 stepper_form" onSubmit={formik.handleSubmit}>
            {
              activeStep === 0 ?
                <div className="form-group">
                  <TextField
                    style={{ width: '100%' }}
                    name="email"
                    id="email"
                    type="email"
                    label="Enter your old email"
                    variant="outlined"
                    {...formik.getFieldProps('email')}
                    {...errorHelper(formik, 'email')}
                  />
                  {formik.values.email && !formik.errors.email ? getNextBtn() : null}
                </div>
                : null
            }
            {
              activeStep === 1 ?
                <div className="form-group">
                  <TextField
                    style={{ width: '100%' }}
                    name="newEmail"
                    id="newEmail"
                    type="email"
                    label="Enter your new email"
                    variant="outlined"
                    {...formik.getFieldProps('newEmail')}
                    {...errorHelper(formik, 'newEmail')}
                  />
                  {getBackBtn()}
                  {formik.values.newEmail && !formik.errors.newEmail ? getNextBtn() : null}
                </div>
                : null
            }
            {
              activeStep === 2 ?
                <div className="form-group">
                  {getBackBtn()}
                  <Button className="mt-3 me-2" variant="contained" color="primary" onClick={formik.submitForm}>
                    Yes, change my email
                  </Button>
                </div>
                : null
            }
          </form>
        </>
      }
    </>
  )
}

export default EmailStepper;