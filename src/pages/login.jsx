import React from 'react';

// Styles
import login from '../styles/Login.module.css';

// Components
import CopMorty from '../assets/images/profile.png';
import Image from 'next/image';

import { TypeAnimation } from 'react-type-animation';

export const Login = () => {
	return (
		<>
			<div className={login.parentContainer}>
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
						(.#) username: MortyCop#586\n
						(.#) enter password: `, // actual line-break inside string literal also gets animated in new line, but ensure there are no leading spaces
					]}
					speed={75}
					cursor={true}
					repeat={1}
				/>
			</div>
		</>
	);
};
