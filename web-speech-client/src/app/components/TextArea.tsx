interface TextAreaProps {
  value: string;
  placeholder: string;
}

export const TextArea = ({ value, placeholder }: TextAreaProps) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm">What was said:</label>
      <textarea
        disabled
        value={value}
        className="w-full rounded border border-purple-700 bg-gray-900 p-2 text-white"
        rows={3}
        placeholder={placeholder}
      />
    </div>
  );
};
