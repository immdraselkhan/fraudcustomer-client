import { Typography, Box, FormControl, Button } from "@mui/material";
import PhoneNumberInput from "../../common/PhoneNumber";

const SendOTPx = ({ loader, handleSendOtp }: HTMLEvent) => {
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
        <PhoneNumberInput />
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

export default SendOTPx;
