import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// MUI
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// components
import ContentLayout from "components/GlobalComponents/ContentLayout";
import Wait from "components/GlobalComponents/Wait";

const useHandleSubmitMutation = () => {
  return useMutation((formPayload) => {
    return axios
      .put(`/api/profile/umum`, formPayload)
      .then((res) => res.data)
      .catch((err) => {
        const msg = err.response.data.message
          ? err.response.data.message
          : "Gagal Proses";
        throw new Error(msg);
      });
  });
};

const handleSubmit = (values, setSubmitting, mutate, queryClient) => {
  mutate(values, {
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => setSubmitting(false),
  });
};

function ProfileFormUmum() {
  const { mutate } = useHandleSubmitMutation();
  const queryClient = useQueryClient();

  const {
    data: umum,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", "umum"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/profile/umum`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  // UTILS STATUS PEGAWAI
  const {
    data: status_pegawai,
    isError: isErrorStatusPegawai,
    isLoading: isLoadingStatusPegawai,
  } = useQuery({
    queryKey: ["utils", "status_pegawai"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/services/utils/status-pegawai`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  // UTILS JABATAN
  const {
    data: jabatan,
    isError: isErrorJabatan,
    isLoading: isLoadingJabatan,
  } = useQuery({
    queryKey: ["utils", "jabatan"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/services/utils/jabatan`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  // UTILS AGAMA
  const {
    data: agama,
    isError: isErrorAgama,
    isLoading: isLoadingAgama,
  } = useQuery({
    queryKey: ["utils", "agama"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/services/utils/agama`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  // UTILS PERNIKAHAN
  const {
    data: pernikahan,
    isError: isErrorPernikahan,
    isLoading: isLoadingPernikahan,
  } = useQuery({
    queryKey: ["utils", "pernikahan"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/services/utils/pernikahan`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  const formik = useFormik({
    initialValues: umum
      ? { ...umum, passwordConfirm: "" }
      : {
          status_pegawai: "",
          jabatan: "",
          agama: "",
          telp_admin: "",
          jenis_kelamin: "",
          tempat_lahir: "",
          tanggal_lahir: "",
          golongan_darah: "",
          status_nikah: "",
          gelar_depan: "",
          gelar_belakang: "",
          hobi: "",
          keahlian: "",
          passwordConfirm: "",
        },
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, setSubmitting, mutate, queryClient),
  });

  if (isLoading) return <Wait loading={true} />;
  if (isError)
    return (
      <Alert
        sx={{ mt: 2 }}
        severity="error"
      >{`An error has occurred: ${error.message}`}</Alert>
    );

  return (
    <div className="hk-general-settings">
      <form onSubmit={formik.handleSubmit}>
        {/* input status_pegawai  */}
        <Box mb={3}>
          <ContentLayout title="Status Pegawai">
            {isLoadingStatusPegawai && "Loading..."}
            {isErrorStatusPegawai && "Gagal Mengambil Data"}
            {status_pegawai ? (
              <FormControl
                fullWidth
                variant="standard"
                error={Boolean(formik.errors.status_pegawai)}
              >
                <Select
                  name="status_pegawai"
                  value={formik.values.status_pegawai}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">Pilih</MenuItem>
                  {status_pegawai.map((i, idx) => (
                    <MenuItem key={idx} value={i.status_pegawai}>
                      {i.status_pegawai}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
            <FormHelperText style={{ color: "red" }}>
              {formik.touched.status_pegawai && formik.errors.status_pegawai}
            </FormHelperText>
          </ContentLayout>
        </Box>
        {/* input jabatan  */}
        <Box mb={3}>
          <ContentLayout title="Jabatan">
            {isLoadingJabatan && "Loading..."}
            {isErrorJabatan && "Gagal Mengambil Data"}
            {jabatan ? (
              <FormControl
                fullWidth
                variant="standard"
                error={Boolean(formik.errors.jabatan)}
              >
                <Select
                  name="jabatan"
                  value={formik.values.jabatan}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">Pilih</MenuItem>
                  {jabatan.map((i, idx) => (
                    <MenuItem key={idx} value={i.jabatan}>
                      {i.jabatan}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
            <FormHelperText style={{ color: "red" }}>
              {formik.touched.jabatan && formik.errors.jabatan}
            </FormHelperText>
          </ContentLayout>
        </Box>
        {/* input gelar_depan  */}
        <Box mb={3}>
          <ContentLayout title="Gelar Depan">
            <FormControl fullWidth>
              <TextField
                variant="standard"
                name="gelar_depan"
                placeholder="Gelar Depan"
                value={formik.values.gelar_depan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.gelar_depan &&
                  Boolean(formik.errors.gelar_depan)
                }
                helperText={
                  formik.touched.gelar_depan && formik.errors.gelar_depan
                }
              />
            </FormControl>
          </ContentLayout>
        </Box>
        {/* input gelar_belakang  */}
        <Box mb={3}>
          <ContentLayout title="Gelar Belakang">
            <FormControl fullWidth>
              <TextField
                variant="standard"
                name="gelar_belakang"
                placeholder="Gelar Belakang"
                value={formik.values.gelar_belakang}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.gelar_belakang &&
                  Boolean(formik.errors.gelar_belakang)
                }
                helperText={
                  formik.touched.gelar_belakang && formik.errors.gelar_belakang
                }
              />
            </FormControl>
          </ContentLayout>
        </Box>
        {/* input agama  */}
        <Box mb={3}>
          <ContentLayout title="Agama">
            {isLoadingAgama && "Loading..."}
            {isErrorAgama && "Gagal Mengambil Data"}
            {agama ? (
              <FormControl
                fullWidth
                variant="standard"
                error={Boolean(formik.errors.agama)}
              >
                <Select
                  name="agama"
                  value={formik.values.agama}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">Pilih</MenuItem>
                  {agama.map((i, idx) => (
                    <MenuItem key={idx} value={i.agama}>
                      {i.agama}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
            <FormHelperText style={{ color: "red" }}>
              {formik.touched.agama && formik.errors.agama}
            </FormHelperText>
          </ContentLayout>
        </Box>
        {/* input jenis_kelamin  */}
        <Box mb={3}>
          <ContentLayout title="Jenis Kelamin">
            <FormControl fullWidth error={Boolean(formik.errors.jenis_kelamin)}>
              <RadioGroup
                row
                aria-label="jenis_kelamin"
                name="jenis_kelamin"
                value={formik.values.jenis_kelamin}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="Laki-Laki"
                  control={<Radio />}
                  label="Laki-Laki"
                />
                <FormControlLabel
                  value="Perempuan"
                  control={<Radio />}
                  label="Perempuan"
                />
              </RadioGroup>
            </FormControl>
            <FormHelperText style={{ color: "red" }}>
              {formik.touched.jenis_kelamin && formik.errors.jenis_kelamin}
            </FormHelperText>
          </ContentLayout>
        </Box>
        {/* input tempat_lahir  */}
        <Box mb={3}>
          <ContentLayout title="Tempat Lahir">
            <FormControl fullWidth>
              <TextField
                variant="standard"
                name="tempat_lahir"
                placeholder="Tempat Lahir"
                value={formik.values.tempat_lahir}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.tempat_lahir &&
                  Boolean(formik.errors.tempat_lahir)
                }
                helperText={
                  formik.touched.tempat_lahir && formik.errors.tempat_lahir
                }
              />
            </FormControl>
          </ContentLayout>
        </Box>
        {/* input tanggal_lahir  */}
        <Box mb={3}>
          <ContentLayout title="Tanggal Lahir">
            <FormControl fullWidth>
              <TextField
                variant="standard"
                name="tanggal_lahir"
                placeholder="Tanggal Lahir"
                value={formik.values.tanggal_lahir}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.tanggal_lahir &&
                  Boolean(formik.errors.tanggal_lahir)
                }
                helperText={
                  formik.touched.tanggal_lahir && formik.errors.tanggal_lahir
                }
              />
            </FormControl>
          </ContentLayout>
        </Box>
        {/* input golongan_darah  */}
        <Box mb={3}>
          <ContentLayout title="Golongan Darah">
            <FormControl
              fullWidth
              variant="standard"
              error={Boolean(formik.errors.golongan_darah)}
            >
              <Select
                name="golongan_darah"
                value={formik.values.golongan_darah}
                onChange={formik.handleChange}
              >
                <MenuItem value="">Pilih</MenuItem>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="AB">AB</MenuItem>
                <MenuItem value="O">O</MenuItem>
              </Select>
            </FormControl>
            <FormHelperText style={{ color: "red" }}>
              {formik.touched.golongan_darah && formik.errors.golongan_darah}
            </FormHelperText>
          </ContentLayout>
        </Box>
        {/* input status_nikah  */}
        <Box mb={3}>
          <ContentLayout title="Status Nikah">
            {isLoadingPernikahan && "Loading..."}
            {isErrorPernikahan && "Gagal Mengambil Data"}
            {pernikahan ? (
              <FormControl
                fullWidth
                variant="standard"
                error={Boolean(formik.errors.status_nikah)}
              >
                <Select
                  name="status_nikah"
                  value={formik.values.status_nikah}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">Pilih</MenuItem>
                  {pernikahan.map((i, idx) => (
                    <MenuItem key={idx} value={i.pernikahan}>
                      {i.pernikahan}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
            <FormHelperText style={{ color: "red" }}>
              {formik.touched.status_nikah && formik.errors.status_nikah}
            </FormHelperText>
          </ContentLayout>
        </Box>
        {/* input hobi  */}
        <Box mb={3}>
          <ContentLayout title="Hobi">
            <FormControl fullWidth>
              <TextField
                variant="standard"
                name="hobi"
                placeholder="Hobi"
                value={formik.values.hobi}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.hobi && Boolean(formik.errors.hobi)}
                helperText={formik.touched.hobi && formik.errors.hobi}
              />
            </FormControl>
          </ContentLayout>
        </Box>
        {/* input keahlian  */}
        <Box mb={3}>
          <ContentLayout title="Keahlian">
            <FormControl fullWidth>
              <TextField
                variant="standard"
                name="keahlian"
                placeholder="Keahlian"
                value={formik.values.keahlian}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.keahlian && Boolean(formik.errors.keahlian)
                }
                helperText={formik.touched.keahlian && formik.errors.keahlian}
              />
            </FormControl>
          </ContentLayout>
        </Box>
        {/* input konfirmasi  */}
        <Box mb={3}>
          <ContentLayout title="Password Lama">
            <FormControl fullWidth>
              <TextField
                required
                variant="standard"
                type="password"
                placeholder="Konfirmasi Password Lama"
                name="passwordConfirm"
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.passwordConfirm &&
                  Boolean(formik.errors.passwordConfirm)
                }
                helperText={
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                }
              />
            </FormControl>
          </ContentLayout>
        </Box>
        {/* submit  */}
        <Box mb={3}>
          <ContentLayout>
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              variant="outlined"
              color="primary"
              className="primary-bg-btn"
            >
              Simpan
            </Button>
          </ContentLayout>
        </Box>
      </form>
    </div>
  );
}

export default ProfileFormUmum;
