import React from 'react';
import { createPortal } from 'react-dom';

import style from './Dialog.module.css';

type DialogProps = {
    header: string;
    body: string | JSX.Element;
    image: JSX.Element;
    isOpen: boolean;
    onClose: () => void;
};

const Dialog = ({ header, body, image, isOpen, onClose }: DialogProps) => {
    const onCloseHandler = () => {
        onClose();
    };

    return (
        isOpen &&
        createPortal(
            <div>
                <div className={style.dialogBackdrop}></div>
                <div className={style.dialog}>
                    <div className={style.dialogHeader}>
                        {image ? image : null}
                        <h4>{header}</h4>
                    </div>
                    <div className={style.dialogBody}>{body}</div>
                    <div className={style.dialogFooter}>
                        <button type="button" onClick={onCloseHandler}>
                            OK
                        </button>
                        <button type="button" onClick={onCloseHandler}>
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
