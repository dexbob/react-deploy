import { useEffect, useState } from "react";

export default function MaskText({ children }) {
	const [Mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	return (
		<div className='slogan' style={frameStyle}>
			<span style={Mounted ? conStyleActive : conStyle}>{children}</span>
			<div style={Mounted ? maskStyleActive : maskStyle}></div>
		</div>
	);
}

const frameStyle = {
	display: "inline-block",
	marginBottom: 20,
	font: "1.2rem/1 orbitron",
	color: "#555",
	position: "relative",
	overflow: "hidden"
};
const conStyle = {
	opacity: 0,
	transition: "all 0.1s 0.3s"
};
const maskStyle = {
	width: "120%",
	height: "100%",
	background: "linear-gradient(90deg, #333, #fff)",
	position: "absolute",
	top: 0,
	left: "-100%",
	transition: "all 0.6s ease-in"
};

const conStyleActive = { ...conStyle, opacity: 1 };
const maskStyleActive = { ...maskStyle, left: "100%" };
