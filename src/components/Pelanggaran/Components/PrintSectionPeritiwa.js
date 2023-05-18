// mui
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

// utils
import { formatedDate } from "utils/formatDate";

function PrintSectionPeristiwa({ detail }) {
  return (
    <>
      <TableRow>
        <TableCell>a. Peristiwa</TableCell>
        <TableCell>
          : <b>{detail?.peristiwa}</b>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>b. Tempat Kejadian</TableCell>
        <TableCell>
          : <b>{detail?.tempat_kejadian}</b>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>c. Hari dan Tanggal Kejadian</TableCell>
        <TableCell>
          : <b>{formatedDate(detail.tanggal_kejadian, true)}</b>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>c. Hari dan Tanggal Diketahui</TableCell>
        <TableCell>
          : <b>{formatedDate(detail.tanggal_diketahui, true)}</b>
        </TableCell>
      </TableRow>
    </>
  );
}

export default PrintSectionPeristiwa;
