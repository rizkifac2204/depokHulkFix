import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Alert from "@mui/material/Alert";
import RadioGroup from "@mui/material/RadioGroup";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

// components
import ContentLayout from "components/GlobalComponents/ContentLayout";

const validationSchema = yup.object({
  // pelapor
  nama: yup.lazy((value) => {
    switch (typeof value) {
      case "object":
        return yup.object().required("Harus Diisi"); // schema for object
      case "string":
        return yup.string().required("Harus Diisi"); // schema for string
      default:
        return yup.mixed(); // here you can decide what is the default
    }
  }),
  tempat_lahir: yup.string().required("Harus Diisi"),
  tanggal_lahir: yup.string().required("Harus Diisi"),
  jenis_kelamin: yup.string().required("Harus Dipilih"),
  pekerjaan: yup.string().required("Harus Diisi"),
  alamat: yup.string().required("Harus Diisi"),
  telp: yup.string().required("Harus Diisi"),
  email: yup.string("Masukan Email").email("Email Tidak Valid"),
  // peristiwa
  nomor: yup.string().required("Harus Diisi"),
  peristiwa: yup.string().required("Harus Diisi"),
  tempat_kejadian: yup.string().required("Harus Diisi"),
  tanggal_kejadian: yup.string().required("Harus Diisi"),
  tanggal_diketahui: yup.string().required("Harus Diisi"),
  uraian: yup.string().required("Harus Diisi"),
  tempat_lapor: yup.string().required("Harus Diisi"),
  tanggal_lapor: yup.string().required("Harus Diisi"),
  jam_lapor: yup.string().required("Harus Diisi"),
});

