import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <CircularProgress
      sx={{
        display: "flex",
        margin: "0 auto",
        minHeight: "calc(100vh - 188px)",
      }}
      color="primary"
    />
  );
};

export default Loader;
