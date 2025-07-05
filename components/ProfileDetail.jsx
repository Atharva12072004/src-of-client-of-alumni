import { Bounce, toast } from "react-toastify";

const Detail = ({ type, detail }) => {
  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to clipboard", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      toastId: "copied",
    });
  };

  return (
    <>
      <div className="flex justify-between bg-white border border-[#8a8a8a] rounded-xl px-3 py-2 sm:w-80 font-poppins gap-4">
        <div className="flex flex-col">
          <p className="text-xs 2xl:text-sm text-black/50">{type}</p>
          <p className="text-sm 2xl:text-base">{detail}</p>
        </div>
        <img
          src="/copy-icon.svg"
          alt="copy-icon"
          className="cursor-pointer"
          onClick={() => handleCopyClick(detail)}
        />
      </div>
    </>
  );
};

export { Detail };
