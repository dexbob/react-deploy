// import { useGlobalDispatch, ACTIONS } from '../../hooks/useGlobal';

import { useZustandStore } from '../../hooks/useZustand';

export default function Modal({ children }) {
	// const { dispatch } = useGlobalDispatch();
	const setModalToggle = useZustandStore(state => state.setModalToggle);
	return (
		<aside className='modal'>
			<div className='con'>{children}</div>
			{/* <button className='btnClose' onClick={() => dispatch({ type: ACTIONS.MODAL_TOGGLE })}> */}
			<button className='btnClose' onClick={setModalToggle}>
				CLOSE
			</button>
		</aside>
	);
}
