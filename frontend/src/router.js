import { createBrowserRouter } from "react-router-dom";

import Root from "./routes/root.jsx";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
]);