import { FaBars, FaYoutube, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useZustandStore } from '../../hooks/useZustand';
import navData from '../../data/navData';

// React의 Link컴포넌트를 활용해서 메뉴이동처리 하면
// 불필요한 서버요청 없이 미리 한번에 불러온 컴포넌트를 실시간으로 클라이언트단에서 변경처리 가능
export default function Header() {
	const setMenuToggle = useZustandStore(state => state.setMenuToggle);
	const snsArr = [FaYoutube, FaInstagram, FaEnvelope];
	const { pathname } = useLocation();

	return (
		<>
			<header className={`header ${pathname === '/' && 'main'}`}>
				<h1>
					<Link to='/'>ALPACO</Link>
				</h1>
				<nav>
					<ul className='gnb'>
						{navData.map((data, idx) => {
							return (
								<li key={idx} className={pathname === data.path ? 'on' : ''}>
									<Link to={data.path}>{data.display}</Link>
								</li>
							);
						})}
					</ul>
					<ul className='sns'>
						{snsArr.map((Data, idx) => (
							<li key={idx}>
								<Data />
							</li>
						))}
					</ul>
				</nav>
				<button className='btnMenuToggle' onClick={setMenuToggle}>
					<FaBars />
				</button>
			</header>
		</>
	);
}
