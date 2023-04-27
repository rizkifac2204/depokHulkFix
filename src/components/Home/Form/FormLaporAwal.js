import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// components
import ContentLayout from "components/GlobalComponents/ContentLayout";

const validationSchema = yup.object({
  nama: yup.string().required("Harus Diisi"),
  telp: yup.string().required("Harus Diisi"),
  email: yup.string("Masukan Email").email("Email Tidak Valid"),
  uraian: yup.string().required("Harus Diisi"),
});

const handleSubmit = (values, setSubmitting, resetForm) => {
  axios
    .post(`/api/home/awal`, values)
    .then((res) => {
      toast.success(res.data.message);
      setTimeout(() => resetForm(), 1000);
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

function HomeLaporAwal() {
  const formik = useFormik({
    initialValues: {
      nama: "",
      telp: "",
      email: "",
      uraian: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) =>
      handleSubmit(values, setSubmitting, resetForm),
  });

  return (
    <div className="hk-general-settings">
      <form onSubmit={formik.handleSubmit}>
        {/* Pelapor  */}
        <Box>
          <h3>1. Identitas Pelapor:</h3>
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
            <ContentLayout title="Email">
              <FormControl fullWidth>
                <TextField
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

        {/* uraian  */}
        <h3>2. Uraian Kejadian:</h3>
        <Box mb={3}>
          <ContentLayout title="Uraian *">
            <FormControl fullWidth>
              <TextField
                required
                variant="standard"
                name="uraian"
                multiline
                rows={3}
                value={formik.values.uraian}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.uraian && Boolean(formik.errors.uraian)}
                helperText={formik.touched.uraian && formik.errors.uraian}
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
              {formik.isSubmitting ? "Memproses ..." : "Simpan"}
            </Button>
          </ContentLayout>
        </Box>
      </form>
    </div>
  );
}

export default HomeLaporAwal;
