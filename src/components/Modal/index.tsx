import useClickAwayListener from "@/hooks/useClickAwayListener";
import type { ReactNode, RefObject } from "react";

interface IModalProps<T extends HTMLElement = HTMLDivElement> {
  children(ref: RefObject<T>): ReactNode;
  onClose: VoidFunction;
  isActive: boolean;
}

const Modal = <T extends HTMLElement = HTMLDivElement>({ children, onClose, isActive }: IModalProps<T>) => {
  const modalContent = useClickAwayListener<T>(onClose);

  return (
    <div className={"fixed w-screen h-screen top-0 left-0 z-50 transition-all " + (isActive ? "backdrop-blur-lg" : "translate-y-full")}>
      <button className="absolute top-8 right-8 w-10 h-10 bg-white text-black rounded-full grid place-content-center font-semibold text-3xl" onClick={onClose}>
        x
      </button>
      <div className="grid place-content-center h-full">{children(modalContent)}</div>
    </div>
  );
};

export default Modal;
