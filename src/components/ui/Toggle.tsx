import { Checkbox } from "@/components/ui/Checkbox";

interface SettingsToggleProps {
  readOnly?: boolean;
  checked: boolean;
  onChange: () => void;
  icon: string;
  title: string;
  description: string;
}
export const Toggle = ({
  readOnly,
  checked,
  onChange,
  icon,
  title,
  description,
}) => {
  return (
    <div
      className={`flex justify-between bg-background/50 rounded-xl p-4 transition-opacity ${
        readOnly && !checked ? "opacity-50" : ""
      }`}
    >
      <div className={"text-5xl pr-4"}>{icon}</div>
      <div className={"flex-grow"}>
        <strong className={"block"}>{title}</strong>
        <p>{description}</p>
      </div>
      <Checkbox onChange={onChange} checked={checked} />
    </div>
  );
};
