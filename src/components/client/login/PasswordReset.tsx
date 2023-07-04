import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, FormControl } from "@mui/material";

interface IPasswordResetProps {
  loader: boolean;
  email: string | undefined;
  dialog: boolean;
  setDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handlePasswordReset: (event: React.FormEvent<HTMLFormElement>) => void;
}

const PasswordReset = ({
  loader,
  email,
  dialog,
  setDialog,
  handlePasswordReset,
}: IPasswordResetProps) => {
  return (
    <>
      <Dialog open={dialog} onClose={() => setDialog(false)} maxWidth="xs">
        <Box sx={{ padding: "25px 0" }}>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your email. You will get a email including a password
              reset link.
            </DialogContentText>
            <FormControl
              component="form"
              onSubmit={handlePasswordReset}
              sx={{
                gap: "15px",
                width: "100%",
              }}
            >
              <TextField
                name="email"
                label="Email Address"
                autoComplete="email"
                type="email"
                margin="normal"
                variant="outlined"
                required
                disabled={loader}
                defaultValue={email || ""}
                sx={{ marginTop: "25px" }}
              />
              <Button type="submit" variant="contained" disabled={loader}>
                {loader ? "Sending..." : "Send Reset Email"}
              </Button>
            </FormControl>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

export default PasswordReset;
