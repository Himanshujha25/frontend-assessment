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
} from "@mui/material";

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
        p={3}
        maxWidth="800px"
        mx="auto"
        sx={{ minHeight: "90vh" }}
      >
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
          }}
        >
          {/* HEADER */}
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            mb={3}
            sx={{
              pb: 2,
              borderBottom: "2px solid #e5e5e5",
            }}
          >
            <Avatar
              src={user.image}
              alt={user.firstName}
              sx={{
                width: 80,
                height: 80,
                border: "2px solid #1976d2",
                boxShadow: "0px 3px 8px rgba(25,118,210,0.25)",
              }}
            />

            <Box>
              <Typography variant="h5" fontWeight="bold">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" color="gray">
                {user.gender}, {user.age} years
              </Typography>
            </Box>
          </Box>

          {/* PERSONAL INFO */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: "#0d47a1", mb: 1 }}
          >
            Personal Information
          </Typography>

          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6}>
              <Info label="Email" value={user.email} />
              <Info label="Phone" value={user.phone} />
              <Info label="Blood Group" value={user.bloodGroup} />
              <Info label="Height" value={`${user.height} cm`} />
              <Info label="Weight" value={`${user.weight} kg`} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#0d47a1", mb: 1 }}
              >
                Address
              </Typography>

              <Info label="Address" value={user.address?.address} />
              <Info label="City" value={user.address?.city} />
              <Info label="State" value={user.address?.state} />
              <Info label="Postal Code" value={user.address?.postalCode} />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* COMPANY SECTION */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: "#0d47a1", mb: 1 }}
          >
            Company
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Info label="Company Name" value={user.company?.name} />
              <Info label="Department" value={user.company?.department} />
              <Info label="Position" value={user.company?.title} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Info
                label="Company Address"
                value={user.company?.address?.address}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Layout>
  );
}

/* REUSABLE INFO COMPONENT (smaller version) */
function Info({ label, value }) {
  return (
    <Box mb={0.8}>
      <Typography fontWeight="bold" sx={{ fontSize: "14px" }}>
        {label}:
      </Typography>
      <Typography sx={{ color: "gray", fontSize: "14px" }}>
        {value || "N/A"}
      </Typography>
    </Box>
  );
}
