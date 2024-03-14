import { useState, useRef } from 'react';

import { EMAIL_REGEXP, PASSWORD_REGEXP } from '../../core/utils/regex';
import styles from './registration.module.css';

const Registration = () => {
	const buttonRef = useRef(null);
	const [form, setForm] = useState({
		email: '',
		password: '',
		passwordRepeat: '',
	});
	const [emailErrorMessage, setEmailErrorMessage] = useState('');
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
	const [passwordRepeatErrorMessage, setPasswordRepeatErrorMessage] = useState('');
	const isActiveButton =
		!emailErrorMessage &&
		!passwordErrorMessage &&
		!passwordRepeatErrorMessage &&
		form.email &&
		form.password &&
		form.passwordRepeat;

	const validateField = (name, value) => {
		switch (name) {
			case 'email':
				setEmailErrorMessage('');
				if (!EMAIL_REGEXP.test(value)) {
					setEmailErrorMessage('Please enter a valid email!');
				}
				break;
			case 'password':
				setPasswordErrorMessage('');
				if (!PASSWORD_REGEXP.test(value)) {
					setPasswordErrorMessage(
						'Password must be consider at least one number, one special character, uppercase or lowercase symbols!\n',
					);
				}
				if (value.length < 8) {
					setPasswordErrorMessage(
						(prev) => prev + 'Password must be at least 8 characters!',
					);
				}
				break;
			default:
				setPasswordRepeatErrorMessage('');
				if (form.password !== value) {
					setPasswordRepeatErrorMessage('Passwords are not matching!');
				}
				break;
		}
	};

	const onChange = (event) => {
		const { value, name } = event.target;
		setForm((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});

		validateField(name, value);
	};

	const onBlur = () => {
		if (isActiveButton) {
			buttonRef.current.focus();
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(form);
	};

	return (
		<main className={styles.formWrapper}>
			<h2 className={styles.title}>Create account</h2>
			<form
				onSubmit={handleSubmit}
				className={styles.form}
				autoComplete="off"
				role="presentation"
			>
				<div className={styles.field}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Enter email"
						value={form.email}
						onChange={onChange}
						onBlur={onBlur}
					/>
					{emailErrorMessage && (
						<p className={styles.errorMessage}>{emailErrorMessage}</p>
					)}
				</div>

				<div className={styles.field}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Enter password"
						value={form.password}
						onChange={onChange}
						onBlur={onBlur}
					/>
					{passwordErrorMessage && (
						<p className={styles.errorMessage}>{passwordErrorMessage}</p>
					)}
				</div>

				<div className={styles.field}>
					<label htmlFor="passwordRepeat">Repeat password</label>
					<input
						type="password"
						id="passwordRepeat"
						name="passwordRepeat"
						placeholder="Repeat password"
						value={form.passwordRepeat}
						onChange={onChange}
						onBlur={onBlur}
					/>
					{passwordRepeatErrorMessage && (
						<p className={styles.errorMessage}>
							{passwordRepeatErrorMessage}
						</p>
					)}
				</div>

				<button ref={buttonRef} disabled={!isActiveButton} type="submit">
					Create Account
				</button>
			</form>
		</main>
	);
};

export default Registration;
