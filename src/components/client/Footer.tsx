import { Box } from "@mui/material";
import useDate from "@/src/hooks/useDate";
import useTitle from "@/src/hooks/useTitle";
const Footer = () => {
  // Global site title
  const title = useTitle();
  return (
    <Box sx={{ textAlign: "center", padding: "50px 0" }} component="footer">
      © {`${useDate(new Date().getFullYear())} ${title}`}.
    </Box>
  );
};

export default Footer;
