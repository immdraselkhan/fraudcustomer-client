import Head from "next/head";
import useTitle from "@/src/hooks/useTitle";
import { useAuth } from "@/src/contexts/AuthProvider";
import PrivateRoute from "@/src/hocs/PrivateRoute";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Container,
  useMediaQuery,
} from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
  const { user, userLogOut } = useAuth();

  // Mii theme hook
  const theme = useTheme();

  // Mui media query hook
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>{`Profile | ${title}`}</title>
      </Head>
      <main>
        <Box
          sx={{
            textAlign: "center",
            padding: "75px 0",
            background: "",
          }}
        >
          <Typography variant="h4">My Account</Typography>
        </Box>
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
                {`Hello, ${user?.uid}`}
              </TabPanel>
              <TabPanel value={value} index={1}>
                Here will all entries
              </TabPanel>
              <TabPanel value={value} index={2}>
                Account Details
              </TabPanel>
            </Box>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default PrivateRoute(Profile);
