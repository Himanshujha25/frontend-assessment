import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import { useAuthStore } from "@/stores/authStore";

export default function LoginPage() {
  const router = useRouter();
  const loginToStore = useAuthStore((state) => state.login);

  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result.error) {
      setError("Invalid username or password");
      return;
    }

    const session = await fetch("/api/auth/session").then((r) => r.json());
    loginToStore(session.accessToken, session.user);
    localStorage.setItem("token", session.accessToken);

    router.push("/dashboard");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        padding: 2,
      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: 380,
          borderRadius: 3,
          boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
        }}
      >
        <Typography variant="h5" textAlign="center" mb={2} fontWeight="bold">
          Admin Login
        </Typography>

        {/* 🔥 RED WARNING MESSAGE */}
        <Typography
          sx={{
            color: "red",
            fontSize: "14px",
            mb: 2,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Credentials are already filled.  
          DO NOT change them — otherwise login will fail.
        </Typography>

        {/* Manual instruction */}
        <Typography
          sx={{
            color: "#c62828",
            fontSize: "13px",
            mb: 2,
            textAlign: "center",
          }}
        >
          If needed, you may manually type:
          <br />
          <b>Username:</b> emilys
          <br />
          <b>Password:</b> emilyspass
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography sx={{ color: "red", mt: 1, mb: 1, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              mt: 2,
              py: 1.2,
              fontWeight: "bold",
              borderRadius: 2,
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
