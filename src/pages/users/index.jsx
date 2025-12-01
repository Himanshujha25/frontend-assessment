import { useEffect, useState, useCallback } from "react";
import Layout from "@/components/Layout";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TablePagination,
  TextField,
  Typography,
  Skeleton,
  Button,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import debounce from "lodash.debounce";

export default function UsersPage() {
  const { users, total, loading, fetchUsers } = useUserStore();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const handleSearch = useCallback(
    debounce((value) => {
      setSearch(value);
      setPage(0);
    }, 400),
    []
  );

  useEffect(() => {
    fetchUsers(limit, page * limit, search);
  }, [page, limit, search]);

  return (
    <Layout>
      <Box p={4}>

        {/* 🔙 Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: 2,
            textTransform: "none",
          }}
          onClick={() => history.back()}
        >
          Back
        </Button>

        {/* PAGE HEADER */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Users Dashboard
          </Typography>
          <Typography variant="body1" color="gray">
            View and manage users fetched from the DummyJSON API.
          </Typography>
        </Box>

        {/* SEARCH BAR */}
        <TextField
          label="Search Users..."
          variant="outlined"
          fullWidth
          onChange={(e) => handleSearch(e.target.value)}
          sx={{
            mb: 3,
            background: "white",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": { borderRadius: 2 },
          }}
        />

        {/* TABLE WRAPPER */}
        <Paper sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 3 }}>
          {/* LOADING SKELETON */}
          {loading ? (
            <Table>
              <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Phone</b></TableCell>
                  <TableCell><b>Gender</b></TableCell>
                  <TableCell><b>Company</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton width="60%" /></TableCell>
                    <TableCell><Skeleton width="80%" /></TableCell>
                    <TableCell><Skeleton width="50%" /></TableCell>
                    <TableCell><Skeleton width="40%" /></TableCell>
                    <TableCell><Skeleton width="80%" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : users.length === 0 ? (
            <Typography
              textAlign="center"
              py={5}
              fontSize="18px"
              color="gray"
            >
              No users found.
            </Typography>
          ) : (
            <Table>
              {/* HEADER */}
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Phone</b></TableCell>
                  <TableCell><b>Gender</b></TableCell>
                  <TableCell><b>Company</b></TableCell>
                </TableRow>
              </TableHead>

              {/* BODY */}
              <TableBody>
                {users.map((u) => (
                  <TableRow
                    key={u.id}
                    hover
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: "#f0f7ff",
                        transition: "0.2s",
                      },
                    }}
                  >
                    <TableCell>
                      <Link
                        href={`/users/${u.id}`}
                        style={{
                          textDecoration: "none",
                          color: "#1976d2",
                          fontWeight: 600,
                        }}
                      >
                        {u.firstName} {u.lastName}
                      </Link>
                    </TableCell>

                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.phone}</TableCell>
                    <TableCell>{u.gender}</TableCell>
                    <TableCell>{u.company?.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* PAGINATION */}
          <TablePagination
            component="div"
            count={total}
            page={page}
            rowsPerPage={limit}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setLimit(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>
      </Box>
    </Layout>
  );
}
