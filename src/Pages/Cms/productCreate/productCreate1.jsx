import React from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: Yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  profile_pic: Yup.mixed().required("Profile picture is required")
})


const ProductForm = ({ onProductCreated }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    // formData.append('image', data.image[0]);
    formData.append("profile_pic", data.profile_pic[0]);

    try {
      const response = await fetch('https://wtsacademy.dedicateddevelopers.us/api/product/create', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Product created successfully!');
        if (onProductCreated) onProductCreated();
      } else {
        alert('Failed to create product.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the product.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Product
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <input

          type="file"

          accept="image/*"

          {...register("image")}

        />

        {errors.profile_pic && <p style={{ color: "red" }}>{errors.profile_pic.message}</p>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ProductForm;