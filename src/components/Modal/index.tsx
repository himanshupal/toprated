import type { PropsWithChildren } from "react";

interface IModalProps extends PropsWithChildren {
  onClose: VoidFunction;
  isActive: boolean;
}

const Modal = ({ children, onClose, isActive }: IModalProps) => {
  return isActive ? (
    <div className="fixed w-screen h-screen top-0 left-0 z-50 backdrop-blur-lg">
      <button className="absolute top-8 right-8 w-10 h-10 bg-white text-black rounded-full grid place-content-center font-semibold text-3xl" onClick={onClose}>
        x
      </button>
      <div className="grid place-content-center h-full">{children}</div>
    </div>
  ) : null;
};

export default Modal;
