import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    Paper,
    Tabs,
    Tab,
    IconButton,
    Snackbar,
    Divider,
} from "@mui/material";
import Header from "../components/Header"; // Adjust path as needed
import Footer from "../components/Footer";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

const isValidUrl = (url) => /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\/.*)?$/.test(url);

const fetchMetaTags = async (url) => {
    const encoded = encodeURIComponent(url);
    const res = await axios.get(`https://api.allorigins.win/raw?url=${encoded}`);
    const html = res.data;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const getMeta = (selector) => doc.querySelector(selector)?.content || "";
    return {
        title: getMeta("meta[property='og:title']") || doc.querySelector("title")?.innerText || "",
        description: getMeta("meta[property='og:description']") || getMeta("meta[name='description']") || "",
        keywords: getMeta("meta[name='keywords']") || "",
        image: getMeta("meta[property='og:image']") || "",
    };
};

const MetaScraper = () => {
    const [url, setUrl] = useState("");
    const [formData, setFormData] = useState({ title: "", description: "", keywords: "", image: null });
    const [tab, setTab] = useState(0);
    const [copied, setCopied] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const query = useQuery({
        queryKey: ["meta", url],
        queryFn: () => fetchMetaTags(url),
        enabled: false,
        onSuccess: (data) => {
            setFormData({ ...data, image: null });
            if (data.image) setPreviewImage(data.image);
        },
    });

    const handleCheck = () => {
        if (!isValidUrl(url)) return alert("Enter a valid URL");
        const normalizedUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
        setUrl(normalizedUrl);
        query.refetch();
    };

    const handleCopy = () => {
        const metaHtml = `<!-- Meta Tags -->
<meta name="title" content="${formData.title}" />
<meta name="description" content="${formData.description}" />
<meta name="keywords" content="${formData.keywords}" />
<meta property="og:title" content="${formData.title}" />
<meta property="og:description" content="${formData.description}" />
${previewImage ? `<meta property="og:image" content="${previewImage}" />` : ""}
<meta name="twitter:title" content="${formData.title}" />
<meta name="twitter:description" content="${formData.description}" />
${previewImage ? `<meta name="twitter:image" content="${previewImage}" />` : ""}`;
        navigator.clipboard.writeText(metaHtml);
        setCopied(true);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const PreviewCard = ({ platform }) => {
        const getPlatformIcon = () => {
            switch (platform.toLowerCase()) {
                case "facebook":
                    return <FacebookIcon color="primary" sx={{ mr: 1 }} />;
                case "twitter":
                    return <TwitterIcon sx={{ color: "#1DA1F2", mr: 1 }} />;
                case "instagram":
                    return <InstagramIcon sx={{ color: "#E1306C", mr: 1 }} />;
                case "discord":
                    return (
                        <Box
                            component="img"
                            src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f47e.svg"
                            alt="Discord"
                            sx={{ width: 24, height: 24, mr: 1 }}
                        />
                    );
                default:
                    return null;
            }
        };

        return (
            <Paper elevation={3} sx={{ p: 3, mb: 2, borderRadius: 3 }}>
                <Box display="flex" alignItems="center" mb={1}>
                    {getPlatformIcon()}
                    <Typography variant="h6" gutterBottom>{platform}</Typography>
                </Box>
                <Typography variant="subtitle1" fontWeight={600}>{formData.title}</Typography>
                <Typography variant="body2" color="text.secondary">{formData.description}</Typography>
                {previewImage && (
                    <img
                        src={previewImage}
                        alt="uploaded"
                        style={{ maxWidth: "100%", borderRadius: 8, marginTop: 10 }}
                    />
                )}
            </Paper>
        );
    };

    return (
        <Box maxWidth="md" mx="auto" px={2} py={4}>
            <Typography variant="h4" textAlign="center" fontWeight={700} gutterBottom>Meta Tag Scraper</Typography>

            <Paper elevation={4} sx={{ p: 3, borderRadius: 4, mb: 4 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={9}>
                        <TextField
                            fullWidth
                            label="Enter Website URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            error={url.length > 0 && !isValidUrl(url)}
                            helperText={!isValidUrl(url) && url.length > 0 ? "Invalid URL" : ""}
                            InputProps={{ sx: { borderRadius: 2 } }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button
                            variant="contained"
                            onClick={handleCheck}
                            disabled={!isValidUrl(url) || query.isFetching}
                            fullWidth
                            sx={{ height: "100%", borderRadius: 2 }}
                        >
                            {query.isFetching ? "Scraping..." : "Check Website"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {query.data && (
                <Paper elevation={4} sx={{ p: 3, borderRadius: 4 }}>
                    <Typography variant="h6" fontWeight={600}>Edit Meta Tags</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Title"
                                fullWidth
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Description"
                                fullWidth
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Keywords"
                                fullWidth
                                value={formData.keywords}
                                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined" component="label" sx={{ borderRadius: 2 }}>
                                Upload Image
                                <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                            </Button>
                            {previewImage && (
                                <Box mt={2}>
                                    <Typography variant="body2">Preview:</Typography>
                                    <img src={previewImage} alt="preview" height={60} style={{ borderRadius: 4 }} />
                                </Box>
                            )}
                        </Grid>
                    </Grid>

                    <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mt: 3 }}>
                        <Tab label="Preview" />
                        <Tab label="Meta HTML" />
                    </Tabs>

                    {tab === 0 && (
                        <Box mt={2}>
                            {["Facebook", "Twitter", "Discord", "Instagram"].map((platform) => (
                                <PreviewCard key={platform} platform={platform} />
                            ))}
                        </Box>
                    )}

                    {tab === 1 && (
                        <Box mt={2} position="relative">
                            <TextField
                                multiline
                                fullWidth
                                minRows={10}
                                value={`<!-- Meta Tags -->\n<meta name="title" content="${formData.title}" />\n<meta name="description" content="${formData.description}" />\n<meta name="keywords" content="${formData.keywords}" />\n<meta property="og:title" content="${formData.title}" />\n<meta property="og:description" content="${formData.description}" />\n${previewImage ? `<meta property="og:image" content="${previewImage}" />` : ""}\n<meta name="twitter:title" content="${formData.title}" />\n<meta name="twitter:description" content="${formData.description}" />\n${previewImage ? `<meta name="twitter:image" content="${previewImage}" />` : ""}`}
                            />
                            <IconButton
                                onClick={handleCopy}
                                sx={{ position: "absolute", top: 8, right: 8 }}
                            >
                                <ContentCopyIcon />
                            </IconButton>
                        </Box>
                    )}
                </Paper>
            )}

            <Snackbar
                open={copied}
                autoHideDuration={2000}
                onClose={() => setCopied(false)}
                message="Meta tags copied!"
            />
        </Box>
    );
};

export default function Home() {
   return (
  <QueryClientProvider client={queryClient}>
    <Header />
    <MetaScraper />
    <Footer />
  </QueryClientProvider>
);
}

