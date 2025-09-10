import Header from "./Header";
import Users from "./Users";

import { Container } from "@mui/material";

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