const handleSubmit = (values, setSubmitting) => {
  axios
    .post(`/api/lapor`, values)
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

const filter = createFilterOptions();

function FormLaporAdd() {
  const formik = useFormik({
    initialValues: {
      nama: null,
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      kewarganegaraan: "",
      pekerjaan: "",
      alamat: "",
      telp: "",
      email: "",
      nomor: "",
      peristiwa: "",
      tempat_kejadian: "",
      tanggal_kejadian: "",
      tanggal_diketahui: "",
      uraian: "",
      tempat_lapor: "",
      tanggal_lapor: "",
      jam_lapor: "",
      terlapor: [
        { nama: "", alamat: "", telp: "" },
        { nama: "", alamat: "", telp: "" },
        { nama: "", alamat: "", telp: "" },
      ],
      saksi: [
        { nama: "", alamat: "", telp: "" },
        { nama: "", alamat: "", telp: "" },
      ],
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, setSubmitting),
  });

  // GET PELAPOR
  const {
    data: pelapor,
    isError: isErrorPelapor,
    isLoading: isLoadingPelapor,
    isFetching: isFetchingPelapor,
  } = useQuery({
    initialData: [],
    queryKey: ["pelapor"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/lapor/pelapor`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  function setAutoValue(newValue) {
    if (newValue !== null) {
      formik.setFieldValue("tempat_lahir", newValue.tempat_lahir);
      formik.setFieldValue("tanggal_lahir", new Date(newValue.tanggal_lahir));
      formik.setFieldValue("jenis_kelamin", newValue.jenis_kelamin);
      formik.setFieldValue("pekerjaan", newValue.pekerjaan);
      formik.setFieldValue("alamat", newValue.alamat);
      formik.setFieldValue("telp", newValue.telp);
      formik.setFieldValue("email", newValue.email);
    } else {
      formik.setFieldValue("tempat_lahir", "");
      formik.setFieldValue("tanggal_lahir", "");
      formik.setFieldValue("jenis_kelamin", "");
      formik.setFieldValue("pekerjaan", "");
      formik.setFieldValue("alamat", "");
      formik.setFieldValue("telp", "");
      formik.setFieldValue("email", "");
    }
  }

  return (
    <div className="hk-general-settings">
      <form onSubmit={formik.handleSubmit}>
        {/* input nomor  */}
        <Box mb={3}>
          <ContentLayout title="Nomor *">
            <FormControl fullWidth>
              <TextField
                required
                variant="standard"
                name="nomor"
                value={formik.values.nomor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nomor && Boolean(formik.errors.nomor)}
                helperText={formik.touched.nomor && formik.errors.nomor}
              />
            </FormControl>
          </ContentLayout>
        </Box>

        {/* Pelapor  */}
        <Box>
          <h3>1. Identitas Pelapor:</h3>
          {/* input nama  */}
          <Box mb={3}>
            <ContentLayout title="Nama Pelapor *">
              <FormControl fullWidth>
                <Autocomplete
                  value={formik.values.nama}
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      formik.setFieldValue("nama", newValue);
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      formik.setFieldValue("nama", newValue.inputValue);
                    } else {
                      formik.setFieldValue("nama", newValue);
                      setAutoValue(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some(
                      (option) => inputValue === option.nama
                    );
                    if (inputValue !== "" && !isExisting) {
                      filtered.push({
                        inputValue,
                        nama: `Tambah "${inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="nama"
                  options={pelapor ? pelapor : []}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.nama;
                  }}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id ? option.id : 0}>
                      {option.nama}
                    </li>
                  )}
                  // sx={{ width: 300 }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      helperText={formik.touched.nama && formik.errors.nama}
                      error={formik.touched.nama && Boolean(formik.errors.nama)}
                    />
                  )}
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

        {/* Terlapor  */}
        <Box>
          <h3>2. Identitas Terlapor:</h3>
          <Grid container>
            {[1, 2, 3].map((item, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Box mb={2}>
                  <Typography variant="body2">Terlapor {index + 1}</Typography>
                </Box>
                <ContentLayout title="Nama">
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      name={`terlapor[${index}].nama`}
                      value={formik.values.terlapor[index].nama}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </FormControl>
                </ContentLayout>
                <ContentLayout title="Alamat">
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      name={`terlapor[${index}].alamat`}
                      value={formik.values.terlapor[index].alamat}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </FormControl>
                </ContentLayout>
                <ContentLayout title="Telp">
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      name={`terlapor[${index}].telp`}
                      value={formik.values.terlapor[index].telp}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </FormControl>
                </ContentLayout>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Peristiwa  */}
        <Box>
          <h3>3. Peristiwa Yang Dilaporkan:</h3>
          {/* input peristiwa  */}
          <Box mb={3}>
            <ContentLayout title="Peristiwa *">
              <FormControl fullWidth>
                <TextField
                  required
                  variant="standard"
                  name="peristiwa"
                  value={formik.values.peristiwa}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.peristiwa && Boolean(formik.errors.peristiwa)
                  }
                  helperText={
                    formik.touched.peristiwa && formik.errors.peristiwa
                  }
                />
              </FormControl>
            </ContentLayout>
          </Box>
          {/* input tempat_kejadian  */}
          <Box mb={3}>
            <ContentLayout title="Tempat Kejadian *">
              <FormControl fullWidth>
                <TextField
                  required
                  variant="standard"
                  name="tempat_kejadian"
                  value={formik.values.tempat_kejadian}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.tempat_kejadian &&
                    Boolean(formik.errors.tempat_kejadian)
                  }
                  helperText={
                    formik.touched.tempat_kejadian &&
                    formik.errors.tempat_kejadian
                  }
                />
              </FormControl>
            </ContentLayout>
          </Box>
          {/* input tanggal_kejadian  */}
          <Box mb={3}>
            <ContentLayout title="Tanggal Kejadian *">
              <FormControl fullWidth>
                <MobileDatePicker
                  inputFormat="DD-MM-YYYY"
                  value={formik.values.tanggal_kejadian}
                  onChange={(value) => {
                    formik.setFieldValue("tanggal_kejadian", new Date(value));
                  }}
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      helperText={
                        formik.touched.tanggal_kejadian &&
                        formik.errors.tanggal_kejadian
                      }
                      error={
                        formik.touched.tanggal_kejadian &&
                        Boolean(formik.errors.tanggal_kejadian)
                      }
                    />
                  )}
                />
              </FormControl>
            </ContentLayout>
          </Box>
          {/* input tanggal_diketahui  */}
          <Box mb={3}>
            <ContentLayout title="Tanggal Diketahui *">
              <FormControl fullWidth>
                <MobileDatePicker
                  inputFormat="DD-MM-YYYY"
                  value={formik.values.tanggal_diketahui}
                  onChange={(value) => {
                    formik.setFieldValue("tanggal_diketahui", new Date(value));
                  }}
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      helperText={
                        formik.touched.tanggal_diketahui &&
                        formik.errors.tanggal_diketahui
                      }
                      error={
                        formik.touched.tanggal_diketahui &&
                        Boolean(formik.errors.tanggal_diketahui)
                      }
                    />
                  )}
                />
              </FormControl>
            </ContentLayout>
          </Box>
        </Box>

        {/* Saksi  */}
        <Box>
          <h3>4. Saksi-saksi:</h3>
          <Grid container>
            {[1, 2].map((item, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Box mb={2}>
                  <Typography variant="body2">Saksi {index + 1}</Typography>
                </Box>
                <ContentLayout title="Nama">
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      name={`saksi[${index}].nama`}
                      value={formik.values.saksi[index].nama}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </FormControl>
                </ContentLayout>
                <ContentLayout title="Alamat">
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      name={`saksi[${index}].alamat`}
                      value={formik.values.saksi[index].alamat}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </FormControl>
                </ContentLayout>
                <ContentLayout title="Telp">
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      name={`saksi[${index}].telp`}
                      value={formik.values.saksi[index].telp}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </FormControl>
                </ContentLayout>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Bukti  */}
        <Box>
          <h3>5. Bukti-bukti:</h3>
          <Alert severity="info">Diisi Pada Bagian Detail</Alert>
        </Box>

        {/* uraian  */}
        <h3>6. Uraian Kejadian:</h3>
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

        <Divider sx={{ my: 5 }} />

        {/* Laporan  */}
        <Box>
          {/* input tempat_lapor  */}
          <Box mb={3}>
            <ContentLayout title="Tempat Lapor *">
              <FormControl fullWidth>
                <TextField
                  required
                  variant="standard"
                  name="tempat_lapor"
                  value={formik.values.tempat_lapor}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.tempat_lapor &&
                    Boolean(formik.errors.tempat_lapor)
                  }
                  helperText={
                    formik.touched.tempat_lapor && formik.errors.tempat_lapor
                  }
                />
              </FormControl>
            </ContentLayout>
          </Box>
          {/* input tanggal_lapor jam_lapor  */}
          <Box mb={3}>
            <ContentLayout title="Tanggal dan Jam Lapor *">
              <FormControl>
                <MobileDatePicker
                  label="Tanggal"
                  inputFormat="DD-MM-YYYY"
                  value={formik.values.tanggal_lapor}
                  onChange={(value) => {
                    formik.setFieldValue("tanggal_lapor", new Date(value));
                  }}
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      helperText={
                        formik.touched.tanggal_lapor &&
                        formik.errors.tanggal_lapor
                      }
                      error={
                        formik.touched.tanggal_lapor &&
                        Boolean(formik.errors.tanggal_lapor)
                      }
                    />
                  )}
                />
              </FormControl>{" "}
              <FormControl>
                <MobileTimePicker
                  label="Jam"
                  value={formik.values.jam_lapor}
                  onChange={(value) => {
                    formik.setFieldValue("jam_lapor", new Date(value));
                  }}
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      helperText={
                        formik.touched.jam_lapor && formik.errors.jam_lapor
                      }
                      error={
                        formik.touched.jam_lapor &&
                        Boolean(formik.errors.jam_lapor)
                      }
                    />
                  )}
                />
              </FormControl>
            </ContentLayout>
          </Box>
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

export default FormLaporAdd;
