import { create } from 'zustand';

type TDialog = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useDialogStore = create<TDialog>((set) => ({
    isOpen: false,
    onOpen: () => {
        set(() => ({ isOpen: true }));
    },
    onClose: () => {
        set(() => ({ isOpen: false }));
    },
}));
