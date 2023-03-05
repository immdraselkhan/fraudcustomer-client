import { IUserInfo } from "@/pages/signup";
import { useAuth } from "@/src/contexts/AuthProvider";
import { TextField } from "@mui/material";
import PhoneNumberInput from "../../common/PhoneNumber";

interface UserBasicInfoProps {
  userInfo?: IUserInfo | undefined;
}

const UserBasicInfo = ({ userInfo }: UserBasicInfoProps) => {
  // Get user information
  const { user } = useAuth();

  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        name="name"
        label="Full Name"
        type="text"
        fullWidth
        variant="standard"
        required
        defaultValue={userInfo?.name || user?.displayName || ""}
      />
      <TextField
        margin="dense"
        name="email"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
        required
        defaultValue={userInfo?.email || user?.email || ""}
      />
      <TextField
        margin="dense"
        name="password"
        label="Password"
        type="password"
        fullWidth
        variant="standard"
        inputProps={{
          minLength: 6,
        }}
        required
        defaultValue={userInfo?.password || ""}
      />
      <PhoneNumberInput number={userInfo?.number} />
      <TextField
        margin="dense"
        name="shop"
        label="Shop Name"
        type="text"
        fullWidth
        required
        variant="standard"
        defaultValue={userInfo?.shop || ""}
      />
    </>
  );
};

export default UserBasicInfo;
