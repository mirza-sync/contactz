import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContactListPage } from "../pages/ContactListPage.tsx";
import { CreateContactPage } from "../pages/CreateContactPage.tsx";

const router = createBrowserRouter([
  {
    path: "contact/list",
    element: <ContactListPage />,
  },
  {
    path: "contact",
    element: <CreateContactPage />,
  },
  {
    path: "*",
    element: <ContactListPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
