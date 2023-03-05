import Head from "next/head";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { useAuth } from "@/src/contexts/AuthProvider";
import { useRouter } from "next/router";
import useTitle from "@/src/hooks/useTitle";
import VerifyOTP from "@/src/components/client/login/VerifyOTP";
import { toast } from "react-hot-toast";
import Loader from "@/src/components/common/Loader";
import axiosGet from "@/src/hooks/axiosGet";
import axiosPost from "@/src/hooks/axiosPost";
import SendOtp from "../../src/components/client/signup/SendOtp";

export interface IUserInfo {
  name: string;
  email: string;
  password: string;
  number: string;
  shop: string;
}

const SignUp = () => {
  // Global site title
  const title = useTitle();

  // Firebase auth
  const auth = getAuth();

  // Get user information
  const {
    phoneAuth,
    user,
    loading,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    verifyEmail,
    deleteUserAccount,
  } = useAuth();

  // Next router hook
  const router = useRouter();

  // Step phone authentication state
  const [activeStep, setActiveStep] = useState<number>(0);

  // User info state
  const [userInfo, setUserInfo] = useState<IUserInfo>();

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
  const handleSendOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    // Disable form default behavior
    event.preventDefault();

    // Enable button loader
    setLoader(true);

    // Form elements
    const elements = event.currentTarget.elements;

    // User input info
    const number =
      (elements.namedItem("country") as HTMLInputElement).value +
      (elements.namedItem("number") as HTMLInputElement).value;
    const name = (elements.namedItem("name") as HTMLInputElement).value;
    const email = (elements.namedItem("email") as HTMLInputElement).value;
    const password = (elements.namedItem("password") as HTMLInputElement).value;
    const shop = (elements.namedItem("shop") as HTMLInputElement).value;

    // Set user info to the state
    setUserInfo({ name, email, password, number, shop });

    // Check if user is already exists
    const url = `${
      process.env.NEXT_PUBLIC_API_Server
    }/users?email=${email}&number=${encodeURIComponent(number)}`;

    const userExistance = await axiosGet(url);

    if (userExistance?.user?.email || userExistance?.user?.number) {
      toast.error(
        `${
          userExistance?.user?.email
            ? "Email already in use."
            : "Number already in use."
        }` + " Please login!"
      );
      setLoader(false);
      return;
    } else if (userExistance.message === "User not found!") {
      // Get firbase captcha object
      const appVerifier = window.recaptchaVerifier;
      // Firebase user creation function
      phoneAuth(number, appVerifier)
        .then((confirmationResult: {}) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code)
          window.confirmationResult = confirmationResult;
          // Otp sent successfully
          toast.success("Otp sent successfully!");
          setActiveStep(1);
          setLoader(false);
        })
        .catch((error: Error) => {
          // Error; SMS not sent
          toast.error(error?.message);
          setLoader(false);
          return;
        });
    } else {
      toast.error("Something went wrong!");
      setLoader(false);
      return;
    }
  };

  // Store user to the database
  const storeUser = async (updatedUserInfo: {}) => {
    const url = `${process.env.NEXT_PUBLIC_API_Server}/users/create`;
    const options = {
      headers: { "content-type": "application/json; charset=UTF-8" },
    };
    const result = await axiosPost(url, updatedUserInfo, options);
    if (result.success) {
      // User created successfully
      toast.success(result?.message);
      // Send verification email
      verifyEmail().then(() => {
        // Email verification sent!
        toast.success("Verification email sent!");
        setLoader(false);
        // @ts-ignore
        router.replace(router?.query?.redirect || "/");
      });
    } else {
      toast.error(result?.message);
      // Delete user account
      deleteUserAccount()
        .then(() => {
          // User deleted.
        })
        .catch((error: Error) => {
          // An error occurred
          toast.error(error?.message);
          setLoader(false);
          return;
        });
    }
  };

  // Handle otp verification
  const handleOtpVerify = (event: React.FormEvent<HTMLFormElement>) => {
    // Disable form default behavior
    event.preventDefault();

    // Get the verification code from the form input
    const verificationCode = (
      event.currentTarget.elements.namedItem("code") as HTMLInputElement
    ).value;

    // Enable button loader
    setLoader(true);

    // @ts-ignore
    confirmationResult
      .confirm(verificationCode)
      .then((result: { user: {} }) => {
        // Create the user object
        const updatedUserInfo = {
          // @ts-ignore
          uid: result?.user?.uid,
          name: userInfo?.name,
          email: userInfo?.email,
          number: userInfo?.number,
          shop: userInfo?.shop,
          role: "user",
          isVerified: false,
        };
        // User number verified
        // toast.success("User signed in successfully!");
        // Update user email
        updateUserEmail(userInfo?.email)
          .then(() => {
            // Email updated!
            // toast.success("Email updated!");
            // Update user name and photo
            updateUserProfile({
              displayName: userInfo?.name,
            })
              .then(() => {
                // Profile updated!
                // toast.success("Profile updated!");
                // Set user password
                updateUserPassword(userInfo?.password)
                  .then(() => {
                    // Password set successful.
                    // toast.success("Password set successfully!");
                    // Call the function to store in database
                    storeUser(updatedUserInfo);
                  })
                  .catch((error: Error) => {
                    // An error ocurred
                    toast.error(error?.message);
                    setLoader(false);
                    return;
                  });
              })
              .catch((error: Error) => {
                // An error occurred
                toast.error(error?.message);
                setLoader(false);
                return;
              });
          })
          .catch((error: Error) => {
            // An error occurred
            toast.error(error?.message);
            setLoader(false);
            return;
          });
      })
      .catch((error: Error) => {
        // User couldn't sign in (bad verification code?)
        toast.error(error?.message);
        setLoader(false);
        return;
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
        <title>{`Sign up | ${title}`}</title>
      </Head>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: { xs: "386px", sm: "402px" },
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        <Box
          sx={[
            {
              padding: "50px 25px",
              boxShadow: (theme) => theme.shadows[1],
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            },
            theme.palette.mode === "dark" && {
              border: "1px solid",
              borderColor: theme.palette.excel.dark,
              borderRadius: theme.shape.borderRadius + "px",
            },
          ]}
        >
          {activeStep === 0 && (
            <SendOtp
              title={title}
              userInfo={userInfo}
              loader={loader}
              handleSendOtp={handleSendOtp}
            />
          )}

          {activeStep === 1 && (
            <VerifyOTP
              number={userInfo?.number}
              loader={loader}
              handleOtpVerify={handleOtpVerify}
              handleBack={handleBack}
            />
          )}
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
