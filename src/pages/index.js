import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

// Components
import { Monitor } from '@/common/Monitor';
import { Login } from './login';

export default function Home() {
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
			{/* <div className={styles.scanlines}></div> */}
			<main className={styles.main}>
				<Login />
			</main>
		</>
	);
}
