"use client";
import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { TableHead } from "@mui/material";

function TablePaginationActions(props: any) {
  // Mui theme hook
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: HTMLEvent) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: HTMLEvent) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: HTMLEvent) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: HTMLEvent) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(
  name: string,
  phone: string,
  comment: string,
  shop: string,
  date: string
) {
  return { name, phone, comment, shop, date };
}

const rows = [
  createData(
    "John Cena",
    "0175***3145",
    "Fraud Persoanl. Did not receive products from courier. Do not take order from him.",
    "UniShop",
    " 2022 - 10 - 10"
  ),
  createData(
    "John Cena",
    "0175***3145",
    "Fraud Persoanl. Did not receive products from courier. Do not take order from him.",
    "UniShop",
    " 2022 - 10 - 10"
  ),
  createData(
    "John Cena",
    "0175***3145",
    "Fraud Persoanl. Did not receive products from courier. Do not take order from him.",
    "UniShop",
    " 2022 - 10 - 10"
  ),
  createData(
    "John Cena",
    "0175***3145",
    "Fraud Persoanl. Did not receive products from courier. Do not take order from him.",
    "UniShop",
    " 2022 - 10 - 10"
  ),
  createData(
    "John Cena",
    "0175***3145",
    "Fraud Persoanl. Did not receive products from courier. Do not take order from him.",
    "UniShop",
    " 2022 - 10 - 10"
  ),
  createData(
    "John Cena",
    "0175***3145",
    "Fraud Persoanl. Did not receive products from courier. Do not take order from him.",
    "UniShop",
    " 2022 - 10 - 10"
  ),
  createData(
    "John Cena",
    "0175***3145",
    "Fraud Persoanl. Did not receive products from courier. Do not take order from him.",
    "UniShop",
    " 2022 - 10 - 10"
  ),
  createData(
    "John Cena",
    "0175***3145",
    "Fraud Persoanl. Did not receive products from courier. Do not take order from him.",
    "UniShop",
    " 2022 - 10 - 10"
  ),
  createData(
    "John Cena",
    "0175***3145",
    "Fraud Persoanl. Did not receive products from courier. Do not take order from him.",
    "UniShop",
    " 2022 - 10 - 10"
  ),
  createData(
    "John Cena",
    "0175***3145",
    "Fraud Persoanl. Did not receive products from courier. Do not take order from him.",
    "UniShop",
    " 2022 - 10 - 10"
  ),
  createData(
    "John Cena",
    "0175***3145",
    "Fraud Persoanl. Did not receive products from courier. Do not take order from him.",
    "UniShop",
    " 2022 - 10 - 10"
  ),
  createData(
    "John Cena",
    "0175***3145",
    "Fraud Persoanl. Did not receive products from courier. Do not take order from him.",
    "UniShop",
    " 2022 - 10 - 10"
  ),
  createData(
    "John Cena",
    "0175***3145",
    "Fraud Persoanl. Did not receive products from courier. Do not take order from him.",
    "UniShop",
    " 2022 - 10 - 10"
  ),
  createData(
    "John Cena",
    "0175***3145",
    "Fraud Persoanl. Did not receive products from courier. Do not take order from him.",
    "UniShop",
    " 2022 - 10 - 10"
  ),
].sort((a, b) => (a.phone < b.phone ? -1 : 1));

export default function Pagination() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage: (event: any, newPage: any) => void = (
    event,
    newPage
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: HTMLEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "phone", label: "Phone Number", minWidth: 170 },
    { id: "comment", label: "Comment", minWidth: 100, align: "left" },
    { id: "shop", label: "Shop Name" },
    {
      id: "date",
      label: "Date",
      minWidth: 170,
      align: "right",
      format: (value: string | number) => value.toLocaleString("en-US"),
    },
  ];

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
      colSpan={5}
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: {
          "aria-label": "rows per page",
        },
        native: true,
      }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
      component="div"
    />
  );
}
