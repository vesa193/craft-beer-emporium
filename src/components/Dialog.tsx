import React from 'react';
import { useDialogStore } from '../stores/dialogStore';
import { createPortal } from 'react-dom';

import './Dialog.css';

type DialogProps = {
    header: string;
    body: string | JSX.Element;
    image: JSX.Element;
};

const Dialog = ({ header, body, image }: DialogProps) => {
    const { onClose, isOpen } = useDialogStore((state) => state);
    return (
        isOpen &&
        createPortal(
            <div className="dialog-wrapper">
                <div className="dialog-backdrop"></div>
                <div className="dialog">
                    <div className="dialog-header">
                        {image && image}
                        <h4>{header}</h4>
                    </div>
                    <div className="dialog-body">{body}</div>
                    <div className="dialog-footer">
                        <button type="button" onClick={onClose}>
                            OK
                        </button>
                        <button type="button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>,
            document.querySelector('#portal')!
        )
    );
};

export default Dialog;
