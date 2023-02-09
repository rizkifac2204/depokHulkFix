import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import { makeStyles } from "@mui/styles";

// components
import Thumb from "components/GlobalComponents/Thumb";
import ContentLayout from "components/GlobalComponents/ContentLayout";

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
  email_admin: yup.string("Masukan Email").email("Email Tidak Valid"),
  username: yup.string().required("Username Harus Diisi"),
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

const useHandleSubmitMutation = (user) => {
  return useMutation(async (formPayload) => {
    return axios
      .put(`/api/simpeg/${user.id}/edit`, formPayload, {
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

const handleSubmit = (values, setSubmitting, mutate, refetch) => {
  const form = new FormData();
  for (var key in values) {
    form.append(key, values[key]);
  }
  mutate(form, {
    onSuccess: (response) => {
      toast.success(response.message);
      // fetch/ambil ulang data
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => setSubmitting(false),
  });
};

function SimpegFormUtama({ user, refetch }) {
  const classes = useStyles();
  const { mutate } = useHandleSubmitMutation(user);

  const formik = useFormik({
    initialValues: user
      ? {
          foto_admin: user.foto_admin || "",
          nama_level: user.nama_level || "",
          nama_admin: user.nama_admin || "",
          telp_admin: user.telp_admin || "",
          email_admin: user.email_admin || "",
          username: user.username || "",
        }
      : {
          foto_admin: "",
          nama_level: "",
          nama_admin: "",
          telp_admin: "",
          email_admin: "",
          username: "",
        },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, setSubmitting, mutate, refetch),
  });

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
          <ContentLayout title="Level User *">
            <FormControl fullWidth>
              <TextField
                disabled
                variant="standard"
                name="level"
                placeholder="Level"
                value={user.nama_level}
              />
            </FormControl>
          </ContentLayout>
        </Box>
        {/* input nama  */}
        <Box mb={3}>
          <ContentLayout title="Nama *">
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
          <ContentLayout title="Telp / HP *">
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
          <ContentLayout title="Username *">
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
              {formik.isSubmitting ? "Memproses ..." : "Simpan"}
            </Button>
          </ContentLayout>
        </Box>
      </form>
    </div>
  );
}

export default SimpegFormUtama;
