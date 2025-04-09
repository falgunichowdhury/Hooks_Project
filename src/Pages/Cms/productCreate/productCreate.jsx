import React, { useState } from "react";
import { Stack, Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/axios/axios";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { endPoints } from "../../../api/endPoints/endpoints";

const ProductCreate = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        image: yup.mixed().required("Image is required"),
    });

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
        resolver: yupResolver(schema)
    });

    const selectedImage = watch("image");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setValue("image", file, { shouldValidate: true }); // Manually set image field value
            setImagePreview(URL.createObjectURL(file)); // Update preview
        }
    };

    const ClickFunction = async (data) => {
        setLoading(true);
       
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("image", data.image);
       
        try {
            
            const response = await axiosInstance.post(endPoints.cms.product, formData);
            console.log("fgvbhjnk")
            if (response.status === 200) {
                toast.success(response.data.message || "Product created successfully!");

                setImagePreview(null); // Clear image preview
            } else {
                toast.error(response.data.message || "Failed to create product!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh", background: "#f4f6f8", padding: 20 }}>
            <Paper style={{ width: "100%", maxWidth: 500, padding: 20 }}>
                <Typography variant="h5" align="center" gutterBottom style={{ marginBottom: 20 }}>
                    Create Product
                </Typography>
                <form onSubmit={handleSubmit(ClickFunction)}>
                    <TextField
                        {...register("title")}
                        label="Title"
                        placeholder="Enter product title"
                        fullWidth
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        {...register("description")}
                        label="Description"
                        placeholder="Enter product description"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ marginBottom: "10px", display: "block" }}
                    />
                    {errors.image && <Typography color="error">{errors.image.message}</Typography>}

                    {imagePreview && (
                        <Stack direction="column" justifyContent="center" alignItems="center" style={{ marginBottom: "1rem", gap: "0.5rem" }}>
                            <img src={imagePreview} alt="Preview" height={100} width="auto" style={{ borderRadius: "10px" }} />
                        </Stack>
                    )}

                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
                        {loading ? "Loading..." : "Create Product"}
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};

export default ProductCreate;