import Link from "next/link";
import { Box, Button, Typography, Grid, Paper } from "@mui/material";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        maxWidth: 1300,
        mx: "auto",
      }}
    >
      {/* HERO SECTION */}
      <Box
        sx={{
          textAlign: "center",
          py: { xs: 5, sm: 7, md: 10 },
          px: { xs: 2, sm: 4 },
          borderRadius: 5,
          background: "linear-gradient(135deg, #0d47a1, #1976d2, #42a5f5)",
          backgroundSize: "200% 200%",
          animation: "gradientMove 6s ease infinite",
          color: "white",
          mb: { xs: 6, md: 10 },
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          mb={2}
          sx={{
            textShadow: "0px 3px 10px rgba(0,0,0,0.4)",
            fontSize: { xs: "28px", sm: "32px", md: "38px" },
          }}
        >
          Frontend Technical Assessment
        </Typography>

        <Typography
          variant="h6"
          sx={{
            opacity: 0.95,
            maxWidth: "750px",
            mx: "auto",
            lineHeight: 1.6,
            mb: 4,
            fontSize: { xs: "15px", sm: "17px", md: "18px" },
          }}
        >
          A modern dashboard using Next.js, MUI, Zustand, NextAuth, and DummyJSON API.
          Includes authentication, protected routes, and a fully responsive UI.
        </Typography>

        {/* BUTTONS */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            gap: 2,
            width: "100%",
          }}
        >
          {/* Always show Login */}
          <Link href="/login" style={{ width: "100%", maxWidth: "240px" }}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                fontWeight: "bold",
                px: 4,
                py: 1.2,
                borderRadius: 3,
                fontSize: "16px",
                boxShadow: "0px 4px 14px rgba(0,0,0,0.2)",
              }}
            >
              Login
            </Button>
          </Link>

          {/* Dashboard (only when logged in) */}
          {session && (
            <Link href="/dashboard" style={{ width: "100%", maxWidth: "240px" }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: "white",
                  color: "#0d47a1",
                  fontWeight: "bold",
                  px: 4,
                  py: 1.2,
                  borderRadius: 3,
                  fontSize: "16px",
                  boxShadow: "0px 4px 14px rgba(0,0,0,0.2)",
                }}
              >
                Go to Dashboard
              </Button>
            </Link>
          )}

          {/* Logout */}
          {session && (
            <Button
              variant="outlined"
              fullWidth
              sx={{
                maxWidth: "240px",
                px: 4,
                py: 1.2,
                borderRadius: 3,
                fontSize: "16px",
                color: "white",
                borderColor: "white",
                "&:hover": {
                  background: "rgba(255,255,255,0.2)",
                },
              }}
              onClick={() => signOut()}
            >
              Logout
            </Button>
          )}
        </Box>
      </Box>

      {/* ABOUT SECTION */}
      <Box sx={{ maxWidth: 900, mx: "auto", mb: { xs: 6, md: 8 }, px: { xs: 2, sm: 0 } }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          textAlign="center"
          sx={{
            color: "#0d47a1",
            fontSize: { xs: "26px", sm: "30px" },
            textShadow: "0px 1px 4px rgba(0,0,0,0.15)",
          }}
        >
          About This Project
        </Typography>

        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.9,
            color: "gray",
            textAlign: "center",
            fontSize: { xs: "15px", sm: "17px" },
            px: { xs: 1, sm: 0 },
          }}
        >
          This project implements authentication, protected dashboards, API integration,
          Zustand global store, and scalable folder structure following real-world standards.
        </Typography>
      </Box>

      {/* FEATURES SECTION */}
      <Grid container spacing={4} sx={{ mb: { xs: 10, md: 12 } }}>
        {[
          {
            title: "Authentication",
            desc: "NextAuth + DummyJSON login with protected routes.",
            color: "#0d47a1",
          },
          {
            title: "Users Module",
            desc: "Paginated list with instant search.",
            color: "#6a1b9a",
          },
          {
            title: "Products Module",
            desc: "Category filters, product search & details.",
            color: "#ad1457",
          },
          {
            title: "Zustand Store",
            desc: "API caching, loaders & global state.",
            color: "#2e7d32",
          },
          {
            title: "Material UI",
            desc: "Fully responsive UI with animations.",
            color: "#00838f",
          },
          {
            title: "Performance Optimized",
            desc: "Debounced search, memoized lists.",
            color: "#ef6c00",
          },
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 4,
                height: "100%",
                textAlign: "center",
                boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
                borderTop: `6px solid ${card.color}`,
                transition: "0.3s",
                background: "white",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0px 18px 32px rgba(0,0,0,0.20)",
                },
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={2}
                sx={{ color: card.color, fontSize: { xs: "20px", sm: "22px" } }}
              >
                {card.title}
              </Typography>
              <Typography sx={{ color: "gray", lineHeight: 1.7, fontSize: { xs: "14px", sm: "15px" } }}>
                {card.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* FOOTER */}
      <Box textAlign="center" py={3} sx={{ opacity: 0.7 }}>
        <Typography variant="body2" sx={{ fontSize: { xs: "13px", sm: "14px" }, color: "gray" }}>
          © {new Date().getFullYear()} Frontend Assessment Project • Built by Himanshu
        </Typography>
      </Box>

      {/* GRADIENT ANIMATION */}
      <style>
        {`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        `}
      </style>
    </Box>
  );
}
