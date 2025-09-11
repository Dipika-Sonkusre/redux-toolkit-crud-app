/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton, TableCell, TableRow } from "@mui/material";
import { usersColumns } from "../utils/constants";

export default function SkeletonLoader({ count }: { count: number }) {
  return Array.from(new Array(count)).map((_, index) => (
    <TableRow key={index}>
      {usersColumns.map((_) => (
        <TableCell>
          <Skeleton variant="text" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
