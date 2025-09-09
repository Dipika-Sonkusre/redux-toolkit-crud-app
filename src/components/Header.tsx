import { Button } from "@mui/material";
import classes from "../styles/Header.module.css";
import { useNavigate } from "react-router";
import { ApiEndpoint } from "../enum";

export default function Header() {
  const navigate = useNavigate();

  const redirectToAdd = () => {
    navigate(ApiEndpoint.ADD_USER);
  };

  return (
    <div className={classes["header-container"]}>
      <h1>Redux Toolkit CRUD App</h1>
      <Button variant="contained" onClick={redirectToAdd}>
        Add user
      </Button>
    </div>
  );
}
