import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as React from 'react';

type ModalProps = {
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children }) => {
  const elRef = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    const current = elRef.current;
    modalRoot!.appendChild(current);
    return () => void modalRoot!.removeChild(current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;