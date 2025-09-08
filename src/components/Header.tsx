import { Button } from "@mui/material";
import classes from "../styles/Header.module.css";

export default function Header() {
  return (
    <div className={classes["header-container"]}>
      <h1>Redux Toolkit CRUD App</h1>
      <Button variant="contained">Add user</Button>
    </div>
  );
}
