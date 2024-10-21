import { motion } from 'framer-motion';

export default function Mask({ duration = 0.5, delay = 0, color = '#000', style }) {
	const maskStyle = {
		width: '120%',
		height: '100%',
		position: 'absolute',
		top: 0,
		// backgroundColor: color,
		background: `linear-gradient(90deg, ${color}, #eee)`
	};
	const maskMotion = {
		in: { x: '-100%' },
		on: { x: '100%' },
		out: {
			opacity: 0,
			x: '-100%',
			transition: { duration: duration / 2, delay: duration / 4 + delay / 2, ease: 'easeOut' }
		},
		time: { duration, delay, ease: 'easeIn' }
	};
	return (
		<motion.div
			className='mask'
			style={{ ...maskStyle, ...style }}
			variants={maskMotion}
			initial='in'
			animate='on'
			exit={maskMotion.out}
			transition={maskMotion.time}></motion.div>
	);
}
