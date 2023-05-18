import Divider from "@mui/material/Divider";
// utils
import { formatedDate } from "utils/formatDate";
// component
import ContentLayout from "components/GlobalComponents/ContentLayout";

function SectionPeristiwa({ detail }) {
  return (
    <>
      <ContentLayout title="a. Peristiwa">
        : {detail.peristiwa || "-"}
      </ContentLayout>
      <ContentLayout title="b. Tempat Kejadian">
        : {detail.tempat_kejadian || "-"}
      </ContentLayout>
      <ContentLayout title="c. Hari dan Tanggal Kejadian">
        :{" "}
        {detail.tanggal_kejadian
          ? formatedDate(detail.tanggal_kejadian, true)
          : "-"}
      </ContentLayout>
      <ContentLayout title="d. Hari dan Tanggal Diketahui">
        :{" "}
        {detail.tanggal_diketahui
          ? formatedDate(detail.tanggal_diketahui, true)
          : "-"}
      </ContentLayout>

      <Divider sx={{ mt: 2 }} />
    </>
  );
}

export default SectionPeristiwa;
