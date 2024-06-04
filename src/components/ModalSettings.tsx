import { JSX } from "react";
import { createPortal } from "react-dom";

type BackdropProps = {
  onClick: () => void;
};
type ModalSettingsProps = {
  onClose: () => void;
  content: JSX.Element;
};

export function Backdrop({ onClick }: BackdropProps) {
  return <div className="fixed left-0 top-0 z-20 h-[100vh] w-full bg-black bg-opacity-60" onClick={onClick}></div>;
}

export default function ModalSettings({ onClose, content }: ModalSettingsProps) {
  let modal = (
    <>
      <Backdrop onClick={onClose} />
      <div className="fixed right-2 top-14 z-30 mt-1 flex w-fit flex-col gap-2 rounded-lg bg-zinc-700 p-4 shadow-md max-[350px]:right-1 max-[350px]:w-[95%] max-[350px]:p-1 max-[350px]:text-base sm:right-10">
        {content}
      </div>
    </>
  );
  return createPortal(modal, document.getElementById("modal-root") as HTMLElement);
}
