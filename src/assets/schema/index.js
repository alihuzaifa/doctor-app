import * as Yup from 'yup';
const regex =
  /^(\+92|92|0)?(3\d{2}|4[1-9]\d|5\d{2}|6\d{2}|7\d{2}|8\d{2}|9\d{2})\d{7}$/;

const DoctorInitialValues = {
  drName: '',
  email: '',
  password: '',
  phoneNumber: '',
  // time: '',
  expert: '',
  // days: [],
};

const DoctorSiginInitialValues = {
  email: '',
  password: '',
};

const PatientInitialValues = {
  name: '',
  email: '',
  password: '',
  phoneNumber: '',
  disease: '',
};

const DoctorSignup = Yup.object().shape({
  drName: Yup.string().required('Please enter your name'),
  expert: Yup.string().required('Please enter your expertize'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Please enter your password'),
  phoneNumber: Yup.string()
    .matches(regex, 'Please enter a valid phone number')
    .required('Please enter your phone number'),
  // time: Yup.string().required('Please enter a time'),
  // days: Yup.array().min(1, 'Please select at least one day.'),
});

const DoctorSignin = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Please enter your password'),
});

const PatientSignup = Yup.object().shape({
  name: Yup.string().required('Please enter your name'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Please enter your password'),
  phoneNumber: Yup.string()
    .matches(regex, 'Please enter a valid phone number')
    .required('Please enter your phone number'),
  disease: Yup.string().required('Please enter your disease'),
});

const patientProfileInitialValues = {
  patientName: '',
  patientEmail: '',
  patientPhone: '',
  disease: '',
  patientPassword: '',
};
const patientProfileInitialSchema = Yup.object().shape({
  patientName: Yup.string().required('Please enter your name'),
  disease: Yup.string().required('Please enter your name'),
  patientEmail: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  patientPhone: Yup.string()
    .matches(regex, 'Please enter a valid phone number')
    .required('Please enter your phone number'),
  patientPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Please enter your password'),
});
const doctorProfileInitialValues = {
  drName: '',
  drEmail: '',
  drPhone: '',
  expertInDisease: '',
  drPassword: '',
  drAddress: '',
};
const doctorProfileInitialSchema = Yup.object().shape({
  drName: Yup.string().required('Please enter your name'),
  expertInDisease: Yup.string().required('Please enter your name'),
  drEmail: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  drPhone: Yup.string()
    .matches(regex, 'Please enter a valid phone number')
    .required('Please enter your phone number'),
  drPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Please enter your password'),
});

export {
  DoctorInitialValues,
  DoctorSignup,
  DoctorSiginInitialValues,
  DoctorSignin,
  PatientInitialValues,
  PatientSignup,
  patientProfileInitialValues,
  patientProfileInitialSchema,
  doctorProfileInitialValues,
  doctorProfileInitialSchema,
};
