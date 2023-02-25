import Head from "next/head";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { useAuth } from "@/src/contexts/AuthProvider";
import { useRouter } from "next/router";
import useTitle from "@/src/hooks/useTitle";
import SendOTP from "@/src/components/client/login/SendOTP";
import VerifyOTP from "@/src/components/client/login/VerifyOTP";
import { toast } from "react-hot-toast";
import Loader from "@/src/components/common/Loader";

const Login = () => {
  // Global site title
  const title = useTitle();

  // Firebase auth
  const auth = getAuth();

  // Get user information
  const { phoneAuth, user, loading } = useAuth();

  // Next router hook
  const router = useRouter();

  // Step phone authentication state
  const [activeStep, setActiveStep] = useState<number>(0);

  // User phone number state
  const [phoneNumber, setPhoneNumber] = useState<number>();

  // Button loader state
  const [loader, setLoader] = useState<boolean>(false);

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
  }, [activeStep, loading, user, auth]);

  // Handle otp sending
  const handleSendOtp = (event: HTMLEvent) => {
    // Disable form default behavior
    event.preventDefault();

    // Enable button loader
    setLoader(true);

    // User phone number
    const number = event.target.country.value + event.target.number.value;

    // Set phone number to the state
    setPhoneNumber(event.target.country.value + event.target.number.value);

    // Get captcha object
    const appVerifier = window.recaptchaVerifier;

    phoneAuth(number, appVerifier)
      .then((confirmationResult: {}) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code)
        window.confirmationResult = confirmationResult;
        // Otp sent successfully
        toast.success("Otp sent successfully!");
        setLoader(false);
        setActiveStep(1);
      })
      .catch((error: any) => {
        // Error; SMS not sent
        toast.error(error?.message);
        setLoader(false);
        alert(error);
      });
  };

  // Handle otp verification
  const handleOtpVerify = (event: HTMLEvent) => {
    // Disable form default behavior
    event.preventDefault();

    // Enable button loader
    setLoader(true);

    //@ts-ignore
    confirmationResult
      .confirm(event.target.code.value)
      .then((result: { user: {} }) => {
        // User signed in successfully
        const user = result.user;
        toast.success("User signed in successfully!");
        setLoader(false);
        // @ts-ignore
        router.replace(router?.query?.redirect || "/");
      })
      .catch((error: any) => {
        // User couldn't sign in (bad verification code?)
        toast.error(error?.message);
        setLoader(false);
      });
  };

  // Hadle back button action
  const handleBack = () => {
    setActiveStep((currentStep) => currentStep - 1);
  };

  // Loader until user information
  if (loading) {
    return <Loader />;
  }

  // Redirect to login page if user is not logged in
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
              <SendOTP
                phoneNumber={phoneNumber}
                loader={loader}
                handleSendOtp={handleSendOtp}
              />
            )}

            {activeStep === 1 && (
              <VerifyOTP
                phoneNumber={phoneNumber}
                loader={loader}
                handleOtpVerify={handleOtpVerify}
                handleBack={handleBack}
              />
            )}
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Login;
