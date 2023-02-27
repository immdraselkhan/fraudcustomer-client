import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const PageTitle = ({ title }: any) => {
  // Mii theme hook
  const theme = useTheme();
  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "75px 0",
        background:
          theme.palette.mode === "dark"
            ? theme.palette.grey[900]
            : theme.palette.grey[100],
      }}
    >
      <Typography variant="h4" fontWeight={theme.typography.fontWeightMedium}>
        {title}
      </Typography>
    </Box>
  );
};

export default PageTitle;
