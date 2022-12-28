import * as Yup from 'yup';

const PassCategorySchema = Yup.object({
  title: Yup.string().required('Required!'),
  numberOfTokens: Yup.number().positive('number of tokens should be positive'),
  price: Yup.number().positive('price should be positive'),
  tokenId: Yup.number().optional(),
});

export { PassCategorySchema };
