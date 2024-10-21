import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import Modal from '../common/Modal';
import Content from '../common/Content';
import { useFlickrQuery } from '../../hooks/useFlickr';
import { useZustandStore } from '../../hooks/useZustand';

export default function Gallery() {
	console.log('Gallery');
	const IsModal = useZustandStore(state => state.IsModal);
	const setModalToggle = useZustandStore(state => state.setModalToggle);
	const ref_gallery = useRef(null);
	const ref_search = useRef(null);
	const [Index, setIndex] = useState(-1);
	const [Option, setOption] = useState({ type: 'mine' });

	const customMotion = {
		init: { opacity: 0, x: -200 },
		active: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: -200 }
	};

	const { data: Flickr, isPending } = useFlickrQuery(Option);
	isPending && console.log('Gallery Loading...');

	useEffect(() => {
		ref_gallery.current.classList.remove('on');
		setTimeout(() => {
			ref_gallery.current.classList.add('on');
		}, 500);
	}, [Option]);

	// 그림 상세 페이지
	useEffect(() => {
		document.body.style.overflowY = IsModal ? 'hidden' : 'auto';
	}, [IsModal]);

	const handleSearch = e => {
		e.preventDefault();
		if (!ref_search.current.value.trim()) return alert('검색어를 입력해 주세요.');
		setOption({ type: 'search', tags: ref_search.current.value.trim() });
		ref_search.current.value = '';
	};
	const srcBase = 'https://live.staticflickr.com';
	return (
		<>
			<Layout title={'GALLERY'}>
				<Content delay={0} customMotion={customMotion}>
					<article className='controller'>
						<ul className='type'>
							<li
								onClick={() => setOption({ type: 'mine' })}
								className={Option.type === 'mine' ? 'on' : ''}>
								My Gallery
							</li>
							<li
								onClick={() => setOption({ type: 'interest' })}
								className={Option.type === 'interest' ? 'on' : ''}>
								Interest Gallery
							</li>
						</ul>
						<form onSubmit={handleSearch}>
							<input ref={ref_search} type='text' placeholder='검색어를 입력하세요.' />
							<button>Search</button>
						</form>
					</article>
					<section ref={ref_gallery} className='galleryList'>
						{Flickr?.length === 0 && <p>검색 결과가 없습니다.</p>}
						{Flickr?.map((data, idx) => {
							return (
								<article
									key={idx}
									onClick={() => {
										// dispatch({ type: ACTIONS.MODAL_TOGGLE });
										setModalToggle();
										setIndex(idx);
									}}>
									<Pic
										className='pic'
										src={`${srcBase}/${data.server}/${data.id}_${data.secret}_z.jpg`}
										shadow
									/>
									<h3>{data.title}</h3>
								</article>
							);
						})}
					</section>
				</Content>
			</Layout>
			{IsModal && (
				<Modal>
					<Pic
						src={`${srcBase}/${Flickr[Index].server}/${Flickr[Index].id}_${Flickr[Index].secret}_b.jpg`}
						shadow
					/>
				</Modal>
			)}
		</>
	);
}
