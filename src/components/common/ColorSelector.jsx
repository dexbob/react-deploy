export default function ColorSelector() {
	const colors = ['40,40,40', '184, 0, 190', '0, 120, 150'];

	const outerStyle = {
		display: 'flex',
		gap: 10,
		position: 'fixed',
		left: '5vw',
		bottom: '10vh',
		zIndex: 6
	};
	const btnStyle = {
		cursor: 'pointer',
		width: 14,
		height: 14,
		borderRadius: '50%',
		border: 'none'
	};
	const setColor = color => document.documentElement.style.setProperty('--keyRGB', color);
	const changeColor = color => {
		setColor(color); // 기본 색상 설정
		setCookie('colorA', color); // 세션쿠키
		setCookie('colorB', color, { hour: 1 }); // 일정시간후 만료쿠키
	};

	getCookie('colorA') && setColor(getCookie('colorA')); // 만료쿠키 종료시, 세션이 살아있으면 세션쿠키 적용
	getCookie('colorB') && setColor(getCookie('colorB')); // 기본적으로 만료쿠키 적용

	return (
		<nav style={outerStyle}>
			{colors.map(color => (
				<button
					key={color}
					style={{ ...btnStyle, backgroundColor: `rgb(${color})` }}
					onClick={() => changeColor(color)}></button>
			))}
		</nav>
	);
}
// 쿠키 추출 함수
const getCookie = key => {
	if (!key) return document.cookie;
	const arr = document.cookie.split(';');
	for (let i = 0; i < arr.length; i++) {
		const cookie = arr[i].split('=');
		if (cookie[0].trim() === key) return cookie[1];
	}
	return;
};
// 쿠키 설정 함수
const setCookie = (name, value, duration) => {
	if (duration) {
		const { day = 0, hour = 0, min = 0, sec = 0 } = duration;
		const seconds = day * 24 * 60 * 60 + hour * 60 * 60 + min * 60 + sec;
		const now = new Date();
		now.setTime(now.getTime() + seconds * 1000);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
	} else {
		document.cookie = `${name}=${value}; path=/;`;
	}
};
