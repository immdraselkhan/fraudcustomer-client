import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useDate from "@/src/hooks/useDate";

const PostCard = () => {
  // Mui theme hook
  const theme = useTheme();
  return (
    <Card
      sx={[
        {
          minWidth: 275,
          border: "1px solid",
          borderColor: theme.palette.excel.light,
          marginBottom: "25px",
          boxShadow: "none",
        },
        {
          "&:hover": {
            borderColor: theme.palette.action.active,
          },
        },
        theme.palette.mode === "dark" && {
          borderColor: theme.palette.excel.dark,
        },
      ]}
    >
      <CardContent sx={{ display: "inline-grid", gap: "10px" }}>
        <Typography variant="body2">
          Date: {`${useDate(new Date().toLocaleString("en-US"))}`}
        </Typography>
        <Typography>Name: Moazzem Hossain</Typography>
        <Typography>Phone: 01753***145</Typography>
        <Typography>
          Details: This is a fraud customer. Do not deliver product without full
          advanced. He will not receive your product during delivery.
        </Typography>
        <Typography>Shop: UniShop</Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
