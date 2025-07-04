import { FaCheck, FaXmark } from "react-icons/fa6";

const Notification = ({ type, text }) => {
  const handleAcceptClick = () => {};

  const handleDeclineClick = () => {};

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white rounded-xl shadow-lg size-fit px-4 py-3 items-center w-auto md:w-[420px] lg:w-[556px] xl:w-[412px] justify-between">
      <p className="font-poppins text-sm">{text}</p>
      {type === "REQUEST" && (
        <div className="flex gap-3">
          <button
            onClick={handleAcceptClick}
            className="rounded-full p-1 border-4 border-solid border-[#2E8857] text-[#2E8857] font-semibold"
          >
            <FaCheck size={34} />
          </button>

          <button
            onClick={handleDeclineClick}
            className="rounded-full p-1 border-4 border-solid border-[#BC0F0F] text-[#BC0F0F]"
          >
            <FaXmark size={34} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;
