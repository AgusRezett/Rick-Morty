import Head from 'next/head';
import Image from 'next/image';

// Styles
import styles from '@/styles/Home.module.css';
import menu from '@/styles/Menu.module.css';

// Components
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
	const [autoLogWritting, setAutoLogWritting] = useState(true);
	const [selectedOption, setSelectedOption] = useState(0);
	const router = useRouter();

	const options = [
		{ value: 0, name: 'Show all' },
		{ value: 1, name: 'List selected' },
		{ value: 2, name: 'Search' },
		{ value: 3, name: 'Exit console', action: router.back },
	];

	const handleSelectOption = (option) => {
		setSelectedOption(option);
	};

	const handleArrowUp = () => {
		if (selectedOption > 0) {
			setSelectedOption(selectedOption - 1);
		}
	};

	const handleArrowDown = () => {
		if (selectedOption < options.length - 1) {
			setSelectedOption(selectedOption + 1);
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === 'ArrowUp') {
			handleArrowUp();
		} else if (event.key === 'ArrowDown') {
			handleArrowDown();
		} else if (event.key === 'Enter') {
			const optionSelected = options.find((option) => {
				return option.value === selectedOption;
			});
			optionSelected.action();

			//console.log(selectedOption);
			//document.getElementById('menuOption' + selectedOption).click();
			handleSelectOption(selectedOption);
		}
	};

	const useKeyDown = (callback, keys) => {
		const onKeyDown = (event) => {
			const wasAnyKeyPressed = keys.some((key) => event.key === key);
			handleKeyPress(event);
			/* console.log(event.key);
			if (wasAnyKeyPressed) {
				event.preventDefault();
				callback();
			} */
		};
		useEffect(() => {
			document.addEventListener('keydown', onKeyDown);
			return () => {
				document.removeEventListener('keydown', onKeyDown);
			};
		}, [onKeyDown]);
	};

	// Example usage:
	useKeyDown(() => {
		someCallback();
	}, ['Escape']);

	return (
		<>
			<Head>
				<title>Rick & Morty - Home</title>
				<meta name="description" content="Henry API proyect" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				></link>
			</Head>
			{/* <div className={styles.scanlines} /> */}
			<main className={styles.main}>
				<h1>Welcome back Morty@B-308</h1>
				<TypeAnimation
					style={{ whiteSpace: 'pre-line', display: 'block', lineHeight: '15px' }}
					//className={login.profileName}
					sequence={[
						`
						ᗩᒪᒪᓰᘉ ᕼᗩᘻᑘSᕴᗩᖻᖽᐸᓰᑢᕼᓰᖽᐸ\n
						ᗩᒪSᓰᕴ’ᓰᖽᐸᑘᘉᗩᖶᗩ ᘻᗩSᖽᐸᕼᗩSᕵᗩ\n
						...ᖽᐸᑘᖶᓰᑢᕼᓰᖻ\n
						FATALL: ᎮᏗᎤᏬᏋᏖᏋ ፈᏂᎥᏁᏦᏗፈᏂᎥᎩ\n
						ᏰᏬᏕፈᏗᏁᎴᎧ ፈᏒᎥᎷᎥᏁᏗᏝᏋᏕ\n
						...\n
						∀`,
						() => {
							setAutoLogWritting(false);
						},
					]}
					speed={99}
					cursor={false}
					repeat={1}
				/>

				{!autoLogWritting && (
					<>
						<div>
							<p style={{ marginTop: '14px' }}>================ criminals ==================</p>
							{options.map(
								(option) =>
									option.value !== options.length - 1 && (
										<div
											style={{ marginTop: '14px' }}
											id={'menuOption' + option.value}
											key={option.value}
											className={selectedOption === option.value ? menu.menuSelectedOption : ''}
										>
											| {selectedOption === option.value ? `> ${option.name}` : option.name} |
										</div>
									)
							)}
							<p style={{ marginTop: '14px' }}>=============================================</p>
							{options.map(
								(option) =>
									option.value === options.length - 1 && (
										<div
											style={{ marginTop: '14px' }}
											id={'menuOption' + option.value}
											key={option.value}
											className={selectedOption === option.value ? menu.menuSelectedOption : ''}
										>
											{selectedOption === option.value ? `> ${option.name}` : option.name}
										</div>
									)
							)}
						</div>
					</>
				)}
			</main>
		</>
	);
}
