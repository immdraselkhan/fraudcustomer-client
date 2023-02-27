import { useAuth } from "@/src/contexts/AuthProvider";
import { Box, TextField, MenuItem, Input } from "@mui/material";
import { useRouter } from "next/router";
import countries from "../../data/countries.json";

const PhoneNumberInput = () => {
  // Get user information
  const { user } = useAuth();

  // Next router hook
  const router = useRouter();
  return (
    <Box sx={{ display: "flex", gap: "25px" }}>
      <TextField
        name="country"
        defaultValue="+88"
        variant="standard"
        select
        disabled={router.pathname.startsWith("/profile")}
      >
        {countries
          .filter((country) => country.name === "Bangladesh")
          .map((country) => (
            <MenuItem key={country.code} value={country.dial_code}>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Box>{country.flag}</Box>
                <Box>{country.dial_code}</Box>
              </Box>
            </MenuItem>
          ))}
      </TextField>
      <Input
        sx={{ flexGrow: 1 }}
        inputProps={{
          minLength: 11,
          maxLength: 11,
          pattern: "[0]{1}[1]{1}[3-9]{1}[0-9]{8}",
          autoFocus: true,
        }}
        placeholder="01xxxxxxxxx"
        type="tel"
        name="number"
        required
        defaultValue={user?.phoneNumber?.toString()?.slice(3) || ""}
        readOnly={router.pathname.startsWith("/profile")}
        disabled={router.pathname.startsWith("/profile")}
      />
    </Box>
  );
};

export default PhoneNumberInput;
