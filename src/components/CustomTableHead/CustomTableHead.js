import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const customTableHead = props => {
  const HEAD_ROWS = [
    {
      id: "shortDescription",
      numeric: false,
      disablePadding: false,
      label: "Short description"
    },
    { id: "author", numeric: false, disablePadding: false, label: "Author" },
    {
      id: "priority",
      numeric: false,
      disablePadding: false,
      label: "Priority"
    },
    {
      id: "severity",
      numeric: false,
      disablePadding: false,
      label: "Severity"
    },
    {
      id: "date",
      numeric: true,
      disablePadding: false,
      label: "Creation date"
    }
  ];
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {HEAD_ROWS.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? "right" : "left"}
            padding={row.disablePadding ? "none" : "default"}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default customTableHead;
