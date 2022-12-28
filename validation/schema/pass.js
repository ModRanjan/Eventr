import * as Yup from 'yup';

const PassSchema = Yup.object({
  title: Yup.string().required('Required!'),
  dropType: Yup.string().required('Required!'),
  contractType: Yup.string().required('Required!'),
  contractAddress: Yup.string().required('Required!'),
});

export { PassSchema };
