import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

// Styles
import login from '../styles/Login.module.css';
import styles from '../styles/Home.module.css';

// Components
import Marquee from 'react-fast-marquee';
import { useRouter } from 'next/router';
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
	// Estado que maneja la visibilidad de escritura del typing automático
	const [autoLogWritting, setAutoLogWritting] = useState(true);

	// Estado que maneja si se logueó un usuario para mantener activa la escucha del evento click en useEffect
	const [hasSentPass, setHasSentPass] = useState(false);
	const [password, setPassword] = useState('');

	const inputRef = useRef();
	const boxRef = useRef();

	const router = useRouter();

	const submitPassword = (event) => {
		event.preventDefault();

		// Si la contraseña ingresada no coincide se añadirá el registro a la lista en formato de cascada
		if (password !== '@Model101') {
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
			router.push('/home');
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
			<Head>
				<title>Rick & Morty - ANR</title>
				<meta name="description" content="Henry API proyect" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				></link>
			</Head>
			{/* <Marquee
				style={{
					height: '150%',
					overflowX: 'visible',
					transform: 'rotate(90deg)',
					position: 'absolute',
				}}
				direction={'right'}
				gradient={false}
			></Marquee> */}
			<div className={styles.scanlines} />
			<main className={styles.main}>
				<div className={login.parentContainer} ref={boxRef}>
					<h1 className={login.profileName}>Rptec RAID BIOS v7.4</h1>
					<TypeAnimation
						style={{ whiteSpace: 'pre-line', display: 'block', lineHeight: '15px' }}
						className={login.profileName}
						sequence={[
							`
						(.#) username: Morty@B-308\n
						(.#) Morty@B-308's password:\n
						(.#) ... little hint: @Model101`,
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
						<span
							style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '14px' }}
						>
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
			</main>
		</>
	);
}
