import { create } from 'zustand';

type TSidebar = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useSidebarStore = create<TSidebar>((set) => ({
    isOpen: false,
    onOpen: () => {
        set(() => ({ isOpen: true }));
    },
    onClose: () => {
        set(() => ({ isOpen: false }));
    },
}));
