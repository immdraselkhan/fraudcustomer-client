import Head from "next/head";
import useTitle from "@/src/hooks/useTitle";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Pagination from "@/src/components/client/Pagination";
import PostCard from "@/src/components/client/PostCard";
import Image from "next/image";
import AddDialog from "@/src/components/client/AddDialog";

export default function Home() {
  // Global site title
  const title = useTitle();
  return (
    <>
      <Head>
        <title>{`Home | ${title}`}</title>
      </Head>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "2em",
          }}
        >
          <AddDialog />
          <Box sx={{ display: "flex" }}>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                maxHeight: "36px",
                maxWidth: "250px",
              }}
              onSubmit={(event: HTMLEvent) => {
                event.preventDefault();
                alert(
                  `Do you want to search for ${event.target.number.value}?`
                );
              }}
              component="form"
            >
              <OutlinedInput
                inputProps={{
                  minLength: 11,
                  maxLength: 11,
                  pattern: "[0]{1}[1]{1}[3-9]{1}[0-9]{8}",
                }}
                startAdornment={
                  <InputAdornment position="start">+88</InputAdornment>
                }
                placeholder="01xxxxxxxxx"
                type="tel"
                name="number"
                required
              />
              <Button type="submit" variant="contained">
                Search
              </Button>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "25px", marginTop: "50px" }}>
          <Box
            component="aside"
            sx={{ width: "125px", display: { xs: "none", md: "block" } }}
          >
            About Us
            <br />
            <br />
            Cnstact Us
            <br />
            <br />
            Privacy Policy
            <br />
            <br />
            Publish Ads
          </Box>
          <Box
            sx={{
              maxWidth: "678px",
              margin: "0 auto",
              flexGrow: 1,
            }}
          >
            <Box>
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
            </Box>
            <Box sx={{ marginTop: "25px" }}>
              <Pagination />
            </Box>
          </Box>
          <Box
            component="aside"
            sx={{ width: "300px", display: { xs: "none", md: "block" } }}
          >
            <Image
              src="/300x600-ad.png"
              width={300}
              height={600}
              alt="300x600 ad banner"
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}
