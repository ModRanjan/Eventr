import * as Yup from 'yup';
const { fileSchema } = require('./file');

const createSchema = Yup.object({
  title: Yup.string().required('Required!'),
  description: Yup.string().optional(),
  startDate: Yup.date().required('Required!'),
  endDate: Yup.date().required('Required!'),
  profileURL: Yup.string().required('Required!'),
  coverURL: Yup.string().required('Required!'),
  // profile: fileSchema,
  // cover: fileSchema,
});

const updateSchema = Yup.object({
  title: Yup.string().required('Required!'),
  description: Yup.string('Required!'),
  startDate: Yup.date().required('Required!'),
  endDate: Yup.date().required('Required!'),
  // profile: fileSchema,
  // cover: fileSchema,
});

export { createSchema, updateSchema };
