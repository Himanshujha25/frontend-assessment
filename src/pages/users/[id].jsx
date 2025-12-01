import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useUserStore } from "@/stores/userStore";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  Button,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function UserDetails() {
  const router = useRouter();
  const { id } = router.query;

  const fetchSingleUser = useUserStore((state) => state.fetchSingleUser);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) fetchSingleUser(id).then((data) => setUser(data));
  }, [id]);

  if (!user)
    return (
      <Typography
        variant="h6"
        sx={{ textAlign: "center", mt: 4, fontWeight: "bold" }}
      >
        Loading user details...
      </Typography>
    );

  return (
    <Layout>
      <Box
        p={2}
        maxWidth="750px"
        mx="auto"
        sx={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            width: "100%",
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {/* BACK BUTTON */}
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{
              textTransform: "none",
              mb: 1,
              fontSize: "13px",
              padding: "2px 6px",
            }}
            onClick={() => router.back()}
          >
            Back
          </Button>

          {/* HEADER */}
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            mb={2}
            sx={{
              pb: 1,
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <Avatar
              src={user.image}
              alt={user.firstName}
              sx={{
                width: 65,
                height: 65,
                border: "2px solid #1976d2",
              }}
            />

            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "18px" }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" color="gray">
                {user.gender}, {user.age} yrs
              </Typography>
            </Box>
          </Box>

          {/* PERSONAL INFO */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ color: "#0d47a1", mb: 1, fontSize: "15px" }}
          >
            Personal Information
          </Typography>

          <Grid container spacing={1} mb={1}>
            <Grid item xs={6}>
              <Info label="Email" value={user.email} />
              <Info label="Phone" value={user.phone} />
              <Info label="Blood Group" value={user.bloodGroup} />
            </Grid>

            <Grid item xs={6}>
              <Info label="Height" value={`${user.height} cm`} />
              <Info label="Weight" value={`${user.weight} kg`} />
            </Grid>
          </Grid>

          <Divider sx={{ my: 1 }} />

          {/* ADDRESS */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ color: "#0d47a1", mb: 1, fontSize: "15px" }}
          >
            Address
          </Typography>

          <Grid container spacing={1} mb={2}>
            <Grid item xs={6}>
              <Info label="Address" value={user.address?.address} />
              <Info label="City" value={user.address?.city} />
            </Grid>

            <Grid item xs={6}>
              <Info label="State" value={user.address?.state} />
              <Info label="Postal" value={user.address?.postalCode} />
            </Grid>
          </Grid>

          <Divider sx={{ my: 1 }} />

          {/* COMPANY */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ color: "#0d47a1", mb: 1, fontSize: "15px" }}
          >
            Company Information
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Info label="Company" value={user.company?.name} />
              <Info label="Department" value={user.company?.department} />
            </Grid>

            <Grid item xs={6}>
              <Info label="Position" value={user.company?.title} />
              <Info
                label="Office Address"
                value={user.company?.address?.address}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Layout>
  );
}

/* COMPACT INFO COMPONENT */
function Info({ label, value }) {
  return (
    <Box mb={0.5}>
      <Typography fontWeight="bold" sx={{ fontSize: "13px" }}>
        {label}:
      </Typography>
      <Typography sx={{ color: "gray", fontSize: "13px" }}>
        {value || "N/A"}
      </Typography>
    </Box>
  );
}
