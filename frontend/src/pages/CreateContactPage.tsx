import { useEffect, useState } from "react";
import { axiosInstance } from "../main";
import { useNavigate, useParams } from "react-router-dom";
import { GenericButton } from "../components/GenericButton";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const CreateContactPage = () => {
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getContactById = async (id: string) => {
      try {
        const res = await axiosInstance.get(`/contact/${id}`);
        console.log(res.data);
        setIsEdit(true);
        setName(res.data.name);
        setContactNo(res.data.contactNo);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.message);
        }
      }
    };

    if (params.id) {
      getContactById(params.id);
    }
  }, [params.id]);

  const handleCreateContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEdit) {
      updateContact();
    } else {
      createContact();
    }
  };

  const createContact = async () => {
    try {
      const res = await axiosInstance.post("/contact", {
        name: name,
        contactNo: contactNo,
      });
      console.log(res);
      if (res.data._id) {
        toast.success("Contact created");
        navigate("/contact/list");
      } else {
        toast.error(res.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/contact/${id}`);
      console.log(res.data);
      if (res.status == 200) {
        toast.success("Contact deleted");
        navigate("/contact/list");
      }
      console.log(res.data.message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    }
  };

  const updateContact = async () => {
    try {
      const res = await axiosInstance.patch(`/contact/${params.id}`, {
        name: name,
        contactNo: contactNo,
      });
      console.log("Update res", res);
      if (res.status == 200) {
        toast.success("Update success");
      } else {
        toast.error(res.data.message);
      }
      navigate("/contact/list");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col flex-grow max-w-md">
      <div className="flex items-end mb-4 gap-4">
        <h1 className="text-4xl font-bold">
          {isEdit ? "Edit" : "New"} Contact
        </h1>
        {isEdit && (
          <GenericButton
            type="button"
            onClick={() => deleteContact(params.id!)}
            variant="danger"
          >
            Delete
          </GenericButton>
        )}
      </div>
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
              value={name}
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
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>
          <div className="flex justify-between mt-4">
            <GenericButton
              type="button"
              variant="default"
              onClick={() => navigate("/contact/list")}
            >
              Back
            </GenericButton>
            <GenericButton
              type="submit"
              variant={isEdit ? "secondary" : "primary"}
            >
              {isEdit ? "Save" : "Create"}
            </GenericButton>
          </div>
        </form>
      </div>
    </div>
  );
};
