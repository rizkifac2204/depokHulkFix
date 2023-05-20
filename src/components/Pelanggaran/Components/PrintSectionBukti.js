import React, { Fragment } from "react";
// mui
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { WithDynamicImage } from "components/GlobalComponents/Attributes";

function PrintSectionBukti({ data }) {
  return (
    <>
      {data.length !== 0 &&
        data.map((item, index) => (
          <Fragment key={index}>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="subtitle1">Bukti {index + 1}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>a. Nama bukti</TableCell>
              <TableCell>
                : <b>{item?.keterangan}</b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                {item.file ? (
                  <WithDynamicImage
                    altText={item.keterangan}
                    image={`pelanggaran/bukti/${item.file}`}
                  />
                ) : null}
              </TableCell>
            </TableRow>
          </Fragment>
        ))}
    </>
  );
}

export default PrintSectionBukti;
