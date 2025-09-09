import CustomButton from "../commonComponents/CustomButton";

import { useNavigate } from "react-router";
import { ApiEndpoint } from "../enum";
import classes from "../styles/Header.module.css";

export default function Header() {
  const navigate = useNavigate();

  const redirectToAdd = () => {
    navigate(ApiEndpoint.ADD_USER);
  };

  return (
    <div className={classes["header-container"]}>
      <h1>Redux Toolkit CRUD App</h1>
      <CustomButton onClick={redirectToAdd}>Add user</CustomButton>
    </div>
  );
}
