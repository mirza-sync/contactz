import { useState } from "react";
import { axiosInstance } from "../main";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const CreateContactPage = () => {
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const navigate = useNavigate();

  const handleCreateContact = async (e) => {
    console.log("Creating...");
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/contact", {
        name: name,
        contactNo: contactNo,
      });
      console.log(res);
      if (res.data._id) {
        navigate("/contact/list");
      } else {
        console.log("Error:", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold mb-4">Contactz</h1>
      <div className="border-2 rounded-xl p-4">
        <form
          className="flex flex-col"
          onSubmit={(e) => handleCreateContact(e)}
        >
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="contactNo">Contact Number</label>
            <input
              id="contactNo"
              type="text"
              placeholder="0123456789"
              required
              minLength={10}
              maxLength={11}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>
          <button type="submit" className="ml-auto">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
