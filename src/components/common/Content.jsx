import { motion } from 'framer-motion';

export default function Content({ children, duration = 1, delay = 0, customMotion }) {
	const defaultMotion = {
		init: { opacity: 0, y: 200 },
		active: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 200 },
		time: { duration, delay: delay }
	};
	const combined = { ...defaultMotion, ...customMotion };
	const { init, active, exit, time } = {
		...combined,
		exit: { ...combined.exit, transition: { delay: 0 } }
	};
	return (
		<motion.div className='content' initial={init} animate={active} exit={exit} transition={time}>
			{children}
		</motion.div>
	);
}
