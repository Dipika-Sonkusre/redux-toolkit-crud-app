import { Outlet } from "react-router";

import { Container } from "@mui/material";
import classes from "../styles/Layout.module.css";

export default function Layout() {
  return (
    <Container maxWidth="md" className={classes.container}>
      <Outlet />
    </Container>
  );
}
