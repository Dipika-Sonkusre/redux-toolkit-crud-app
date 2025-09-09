import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch } from "../store/hooks";
import { addUser } from "../redux/action/userAction";

import { ApiEndpoint } from "../enum";
import { schema } from "../utils/userValidation";
import type { UserFormData } from "../lib/type";

import classes from "../styles/AddUser.module.css";

export default function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "" },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: UserFormData) => {
    const newUser = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };
    dispatch(addUser(newUser));
    navigate(ApiEndpoint.HOME);
  };

  return (
    <Container maxWidth="sm" className={classes["add-user-container"]}>
      <Box className={classes["title"]}>
        <h2>Add User</h2>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="name"
          label="Name"
          variant="filled"
          {...register("name")}
          fullWidth
        />
        {errors.name && (
          <Box className="error-container">
            <ErrorIcon sx={{ color: "red", fontSize: "20px" }} />
            <Typography variant="body1" className="error">
              {errors?.name?.message}
            </Typography>
          </Box>
        )}

        <TextField
          id="email"
          label="Email"
          variant="filled"
          {...register("email")}
          fullWidth
        />
        {errors.email && (
          <Box className="error-container">
            <ErrorIcon sx={{ color: "red", fontSize: "20px" }} />
            <Typography variant="body1" className="error">
              {errors?.email?.message}
            </Typography>
          </Box>
        )}

        <Box className={classes["action-btn-container"]}>
          <Button
            onClick={() => navigate(ApiEndpoint.HOME)}
            variant="contained"
            className={classes["cancel-btn"]}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            type="submit"
            variant="contained"
            className={classes["save-btn"]}
          >
            Add User
          </Button>
        </Box>
      </form>
    </Container>
  );
}
