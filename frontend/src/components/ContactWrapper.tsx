import { useNavigate } from "react-router-dom";
import { Contact } from "../../constants/types";

type ContactWrapperProps = {
  contact: Contact;
  position: "left" | "right";
};

export const ContactWrapper = ({ contact, position }: ContactWrapperProps) => {
  const navigate = useNavigate();

  return (
    <div
      key={contact._id}
      className={`${
        position == "left" ? "rounded-s-lg" : "rounded-e-lg"
      } bg-slate-500 w-full mb-4 cursor-pointer px-4 py-2`}
      onClick={() => navigate(`/contact/${contact._id}`)}
    >
      {position == "left" ? contact.name : contact.contactNo}
    </div>
  );
};
