// utils
import { formatedDate } from "utils/formatDate";

// component
import ContentLayout from "components/GlobalComponents/ContentLayout";

export default function PelaporDetailSection({ detail }) {
  return (
    <>
      <ContentLayout title="a. Nama">: {detail.nama || "-"}</ContentLayout>
      <ContentLayout title="b. Tempat / Tanggal Lahir">
        : {detail.tempat_lahir || "-"}
        {` / `}
        {detail.tanggal_lahir ? formatedDate(detail.tanggal_lahir, false) : "-"}
      </ContentLayout>
      <ContentLayout title="c. Jenis Kelamin">
        : {detail.jenis_kelamin || "-"}
      </ContentLayout>
      <ContentLayout title="d. Pekerjaan ">
        : {detail.pekerjaan || "-"}
      </ContentLayout>
      <ContentLayout title="e. Kewarganegaraan ">
        : {detail.kewarganegaraan || "Indonesia"}
      </ContentLayout>
      <ContentLayout title="f. Alamat">: {detail.alamat || "-"}</ContentLayout>
      <ContentLayout title="g. No.Telp/HP">
        : {detail.telp || "-"}
      </ContentLayout>
      <ContentLayout title="h. Email">: {detail.email || "-"}</ContentLayout>
    </>
  );
}
