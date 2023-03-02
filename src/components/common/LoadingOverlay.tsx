import { Box, CircularProgress } from "@mui/material";

const LoadingOverlay = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        zIndex: 1,
        background: "rgba(0, 0, 0, 0.5)",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default LoadingOverlay;
