import { useState } from "react";
import { useSelector } from "react-redux";

import { Modal } from 'react-bootstrap';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';

import EmailStepper from "./steppers/email";
import PasswordForm from "./passwordForm";

const UserCredentials = () => {
  const user = useSelector(state => state.users);

  const [emailModal, setEmailModal] = useState(false);
  const handleCloseMailModal = () => setEmailModal(false);
  const handleShowMailModal = () => setEmailModal(true);

  const [passwordModal, setPasswordModal] = useState(false);
  const handleClosePasswordModal = () => setPasswordModal(false);
  const handleShowPasswordModal = () => setPasswordModal(true);

  return (
    <div>
      <div className="mb-3 auth_grid">
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <TextField
              value={user.data.email}
              variant="standard"
              disabled
            />
          </Grid>
          <Grid item>
            <EditIcon color="primary" onClick={handleShowMailModal} />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end" className="mt-2 mb-2">
          <Grid item>
            <TextField
              value="************"
              variant="standard"
              disabled
            />
          </Grid>
          <Grid item>
            <EditIcon color="primary" onClick={handleShowPasswordModal} />
          </Grid>
        </Grid>
        <Divider />
      </div>

      <Modal show={emailModal} onHide={handleCloseMailModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update your email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmailStepper user={user} closeModal={handleCloseMailModal} />
        </Modal.Body>
      </Modal>

      <PasswordForm open={passwordModal} handleClose={handleClosePasswordModal} />
    </div>
  )
}

export default UserCredentials;