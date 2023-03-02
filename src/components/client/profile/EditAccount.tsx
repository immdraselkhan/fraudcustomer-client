import { useAuth } from "@/src/contexts/AuthProvider";
import { Box, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PhoneNumberInput from "../../common/PhoneNumber";

const EditAccount = () => {
  // Get user information
  const { user } = useAuth();
  // Mui theme hook
  const theme = useTheme();
  return (
    <Box sx={{ display: "inline-grid", gap: "10px" }}>
      <TextField
        autoFocus
        margin="dense"
        name="name"
        label="Full Name"
        type="text"
        fullWidth
        variant="standard"
        required
        defaultValue={user?.displayName}
      />
      <TextField
        margin="dense"
        name="email"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
        required
        sx={{ marginBottom: "25px" }}
        defaultValue={user?.email}
      />
      <PhoneNumberInput />
      <TextField
        margin="dense"
        name="shop"
        label="Shop Name"
        type="text"
        fullWidth
        required
        variant="standard"
        defaultValue="UniShop"
      />
      <TextField
        id="outlined-full-width"
        label="Upload Profile Picture"
        name="userPhoto"
        type="file"
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.secondary,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
          },
        }}
        variant="outlined"
        required
      />
    </Box>
  );
};

export default EditAccount;
