import { IUserInfo } from "@/pages/signup";
import { Typography, Box, FormControl, Button, Link } from "@mui/material";
import { NextLinkComposed } from "../../common/MuiLink";
import UserBasicInfo from "../profile/UserBasicInfo";

interface ISendOtpProps {
  title: string;
  userInfo: IUserInfo | undefined;
  loader: boolean;
  handleSendOtp: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SendOtp = ({ title, userInfo, loader, handleSendOtp }: ISendOtpProps) => {
  return (
    <>
      <Box sx={{ display: "inline-grid", gap: "5px" }}>
        <Typography variant="h6">{`Welcome to ${title}`}</Typography>
        <Typography></Typography>
        <Typography>
          <Link
            to="/login"
            component={NextLinkComposed}
            variant="body2"
            sx={{ textDecoration: "none" }}
          >
            Already have an account? Login
          </Link>
        </Typography>
      </Box>
      <FormControl
        sx={{
          gap: "15px",
        }}
        onSubmit={handleSendOtp}
        component="form"
      >
        <UserBasicInfo userInfo={userInfo} />
        <Button
          id="sign-up-button"
          type="submit"
          variant="contained"
          disabled={loader}
        >
          {loader ? "Verifying Information..." : "Create Account"}
        </Button>
      </FormControl>
      <Typography variant="body2">
        You accept our{" "}
        <Link
          to="/privacy-policy"
          component={NextLinkComposed}
          sx={{ textDecoration: "none" }}
        >
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link
          to="/terms-conditions"
          component={NextLinkComposed}
          sx={{ textDecoration: "none" }}
        >
          Terms and Conditions
        </Link>{" "}
        by tapping Create Account. Also, an SMS may be sent. Message & data
        rates may apply.
      </Typography>
    </>
  );
};

export default SendOtp;
