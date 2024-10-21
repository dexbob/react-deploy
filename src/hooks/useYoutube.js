import { useQuery } from '@tanstack/react-query';

// 반환된 데이터는 설정옵션대로 브라우저단에서 캐싱처리되며 재활용 됨, 데이터가 변경되면(queryKey, queryFn)이 다시 새롭게 fetching
export const useYoutubeQuery = (opt = { type: 'A' }) => {
	// useQuery를 활용한 커스텀훅 함수의 옵션
	// - queryKey : 요청url을 활용해서 각 서버데이터마다의 고유 쿼리키를 배열형태로 등록
	// - queryFn : 위에서 미리 제작한 유튜브 fetching함수 등록
	// - staleTime: 불러온 서버데이터의 refetching 금지 시간을 설정
	// - gcTime: 더 이상 사용되지 않는 서버데이터를 메모리 해제하기까지의 시간 설정
	return useQuery({
		queryKey: ['youtubeList', opt],
		queryFn: fetchYoutube,
		staleTime: 1000 * 60,
		gcTime: 1000 * 60
	});
};

// useQeury 의 4가지 상태
// - pending: 요청 후 응답받기까지의 상태
// - fresh: 데이터를 최신 상태로 인식, 재요청할 필요 없음
// - stale: 데이터를 오래된 상태로 인식, 재요청할 필요가 있음
// - inactive: 현재 컴포넌트에서 사용하지 않는 상태
// 해당 서버데이터를 사용하지 않는 다른 컴포넌트 마운트시 inactive 상태로 전환됨
// inactive 상태에 돌입하면 그때부터 gcTime이 소진되기 시작하여 설정시간이 끝나면 메모리에서 해제됨(garbage collection)
const fetchYoutube = async ({ queryKey }) => {
	const num = 10;
	const api_key = import.meta.env.VITE_YOUTUBE_API;
	let pid = 'PLQZ4zrrwKYcVtZlplT8_HwY-UPFSJBECr';
	const pid_ChinaMusic = 'PLqJICnPF4yZK62-Y8J_IXYG7JkXYmilsJ';
	const pid_JapanMusic = 'PLgjr30dpgKCfuW-JRTVme_vwBcpdgnH8r';
	queryKey[1].type === 'A' && (pid = pid_ChinaMusic);
	queryKey[1].type === 'B' && (pid = pid_JapanMusic);
	const baseUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
	const url = `${baseUrl}?part=snippet&key=${api_key}&playlistId=${pid}&maxResults=${num}`;

	const data = await fetch(url);
	const json = await data.json();
	return json.items;

	// fetch(url)
	// 	.then(data => data.json())
	// 	.then(json => {
	// 		return json.items;
	// 	});
};
