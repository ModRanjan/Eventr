import * as Yup from 'yup';

const fileSchema = Yup.object({
  url: Yup.string().required('Required!'),
  size: Yup.number().optional(),
  mimeType: Yup.string().required('Required!'),
  extension: Yup.string().required('Required!'),
}).optional();

module.exports = { fileSchema };
