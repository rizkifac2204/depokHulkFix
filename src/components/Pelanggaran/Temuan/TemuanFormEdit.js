import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

// components
import ContentLayout from "components/GlobalComponents/ContentLayout";

const validationSchema = yup.object({
  nomor: yup.string().required("Harus Diisi"),
  // penemu
  petugas: yup.object().required("Harus Diisi").nullable(),
  // peristiwa
  peristiwa: yup.string().required("Harus Diisi"),
  tempat_kejadian: yup.string().required("Harus Diisi"),
  tanggal_kejadian: yup.string().required("Harus Diisi"),
  tanggal_diketahui: yup.string().required("Harus Diisi"),
  uraian: yup.string().required("Harus Diisi"),
});

const handleSubmit = (values, setSubmitting, id) => {
  axios
    .put(`/api/pelanggaran/temuan/${id}`, values)
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

function TemuanFormEdit({ detail }) {
  // GET PETUGAS
  const {
    data: petugas,
    isError: isErrorPetugas,
    isLoading: isLoadingPetugas,
    isFetching: isFetchingPetugas,
  } = useQuery({
    initialData: [],
    queryKey: ["petugas"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/pelanggaran/temuan/petugas`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  function setAutoValue(newValue) {
    if (newValue !== null) {
      formik.setFieldValue("jabatan", newValue.jabatan || "-");
      formik.setFieldValue("alamat", newValue.alamat || "-");
    } else {
      formik.setFieldValue("jabatan", "");
      formik.setFieldValue("alamat", "");
    }
  }

  const formik = useFormik({
    initialValues: detail
      ? {
          nomor: detail.nomor ? detail.nomor : "",
          petugas: petugas
            ? petugas.find((x) => x.petugas_id === detail.petugas_id)
            : null,
          jabatan: detail.petugas_jabatan ? detail.petugas_jabatan : "",
          alamat: detail.petugas_alamat ? detail.petugas_alamat : "",
          peristiwa: detail.peristiwa ? detail.peristiwa : "",
          tempat_kejadian: detail.tempat_kejadian ? detail.tempat_kejadian : "",
          tanggal_kejadian: detail.tanggal_kejadian
            ? new Date(detail.tanggal_kejadian)
            : "",
          tanggal_diketahui: detail.tanggal_diketahui
            ? new Date(detail.tanggal_diketahui)
            : "",
          uraian: detail.uraian ? detail.uraian : "",
          changeTerlapor: false,
          changeSaksi: false,
          terlapor: detail.terlapor
            ? [
                {
                  nama: detail.terlapor[0]?.nama || "",
                  alamat: detail.terlapor[0]?.alamat || "",
                  telp: detail.terlapor[0]?.telp || "",
                },
                {
                  nama: detail.terlapor[1]?.nama || "",
                  alamat: detail.terlapor[1]?.alamat || "",
                  telp: detail.terlapor[1]?.telp || "",
                },
                {
                  nama: detail.terlapor[2]?.nama || "",
                  alamat: detail.terlapor[2]?.alamat || "",
                  telp: detail.terlapor[2]?.telp || "",
                },
              ]
            : [
                { nama: "", alamat: "", telp: "" },
                { nama: "", alamat: "", telp: "" },
                { nama: "", alamat: "", telp: "" },
              ],
          saksi: detail.saksi
            ? [
                {
                  nama: detail.saksi[0]?.nama || "",
                  alamat: detail.saksi[0]?.alamat || "",
                  telp: detail.saksi[0]?.telp || "",
                },
                {
                  nama: detail.saksi[1]?.nama || "",
                  alamat: detail.saksi[1]?.alamat || "",
                  telp: detail.saksi[1]?.telp || "",
                },
              ]
            : [
                { nama: "", alamat: "", telp: "" },
                { nama: "", alamat: "", telp: "" },
              ],
        }
      : {
          nomor: "",
          petugas: null,
          jabatan: "",
          alamat: "",
          peristiwa: "",
          tempat_kejadian: "",
          tanggal_kejadian: "",
          tanggal_diketahui: "",
          uraian: "",
          changeTerlapor: false,
          changeSaksi: false,
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
      handleSubmit(values, setSubmitting, detail.id),
  });

  function terlaporChanged() {
    formik.setFieldValue("changeTerlapor", true);
  }
  function saksiChanged() {
    formik.setFieldValue("changeSaksi", true);
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

        <Box>
          <h3>1. Data Pengawas yang menemukan:</h3>
          {/* input nama  */}
          <Box mb={3}>
            <ContentLayout title="Nama Petugas *">
              {isLoadingPetugas && "Loading..."}
              {isErrorPetugas && "Gagal Mengambil Data"}
              {petugas ? (
                <FormControl fullWidth>
                  <Autocomplete
                    value={formik.values.petugas || null}
                    onChange={(event, newValue) => {
                      if (typeof newValue === "string") {
                        formik.setFieldValue("petugas", null);
                      } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        formik.setFieldValue("petugas", null);
                      } else {
                        formik.setFieldValue("petugas", newValue);
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
                          nama: `Tidak Ditemukan Petugas ${inputValue}`,
                        });
                      }

                      return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="petugas"
                    options={petugas ? petugas : []}
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
                        required
                        {...params}
                        variant="standard"
                        helperText={
                          formik.touched.petugas && formik.errors.petugas
                        }
                        error={
                          formik.touched.petugas &&
                          Boolean(formik.errors.petugas)
                        }
                      />
                    )}
                  />
                </FormControl>
              ) : null}
            </ContentLayout>
          </Box>
          {/* input jabatan  */}
          <Box mb={3}>
            <ContentLayout title="Jabatan">
              <FormControl fullWidth>
                <TextField
                  disabled
                  variant="standard"
                  name="jabatan"
                  value={formik.values.jabatan}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.jabatan && Boolean(formik.errors.jabatan)
                  }
                  helperText={formik.touched.jabatan && formik.errors.jabatan}
                />
              </FormControl>
            </ContentLayout>
          </Box>
          {/* input alamat  */}
          <Box mb={3}>
            <ContentLayout title="Alamat">
              <FormControl fullWidth>
                <TextField
                  disabled
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
        </Box>

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
                      value={formik.values.terlapor[index].nama || ""}
                      onChange={formik.handleChange}
                      onBlur={(e) => {
                        formik.handleBlur(e);
                        terlaporChanged();
                      }}
                    />
                  </FormControl>
                </ContentLayout>
                <ContentLayout title="Alamat">
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      name={`terlapor[${index}].alamat`}
                      value={formik.values.terlapor[index].alamat || ""}
                      onChange={formik.handleChange}
                      onBlur={(e) => {
                        formik.handleBlur(e);
                        terlaporChanged();
                      }}
                    />
                  </FormControl>
                </ContentLayout>
                <ContentLayout title="Telp">
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      name={`terlapor[${index}].telp`}
                      value={formik.values.terlapor[index].telp || ""}
                      onChange={formik.handleChange}
                      onBlur={(e) => {
                        formik.handleBlur(e);
                        terlaporChanged();
                      }}
                    />
                  </FormControl>
                </ContentLayout>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <h3>3. Peristiwa Yang Ditemukan:</h3>
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
                      value={formik.values.saksi[index].nama || ""}
                      onChange={formik.handleChange}
                      onBlur={(e) => {
                        formik.handleBlur(e);
                        saksiChanged();
                      }}
                    />
                  </FormControl>
                </ContentLayout>
                <ContentLayout title="Alamat">
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      name={`saksi[${index}].alamat`}
                      value={formik.values.saksi[index].alamat || ""}
                      onChange={formik.handleChange}
                      onBlur={(e) => {
                        formik.handleBlur(e);
                        saksiChanged();
                      }}
                    />
                  </FormControl>
                </ContentLayout>
                <ContentLayout title="Telp">
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      name={`saksi[${index}].telp`}
                      value={formik.values.saksi[index].telp || ""}
                      onChange={formik.handleChange}
                      onBlur={(e) => {
                        formik.handleBlur(e);
                        saksiChanged();
                      }}
                    />
                  </FormControl>
                </ContentLayout>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <h3>5. Bukti-bukti:</h3>
          <Alert severity="info">Diisi Pada Bagian Detail</Alert>
        </Box>

        <h3>6. Uraian Kejadian:</h3>
        {/* input uraian  */}
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
              {formik.isSubmitting ? "Memproses ..." : "Update"}
            </Button>
          </ContentLayout>
        </Box>
      </form>
    </div>
  );
}

export default TemuanFormEdit;
