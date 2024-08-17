import { useEffect, useState } from "react";
import { Contact } from "../../constants/types";
import { axiosInstance } from "../main";
import { ContactWrapper } from "../components/ContactWrapper";
import { useNavigate } from "react-router-dom";

export const ContactListPage = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    try {
      const res = await axiosInstance.get("/contacts");
      console.log(res);
      setContacts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-[80vh]">
      <div className="border-[1px] rounded-lg border-white overflow-y-auto p-4">
        <div className="flex w-full overflow-y-auto">
          <div className="">
            {contacts.length > 0 &&
              contacts.map((contact) => (
                <ContactWrapper key={contact._id!} position="left">
                  {contact.name}
                </ContactWrapper>
              ))}
          </div>
          <div className="">
            {contacts.length > 0 &&
              contacts.map((contact) => (
                <ContactWrapper key={contact._id!} position="right">
                  {contact.contactNo}
                </ContactWrapper>
              ))}
          </div>
        </div>
      </div>
      <button
        className="ml-auto rounded-lg px-4 py-2 bg-slate-700"
        onClick={() => navigate("/contact")}
      >
        Add Contact
      </button>
    </div>
  );
};
