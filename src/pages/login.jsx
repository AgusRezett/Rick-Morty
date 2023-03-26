import React, { useEffect, useRef, useState } from 'react';

// Styles
import login from '../styles/Login.module.css';

// Components
import CopMorty from '../assets/images/profile.png';
import Image from 'next/image';

import { TypeAnimation } from 'react-type-animation';

export const Login = () => {
	const [autoLogWritting, setAutoLogWritting] = useState(true);
	const [hasSentPass, sethasSentPass] = useState(false);

	const [password, setPassword] = useState('');

	const inputRef = useRef(null);
	const boxRef = useRef();

	const submitPassword = (event) => {
		event.preventDefault();
		console.log(password);

		if (password !== 'soyinvisible') {
			setAutoLogWritting(true);
			const textContainer = document.getElementById('textContainer');

			//const e = document.createElement('div');
			//console.log(e);
			//e.innerHTML = 'JavaScript DOM';
			textContainer.innerHTML =
				textContainer.outerHTML + `<p style=${'margin-top:' + '14px'}>>>> ${password}</p>`;
			setTimeout(() => {
				textContainer.innerHTML =
					textContainer.outerHTML + `<p style=${'margin-top:' + '14px'}>invalid password</p>`;
			}, 500);
			setPassword('');
			setAutoLogWritting(false);
		} else {
		}
	};

	useEffect(() => {
		window.onclick = (event) => {
			if (!hasSentPass && inputRef.current) {
				inputRef.current.focus();
			}
		};
	}, []);

	return (
		<>
			<div className={login.parentContainer} ref={boxRef}>
				{/* <Image
					className={login.profileImage}
					src={CopMorty}
					alt="Picture of the author"
					width={'20%'}
					height={'20%'}
					style={{ height: 'auto', width: '20%', filter: 'drop-shadow(0 0 0.2rem #142312)' }}
				/> */}
				<p className={login.profileName}>Rptec RAID BIOS v7.4</p>
				<TypeAnimation
					style={{ whiteSpace: 'pre-line', display: 'block', lineHeight: '15px' }}
					className={login.profileName}
					sequence={[
						`
						(.#) username: Morty@B-308\n
						(.#) enter password (visible with: shift + p): `, // actual line-break inside string literal also gets animated in new line, but ensure there are no leading spaces
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
