import * as React from "react";
import Container from "@mui/material/Container";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

export default function GuestFooter() {
    return (
        <Paper sx={{ marginTop: 'calc(10% + 60px)', bottom: 0 }} component="footer" square variant="outlined">
            <Container maxWidth="lg">
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        my: 1
                    }}
                >
                    <Link to="/">
                        {/* <Image priority src="/Logo.svg" width={75} height={30} alt="Logo" /> */}
                    </Link>
                </Box>

                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        mb: 2,
                    }}
                >
                    <Typography variant="caption" color="initial">
                        Copyright ©2022. [] Limited
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
}