// import { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import { Link } from 'react-router-dom';
import Content from '../common/Content';
import useShortenText from '../../hooks/useShortenText';
import UseCombineText from '../../hooks/useCombineText';
import { useYoutubeQuery } from '../../hooks/useYoutube';

export default function Youtube() {
	console.log('Youtube');
	// const [Vids, setVids] = useState([]);
	const shortenText = useShortenText();
	const combineText = UseCombineText();

	// useEffect(() => {
	// 	fetchYoutube(setVids);
	// }, []);

	// data: 데이터정보, isPending:요청대기유무, isError:실패유무, error:에러정보
	const { data: Vids, isPending } = useYoutubeQuery({ type: 'B' });
	isPending && console.log('Youtube Loading...');

	return (
		<Layout title={'YOUTUBE'}>
			<Content delay={1}>
				{isPending && <p>Youtube Loading...</p>}
				{Vids?.map((vid, idx) => {
					return (
						<article key={idx}>
							<h3>
								<Link to={'/youtube/' + vid.id}>{shortenText(vid.snippet.title, 60)}</Link>
							</h3>
							<div className='txt'>
								<p>{shortenText(vid.snippet.description, 150)}</p>
								<span>{combineText(vid.snippet.publishedAt.slice(0, 10), '-', '.')}</span>
							</div>
							<Pic className='thumb' src={vid.snippet.thumbnails.default.url} />
						</article>
					);
				})}
			</Content>
		</Layout>
	);
}

// const fetchYoutube = setUseState => {
// 	const num = 10;
// 	const pid = import.meta.env.VITE_PID;
// 	const api_key = import.meta.env.VITE_YOUTUBE_API;
// 	const baseUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
// 	const url = `${baseUrl}?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

// 	fetch(url)
// 		.then(data => data.json())
// 		.then(json => {
// 			setUseState(json.items);
// 		});
// };
