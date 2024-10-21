import { useState, useRef } from 'react';

export default function useDebounce(state, interval = 500) {
	const [Debounced, setDebounced] = useState(state);
	const ref_timer = useRef(null);

	clearTimeout(ref_timer.curret);
	ref_timer.current = setTimeout(() => {
		setDebounced(state);
	}, interval);

	return Debounced;
}
