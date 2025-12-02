import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination,
  Skeleton,
  Chip,
  Button,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useProductStore } from "@/stores/productStore";

// CATEGORY HELPERS
const getCategoryLabel = (cat) => {
  if (!cat) return "UNKNOWN";
  if (typeof cat === "string") return cat.toUpperCase();
  return cat.slug || cat.category || cat.name || "UNKNOWN";
};

const getCategoryValue = (cat) => {
  if (!cat) return "";
  if (typeof cat === "string") return cat;
  return cat.slug || cat.category || cat.name || "";
};

export default function ProductsPage() {
  const router = useRouter();

  const {
    products,
    total,
    categories,
    loading,
    fetchProducts,
    fetchCategories,
  } = useProductStore();

  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(limit, (page - 1) * limit, search, category);
  }, [page, limit, search, category]);

  return (
    <Layout>
      <Box p={{ xs: 2, sm: 3, md: 4 }}>

        {/* BACK BUTTON */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{
            mb: 2,
            textTransform: "none",
            fontSize: { xs: "14px", sm: "15px" },
          }}
        >
          Back
        </Button>

        {/* HEADER */}
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={1}
          sx={{ fontSize: { xs: "24px", sm: "30px", md: "34px" } }}
        >
          Product Catalogue
        </Typography>

        <Typography
          variant="body1"
          color="gray"
          mb={3}
          sx={{ fontSize: { xs: "14px", sm: "16px" } }}
        >
          Browse all products with filters, search, and pagination.
        </Typography>

        {/* SEARCH + CATEGORY FILTER */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 4,
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {/* SEARCH */}
          <TextField
            label="Search Product"
            fullWidth
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            sx={{ minWidth: "240px" }}
          />

          {/* CATEGORY FILTER */}
          <FormControl sx={{ minWidth: "200px" }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="all">All</MenuItem>

              {categories.map((cat, i) => (
                <MenuItem key={i} value={getCategoryValue(cat)}>
                  {getCategoryLabel(cat)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* LOADING SKELETON */}
        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 9 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{ borderRadius: 3 }}>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton width="80%" height={30} />
                    <Skeleton width="40%" />
                    <Skeleton width="60%" />
                    <Skeleton width="30%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          /* PRODUCT GRID */
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "0.2s ease",
                      "&:hover": { transform: "translateY(-6px)", boxShadow: 4 },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.thumbnail}
                      alt={product.title}
                      sx={{ objectFit: "cover" }}
                    />

                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        mb={1}
                        sx={{ fontSize: { xs: "15px", sm: "17px" } }}
                      >
                        {product.title}
                      </Typography>

                      <Typography
                        color="green"
                        fontWeight="bold"
                        sx={{ fontSize: { xs: "14px", sm: "16px" } }}
                      >
                        ₹ {product.price}
                      </Typography>

                      <Typography
                        variant="body2"
                        mt={0.5}
                        sx={{ fontSize: { xs: "13px", sm: "14px" } }}
                      >
                        Rating: ⭐ {product.rating}
                      </Typography>

                      <Chip
                        label={product.category}
                        size="small"
                        sx={{ mt: 1, textTransform: "uppercase" }}
                      />
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}

        {/* PAGINATION */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(total / limit)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: { xs: "12px", sm: "14px" },
                width: { xs: "30px", sm: "36px" },
                height: { xs: "30px", sm: "36px" },
              },
            }}
          />
        </Box>
      </Box>
    </Layout>
  );
}
