import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

// components
import ContentLayout from "components/GlobalComponents/ContentLayout";

const validationSchema = yup.object({
  nama: yup.string().required("Harus Diisi"),
  tempat_lahir: yup.string().required("Harus Diisi"),
  tanggal_lahir: yup.string().required("Harus Diisi"),
  jenis_kelamin: yup.string().required("Harus Dipilih"),
  pekerjaan: yup.string().required("Harus Diisi"),
  alamat: yup.string().required("Harus Diisi"),
  telp: yup.string().required("Harus Diisi"),
  email: yup.string("Masukan Email").email("Email Tidak Valid"),
});

const handleSubmit = (values, setSubmitting, id) => {
  axios
    .put(`/api/lapor/pelapor/${id}`, values)
    .then((res) => {
      toast.success(res.data.message);
    })
    .catch((err) => {
      console.log(err);
      const msg = err?.response?.data?.message
        ? err.response.data.message
        : "Gagal Proses";
      toast.error(msg);
    })
    .then(() => {
      setSubmitting(false);
    });
};

function PelaporFormEdit({ detail }) {
  const formik = useFormik({
    initialValues: {
      nama: detail?.nama || "",
      tempat_lahir: detail?.tempat_lahir || "",
      tanggal_lahir: detail?.tanggal_lahir
        ? new Date(detail.tanggal_lahir)
        : "",
      jenis_kelamin: detail?.jenis_kelamin || "",
      kewarganegaraan: detail?.kewarganegaraan || "",
      pekerjaan: detail?.pekerjaan || "",
      alamat: detail?.alamat || "",
      telp: detail?.telp || "",
      email: detail?.email || "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, setSubmitting, detail.id),
  });

  return (
    <div className="hk-general-settings">
      <form onSubmit={formik.handleSubmit}>
        {/* Pelapor  */}
        <Box>
          {/* input nama  */}
          <Box mb={3}>
            <ContentLayout title="Nama *">
              <FormControl fullWidth>
                <TextField
                  required
                  variant="standard"
                  name="nama"
                  value={formik.values.nama}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.nama && Boolean(formik.errors.nama)}
                  helperText={formik.touched.nama && formik.errors.nama}
                />
              </FormControl>
            </ContentLayout>
          </Box>
          {/* input tempat_lahir tanggal_lahir  */}
          <Box mb={3}>
            <ContentLayout title="Tempat / Tanggal Lahir *">
              <FormControl>
                <TextField
                  required
                  variant="standard"
                  name="tempat_lahir"
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
              {" / "}
              <FormControl>
                <MobileDatePicker
                  inputFormat="DD-MM-YYYY"
                  value={formik.values.tanggal_lahir}
                  onChange={(value) => {
                    formik.setFieldValue("tanggal_lahir", new Date(value));
                  }}
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      helperText={
                        formik.touched.tanggal_lahir &&
                        formik.errors.tanggal_lahir
                      }
                      error={
                        formik.touched.tanggal_lahir &&
                        Boolean(formik.errors.tanggal_lahir)
                      }
                    />
                  )}
                />
              </FormControl>
            </ContentLayout>
          </Box>
          {/* input jenis_kelamin  */}
          <Box mb={1}>
            <ContentLayout title="Jenis Kelamin">
              <FormControl
                fullWidth
                error={Boolean(formik.errors.jenis_kelamin)}
              >
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
          {/* input kewarganegaraan  */}
          <Box mb={3}>
            <ContentLayout title="Kewarganegaraan *">
              <FormControl fullWidth>
                <TextField
                  required
                  variant="standard"
                  name="kewarganegaraan"
                  value={formik.values.kewarganegaraan}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.kewarganegaraan &&
                    Boolean(formik.errors.kewarganegaraan)
                  }
                  helperText={
                    formik.touched.kewarganegaraan &&
                    formik.errors.kewarganegaraan
                  }
                />
              </FormControl>
            </ContentLayout>
          </Box>
          {/* input pekerjaan  */}
          <Box mb={3}>
            <ContentLayout title="Pekerjaan *">
              <FormControl fullWidth>
                <TextField
                  required
                  variant="standard"
                  name="pekerjaan"
                  value={formik.values.pekerjaan}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.pekerjaan && Boolean(formik.errors.pekerjaan)
                  }
                  helperText={
                    formik.touched.pekerjaan && formik.errors.pekerjaan
                  }
                />
              </FormControl>
            </ContentLayout>
          </Box>
          {/* input alamat  */}
          <Box mb={3}>
            <ContentLayout title="Alamat *">
              <FormControl fullWidth>
                <TextField
                  required
                  multiline
                  variant="standard"
                  name="alamat"
                  value={formik.values.alamat}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.alamat && Boolean(formik.errors.alamat)}
                  helperText={formik.touched.alamat && formik.errors.alamat}
                />
              </FormControl>
            </ContentLayout>
          </Box>
          {/* input telp  */}
          <Box mb={3}>
            <ContentLayout title="Telp/HP *">
              <FormControl fullWidth>
                <TextField
                  required
                  variant="standard"
                  name="telp"
                  value={formik.values.telp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.telp && Boolean(formik.errors.telp)}
                  helperText={formik.touched.telp && formik.errors.telp}
                />
              </FormControl>
            </ContentLayout>
          </Box>
          {/* input email  */}
          <Box mb={3}>
            <ContentLayout title="Email *">
              <FormControl fullWidth>
                <TextField
                  required
                  variant="standard"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </FormControl>
            </ContentLayout>
          </Box>
        </Box>

        <Divider sx={{ my: 5 }} />

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
              {formik.isSubmitting ? "Memproses ..." : "Simpan"}
            </Button>
          </ContentLayout>
        </Box>
      </form>
    </div>
  );
}

export default PelaporFormEdit;
