import { useReducer } from 'react';
import { GlobalState, GlobalDispatch, reducer, initState } from '../../hooks/useGlobal';

//해당 전역 실행 컨텍스트를 전달할 Wrapping 컴포넌트 생성
export default function GlobalProvider({ children }) {
	// 인자(리듀서함수, 초기상태값)를 넣어 [상태값인 state객체, action객체 전달용 dispatch함수] 반환
	const [store, dispatch] = useReducer(reducer, initState);
	// 전역state와 전역dispatch의 Context를 분리한 이유는 불필요한 재랜더링 방지 (zustand 라는 외부 라이브러리로 커버 가능)
	return (
		<GlobalState.Provider value={{ store }}>
			<GlobalDispatch.Provider value={{ dispatch }}>{children}</GlobalDispatch.Provider>
		</GlobalState.Provider>
	);
}
