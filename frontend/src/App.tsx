import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Contact } from "../constants/types";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

function App() {
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
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

  const handleCreateContact = async () => {
    console.log("Creating...");
    try {
      const res = await axiosInstance.post("/contact", {
        name: name,
        contactNo: contactNo,
      });
      console.log(res);

      if (res.data._id) {
        getContacts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Contactz</h1>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contactNo">Contact Number</label>
          <input
            id="contactNo"
            type="number"
            placeholder="0123456789"
            onChange={(e) => setContactNo(e.target.value)}
          />
        </div>
        <button onClick={() => handleCreateContact()}>Create Contact</button>
      </div>
      {contacts.length > 0
        ? contacts.map((contact) => (
            <div key={contact._id}>
              <div>{contact.name}</div>
              <div>{contact.contactNo}</div>
            </div>
          ))
        : "No Contact Found"}
    </>
  );
}

export default App;
