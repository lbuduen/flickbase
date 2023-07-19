import CircularProgress from "@mui/material/CircularProgress";
import { toast } from 'react-toastify'
import cookie from 'react-cookies';

export const errorHelper = (formik, field) => ({
  error: formik.errors[field] && formik.touched[field],
  helperText:
    formik.errors[field] && formik.touched[field] ? formik.errors[field] : null,
});

export const Loader = () => (
  <div className="root_loader">
    <CircularProgress />
  </div>
);

export const showToast = (type, msg) => {
  switch (type) {
    case 'SUCCESS':
      toast.success(msg);
      break;
    case 'ERROR':
      toast.error(msg);
      break;
  }
}

export const getTokenCookie = () => cookie.load("x-access-token");

export const delTokenCookie = () => cookie.remove("x-access-token", { path: '/' });

export const getAuthHeader = () => {
  return { "Authorization": `Bearer ${getTokenCookie()}` }
}

export const AdminTitle = ({ title }) => (
  <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
    <h1 className='h2'>{title}</h1>
  </div>
);

export const htmlDecode = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}
