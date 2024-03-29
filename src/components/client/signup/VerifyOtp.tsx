import { useEffect, useState } from "react";
import { Box, Button, FormControl, Input, Typography } from "@mui/material";

interface IVerifyOtpProps {
  number: string | undefined;
  loader: boolean;
  handleOtpVerify: (event: React.FormEvent<HTMLFormElement>) => void;
  handleBack: () => void;
  handleRecaptcha: () => void;
}

const VerifyOtp = ({
  number,
  loader,
  handleOtpVerify,
  handleBack,
  handleRecaptcha,
}: IVerifyOtpProps) => {
  // Otp resend timer
  const [timer, setTimer] = useState<number>(15);

  useEffect(() => {
    if (timer !== 0) {
      const id = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [timer]);

  return (
    <>
      <Typography variant="h6">Verify your phone number</Typography>
      <Typography variant="subtitle1">{`Enter the 6-digit code we sent to ${number}`}</Typography>
      <FormControl
        sx={{
          gap: "25px",
          margin: "0 auto",
          width: "100%",
        }}
        onSubmit={handleOtpVerify}
        component="form"
      >
        <Box sx={{ display: "flex", gap: "25px" }}>
          <Input
            sx={{ width: "100%" }}
            inputProps={{
              minLength: 6,
              maxLength: 6,
              pattern: "[0-9]{6}",
              autoFocus: true,
            }}
            placeholder="6-digit code"
            type="tel"
            name="code"
            required
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            gap: "25px",
          }}
        >
          <Button
            disabled={loader}
            sx={{ maxWidth: "fit-content" }}
            onClick={() => {
              handleBack();
              handleRecaptcha();
            }}
          >
            Back
          </Button>
          <Button
            sx={{ maxWidth: "fit-content" }}
            type="submit"
            variant="contained"
            disabled={loader}
          >
            {loader ? "Verifying..." : "Verify"}
          </Button>
        </Box>
      </FormControl>
      <Box data-size="compact" id="recaptcha-container"></Box>
      {timer ? (
        <Typography variant="body2" textAlign="center">
          Resend code in {timer}s
        </Typography>
      ) : (
        <Button
          disabled={loader}
          sx={{ width: "fit-content", margin: "0 auto" }}
          onClick={() => {
            setTimer(15);
            handleBack();
            handleRecaptcha();
          }}
        >
          Resend
        </Button>
      )}
    </>
  );
};

export default VerifyOtp;
