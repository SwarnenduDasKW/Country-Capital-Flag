import { withStyles, makeStyles } from "@mui/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const useStyles = makeStyles({
  table: {
    minWidth: 900,
  },
});
