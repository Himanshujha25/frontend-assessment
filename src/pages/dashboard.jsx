import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <Box
        sx={{
          padding: 4,
          maxWidth: 1400,
          margin: "0 auto",
          minHeight: "100vh",
          background: "#f5f7fa",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.04) 0%, transparent 50%)",
        }}
      >
        {/* HEADER + LOGOUT */}
        <Box
          sx={{
            mb: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={1}
              sx={{ color: "#0d47a1" }}
            >
              Welcome, Admin
            </Typography>
            <Typography variant="body1" color="gray">
              Manage application data from a clean, modern, and professional dashboard.
            </Typography>
          </Box>

          {/* LOGOUT BUTTON */}
          <Button
            variant="contained"
            color="error"
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: 2,
              fontWeight: "bold",
              textTransform: "none",
            }}
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </Box>

        {/* ANALYTICS SECTION */}
        <Grid container spacing={4} mb={6}>
          {[
            {
              label: "Total Users",
              value: "100+",
              gradient: "linear-gradient(135deg, #1976d2, #42a5f5)",
              shadow: "rgba(25,118,210,0.35)",
            },
            {
              label: "Products Available",
              value: "200+",
              gradient: "linear-gradient(135deg, #d81b60, #f06292)",
              shadow: "rgba(216,27,96,0.35)",
            },
            {
              label: "API Status",
              value: "● Online",
              gradient: "linear-gradient(135deg, #2e7d32, #81c784)",
              shadow: "rgba(46,125,50,0.35)",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                sx={{
                  borderRadius: 4,
                  p: 2,
                  color: "white",
                  background: item.gradient,
                  boxShadow: `0px 12px 25px ${item.shadow}`,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: `0px 18px 30px ${item.shadow}`,
                  },
                }}
              >
                <CardContent>
                  <Typography fontSize="15px" sx={{ opacity: 0.9 }}>
                    {item.label}
                  </Typography>
                  <Typography fontSize="34px" fontWeight="bold" mt={1}>
                    {item.value}
                  </Typography>
                  <Typography fontSize="13px" sx={{ opacity: 0.85, mt: 1 }}>
                    Live API Data
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* MAIN SECTIONS */}
        <Grid container spacing={4}>
          {/* USERS */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 4,
                p: 3,
                backdropFilter: "blur(12px)",
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.08)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0px 15px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold" sx={{ color: "#1976d2" }}>
                  Manage Users
                </Typography>
                <Typography mt={1} color="gray">
                  Search, filter and explore all users from the DummyJSON API.
                </Typography>
              </CardContent>

              <CardActions>
                <Link href="/users" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      background: "#1976d2",
                      "&:hover": { background: "#0d47a1" },
                    }}
                  >
                    Go to Users
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>

          {/* PRODUCTS */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 4,
                p: 3,
                backdropFilter: "blur(12px)",
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.08)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0px 15px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold" sx={{ color: "#d81b60" }}>
                  Manage Products
                </Typography>
                <Typography mt={1} color="gray">
                  Browse products, filter by categories, and view detailed product info.
                </Typography>
              </CardContent>

              <CardActions>
                <Link href="/products" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      background: "#d81b60",
                      "&:hover": { background: "#ad1457" },
                    }}
                  >
                    Go to Products
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ProtectedRoute>
  );
}
