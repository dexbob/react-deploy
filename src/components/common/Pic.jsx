import { useRef } from 'react';

//src:이미지 url전달받음, className: Pic컴포넌트에 적용한 클래스명을 내부 div 프레임에 적용, shadow: 그림자 출력여부 결정
export default function Pic({ src, className, shadow = false, style }) {
	const ref_img = useRef(null);
	// const ref_size = useRef(1);
	// const resize = e => {
	// 	const img = ref_img.current;
	// 	ref_size.current += Math.sign(e.deltaY) * 0.05;
	// 	img.style.transform = `scale(${ref_size.current})`;
	// 	img.style.transformOrigin = `${e.clientX} ${e.clientY}`;
	// 	console.log(e, e.clientX, e.clientY, img.style.transformOrigin);
	// };
	return (
		<div style={{ position: 'relative', ...style }} className={className}>
			{shadow && <img style={shadowStyle} src={src} alt={src} />}
			{/* <img ref={ref_img} onWheel={resize} style={picStyle} src={src} alt={src} /> */}
			<img ref={ref_img} style={picStyle} src={src} alt={src} />
		</div>
	);
}

//이미지 그림자 스타일
const shadowStyle = {
	width: '100%',
	height: '100%',
	objectFict: 'cover',
	position: 'absolute',
	top: 20,
	left: 20,
	filter: 'blur(20px)',
	opacity: 0.8
};
//기본 이미지 스타일
const picStyle = {
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	position: 'absolute',
	top: 0,
	left: 0
};
