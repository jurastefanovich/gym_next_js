"use client";
import { GymApi } from "@/app/_features/enums/ApiPaths";
import { ADMIN_ROUTES } from "@/app/_features/enums/Routes";
import { ProfileResponse } from "@/app/_features/utils/Interfaces";
import { useGet } from "@/app/hooks/useGet";
import { Clear } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Members() {
  const get = useGet<ProfileResponse[]>(GymApi.MEMBERS);
  const users = get.data || [];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("user_search") || "";
  const [searchEmail, setSearchEmail] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [page, setPage] = useState(1);

  // Don't include tab at all in the useEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchEmail);

      const params = new URLSearchParams(searchParams.toString());

      if (searchEmail) {
        params.set("user_search", searchEmail);
      } else {
        params.delete("user_search");
      }

      setPage(1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchEmail]);

  const filteredUsers = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    return users.filter((user) => user.email?.toLowerCase().includes(query));
  }, [users, debouncedSearch]);

  const usersPerPage = 7;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  function redirect(id: number) {
    router.push(ADMIN_ROUTES.USER + id);
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Member Management
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Search by email"
          variant="outlined"
          size="small"
          sx={{ width: 300 }}
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          InputProps={{
            endAdornment: searchEmail && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => {
                    setSearchEmail("");
                    setDebouncedSearch("");
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("user_search");

                    // Preserve tab param
                    const currentTab = searchParams.get("tab");
                    if (currentTab) {
                      params.set("tab", currentTab);
                    }

                    router.replace(`${pathname}?${params.toString()}`);
                  }}
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Member</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 2 }} />
                    {user.initials}
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    size="small"
                    color={
                      user.role === "admin"
                        ? "primary"
                        : user.role === "trainer"
                        ? "secondary"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => redirect(user.id)} variant="outlined">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {paginatedUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size="small"
          />
        </Box>
      )}
    </>
  );
}
