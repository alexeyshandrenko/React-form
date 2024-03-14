import * as yup from 'yup';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '../utils/regex';

export const registrationSchema = yup.object().shape({
	email: yup
		.string()
		.required('Требуется ввести email!')
		.matches(EMAIL_REGEXP, 'Пожалуйста, введите корректный пароль!'),
	password: yup
		.string()
		.required('Требуется ввести пароль!')
		.min(8, 'Пароль должен содержать минимум 8 символов!')
		.matches(
			PASSWORD_REGEXP,
			'Пароль должен содержать прописные и строчные буквы, цифры и специальные символы (!@#$%^&*?~)!',
		),
	passwordRepeat: yup
		.string()
		.required('Пожалуйста, подтвердите пароль!')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают!'),
});
