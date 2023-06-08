import * as Yup from 'yup';

const fileSchema = Yup.object({
  url: Yup.string().required('Required!'),
  size: Yup.number().required('Required!'),
  mimeType: Yup.string().required('Required!'),
  extension: Yup.string().required('Required!'),
}).optional();

module.exports = { fileSchema };
