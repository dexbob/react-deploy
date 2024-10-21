import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../common/Layout';
import Content from '../common/Content';
import UseCombineText from '../../hooks/useCombineText';

export default function YoutubeDetail() {
	const { id } = useParams();
	const [YoutubeVid, setYoutubeVid] = useState(null);
	const combineText = UseCombineText();

	useEffect(() => {
		fetchYoutube(id, setYoutubeVid);
	}, [id]);

	return (
		<Layout title={YoutubeVid?.snippet.title}>
			<Content delay={0.5}>
				<figure className='vidFrame'>
					<iframe
						title='youtube'
						type='text/html'
						src={`http://www.youtube.com/embed/${YoutubeVid?.snippet.resourceId.videoId}`}></iframe>
				</figure>
				<p>{YoutubeVid?.snippet.description}</p>
				<span className='date'>
					{combineText(YoutubeVid?.snippet.publishedAt.split('T')[0], '-', '.')}
				</span>
			</Content>
		</Layout>
	);
}

const fetchYoutube = (id, setUseState) => {
	const api_key = import.meta.env.VITE_YOUTUBE_API;
	const baseUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
	const url = `${baseUrl}?part=snippet&id=${id}&key=${api_key}`;
	fetch(url)
		.then(data => data.json())
		.then(json => setUseState(json.items[0]));
};
