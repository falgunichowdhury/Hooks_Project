import React, { useState } from "react";

import { TextField, Button, Container, Typography, Box } from "@mui/material";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate } from "react-router-dom";

import axiosInstance from "../../../api/axios/axios";
import { endPoints } from "../../../api/endPoints/endpoints";




const RegisterForm = () => {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const schema = yup.object().shape({

    first_name: yup.string().required("First name is required"),

    last_name: yup.string().required("Last name is required"),

    profile_pic: yup.mixed().required("Profile picture is required"),

    email: yup.string().email("Invalid email format").required("Email is required"),

    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),

  });



  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });



  const onSubmit = async (data) => {

    const formData = new FormData();

    formData.append("first_name", data.first_name);

    formData.append("last_name", data.last_name);

    formData.append("profile_pic", data.profile_pic[0]);

    formData.append("email", data.email);

    formData.append("password", data.password);

    setLoading(true);

    try {

      const response = await axiosInstance.post(endPoints.auth.signup, formData);

      console.log(response, "response");

      if (response.status === 200) {

        toast(response.data.message);

        navigate("/")

      } else {

        toast(response.data.message)

      }

      setLoading(false);

      return response.data;

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };



  return (

    <Container maxWidth="xs">

      <Box sx={{ mt: 8, textAlign: "center" }}>

        <Typography variant="h5">Register</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>

          <TextField

            fullWidth

            margin="normal"

            label="First Name"

            {...register("first_name")}

            error={!!errors.first_name}

            helperText={errors?.first_name?.message}

          />

          <TextField

            fullWidth

            margin="normal"

            label="Last Name"

            {...register("last_name")}

            error={!!errors.last_name}

            helperText={errors?.last_name?.message}

          />



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



          <input

            type="file"

            accept="image/*"

            {...register("profile_pic")}

          />

          {errors.profile_pic && <p style={{ color: "red" }}>{errors.profile_pic.message}</p>}

          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>

            {loading ? "Loading..." : "Register"}

          </Button>

        </form>

      </Box>

    </Container>

  );

};



export default RegisterForm;