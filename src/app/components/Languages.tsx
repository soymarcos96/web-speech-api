interface LanguagesProps {
  value: string;
  onChange: (event: string) => void;
}

export const Languages = ({ value, onChange }: LanguagesProps) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm">translate to</label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded border border-purple-700 bg-purple-950 p-2 text-white"
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="pt">Portuguese</option>
      </select>
    </div>
  );
};
