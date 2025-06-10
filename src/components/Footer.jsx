import React from "react";
import { Box, Typography, Link, Stack } from "@mui/material";

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#f5f5f5",
                py: 3,
                px: 2,
                mt: 6,
                textAlign: "center",
                borderTop: "1px solid #ddd",
            }}
        >
            <Typography variant="body2" color="text.secondary">
                &copy; {new Date().getFullYear()} Meta Tag Generator. All rights reserved.
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={2} mt={1}>
                <Link href="#" underline="hover" variant="body2" color="inherit">
                    Privacy Policy
                </Link>
                <Link href="#" underline="hover" variant="body2" color="inherit">
                    Terms
                </Link>
                <Link href="#" underline="hover" variant="body2" color="inherit">
                    Contact
                </Link>
            </Stack>
        </Box>
    );
};

export default Footer;