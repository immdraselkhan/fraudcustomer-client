import {
  Typography,
  Box,
  FormControl,
  TextField,
  MenuItem,
  Input,
  Button,
} from "@mui/material";
import countries from "../../../data/countries.json";

const SendOTP = ({ phoneNumber, loader, handleSendOtp }: HTMLEvent) => {
  return (
    <>
      <Typography variant="h6">Enter your phone number</Typography>
      <FormControl
        sx={{
          gap: "25px",
          margin: "0 auto",
          width: "100%",
        }}
        onSubmit={(event) => handleSendOtp(event)}
        component="form"
      >
        <Box sx={{ display: "flex", gap: "25px" }}>
          <TextField
            name="country"
            defaultValue="+88"
            variant="standard"
            select
          >
            {countries
              .filter((country) => country.name === "Bangladesh")
              .map((country) => (
                <MenuItem key={country.code} value={country.dial_code}>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <Box>{country.flag}</Box>
                    <Box>{country.dial_code}</Box>
                  </Box>
                </MenuItem>
              ))}
          </TextField>
          <Input
            sx={{ flexGrow: 1 }}
            inputProps={{
              minLength: 11,
              maxLength: 11,
              pattern: "[0]{1}[1]{1}[3-9]{1}[0-9]{8}",
              autoFocus: true,
            }}
            placeholder="01xxxxxxxxx"
            type="tel"
            name="number"
            required
            defaultValue={phoneNumber?.toString()?.slice(3) || ""}
          />
        </Box>
        <Box data-size="compact" id="recaptcha-container"></Box>
        <Button
          sx={{ maxWidth: "fit-content", marginLeft: "auto" }}
          type="submit"
          variant="contained"
          disabled={loader}
        >
          {loader ? "Sending..." : "Send OTP"}
        </Button>
      </FormControl>
      <Typography variant="body2">
        By tapping Send OTP, an SMS may be sent. Message & data rates may apply.
      </Typography>
    </>
  );
};

export default SendOTP;
