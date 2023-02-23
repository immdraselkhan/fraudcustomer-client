import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const AddDialog = () => {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <div>
      <Button variant="contained" onClick={() => setModal(true)}>
        Add
      </Button>
      <Dialog open={modal} onClose={() => setModal(false)}>
        <DialogTitle>Add New Fraud</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModal(false)}>Cancel</Button>
          <Button onClick={() => setModal(false)}>Add Now</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDialog;
