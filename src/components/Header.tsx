import CustomButton from "../commonComponents/CustomButton";

import { useNavigate } from "react-router";
import { ApiEndpoint } from "../enum";
import classes from "../styles/Header.module.css";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Header() {
  const navigate = useNavigate();

  const redirectToAdd = () => {
    navigate(ApiEndpoint.ADD_USER);
  };

  return (
    <div className={classes["header-container"]}>
      <Box>
        <h1>Redux Toolkit</h1>
        <p>CRUD App</p>
      </Box>
      <CustomButton
        onClick={redirectToAdd}
        startIcon={<AddIcon />}
        className={classes["add-user-btn"]}
      >
        Add user
      </CustomButton>
    </div>
  );
}
