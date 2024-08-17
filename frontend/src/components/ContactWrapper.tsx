type ContactWrapperProps = {
  key: string;
  children: React.ReactNode;
  position: "left" | "right";
};

export const ContactWrapper = ({
  key,
  position,
  children,
}: ContactWrapperProps) => {
  return (
    <div
      key={key}
      className={`px-4 py-2 ${
        position == "left" ? "rounded-s-lg" : "rounded-e-lg"
      } bg-slate-500 w-full mb-4 cursor-default`}
    >
      {children}
    </div>
  );
};
