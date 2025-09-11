import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { Box, Container, Divider, TextField, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch } from "../store/hooks";
import { addUser } from "../redux/action/userAction";

import { ApiEndpoint } from "../enum";
import { schema } from "../utils/userValidation";
import type { UserFormData } from "../lib/type";

import CustomButton from "../commonComponents/CustomButton";
import GlobalLoader from "../commonComponents/GlobalLoader";
import classes from "../styles/Dialog.module.css";

export default function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", age: 18, address: "", phone: "" },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: UserFormData) => {
    setIsSubmitting(true);
    const newUser = {
      ...data,
      phone: data.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      id: Math.random().toString(36).substr(2, 9),
    };
    dispatch(addUser(newUser));
    setIsSubmitting(false);
    navigate(ApiEndpoint.HOME);
  };

  const autoFormatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    return (e.target.value = e.target.value
      .replace(/[^0-9]/g, "")
      .slice(0, 10));
  };

  return (
    <>
      <GlobalLoader loading={isSubmitting} />

      <Container maxWidth="sm" className={classes["add-user-container"]}>
        <Box className={classes["title"]}>
          <h2>Add User</h2>
        </Box>
        <Divider />

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

          <TextField
            id="age"
            label="Age"
            variant="filled"
            {...register("age")}
            fullWidth
            type="number"
          />
          {errors.age && (
            <Box className="error-container">
              <ErrorIcon sx={{ color: "red", fontSize: "20px" }} />
              <Typography variant="body1" className="error">
                {errors?.age?.message}
              </Typography>
            </Box>
          )}

          <TextField
            id="address"
            label="Address"
            variant="filled"
            {...register("address")}
            fullWidth
            multiline
          />
          {errors.address && (
            <Box className="error-container">
              <ErrorIcon sx={{ color: "red", fontSize: "20px" }} />
              <Typography variant="body1" className="error">
                {errors?.address?.message}
              </Typography>
            </Box>
          )}

          <TextField
            id="phone"
            label="Phone"
            variant="filled"
            {...register("phone")}
            fullWidth
            type="tel"
            onInput={autoFormatPhone}
          />
          {errors.phone && (
            <Box className="error-container">
              <ErrorIcon sx={{ color: "red", fontSize: "20px" }} />
              <Typography variant="body1" className="error">
                {errors?.phone?.message}
              </Typography>
            </Box>
          )}

          <Box className={classes["action-btn-container"]}>
            <CustomButton
              onClick={() => navigate(ApiEndpoint.HOME)}
              className={classes["cancel-btn"]}
            >
              Cancel
            </CustomButton>
            <CustomButton type="submit" className={classes["save-btn"]}>
              Add User
            </CustomButton>
          </Box>
        </form>
      </Container>
    </>
  );
}
