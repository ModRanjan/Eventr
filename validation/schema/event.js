import * as Yup from 'yup';

const EventSchema = Yup.object({
  title: Yup.string().required('Required!'),
  description: Yup.string().max(250, 'Too Long!').optional(),
  startDate: Yup.date().required('Required!'),
  endDate: Yup.date().required('Required!'),
  profileURL: Yup.string().optional(),
  coverURL: Yup.string().optional(),
});

export { EventSchema };
