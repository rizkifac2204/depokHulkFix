import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import FormHelperText from "@mui/material/FormHelperText";
import { makeStyles } from "@mui/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// components
import Thumb from "components/GlobalComponents/Thumb";
import ContentLayout from "components/GlobalComponents/ContentLayout";
import Wait from "components/GlobalComponents/Wait";

import { useAuthContext } from "context/AuthContext";

const validationSchema = yup.object({
  level_id: yup.number().required("Harus Dipilih"),
  verifikator: yup.number("Masukan verifikator").required("Harus Dipilih"),
  nama_admin: yup.string("Masukan Nama").required("Harus Diisi"),
  telp_admin: yup.string("Masukan Telp/HP"),
  email_admin: yup.string("Masukan Email").email("Email Tidak Valid"),
  provinsi_id: yup.number().when("level_id", {
    is: (level_id) => level_id > 2,
    then: yup.number().required("Harus diisi"),
    otherwise: yup.number(),
  }),
  kabkota_id: yup.number().when("level_id", {
    is: (level_id) => level_id > 3,
    then: yup.number().required("Harus diisi"),
    otherwise: yup.number(),
  }),
  kecamatan_id: yup.number().when("level_id", {
    is: (level_id) => level_id > 4,
    then: yup.number().required("Harus diisi"),
    otherwise: yup.number(),
  }),
  kelurahan_id: yup.number().when("level_id", {
    is: (level_id) => level_id > 5,
    then: yup.number().required("Harus diisi"),
    otherwise: yup.number(),
  }),
  username: yup.string().required("Username Harus Diisi"),
  password: yup.string().required("Password Harus Diisi"),
  passwordConfirm: yup
    .string()
    .required("Konfirmasi Password Harus Diisi")
    .oneOf([yup.ref("password"), null], "Passwords Tidak Sama"),
});

