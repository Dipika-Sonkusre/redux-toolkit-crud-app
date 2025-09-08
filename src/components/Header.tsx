import { Button } from "@mui/material";
import classes from "../styles/Header.module.css";

export default function Header() {
  return (
    <div className={classes["header-container"]}>
      <Button variant="contained">Contained</Button>
    </div>
  );
}
