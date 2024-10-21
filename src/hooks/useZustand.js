import { create } from 'zustand';

export const useZustandStore = create(set => ({
	IsModal: false,
	IsMenu: false,
	setModalOpen: () => set({ IsModal: true }),
	setModalClose: () => set({ IsModal: false }),
	setModalToggle: () => set(state => ({ IsModal: !state.IsModal })),
	setMenuOpen: () => set({ IsMenu: true }),
	setMenuClose: () => set({ IsMenu: false }),
	setMenuToggle: () => set(state => ({ IsMenu: !state.IsMenu }))
}));
