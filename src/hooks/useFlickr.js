import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

export const useFlickrQuery = (opt = { type: 'mine' }) => {
	return useQuery({
		queryKey: ['GalleryList', opt],
		queryFn: fetchFlickr,
		staleTime: 1000 * 60,
		gcTime: 1000 * 60
	});
};

const fetchFlickr = async opt => {
	const num = 19;
	const api_key = import.meta.env.VITE_FLICKR_API;
	const myID = import.meta.env.VITE_MY_ID;
	const options = 'format=json&nojsoncallback=1';
	const baseURL = `https://www.flickr.com/services/rest/?api_key=${api_key}`;
	const types = [
		{ type: 'mine', method: 'flickr.people.getPhotos', sub: `&user_id=${myID}` },
		{ type: 'interest', method: 'flickr.interestingness.getList', sub: `&user_id=${myID}` },
		{ type: 'search', method: 'flickr.photos.search', sub: `&tags=${opt.queryKey[1].tags}` }
	];
	const obj = _.find(types, o => o.type === opt.queryKey[1].type);
	const url = `${baseURL}&method=${obj.method}${obj.sub}&per_page=${num}&${options}`;

	const data = await fetch(url);
	const json = await data.json();
	return json.photos.photo;
};
