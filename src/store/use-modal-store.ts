import { create } from "zustand";
import type { ReactNode } from "react";

export interface ModalConfig {
  id: string;
  title: string;
  subTitle?: string | ReactNode;
  content: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

interface ModalState {
  modals: ModalConfig[];
}

interface ModalActions {
  openModal: (config: Omit<ModalConfig, "id">) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

type ModalStore = ModalState & ModalActions;

export const useModalStore = create<ModalStore>((set) => ({
  modals: [],

  openModal: (config) => {
    const id = crypto.randomUUID();
    set((state) => ({ modals: [...state.modals, { ...config, id }] }));
    return id;
  },

  closeModal: (id) => {
    set((state) => ({ modals: state.modals.filter((m) => m.id !== id) }));
  },

  closeAllModals: () => {
    set({ modals: [] });
  },
}));
