import { IUserInfo } from "@/pages/signup";
import { Typography, Box, FormControl, Button } from "@mui/material";
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
      <Typography variant="h6">{`Welcome to ${title}`}</Typography>
      <FormControl
        sx={{
          gap: "15px",
        }}
        onSubmit={(event) => handleSendOtp(event)}
        component="form"
      >
        <UserBasicInfo userInfo={userInfo} />
        <Box data-size="compact" id="recaptcha-container"></Box>
        <Button
          sx={{ maxWidth: "fit-content", marginLeft: "auto" }}
          type="submit"
          variant="contained"
          disabled={loader}
        >
          {loader ? "Verifying Information..." : "Create Account"}
        </Button>
      </FormControl>
      <Typography variant="body2">
        You accept our Privacy Policy and Terms and Conditions by tapping Create
        Account. Also, an SMS may be sent. Message & data rates may apply.
      </Typography>
    </>
  );
};

export default SendOtp;
