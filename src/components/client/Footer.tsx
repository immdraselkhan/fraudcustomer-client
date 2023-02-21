import { Box } from "@mui/material";
import useDate from "@/src/hooks/useDate";

const Footer = () => {
  return (
    <Box sx={{ textAlign: "center", padding: "50px 0" }}>
      © {`${useDate(new Date().getFullYear())}`} FraudCustomer.
    </Box>
  );
};

export default Footer;
