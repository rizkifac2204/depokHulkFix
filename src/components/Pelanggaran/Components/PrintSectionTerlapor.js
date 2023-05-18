import React, { Fragment } from "react";
// mui
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function PrintSectionTerlapor({ data }) {
  return (
    <>
      {data.length !== 0 &&
        data.map((item, index) => (
          <Fragment key={index}>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1">
                  Terlapor {index + 1}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>a. Nama</TableCell>
              <TableCell>
                : <b>{item?.nama}</b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>b. Alamat</TableCell>
              <TableCell>
                : <b>{item?.alamat}</b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>c. Telp/HP</TableCell>
              <TableCell>
                : <b>{item?.telp}</b>
              </TableCell>
            </TableRow>
          </Fragment>
        ))}
    </>
  );
}

export default PrintSectionTerlapor;
