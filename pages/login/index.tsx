import Head from "next/head";
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import countries from "../../src/data/countries.json";
import { useEffect, useState } from "react";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { useAuth } from "@/src/contexts/AuthProvider";
import { useRouter } from "next/router";
import useTitle from "@/src/hooks/useTitle";

const Login = () => {
  // Global site title
  const title = useTitle();

  // Firebase auth
  const auth = getAuth();

  // Get user information
  const { phoneAuth, user, loading } = useAuth();

  // Next router hook
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);

  // Mui theme hook
  const theme = useTheme();

  useEffect(() => {
    if (!loading && !user?.uid) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
      );
    }
  }, [loading, user]);

  const handleSendOtp = (event: HTMLEvent) => {
    event.preventDefault();

    const phoneNumber = event.target.country.value + event.target.number.value;

    // Get captcha object
    const appVerifier = window.recaptchaVerifier;

    phoneAuth(phoneNumber, appVerifier)
      .then((confirmationResult: {}) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code)
        window.confirmationResult = confirmationResult;
        // Otp sent successfully
        setActiveStep(1);
      })
      .catch((error: {}) => {
        // Error; SMS not sent
        alert(error);
      });
  };

  const handleOtpVerify = (event: HTMLEvent) => {
    event.preventDefault();
    const code = event.target.code.value;
    //@ts-ignore
    confirmationResult
      .confirm(code)
      .then((result: { user: {} }) => {
        // User signed in successfully
        const user = result.user;
        // @ts-ignore
        router.replace(router?.query?.redirect || "/");
      })
      .catch((error: {}) => {
        // User couldn't sign in (bad verification code?)
        alert(error);
      });
  };

  const [seconds, setSeconds] = useState(11);

  const handleResendOtp = () => {
    setSeconds(10);
    handleSendOtp("+8801753203145");
  };

  // useEffect(() => {
  //   if (seconds > 0) {
  //     setTimeout(() => setSeconds(seconds - 1), 1000);
  //   } else {
  //     setSeconds(false);
  //   }
  // });

  const handleBack = () => {
    setActiveStep((currentStep) => currentStep - 1);
    setSeconds(10);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user?.uid) {
    // @ts-ignore
    router.replace(router?.query?.redirect || "/");
  }

  return (
    <>
      <Head>
        <title>{`Login | ${title}`}</title>
      </Head>
      <main>
        <Container
          maxWidth={false}
          sx={{ maxWidth: { xs: "386px", sm: "402px" } }}
        >
          <Box
            sx={[
              {
                display: "inline-grid",
                gap: "50px",
                padding: "25px",
                boxShadow: (theme) => theme.shadows[1],
                marginTop: "100px",
                marginBottom: "100px",
                width: "100%",
              },
              theme.palette.mode === "dark" && {
                border: "1px solid",
                borderColor: theme.palette.excel.dark,
                borderRadius: theme.shape.borderRadius + "px",
              },
            ]}
          >
            {activeStep === 0 && (
              <>
                <Typography variant="h6">Enter your phone number</Typography>
                <FormControl
                  sx={{
                    gap: "25px",
                    margin: "0 auto",
                    width: "100%",
                  }}
                  onSubmit={(e) => handleSendOtp(e)}
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
                          <MenuItem
                            key={country.code}
                            value={country.dial_code}
                          >
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
                      defaultValue="01935489960"
                    />
                  </Box>
                  <Box data-size="compact" id="recaptcha-container"></Box>
                  <Button
                    sx={{ maxWidth: "fit-content", marginLeft: "auto" }}
                    type="submit"
                    variant="contained"
                  >
                    Send OTP
                  </Button>
                </FormControl>
                <Typography variant="body2">
                  By tapping Send OTP, an SMS may be sent. Message & data rates
                  may apply.
                </Typography>
              </>
            )}

            {activeStep === 1 && (
              <>
                <Typography variant="h6">Verify your phone number</Typography>
                <FormControl
                  sx={{
                    gap: "25px",
                    margin: "0 auto",
                    width: "100%",
                  }}
                  onSubmit={(e) => handleOtpVerify(e)}
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
                      // startAdornment={
                      //   <InputAdornment position="start">+88</InputAdornment>
                      // }
                      placeholder="6-digit code"
                      type="tel"
                      name="code"
                      required
                      defaultValue="123456"
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
                      sx={{ maxWidth: "fit-content" }}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      sx={{ maxWidth: "fit-content" }}
                      type="submit"
                      variant="contained"
                    >
                      Continue
                    </Button>
                  </Box>
                </FormControl>
                {/* {seconds ? (
                  <Typography variant="body2" textAlign="center">
                    Resend code in {seconds}s
                  </Typography>
                ) : (
                  <Button
                    sx={{ width: "fit-content", margin: "0 auto" }}
                    onClick={handleResendOtp}
                  >
                    Resend
                  </Button>
                )} */}
              </>
            )}
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Login;
