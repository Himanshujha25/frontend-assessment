import { memo } from "react";
import Link from "next/link";
import { TableRow, TableCell } from "@mui/material";

function UserRow({ u }) {
  return (
    <TableRow>
      <TableCell>
        <Link href={`/users/${u.id}`}>
          {u.firstName} {u.lastName}
        </Link>
      </TableCell>
      <TableCell>{u.email}</TableCell>
      <TableCell>{u.phone}</TableCell>
      <TableCell>{u.gender}</TableCell>
      <TableCell>{u.company?.name}</TableCell>
    </TableRow>
  );
}

export default memo(UserRow);
