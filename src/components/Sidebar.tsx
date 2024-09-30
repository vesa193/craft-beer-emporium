import React from 'react';
import { createPortal } from 'react-dom';
import { useSidebarStore } from '../stores/sidebarStore';
import closeIcon from '../../public/icons/close-icon.svg';

import './Sidebar.css';
type SidebarProps = {
    children: JSX.Element;
};

export const Sidebar = ({ children }: SidebarProps) => {
    const { isOpen, onClose } = useSidebarStore((state) => state);
    return (
        isOpen &&
        createPortal(
            <>
                <div className="sidebar-backdrop"></div>
                <div className="sidebar">
                    <div className="sidebar-header">
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
