import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useProductStore } from "@/stores/productStore";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CardMedia,
  Chip,
  Divider,
  Rating,
} from "@mui/material";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const fetchSingleProduct = useProductStore((s) => s.fetchSingleProduct);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSingleProduct(id).then((data) => setProduct(data));
    }
  }, [id]);

  if (!product)
    return (
      <Typography
        variant="h5"
        sx={{ textAlign: "center", mt: 5, fontWeight: "bold" }}
      >
        Loading Product Details...
      </Typography>
    );

  return (
    <Box p={4}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        {/* PRODUCT TITLE */}
        <Typography variant="h4" fontWeight="bold" mb={1}>
          {product.title}
        </Typography>

        {/* CATEGORY */}
        <Chip label={product.category} color="primary" sx={{ mb: 3 }} />

        <Grid container spacing={4}>
          {/* LEFT SIDE – IMAGE */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={product.thumbnail}
              alt={product.title}
              sx={{
                borderRadius: 3,
                height: 350,
                objectFit: "cover",
                boxShadow: 3,
              }}
            />

            {/* Small Image Gallery */}
            <Grid container spacing={2} mt={2}>
              {product.images?.map((img, index) => (
                <Grid item key={index} xs={3}>
                  <CardMedia
                    component="img"
                    image={img}
                    onClick={() => {
                      const newProduct = { ...product };
                      newProduct.thumbnail = img;
                      setProduct(newProduct);
                    }}
                    sx={{
                      height: 70,
                      borderRadius: 2,
                      cursor: "pointer",
                      border:
                        img === product.thumbnail
                          ? "2px solid #1976d2"
                          : "2px solid transparent",
                      transition: "0.2s",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* RIGHT SIDE – DETAILS */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold" color="green" mb={1}>
              ₹{product.price}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Rating
                value={product.rating}
                precision={0.1}
                readOnly
                size="medium"
              />
              <Typography>({product.rating})</Typography>
            </Box>

            <Typography variant="body1" mb={3}>
              {product.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* SPECIFICATIONS */}
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Specifications
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography color="gray">Brand:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{product.brand || "N/A"}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="gray">Stock:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{product.stock}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="gray">Warranty:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {product.warrantyInformation || "No warranty available"}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="gray">Shipping:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {product.shippingInformation || "Standard Delivery"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
