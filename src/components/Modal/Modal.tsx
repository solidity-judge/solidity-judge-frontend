import { ReactComponent as CloseIcon } from "assets/svg/close.svg";

export default function Modal({
  children,
  handleModalClose,
}: {
  children: React.ReactNode;
  handleModalClose: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
      <div className="flex flex-col fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white rounded-3xl">
        <div className="flex flex-row justify-end">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold p-1 rounded-full"
            onClick={() => handleModalClose()}
          >
            <CloseIcon height={25} width={25} />
          </button>
        </div>
        <div className="flex flex-col items-center grow">
          {children}
        </div>
      </div>
    </div>
  );
}
