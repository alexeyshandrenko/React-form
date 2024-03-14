import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '../../core/validation/validation';
import styles from './registration.module.css';

const Registration = () => {
	const buttonRef = useRef(null);

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			passwordRepeat: '',
		},
		resolver: yupResolver(registrationSchema),
	});

	useEffect(() => {
		buttonRef.current.disabled =
			errors.email || errors.password || errors.passwordRepeat;
	}, [errors.email, errors.password, errors.passwordRepeat]);

	useEffect(() => {
		if (isValid) {
			buttonRef.current.focus();
		}
	}, [isValid]);

	const onSubmit = (data) => {
		buttonRef.current.disabled = true;
		setTimeout(() => {
			console.log(data);
			reset();
			buttonRef.current.disabled = false;
		}, 3000);
	};

	return (
		<main className={styles.formWrapper}>
			<h2 className={styles.title}>Регистрация</h2>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<div className={styles.field}>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						id="email"
						placeholder="Введите email"
						{...register('email')}
					/>
					{errors.email && (
						<p className={styles.errorMessage}>{errors.email.message}</p>
					)}
				</div>
				<div className={styles.field}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						placeholder="Введите пароль"
						{...register('password')}
					/>
					{errors.password && (
						<p className={styles.errorMessage}>{errors.password.message}</p>
					)}
				</div>
				<div className={styles.field}>
					<label htmlFor="passwordRepeat">Repeat password</label>
					<input
						type="password"
						id="passwordRepeat"
						placeholder="Подтвердите пароль"
						{...register('passwordRepeat')}
					/>
					{errors.passwordRepeat && (
						<p className={styles.errorMessage}>
							{errors.passwordRepeat.message}
						</p>
					)}
				</div>
				<button ref={buttonRef} type="submit">
					Зарегистрироваться
				</button>
			</form>
		</main>
	);
};

export default Registration;
