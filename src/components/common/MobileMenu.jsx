import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useZustandStore } from '../../hooks/useZustand';
import useThrottle from '../../hooks/useThrottle';
import navData from '../../data/navData';

export default function MobileMenu() {
	const setMenuClose = useZustandStore(state => state.setMenuClose);

	const { init, on, out, time } = {
		init: { x: -300, opacity: 0 },
		on: { x: 0, opacity: 1 },
		out: { x: -300, opacity: 0, transition: { duration: 0.5 } },
		time: { duration: 0.5 }
	};

	const closePanel = useThrottle(() => window.innerWidth >= 1000 && setMenuClose(), 500);

	useEffect(() => {
		window.addEventListener('resize', closePanel);
		return () => window.removeEventListener('resize', closePanel);
	}, [closePanel]);

	return (
		<motion.aside
			className='mobileMenu'
			initial={init}
			animate={on}
			exit={out}
			transition={time}
			onClick={setMenuClose}>
			<h1>
				<Link to='/'>ALPACO</Link>
			</h1>

			<ul>
				{navData.map((data, idx) => {
					return (
						<li key={idx}>
							<Link to={data.path}>
								{<data.icon />}
								{data.display}
							</Link>
						</li>
					);
				})}
			</ul>
		</motion.aside>
	);
}
