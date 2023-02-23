import { Box } from "@mui/material";
import useDate from "@/src/hooks/useDate";
import useTitle from "@/src/hooks/useTitle";

const Footer = () => {
  const title = useTitle();
  return (
    <Box sx={{ textAlign: "center", padding: "50px 0" }}>
      © {`${useDate(new Date().getFullYear())} ${title}`}.
    </Box>
  );
};

export default Footer;
