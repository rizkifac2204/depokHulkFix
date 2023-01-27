import { useFormik } from "formik";
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

// components
import Thumb from "components/GlobalComponents/Thumb";
import ContentLayout from "components/GlobalComponents/ContentLayout";
import Wait from "components/GlobalComponents/Wait";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  profileThumb: {
    "& >div": {
      "& >div": {
        "& >div:first-child": {
          alignSelf: "center",
        },
      },
    },
  },
  fileUpload: {
    "& input": {
      height: "auto",
    },
  },
}));

const validationSchema = yup.object({
  nama_admin: yup.string("Masukan Nama").required("Harus Diisi"),
  telp_admin: yup.string("Masukan Telp/HP").required("Telp Harus Diisi"),
  email_admin: yup
    .string("Masukan Email")
    .email("Email Tidak Valid")
    .required("Email Harus Diisi"),
  username: yup.string().required("Username Harus Diisi"),
  passwordConfirm: yup.string().required("Password Harus Diisi"),
  file: yup
    .mixed()
    .test(
      "FILE_SIZE",
      "Ukuran Gambar Tidak Boleh Melebihi 10mb.",
      (value) => !value || (value && value.size <= 10485760) // 10 mb
    )
    .test(
      "FILE_FORMAT",
      "Format Gambar Tidak Sesuai.",
      (value) =>
        !value ||
        (value &&
          [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/bmp",
          ].includes(value.type))
    )
    .when("foto_admin", {
      is: (foto_admin) => !foto_admin,
      then: yup.mixed().required("Harus Upload"),
      otherwise: yup.mixed(),
    }),
});

const useHandleSubmitMutation = () => {
  return useMutation((formPayload) => {
    return axios
      .put(`/api/profile/editprofile`, formPayload, {
        headers: {
          "content-type": "multipart/form-data",
          destinationfile: "foto",
        },
        onUploadProgress: (event) => {
          console.log(
            `Current progress:`,
            Math.round((event.loaded * 100) / event.total)
          );
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        let tempMassage = "Gagal Proses";
        if (err.response.status == 404) {
          tempMassage =
            "Mohon Maaf, Hilangkan atau ganti spesial karakter pada inputan anda";
        }
        const msg = err.response.data.message
          ? err.response.data.message
          : tempMassage;
        throw new Error(msg);
      });
  });
};

const handleSubmit = (values, setSubmitting, mutate, queryClient) => {
  const form = new FormData();
  for (var key in values) {
    form.append(key, values[key]);
  }
  // for (var pair of form.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }
  mutate(form, {
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

function ProfileFormUtama() {
  const classes = useStyles();
  const { mutate } = useHandleSubmitMutation();
  const queryClient = useQueryClient();
  const {
    data: profile,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: ({ signal }) =>
      axios
        .get(`/api/profile`, { signal })
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err.response.data.message);
        }),
  });

  const formik = useFormik({
    initialValues: profile
      ? { ...profile, passwordConfirm: "" }
      : {
          foto_admin: "",
          nama_level: "",
          nama_admin: "",
          telp_admin: "",
          email_admin: "",
          username: "",
          passwordConfirm: "",
        },
    enableReinitialize: true,
    validationSchema: validationSchema,
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
        {/* input foto  */}
        <Box mb={3} className={classes.profileThumb}>
          <ContentLayout title="Foto">
            <Box width="100%" display="flex" alignItems="center">
              <Box pr={2} className="avatar-thumb">
                <Thumb
                  altText={formik.values.nama_admin}
                  file={
                    formik.values.file
                      ? formik.values.file
                      : formik.values.foto_admin
                  }
                />
              </Box>
              <Box width="100%">
                <TextField
                  fullWidth
                  type="file"
                  id="file"
                  name="file"
                  accept="image/*"
                  className={classes.fileUpload}
                  onBlur={formik.handleBlur}
                  onChange={(event) => {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}
                />
              </Box>
            </Box>
            <FormHelperText style={{ color: "red" }}>
              {formik.touched.file && formik.errors.file}
            </FormHelperText>
          </ContentLayout>
        </Box>
        {/* input level  */}
        <Box mb={3}>
          <ContentLayout title="Level User">
            <FormControl fullWidth>
              <TextField
                disabled
                variant="standard"
                name="level"
                placeholder="Level"
                value={profile.nama_level}
              />
            </FormControl>
          </ContentLayout>
        </Box>
        {/* input nama  */}
        <Box mb={3}>
          <ContentLayout title="Nama">
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
        {/* input telp  */}
        <Box mb={3}>
          <ContentLayout title="Telp / HP">
            <FormControl fullWidth>
              <TextField
                required
                variant="standard"
                name="telp_admin"
                placeholder="Telp"
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
        {/* input email  */}
        <Box mb={3}>
          <ContentLayout title="Email">
            <FormControl fullWidth>
              <TextField
                required
                variant="standard"
                name="email_admin"
                placeholder="Email"
                type="email"
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
          <ContentLayout title="Username">
            <FormControl fullWidth>
              <TextField
                required
                variant="standard"
                placeholder="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
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
        {/* Submit  */}
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

export default ProfileFormUtama;
