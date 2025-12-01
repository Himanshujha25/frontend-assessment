import Link from "next/link";
import { Box, Button, Typography, Grid, Paper } from "@mui/material";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1300,
        mx: "auto",
      }}
    >
      {/* HERO SECTION */}
      <Box
        sx={{
          textAlign: "center",
          py: { xs: 6, md: 10 },
          px: 3,
          borderRadius: 5,
          background: "linear-gradient(135deg, #0d47a1, #1976d2, #42a5f5)",
          backgroundSize: "200% 200%",
          animation: "gradientMove 6s ease infinite",
          color: "white",
          mb: 10,
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          mb={2}
          sx={{ textShadow: "0px 3px 10px rgba(0,0,0,0.4)" }}
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
            fontSize: "18px",
          }}
        >
          A modern dashboard built using Next.js, MUI, Zustand,
          NextAuth, and DummyJSON API. Includes authentication,
          protected routes, user & product modules, and a fully
          responsive system.
        </Typography>

        {/* BUTTONS */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>

          {/* Always show Login */}
          <Link href="/login">
            <Button
              variant="contained"
              color="secondary"
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

          {/* Show Dashboard only when logged in */}
          {session && (
            <Link href="/dashboard">
              <Button
                variant="contained"
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

          {/* Logout Button */}
          {session && (
            <Button
              variant="outlined"
              sx={{
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
      <Box sx={{ maxWidth: 900, mx: "auto", mb: 8 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          textAlign="center"
          sx={{
            color: "#0d47a1",
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
            fontSize: "17px",
          }}
        >
          This project implements a complete frontend architecture:
          authentication, protected dashboards, API integration, global
          state using Zustand, product & user modules, and a clean scalable
          structure. It showcases real-world development standards.
        </Typography>
      </Box>

      {/* FEATURES SECTION */}
      <Grid container spacing={4} sx={{ mb: 12 }}>
        {[
          {
            title: "Authentication",
            desc: "NextAuth + DummyJSON credential login with protected routes.",
            color: "#0d47a1",
          },
          {
            title: "Users Module",
            desc: "Paginated users list with instant search & detailed pages.",
            color: "#6a1b9a",
          },
          {
            title: "Products Module",
            desc: "Category filters, product search, pagination & details.",
            color: "#ad1457",
          },
          {
            title: "Zustand Store",
            desc: "Global state, API caching, loading states, and efficiency.",
            color: "#2e7d32",
          },
          {
            title: "Material UI",
            desc: "Fully responsive UI with cards, grids, tables & animations.",
            color: "#00838f",
          },
          {
            title: "Performance Optimized",
            desc: "Debounced search, memoized lists & minimal re-renders.",
            color: "#ef6c00",
          },
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                p: 4,
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
                sx={{ color: card.color }}
              >
                {card.title}
              </Typography>
              <Typography sx={{ color: "gray", lineHeight: 1.7 }}>
                {card.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* FOOTER */}
      <Box textAlign="center" py={3} sx={{ opacity: 0.7 }}>
        <Typography variant="body2" color="gray">
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
