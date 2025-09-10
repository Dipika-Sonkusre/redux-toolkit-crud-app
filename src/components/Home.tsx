import { Container } from "@mui/material";
import Header from "./Header";
import Users from "./Users";

export default function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" className="home-container">
        <Users />
      </Container>
    </>
  );
}
