import { ButtonProps } from "../../utils/interfaces";


export default function Button({ children, textOnly, className, ...props }: ButtonProps) {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
