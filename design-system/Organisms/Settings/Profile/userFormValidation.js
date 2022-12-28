import * as Yup from 'yup';

export const userFormValidationSchema = Yup.object({
  name: Yup.string(),
  userName: Yup.string(),
  email: Yup.string(),
  endDate: Yup.string(),
  profileURL: Yup.string(),
  coverURL: Yup.string(),
});
