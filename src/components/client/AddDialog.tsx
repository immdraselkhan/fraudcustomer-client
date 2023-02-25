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
import { useAuth } from "@/src/contexts/AuthProvider";
import { useRouter } from "next/router";

const AddDialog = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [modal, setModal] = useState<boolean>(false);
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          user?.uid ? setModal(true) : router.replace("/login");
        }}
      >
        Add
      </Button>
      {user?.uid && (
        <Dialog open={modal} onClose={() => setModal(false)}>
          <DialogTitle>Add New Fraud</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
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
      )}
    </div>
  );
};

export default AddDialog;
