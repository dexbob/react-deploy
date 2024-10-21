import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Home from './components/main/home';
import Contact from './components/sub/Contact';
import Gallery from './components/sub/Gallery';
import Members from './components/sub/Members';
import Posts from './components/sub/Posts';
import Youtube from './components/sub/Youtube';
import YoutubeDetail from './components/sub/YoutubeDetail';
import { AnimatePresence } from 'framer-motion';
import MobileMenu from './components/common/MobileMenu';
import { useZustandStore } from './hooks/useZustand';
import ColorSelector from './components/common/ColorSelector';

export default function App() {
	const IsMenu = useZustandStore(state => state.IsMenu);
	const location = useLocation();
	return (
		<>
			<Header />

			<ColorSelector />

			{/* 라우터를 통한 컴포넌트 전환시 이전 컴포넌트에 모션이 동작되고 있으면,
            해당 모션이 끝날때까지 컴포넌트 언마운트 시점을 지연처리 */}
			<AnimatePresence mode='wait'>
				{/* 라우터 이동시마다 각 컴포넌트 고유값을 전달하기 위해 패스경로를 키로 지정 */}
				<Routes location={location} key={location.pathname}>
					<Route path='/' element={<Home />} />
					<Route path='/members' element={<Members />} />
					<Route path='/gallery' element={<Gallery />} />
					<Route path='/youtube' element={<Youtube />} />
					<Route path='/youtube/:id' element={<YoutubeDetail />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/posts' element={<Posts />} />
				</Routes>
			</AnimatePresence>

			<AnimatePresence mode='wait'>{IsMenu && <MobileMenu />}</AnimatePresence>

			<Footer />
		</>
	);
}

/*
SSR방식(Server Side Rendering): HTML파일 불러오는 방식
- 각각의 서브페이지를 *.html 로 분리
- 각 메뉴 클릭시 일일이 서버쪽에 요청하여 해당 html파일을 가져오는 방식

CSR방식(Client Side Rendering): React 작업 방식
- 처음에 서버로부터 빈 index.html 파일을 초기에 한번 가져옴
- index.html 과 함께 컴파일 완료된 리액트 컴포넌트 자바스크립트 파일도 한번에 모두 가져옴
- 메뉴 클릭시 서버를 통하지 않고 클라이언트단에서 컴포넌트 요소를 실시간으로 index.html 안쪽에서 바꿔주는 방식
*/
