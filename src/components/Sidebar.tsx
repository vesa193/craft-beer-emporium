import React from 'react';
import { createPortal } from 'react-dom';
import { useSidebarStore } from '../stores/sidebarStore';
import closeIcon from '../assets/icons/close-icon.svg';

import style from './Sidebar.module.css';
type SidebarProps = {
    children: JSX.Element;
};

export const Sidebar = ({ children }: SidebarProps) => {
    const { isOpen, onClose } = useSidebarStore((state) => state);
    return (
        isOpen &&
        createPortal(
            <>
                <div className={style.sidebarBackdrop}></div>
                <div className={style.sidebar}>
                    <div className={style.sidebarHeader}>
                        <h3>Cart Items</h3>
                        <img src={closeIcon} alt="close" onClick={onClose} />
                    </div>
                    {children}
                </div>
                ;
            </>,
            document.querySelector('#portal')!
        )
    );
};
