import { useState } from 'react';
import { useFlickrQuery } from '../../hooks/useFlickr';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination, Virtual } from 'swiper/modules';
import { FaPlay } from 'react-icons/fa';
import Pic from '../common/Pic';
import 'swiper/css';
import 'swiper/css/virtual';

export default function Visual() {
	console.log('Visual');
	const [Index, setIndex] = useState(0);
	const { data, isSuccess } = useFlickrQuery({ type: 'interest' });
	const srcBase = 'https://live.staticflickr.com';

	return (
		<figure className='visual'>
			<div className='textBox'>
				{isSuccess &&
					data?.map((el, idx) => (
						<h2 key={idx} className={Index === idx ? 'on' : ''}>
							{el.title}
						</h2>
					))}
			</div>
			<Swiper
				modules={[Autoplay, Pagination, Virtual]}
				pagination={{ type: 'fraction' }}
				slidesPerView={1}
				spaceBetween={0}
				breakpoints={{
					1000: {
						slidesPerView: 2,
						spaceBetween: 50
					},
					1400: {
						slidesPerView: 3,
						spaceBetween: 100
					}
				}}
				loop={true}
				centeredSlides={true}
				autoplay={{
					delay: 2000,
					disableOnInteraction: true
				}}
				onSwiper={swiper => setTimeout(() => swiper.autoplay.start(), 1000)}
				onSlideChange={el => setIndex(el.realIndex)}>
				{isSuccess &&
					data.map((pic, idx) => {
						if (idx >= 10) return null;
						return (
							<SwiperSlide key={idx} virtualIndex={idx}>
								{/* swiperSlide 요소에는 바로 css모션 스타일 적용 비권장 */}
								<div className='inner'>
									<Pic
										src={`${srcBase}/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
										style={{ width: '100%', height: '100%' }}
										shadow
									/>
								</div>
							</SwiperSlide>
						);
					})}
				<BtnStart />
			</Swiper>
		</figure>
	);
}

// Swiper 컴포넌트 안쪽에서 호출할 버튼 컴포넌트
function BtnStart() {
	const swiper = useSwiper();

	return (
		<button
			className='btnStart'
			hidden={swiper.autoplay.running}
			onClick={() => swiper.autoplay.start()}>
			<FaPlay />
		</button>
	);
}
