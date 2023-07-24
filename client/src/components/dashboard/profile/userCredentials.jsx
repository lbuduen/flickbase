import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from 'react-bootstrap';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import EmailStepper from "./steppers/email";

const UserCredentials = () => {
  const user = useSelector(state => state.users);
  const dispatch = useDispatch();

  const [emailModal, setEmailModal] = useState(false);
  const handleClose = () => setEmailModal(false);
  const handleShow = () => setEmailModal(true);

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
            <EditIcon color="primary" onClick={handleShow} />
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
            <EditIcon color="primary" />
          </Grid>
        </Grid>
        <Divider />
      </div>

      <Modal show={emailModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update your email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmailStepper user={user} closeModal={handleClose} />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UserCredentials;