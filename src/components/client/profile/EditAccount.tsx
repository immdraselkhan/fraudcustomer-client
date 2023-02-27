import { Box, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PhoneNumberInput from "../../common/PhoneNumber";

const EditAccount = () => {
  // Mui theme hook
  const theme = useTheme();
  return (
    <Box sx={{ display: "inline-grid", gap: "10px" }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "25px" }}
      >
        <TextField
          autoFocus
          margin="dense"
          name="firstName"
          label="Fist Name"
          type="text"
          fullWidth
          variant="standard"
          required
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          variant="standard"
          required
        />
      </Box>
      <TextField
        margin="dense"
        name="email"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
        required
        sx={{ marginBottom: "25px" }}
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
