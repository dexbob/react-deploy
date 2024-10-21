import { motion } from "framer-motion";

export default function SplitText({
	children = "",
	style,
	interval = 0.1,
	duration = 0.5,
	delay = 0
}) {
	const titStyle = {
		display: "inline-block",
		font: "500 6vmax/1 'raleway'",
		color: "#333",
		marginBottom: 50,
		...style
	};
	const { init, active, exit } = {
		init: { scale: 2, opacity: 0 },
		active: { scale: 1, opacity: 1 },
		exit: { scale: 2, opacity: 0 }
	};

	return (
		<h1 style={titStyle}>
			{Array.from(children).map((data, idx) => (
				<motion.span
					key={idx}
					style={{ display: "inline-block" }}
					initial={init}
					animate={active}
					exit={{
						...exit,
						transition: {
							duration: duration / 2,
							delay: (interval * (children.length - idx - 1)) / 2
						}
					}}
					transition={{ duration, delay: interval * idx + delay }}>
					{data}
				</motion.span>
			))}
		</h1>
	);
}
