import { createContext, useContext } from 'react';

// 모든 자식 컴포넌트들이 사용할 전역 상태값이 담길 공간 생성 (GlobalProvider.jsx에서만 사용)
export const GlobalState = createContext();
export const GlobalDispatch = createContext();

// GlobalState만 호출하는 커스텀훅
export function useGlobalState() {
	const context = useContext(GlobalState);
	if (!context) throw new Error('해당 Hook은 GlobalStateProvider안쪽에서 호출되어야 합니다.');
	return context;
}

// Global dispatch함수만 호출하는 커스텀훅
export function useGlobalDispatch() {
	const context = useContext(GlobalDispatch);
	if (!context) throw new Error('해당 훅은 GlobalDispatchProvider안쪽에서 호출되어야 합니다.');
	return context;
}

// action객체의 앱션타입
export const ACTIONS = {
	MENU_OPEN: 'MENU_OPEN',
	MENU_CLOSE: 'MENU_CLOSE',
	MENU_TOGGLE: 'MENU_TOGGLE',
	MODAL_OPEN: 'MODAL_OPEN',
	MODAL_CLOSE: 'MODAL_CLOSE',
	MODAL_TOGGLE: 'MODAL_TOGGLE'
};

// 리듀서함수에서 관리할 초기 state값 (GlobalProvider.jsx에서만 사용)
export const initState = { isMenu: false, isModal: false };

// 액션타입을 활용해서 전역상태값을 변경해주는 변형자 함수 (GlobalProvider.jsx에서만 사용)
export const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.MENU_OPEN:
			return { ...state, isMenu: true };
		case ACTIONS.MENU_CLOSE:
			return { ...state, isMenu: false };
		case ACTIONS.MENU_TOGGLE:
			return { ...state, isMenu: !state.isMenu };
		case ACTIONS.MODAL_OPEN:
			return { ...state, isModal: true };
		case ACTIONS.MODAL_CLOSE:
			return { ...state, isModal: false };
		case ACTIONS.MODAL_TOGGLE:
			return { ...state, isModal: !state.isModal };
		default:
			return state;
	}
};
