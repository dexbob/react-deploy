import { motion } from 'framer-motion';
import Mask from './Mask';

export default function MaskText({ children, duration = 0.5, delay = 0, color = '#000', style }) {
	// 해당 컴포넌트를 범용적으로 사용하기 위해 컴포넌트 내부에서 스타일 작성
	// 대안책: styledComponent, tailwindCSS, 스타일 객체를 직접 내부 생성
	const frameStyle = {
		display: 'inline-block',
		font: '1.2rem/1 orbitron',
		color: color,
		position: 'relative',
		overflow: 'hidden',
		marginBottom: 20
	};
	const { init, active, exit, time } = {
		init: { opacity: 0 },
		active: { opacity: 1 },
		exit: { opacity: 0, transition: { duration: 0.01, delay: duration / 4 + delay / 2 } },
		time: { duration: 0.01, delay: duration / 2 + delay }
	};
	return (
		<div style={{ ...frameStyle, ...style }} className='maskText'>
			<motion.span initial={init} animate={active} exit={exit} transition={time}>
				{children}
			</motion.span>
			<Mask duration={duration} delay={delay} color={color} />
		</div>
	);
}
