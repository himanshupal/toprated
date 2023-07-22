import useClickAwayListener from "@/hooks/useClickAwayListener";
import type { ReactNode, RefObject } from "react";
import closeIcon from "@/assets/icons/close.svg";
import Image from "next/image";

interface IModalProps<T extends HTMLElement = HTMLDivElement> {
  children(ref: RefObject<T>): ReactNode;
  onClose: VoidFunction;
  isActive: boolean;
}

const Modal = <T extends HTMLElement = HTMLDivElement>({ children, onClose, isActive }: IModalProps<T>) => {
  const modalContent = useClickAwayListener<T>(onClose);

  return (
    <div className={"fixed w-screen h-screen top-0 left-0 z-10 p-8 transition-all " + (isActive ? "backdrop-blur-lg" : "translate-y-full")}>
      <button className="absolute top-8 right-8 w-8 h-8 md:w-10 md:h-10 bg-white text-black rounded-full grid place-content-center font-semibold text-3xl z-20" onClick={onClose}>
        <Image src={closeIcon.src} alt="R" width={16} height={16} />
      </button>
      <div className="h-full overflow-auto xs:grid place-content-center">
        <div className="grid place-content-center">{children(modalContent)}</div>
      </div>
    </div>
  );
};

export default Modal;
