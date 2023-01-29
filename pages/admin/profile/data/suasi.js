import { DataGrid } from "@mui/x-data-grid";

import LayoutRiwayatDanKeluarga from "components/Profile/Components/LayoutRiwayatDanKeluarga";
import SmallTitleBar from "components/GlobalComponents/PageTitleBar/SmallTitleBar";

function ProfileSuasi() {
  return (
    <LayoutRiwayatDanKeluarga>
      <SmallTitleBar title="Data Suami / Istri" />
    </LayoutRiwayatDanKeluarga>
  );
}

export default ProfileSuasi;
