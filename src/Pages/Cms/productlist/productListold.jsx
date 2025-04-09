import React, { useEffect, useState } from 'react'
import { endPoints } from '../../../api/endPoints/endPoints';
import axiosInstance from '../../../api/axios/axios';

export default function ProductList() {
    const [data, setData] = useState([])

    console.log(data, "data")

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


    useEffect(() => {
        onSubmit()
    }, [])
    return (
        <>

        </>
    )
}