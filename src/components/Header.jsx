import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
// import { Tag } from "lucide-react";

const Header = () => {
    return (
        <AppBar position="static" elevation={4} sx={{ background: "#1976d2" }}>
            <Toolbar>
                {/* <Tag size={26} style={{ marginRight: 10 }} /> */}
                <Typography variant="h6" component="div" fontWeight={600}>
                    Meta Tag Generator
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;