type ButtonProps = {
  btnType?: "primary" | "secondary" | "danger" | "default";
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const GenericButton = ({
  btnType = "default",
  children,
  ...rest
}: ButtonProps) => {
  const getCssClass = () => {
    let cssClass = "";
    switch (btnType) {
      case "primary":
        cssClass = "bg-green-600";
        break;
      case "danger":
        cssClass = "bg-red-500";
        break;
      case "secondary":
        cssClass = "bg-blue-500";
        break;
      default:
        cssClass = "bg-slate-500";
        break;
    }
    return cssClass;
  };
  return (
    <button
      {...rest}
      className={`
        hover:outline outline-2 rounded-lg px-3 py-1
        ${getCssClass()} ${rest.className || ""}
     `}
    >
      {children}
    </button>
  );
};
