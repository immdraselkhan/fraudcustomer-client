import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <CircularProgress
      sx={{
        display: "flex",
        margin: "0 auto",
      }}
      color="primary"
    />
  );
};

export default Loader;