const handleSubmit = (values, setSubmitting) => {
  axios
    .post(`/api/simpeg`, values)
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

function FormSimpegAdd() {
  const { user } = useAuthContext();

  const initialvalues = {
    level_id: "",
    verifikator: 0,
    nama_admin: "",
    telp_admin: "",
    email_admin: "",
    provinsi_id: "32",
    kabkota_id: "3276",
    kecamatan_id: "",
    kelurahan_id: "",
    username: "",
    password: "",
    passwordConfirm: "",
  };

  const [selectedProvinsi, setSelectedProvinsi] = useState({});
  const [selectedKabkota, setSelectedKabkota] = useState({});
  const [selectedKecamatan, setSelectedKecamatan] = useState({});
  const [selectedKelurahan, setSelectedKelurahan] = useState({});
  const idProvinsi = selectedProvinsi?.id || null;
  const idKabkota = selectedKabkota?.id || null;
  const idKecamatan = selectedKecamatan?.id || null;
  const idKelurahan = selectedKelurahan?.id || null;

  // SERVICES LEVEL
  const {
    data: level,
    isError: isErrorLevel,
    isLoading: isLoadingLevel,
    isFetching: isFetchingLevel,
  } = useQuery({
    initialData: [],
    queryKey: ["services", "level"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/services/level`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  // SERVICES PROVINSI
  const {
    data: provinsi,
    isError: isErrorProvinsi,
    isLoading: isLoadingProvinsi,
    isFetching: isFetchingProvinsi,
  } = useQuery({
    initialData: [],
    queryKey: ["services", "provinsi"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/services/provinsi`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  // SERVICES KABKOTA
  const {
    data: kabkota,
    isError: isErrorKabkota,
    isLoading: isLoadingKabkota,
    isFetching: isFetchingKabkota,
  } = useQuery({
    initialData: [],
    enabled: !!idProvinsi,
    queryKey: ["services", "provinsi", idProvinsi, "kabkota"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/services/provinsi/${idProvinsi}/kabkota`, {
          signal,
        })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  // SERVICES KECAMATAN
  const {
    data: kecamatan,
    isError: isErrorKecamatan,
    isLoading: isLoadingKecamatan,
    isFetching: isFetchingKecamatan,
  } = useQuery({
    initialData: [],
    enabled: !!idKabkota,
    queryKey: [
      "services",
      "provinsi",
      idProvinsi,
      "kabkota",
      idKabkota,
      "kecamatan",
    ],
    queryFn: ({ signal }) =>
      axios
        .get(
          `/api/services/provinsi/${idProvinsi}/kabkota/${idKabkota}/kecamatan`,
          {
            signal,
          }
        )
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  // SERVICES KELURAHAN
  const {
    data: kelurahan,
    isError: isErrorKelurahan,
    isLoading: isLoadingKelurahan,
    isFetching: isFetchingKelurahan,
  } = useQuery({
    initialData: [],
    enabled: !!idKecamatan,
    queryKey: [
      "services",
      "provinsi",
      idProvinsi,
      "kabkota",
      idKabkota,
      "kecamatan",
      idKecamatan,
      "kelurahan",
    ],
    queryFn: ({ signal }) =>
      axios
        .get(
          `/api/services/provinsi/${idProvinsi}/kabkota/${idKabkota}/kecamatan/${idKecamatan}/kelurahan`,
          {
            signal,
          }
        )
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, setSubmitting),
  });

  // validasi jika pilih level
  useEffect(() => {
    if (!level) return;
    formik.setFieldValue("kecamatan_id", "");
    formik.setFieldValue("kelurahan_id", "");
  }, [formik.values.level_id, level]);

  // validasi ulang kebupaten jika pilih provinsi
  useEffect(() => {
    if (!provinsi) return;
    const selected = provinsi.filter((prov) => {
      return prov.id === formik.values.provinsi_id;
    });
    setSelectedProvinsi(selected[0]);
  }, [formik.values.provinsi_id, provinsi]);

  // validasi ulang kecamatan jika pilih kabkota
  useEffect(() => {
    if (!kabkota) return;
    const selected = kabkota.filter((kabkota) => {
      return kabkota.id === formik.values.kabkota_id;
    });
    setSelectedKabkota(selected[0]);
  }, [formik.values.kabkota_id, kabkota]);

  // validasi ulang kelurahan jika pilih kecamatan
  useEffect(() => {
    if (!kecamatan) return;
    const selected = kecamatan.filter((kecamatan) => {
      return kecamatan.id === formik.values.kecamatan_id;
    });
    setSelectedKecamatan(selected[0]);
    formik.setFieldValue("kelurahan_id", "");
  }, [formik.values.kecamatan_id, kecamatan]);

  // validasi ulang kelurahan jika pilih kecamatan
  useEffect(() => {
    if (!kelurahan) return;
    const selected = kelurahan.filter((kelurahan) => {
      return kelurahan.id === formik.values.kelurahan_id;
    });
    setSelectedKelurahan(selected[0]);
  }, [formik.values.kelurahan_id, kelurahan]);

  if (!user) return <Wait loading={true} />;

  return (
    <div className="hk-general-settings">
      <form onSubmit={formik.handleSubmit}>
        {/* input level  */}
        <Box mb={3}>
          <ContentLayout title="Unit *">
            {isLoadingLevel && "Loading..."}
            {isErrorLevel && "Gagal Mengambil Data"}
            {level ? (
              <FormControl
                fullWidth
                required
                variant="standard"
                error={Boolean(formik.errors.level_id)}
              >
                <Select
                  name="level_id"
                  value={formik.values.level_id}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">Pilih</MenuItem>

                  {level
                    .filter((item) => {
                      if (user.level === 1) return item;
                      if (user.verifikator === 1) return item.id >= user.level;
                      return item.id > user.level;
                    })
                    .map((i, idx) => (
                      <MenuItem key={idx} value={i.id}>
                        {i.nama_level}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            ) : null}
            <FormHelperText style={{ color: "red" }}>
              {formik.touched.level_id && formik.errors.level_id}
            </FormHelperText>
          </ContentLayout>
        </Box>
        {/* input provinsi  */}
        <Box mb={3}>
          <ContentLayout title="Provinsi *">
            {isLoadingProvinsi && "Loading..."}
            {isErrorProvinsi && "Gagal Mengambil Data"}
            {provinsi.length !== 0 ? (
              <FormControl
                fullWidth
                disabled
                variant="standard"
                error={Boolean(formik.errors.provinsi_id)}
              >
                <Select
                  name="provinsi_id"
                  value={formik.values.provinsi_id}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">Pilih</MenuItem>
                  {provinsi.map((i, idx) => (
                    <MenuItem key={idx} value={i.id}>
                      {i.provinsi}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
            <FormHelperText style={{ color: "red" }}>
              {formik.touched.provinsi_id && formik.errors.provinsi_id}
            </FormHelperText>
          </ContentLayout>
        </Box>
        {/* input kabkota  */}
        <Box mb={3}>
          <ContentLayout title="Kabupaten/Kota *">
            {isFetchingKabkota && "Memuat..."}
            {isLoadingKabkota && "Menunggu Pilihan Provinsi..."}
            {isErrorKabkota && "Gagal Mengambil Data"}
            {kabkota.length !== 0 ? (
              <FormControl
                fullWidth
                disabled
                variant="standard"
                error={Boolean(formik.errors.kabkota_id)}
              >
                <Select
                  name="kabkota_id"
                  value={formik.values.kabkota_id}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="">Pilih</MenuItem>
                  {kabkota.map((i, idx) => (
                    <MenuItem key={idx} value={i.id}>
                      {i.kabkota}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
            <FormHelperText style={{ color: "red" }}>
              {formik.touched.kabkota_id && formik.errors.kabkota_id}
            </FormHelperText>
          </ContentLayout>
        </Box>
        {/* input kecamatan  */}
        {formik.values.level_id > 4 && (
          <Box mb={3}>
            <ContentLayout title="Kecamatan *">
              {isFetchingKecamatan && "Memuat..."}
              {isLoadingKecamatan && "Menunggu Pilihan Kabupaten/Kota..."}
              {isErrorKecamatan && "Gagal Mengambil Data"}
              {kecamatan ? (
                <FormControl
                  required
                  fullWidth
                  variant="standard"
                  error={Boolean(formik.errors.kecamatan_id)}
                >
                  <Select
                    name="kecamatan_id"
                    value={formik.values.kecamatan_id}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="">Pilih</MenuItem>
                    {kecamatan.map((i, idx) => (
                      <MenuItem key={idx} value={i.id}>
                        {i.kecamatan}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
              <FormHelperText style={{ color: "red" }}>
                {formik.touched.kecamatan_id && formik.errors.kecamatan_id}
              </FormHelperText>
            </ContentLayout>
          </Box>
        )}
        {/* input kelurahan  */}
        {formik.values.level_id > 5 && (
          <Box mb={3}>
            <ContentLayout title="Kelurahan/Desa *">
              {isFetchingKelurahan && "Memuat..."}
              {isLoadingKelurahan && "Menunggu Pilihan Kecamatan..."}
              {isErrorKelurahan && "Gagal Mengambil Data"}
              {kelurahan.length !== 0 ? (
                <FormControl
                  required
                  fullWidth
                  variant="standard"
                  error={Boolean(formik.errors.kelurahan_id)}
                >
                  <Select
                    name="kelurahan_id"
                    value={formik.values.kelurahan_id}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="">Pilih</MenuItem>
                    {kelurahan.map((i, idx) => (
                      <MenuItem key={idx} value={i.id}>
                        {i.kelurahan}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
              <FormHelperText style={{ color: "red" }}>
                {formik.touched.kelurahan_id && formik.errors.kelurahan_id}
              </FormHelperText>
            </ContentLayout>
          </Box>
        )}
        {/* input nama_admin  */}
        <Box mb={3}>
          <ContentLayout title="Nama Pegawai *">
            <FormControl fullWidth>
              <TextField
                required
                variant="standard"
                name="nama_admin"
                placeholder="Nama"
                value={formik.values.nama_admin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.nama_admin && Boolean(formik.errors.nama_admin)
                }
                helperText={
                  formik.touched.nama_admin && formik.errors.nama_admin
                }
              />
            </FormControl>
          </ContentLayout>
        </Box>
        {/* input telp_admin  */}
        <Box mb={3}>
          <ContentLayout title="Nomor Telp/HP Pegawai">
            <FormControl fullWidth>
              <TextField
                variant="standard"
                name="telp_admin"
                placeholder="Telp/HP"
                value={formik.values.telp_admin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.telp_admin && Boolean(formik.errors.telp_admin)
                }
                helperText={
                  formik.touched.telp_admin && formik.errors.telp_admin
                }
              />
            </FormControl>
          </ContentLayout>
        </Box>
        {/* input email_admin  */}
        <Box mb={3}>
          <ContentLayout title="Email Pegawai">
            <FormControl fullWidth>
              <TextField
                type="email"
                variant="standard"
                name="email_admin"
                placeholder="Email"
                value={formik.values.email_admin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.email_admin &&
                  Boolean(formik.errors.email_admin)
                }
                helperText={
                  formik.touched.email_admin && formik.errors.email_admin
                }
              />
            </FormControl>
          </ContentLayout>
        </Box>
        {/* input username  */}
        <Box mb={3}>
          <ContentLayout title="Username Pegawai *">
            <FormControl fullWidth>
              <TextField
                required
                variant="standard"
                name="username"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.email_admin && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </FormControl>
          </ContentLayout>
        </Box>
        {/* input password  */}
        <Box mb={3}>
          <ContentLayout title="Password Pegawai *">
            <FormControl fullWidth>
              <TextField
                required
                type="password"
                variant="standard"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </FormControl>
          </ContentLayout>
        </Box>
        {/* input passwordConfirm  */}
        <Box mb={3}>
          <ContentLayout title="Konfirmasi Password Pegawai *">
            <FormControl fullWidth>
              <TextField
                required
                type="password"
                variant="standard"
                name="passwordConfirm"
                placeholder="Ulangi Password"
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
              {formik.isSubmitting ? "Memproses ..." : "Simpan"}
            </Button>
          </ContentLayout>
        </Box>
      </form>
    </div>
  );
}

export default FormSimpegAdd;
