import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
}
export default function Modal({ children, open, onClose }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const className = "";
  useEffect(() => {
    const modal = dialog.current;
    if (modal) {
      if (open) {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  }, [open]);

  const portalRoot = document.getElementById("modal");

  if (!portalRoot) return null; // Handle missing portal root

  return createPortal(
    <dialog
      ref={dialog}
      onClose={onClose}
      className={`modal m-auto ${className}`}
    >
      {children}
    </dialog>,
    portalRoot
  );
}
