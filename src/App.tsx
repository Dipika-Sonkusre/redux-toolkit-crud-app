import { Outlet } from "react-router";
import { Container } from "@mui/material";
import "./App.css";

function App() {
  return (
    <Container maxWidth="md" className="container">
      <Outlet />
    </Container>
  );
}

export default App;
