import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  location: Yup.string().required('Location is required'),
  date: Yup.date().required('Date is required'),
  timeStart: Yup.string().required('Start time is required'),
  timeEnd: Yup.string().required('End time is required'),
});

export default validationSchema;
