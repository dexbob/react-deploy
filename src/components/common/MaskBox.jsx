import { motion } from 'framer-motion';
import Mask from './Mask';

export default function MaskBox({
	children,
	className = '',
	duration = 0.5,
	delay = 0,
	color = '#000',
	style
}) {
	const frameStyle = {
		display: 'inline-block',
		position: 'relative',
		overflow: 'hidden'
	};
	const { init, active, exit, time } = {
		init: { opacity: 0 },
		active: { opacity: 1 },
		exit: { opacity: 0, transition: { duration: 0.01, delay: duration / 4 + delay / 2 } },
		time: { duration: 0.01, delay: duration / 2 + delay }
	};

	return (
		<div className={className} style={{ ...frameStyle, ...style }}>
			<motion.div
				style={{ width: '100%', height: '100%' }}
				initial={init}
				animate={active}
				exit={exit}
				transition={time}>
				{children}
			</motion.div>
			<Mask duration={duration} delay={delay} color={color} />
		</div>
	);
}
