import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Mask from './Mask';
import SplitText from './SplitText';

export default function Layout({ title, children }) {
	const { pathname } = useLocation();
	const isDetail = pathname.includes('/youtube/');
	let className = (isDetail && 'detail') || (pathname === '/' && 'main') || title?.toLowerCase();

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, []);

	return (
		<>
			<main className={className}>
				{pathname !== '/' && (
					<SplitText delay={0.5} interval={isDetail ? 0.01 : 0.1}>
						{title}
					</SplitText>
				)}
				<section>{children}</section>
			</main>
			<Mask duration={0.5} delay={0} color='#777' styel={{ position: 'fixed' }} />
		</>
	);
}
