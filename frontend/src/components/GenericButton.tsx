type ButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "default";
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const GenericButton = ({
  variant = "default",
  children,
  ...rest
}: ButtonProps) => {
  const getCssClass = () => {
    let cssClass = "";
    switch (variant) {
      case "primary":
        cssClass = "bg-green-600 ring-2 ring-green-600";
        break;
      case "danger":
        cssClass = "bg-red-500";
        break;
      case "secondary":
        cssClass = "bg-blue-700 ring-2 ring-blue-700";
        break;
      default:
        cssClass = "bg-[#f5f5f5] text-black outline-black";
        break;
    }
    return cssClass;
  };
  return (
    <button
      {...rest}
      className={`
        hover:outline outline-2 rounded-lg px-3 pt-[2px] pb-1 font-semibold h-fit
        ${getCssClass()} ${rest.className || ""}
     `}
    >
      {children}
    </button>
  );
};
