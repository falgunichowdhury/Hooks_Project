import React, { useEffect, useState } from 'react'
import { endPoints } from '../../../api/endPoints/endpoints';
import axiosInstance, { product } from '../../../api/axios/axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Avatar, Button, CardActions, CardHeader, Collapse, IconButton } from '@mui/material';

import { toast } from 'react-toastify';
import SweetAlertComponent from '../../../components/sweetAlert/sweetAlert';
import { Link } from 'react-router-dom';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

export default function ProductList() {
    const [data, setData] = useState([])
    const [expanded, setExpanded] = React.useState(false)
    const [id, setId] = useState()
    const [open, setOpen] = useState(false)

    console.log(open, "open")

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: (theme.vars ?? theme).palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));



    const onSubmit = async () => {
        console.log("data2")
        try {
            console.log("data1")
            const response = await axiosInstance.post(endPoints.cms.list);
            setData(response.data.data)
        } catch (error) {
            console.log(error);
            console.log("data1")
        }
    };


    const handleDelete = async () => {
        const formData = new FormData()

        formData.append("id", id)


        try {
            const response = await axiosInstance.post(endPoints.cms.delete, formData)
            console.log(response, "response")
            if (response.status === 200) {
                toast(response.data.message)
                setOpen(false)

            } else {
                toast(response.data.message)
                setOpen(false)
            }

            onSubmit()
            return response.data
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        onSubmit()
    }, [])
    return (
        <>
            <Box sx={{ flexGrow: 1, marginLeft: "8%" }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {data?.length > 0 ? (
                        data.map((item, index) => (
                            <Grid key={index} item xs={2} sm={4} md={4}>
                                <Item>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardHeader
                                            avatar={<Avatar aria-label="recipe">R</Avatar>}
                                            action={<IconButton aria-label="settings"></IconButton>}
                                            title="Shrimp and Chorizo Paella"
                                            subheader="September 14, 2016"
                                        />
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={product(item.image)}
                                            alt="Paella dish"
                                        />
                                        <CardContent>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                This impressive paella is a perfect party dish and a fun meal to cook
                                                together with your guests. Add 1 cup of frozen peas along with the mussels,
                                                if you like.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Button onClick={() => { setOpen(true); setId(item._id); }}>Delete</Button>
                                    <Link to={`/cms/update/${item._id}`}>Edit</Link>
                                </Item>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6" sx={{ color: 'gray', textAlign: 'center', width: '100%', mt: 2 }}>
                            No Data Found
                        </Typography>
                    )}
                </Grid>
            </Box>

            {open && (
                <SweetAlertComponent
                    confirm={handleDelete}
                    cancle={() => setOpen(false)}
                    title="Are you sure?"
                    subtitle="You will not be able to recover this product!"
                    type="warning"
                />
            )}
        </>
    );
}
