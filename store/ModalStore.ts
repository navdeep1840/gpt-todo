import { create } from "zustand";

interface ModalState {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

export const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
