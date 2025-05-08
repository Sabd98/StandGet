import { ErrorProps } from "../../utils/interfaces";

export default function Error({title,message}: ErrorProps) {
  return (
    <div className="error">
      <h2 className="text-2xl font-bold text-[#1f1a09] mb-4">{title}</h2>
      <p>{message}</p>
    </div>
  );
}
