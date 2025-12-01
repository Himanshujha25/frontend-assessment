import { useEffect, useState } from "react";
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
} from "@mui/material";
import Link from "next/link";
import { useProductStore } from "@/stores/productStore";

// 🔥 SAFE HELPERS (prevent undefined errors)
const getCategoryLabel = (cat) => {
  if (!cat) return "UNKNOWN";

  if (typeof cat === "string") return cat.toUpperCase();

  if (typeof cat === "object") {
    if (cat.name) return String(cat.name).toUpperCase();
    if (cat.category) return String(cat.category).toUpperCase();
    if (cat.slug) return String(cat.slug).toUpperCase();
  }

  return "UNKNOWN";
};

const getCategoryValue = (cat) => {
  if (!cat) return "";

  if (typeof cat === "string") return cat;
  if (cat.slug) return cat.slug;
  if (cat.category) return cat.category;
  if (cat.name) return cat.name;

  return "";
};

export default function ProductsPage() {
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
      <Box p={4}>
        {/* Page Header */}
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Product Catalogue
        </Typography>
        <Typography variant="body1" color="gray" mb={3}>
          Browse all products with category filters, search, and pagination.
        </Typography>

        {/* Search + Category Filter */}
        <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
          <TextField
            label="Search Product"
            fullWidth
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <FormControl sx={{ width: 240 }}>
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

              {/* SAFE CATEGORY MAPPING */}
              {categories.map((cat, i) => (
                <MenuItem key={i} value={getCategoryValue(cat)}>
                  {getCategoryLabel(cat)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Skeleton Loader */}
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
          // Products Grid
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Link
                  href={`/products/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "0.2s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: 4,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.thumbnail}
                      alt={product.title}
                    />

                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" mb={1}>
                        {product.title}
                      </Typography>

                      <Typography color="green" fontWeight="bold">
                        ₹ {product.price}
                      </Typography>

                      <Typography variant="body2" mt={0.5}>
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

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(total / limit)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Box>
    </Layout>
  );
}
