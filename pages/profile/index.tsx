import * as React from "react";
import Head from "next/head";
import useTitle from "@/src/hooks/useTitle";
import { useAuth } from "@/src/contexts/AuthProvider";
import PrivateRoute from "@/src/hocs/PrivateRoute";
import { useTheme } from "@mui/material/styles";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Container,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
} from "@mui/material";
import PageTitle from "@/src/components/common/PageTitle";
import EditAccount from "@/src/components/client/profile/EditAccount";
import convertBase64 from "@/src/utilis/convertBase64";
import UploadImage from "@/src/hooks/useUploadImage";
import LoadingOverlay from "@/src/components/common/LoadingOverlay";
import { toast } from "react-hot-toast";
import AxiosPost from "@/src/hooks/useAxiosPost";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface UserInfo {
  uid: string;
  name: string;
  email: string;
  number: string;
  shop: string;
  photo: string;
  role: string;
  isVerified: boolean;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Profile = () => {
  // Global site title
  const title = useTitle();

  // Get user information
  const { user, updateUserProfile, updateUserEmail, userLogOut } = useAuth();

  // Mii theme hook
  const theme = useTheme();

  console.log(theme);

  // Mui media query hook
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [value, setValue] = React.useState(
    !user?.displayName || !user?.email || !user?.photoURL ? 2 : 0
  );

  const [overlayLoading, setOverlayLoading] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(
      !user?.displayName || !user?.email || !user?.photoURL ? 2 : newValue
    );
  };

  const handleSubmit = async (event: HTMLEvent) => {
    event.preventDefault();
    const fullName = event.target.name.value;
    const email = event.target.email.value;
    const shop = event.target.shop.value;
    const userPhoto = event.target.userPhoto.files[0];
    const base64Image = await convertBase64(userPhoto);

    const imageUpload = await UploadImage(base64Image, user?.uid);

    if (imageUpload?.success) {
      updateUserProfile({
        displayName: fullName,
        photoURL: imageUpload?.url,
      })
        .then(() => {
          // Profile updated!
          toast.success("Profile updated");
        })
        .catch((error: any) => {
          // An error occurred
          toast.error(error?.message);
        });

      updateUserEmail(email)
        .then(() => {
          // Email updated!
          toast.success("Email updated");
        })
        .catch((error: any) => {
          // An error occurred
          console.log(error);
          toast.error(error?.message);
        });

      const url = `${process.env.NEXT_PUBLIC_API_Server}/users/create`;
      const userInfo: UserInfo = {
        uid: user?.uid,
        name: fullName,
        email,
        number: user?.phoneNumber,
        shop,
        photo: imageUpload?.url,
        role: "user",
        isVerified: false,
      };
      const options = {
        headers: { "content-type": "application/json; charset=UTF-8" },
      };
      const result = await AxiosPost(url, userInfo, options);
      if (result.success) {
        console.log(result);
        toast.success(result?.message);
        setOverlayLoading(false);
      } else {
        console.log(result);
        toast.error(result?.message);
        setOverlayLoading(false);
      }
    } else {
      toast.error(imageUpload.message);
      setOverlayLoading(false);
    }
  };
  console.log(user);

  return (
    <>
      <Head>
        <title>{`Profile | ${title}`}</title>
      </Head>
      <main>
        <PageTitle title="My Account" />
        <Container>
          <Box
            sx={{
              width: "100%",
              display: { xs: "inherit", sm: "flex" },
              padding: "50px 0",
              minHeight: "calc(100vh - 380px)",
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                orientation={matches ? "vertical" : "horizontal"}
                aria-label="basic tabs example"
              >
                <Tab
                  sx={{ alignItems: "start" }}
                  label="Dashboard"
                  {...a11yProps(0)}
                />
                <Tab
                  sx={{ alignItems: "start" }}
                  label="My Entries"
                  {...a11yProps(1)}
                />
                <Tab
                  sx={{ alignItems: "start" }}
                  label="Account Details"
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>
            <Box>
              <TabPanel value={value} index={0}>
                {`Hello, ${user?.displayName}`}
              </TabPanel>
              <TabPanel value={value} index={1}>
                Here will all entries
              </TabPanel>
              <TabPanel value={value} index={2}>
                {!user?.displayName || !user?.email || !user?.photoURL ? (
                  <Dialog
                    open={true}
                    sx={{
                      maxWidth: "450px",
                      margin: "0 auto",
                    }}
                  >
                    {overlayLoading && <LoadingOverlay />}
                    <DialogTitle sx={{ paddingBottom: 0 }}>
                      Update Account Info
                    </DialogTitle>
                    <FormControl
                      onSubmit={(event) => {
                        setOverlayLoading(true);
                        handleSubmit(event);
                      }}
                      component="form"
                    >
                      <DialogContent>
                        <DialogContentText sx={{ marginBottom: "20px" }}>
                          To continue, please complete your profile.
                        </DialogContentText>
                        <EditAccount />
                      </DialogContent>
                      <DialogActions sx={{ padding: "0 20px 20px" }}>
                        <Button variant="contained" type="submit">
                          Submit
                        </Button>
                      </DialogActions>
                    </FormControl>
                  </Dialog>
                ) : (
                  <EditAccount />
                )}
              </TabPanel>
            </Box>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default PrivateRoute(Profile);
