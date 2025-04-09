import React, { useEffect, useState } from "react";
import { Stack, Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance, { product } from "../../../api/axios/axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useNavigate } from "react-router-dom";
import { endPoints } from "../../../api/endPoints/endpoints";

const ProductUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        image: yup.mixed().nullable(),
    });

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
        resolver: yupResolver(schema)
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setValue("image", file, { shouldValidate: true });
        }
    };

    const updateProduct = async (formData) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "https://wtsacademy.dedicateddevelopers.us/api/product/update",
                formData
            );

            if (response.status === 200) {
                toast.success(response.data.message || "Product updated successfully!");

            } else {
                toast.error(response.data.message || "Failed to update product!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred!");
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (formData) => {
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }
        formDataToSend.append("id", id);
        await updateProduct(formDataToSend);
    };

    const fetchProductDetails = async () => {
        try {
            const response = await axiosInstance.get(`${endPoints.cms.detail}/${id}`);
            setData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) fetchProductDetails();
    }, [id]);

    useEffect(() => {
        if (data) {
            setValue("title", data.title);
            setValue("description", data.description);
        }
    }, [data]);

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh", background: "#f4f6f8", padding: 20 }}>
            <Paper style={{ width: "100%", maxWidth: 500, padding: 20 }}>
                <Typography variant="h5" align="center" gutterBottom style={{ marginBottom: 20 }}>
                    Update Product
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
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

                    {watch("image") ? (
                        <img
                            style={{ height: "200px", width: "400px", margin: "15px auto 0", borderRadius: "10px" }}
                            src={URL.createObjectURL(watch("image"))}
                            alt="Preview"
                        />
                    ) : data?.image ? (
                        <img
                            style={{ height: "200px", width: "400px", margin: "15px auto 0", borderRadius: "10px" }}
                            src={product(data.image)}
                            alt="Existing"
                        />
                    ) : (
                        <p>Drag or drop content here</p>
                    )}

                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
                        {loading ? "Loading..." : "Update Product"}
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};

export default ProductUpdate;
