import { useEffect, useRef, useState, useCallback } from 'react';
import useThrottle from '../../hooks/useThrottle';

export default function Map() {
	// const { kakao } = window;
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [Roadview, setRoadview] = useState(false);

	const ref_mapFrame = useRef(null);
	const ref_viewFrame = useRef(null);
	const ref_instMap = useRef(null);
	const ref_instMarker = useRef(null);
	const ref_instView = useRef(null);

	// 할당이 없는 고정된 정보는 current값만 재구조화해 사용 가능
	const { current: ref_instClient } = useRef(new kakao.maps.RoadviewClient());
	const { current: ref_instType } = useRef(new kakao.maps.MapTypeControl());
	const { current: ref_instZoom } = useRef(new kakao.maps.ZoomControl());
	const { current: ref_info } = useRef(infoData);
	const { latlng, markerImg, markerSize, markerPos } = ref_info[Index];

	// 지도관련 랜더링 함수, 메모이제이션, 의존성배열 변경시에만 재연산
	const createMap = useCallback(() => {
		ref_mapFrame.current.innerHTML = '';
		ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, {
			center: latlng,
			level: 5
		});
		ref_instMarker.current = new kakao.maps.Marker({
			position: latlng,
			image: new kakao.maps.MarkerImage(markerImg, markerSize, markerPos)
		});
		ref_instMarker.current.setMap(ref_instMap.current);

		// [setTraffic, setRoadview].forEach(func => func(false));  // 해당 처리는 버튼클릭시 실시
		[ref_instType, ref_instZoom].forEach(inst => ref_instMap.current.addControl(inst));
	}, [latlng, markerImg, markerPos, markerSize, ref_instType, ref_instZoom]);

	// 지도 위치 초기화 함수, 메모이제이션, 의존성배열(latlng) 변경시에만 재연산
	const initPos = useCallback(() => ref_instMap.current.setCenter(latlng), [latlng]);
	// 쓰로틀 처리가 반영된 위치초기화 함수
	const throttleInitPos = useThrottle(initPos, 300);

	// Index값 변경시 실행할 useEffect (새로운 Index값으로 지도인스턴스 갱신)
	useEffect(() => {
		createMap();
		// webAPI기능을 활용하는 모든 구문(모든 이벤트문)들은 useEffect안쪽에서 호출되야함
		window.addEventListener('resize', throttleInitPos);
		// clean-up함수를 활용해서 컴포넌트 언마운트시 강제로 window객체에 연결한 핸들러함수를 직접 제거
		return () => window.removeEventListener('resize', throttleInitPos);
	}, [Index, throttleInitPos, createMap]);

	useEffect(() => {
		Traffic
			? ref_instMap.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: ref_instMap.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	useEffect(() => {
		ref_instView.current = new kakao.maps.Roadview(ref_viewFrame.current);
		ref_instClient.getNearestPanoId(latlng, 50, panoId =>
			ref_instView.current.setPanoId(panoId, latlng)
		);
		// Roadview
		// 	? ref_instMap.current.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW)
		// 	: ref_instMap.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
	}, [Roadview, latlng, ref_instClient]);

	return (
		<section className='map'>
			<h2>Location</h2>
			<figure className='mapFrames'>
				<article ref={ref_mapFrame} className={`mapFrame ${!Roadview ? 'on' : ''}`}></article>
				<article ref={ref_viewFrame} className={`viewFrame ${Roadview ? 'on' : ''}`}></article>
			</figure>
			<nav className='btnSet'>
				<ul className='branch'>
					{ref_info.map((data, idx) => (
						<li
							key={idx}
							className={idx === Index ? 'on' : ''}
							onClick={() => {
								setIndex(idx);
								[setTraffic, setRoadview].forEach(func => func(false));
							}}>
							{data.title}
						</li>
					))}
				</ul>
				<ul className='btnToggleSet'>
					<li className={Traffic ? 'on' : ''} onClick={() => setTraffic(!Traffic)}>
						{`Traffic ${Traffic ? 'OFF' : 'ON'}`}
					</li>
					<li className={Roadview ? 'on' : ''} onClick={() => setRoadview(!Roadview)}>
						{`Roadview ${Roadview ? 'OFF' : 'ON'}`}
					</li>
				</ul>
			</nav>
		</section>
	);
}

const kakao = window.kakao;

const infoData = [
	{
		title: 'COEX',
		latlng: new kakao.maps.LatLng(37.5094091584729, 127.0624304750884),
		markerImg: 'marker1.png',
		markerSize: new kakao.maps.Size(232, 99),
		markerPos: { offset: new kakao.maps.Point(116, 99) }
	},
	{
		title: 'NEXON',
		latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
		markerImg: 'marker2.png',
		markerSize: new kakao.maps.Size(232, 99),
		markerPos: { offset: new kakao.maps.Point(116, 99) }
	},
	{
		title: 'CITYHALL',
		latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
		markerImg: 'marker3.png',
		markerSize: new kakao.maps.Size(232, 99),
		markerPos: { offset: new kakao.maps.Point(116, 99) }
	}
];
