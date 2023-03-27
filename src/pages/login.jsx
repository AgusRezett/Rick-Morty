import React, { useEffect, useRef, useState } from 'react';

// Styles
import login from '../styles/Login.module.css';

// Components
import CopMorty from '../assets/images/profile.png';
import Image from 'next/image';

import { TypeAnimation } from 'react-type-animation';
import { Prompt } from 'next/font/google';

export const Login = () => {
	// Estado que maneja la visibilidad de escritura del typing automático
	const [autoLogWritting, setAutoLogWritting] = useState(true);
	// Estado que maneja si se logueó un usuario para mantener activa la escucha del evento click en useEffect
	const [hasSentPass, setHasSentPass] = useState(false);

	const [password, setPassword] = useState('');

	const inputRef = useRef();
	const boxRef = useRef();

	const submitPassword = (event) => {
		event.preventDefault();

		// Si la contraseña ingresada no coincide se añadirá el registro a la lista en formato de cascada
		if (password !== 'soyinvisible') {
			setAutoLogWritting(true);
			const textContainer = document.getElementById('textContainer');
			textContainer.innerHTML =
				textContainer.outerHTML + `<p style=${'margin-top:' + '14px'}>>>> ${password}</p>`;
			setTimeout(() => {
				textContainer.innerHTML =
					textContainer.outerHTML + `<p style=${'margin-top:' + '14px'}>invalid password</p>`;
			}, 500);
			setPassword('');
			setAutoLogWritting(false);
		} else {
			//redireccionar a home
			//...
		}
	};

	useEffect(() => {
		// Evita que el usuario desvíe el cursor de la escritura al hacer click en cualquier lado
		window.onclick = (event) => {
			if (!hasSentPass && inputRef.current) {
				inputRef.current.focus();
			}
		};
	}, []);

	return (
		<>
			<div className={login.parentContainer} ref={boxRef}>
				<p className={login.profileName}>Rptec RAID BIOS v7.4</p>
				<TypeAnimation
					style={{ whiteSpace: 'pre-line', display: 'block', lineHeight: '15px' }}
					className={login.profileName}
					sequence={[
						`
						(.#) username: Morty@B-308\n
						(.#) Morty@B-308's password (shift + p):`,
						() => {
							setAutoLogWritting(false);
							setTimeout(() => {
								inputRef.current.focus();
							}, 100);
						},
					]}
					speed={75}
					cursor={false}
					repeat={1}
				/>
				<div id="textContainer"></div>
				{!autoLogWritting && (
					<span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '14px' }}>
						<p>{'\t>>>'}</p>
						<form action="" onSubmit={submitPassword}>
							<input
								ref={inputRef}
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								id="message"
								name="message"
								className={login.passwordInput}
							/>
						</form>
					</span>
				)}
			</div>
		</>
	);
};
