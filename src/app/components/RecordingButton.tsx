import { FaMicrophone, FaStop } from "react-icons/fa";

interface RecordingButtonProps {
  isRecording: boolean;
  onClick: () => void;
}

export const RecordingButton = ({
  isRecording,
  onClick,
}: RecordingButtonProps) => {
  return (
    <div className="mb-6 flex justify-center">
      <button
        onClick={onClick}
        className={`cursor-pointer rounded-full p-4 text-white transition ${
          isRecording ? "bg-red-600" : "bg-purple-700 hover:bg-purple-600"
        }`}
      >
        {isRecording ? <FaStop size={24} /> : <FaMicrophone size={24} />}
      </button>
    </div>
  );
};
