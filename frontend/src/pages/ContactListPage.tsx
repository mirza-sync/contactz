import { useEffect, useState } from "react";
import { Contact } from "../../constants/types";
import { axiosInstance } from "../main";
import { ContactWrapper } from "../components/ContactWrapper";
import { useNavigate } from "react-router-dom";
import { GenericButton } from "../components/GenericButton";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 h-[80vh] w-[50vw]">
      <div className="flex justify-between items-end">
        <h1 className="text-4xl font-bold">Contact List</h1>
        <GenericButton variant="primary" onClick={() => navigate("/contact")}>
          New Contact
        </GenericButton>
      </div>
      <div className="border-[1px] rounded-lg border-white overflow-y-auto p-4">
        <div className="flex w-full overflow-y-auto">
          <div key={1} className="flex-grow">
            {contacts.length > 0 &&
              contacts.map((contact) => (
                <ContactWrapper contact={contact} position="left" />
              ))}
          </div>
          <div key={2} className="flex-grow">
            {contacts.length > 0 &&
              contacts.map((contact) => (
                <ContactWrapper contact={contact} position="right" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
