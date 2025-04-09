import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { Container, Box, Typography, TextField, Button } from "@mui/material";
import axiosInstance from "../../../api/axios/axios";
import { endPoints } from "../../../api/endPoints/endpoints";
import { useTokenStore } from "../../../store/authStore";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const setTok = useTokenStore((state) => state.setToken)
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await axiosInstance.post(endPoints.auth.signin, formData);
      console.log(response, "response");

      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/cms/list"); // Corrected navigation
        setTok(response.data.token)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors?.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Log In"}
          </Button>
        </form>

        <Link to="/auth/register">Go for registration</Link>
      </Box>
    </Container>
  );
};

export default LoginForm;