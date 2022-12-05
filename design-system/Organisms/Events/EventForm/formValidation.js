import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required('Required!'),
  description: Yup.string().required('Required!'),
  startDate: Yup.string().required('Required!'),
  endDate: Yup.string().required('Required!'),
  profileURL: Yup.string().required('Required!'),
  coverURL: Yup.string().required('Required!'),
});
