import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App";
/*RouterProvider: habilita navegação entre rotas */
import { RouterProvider } from "react-router-dom";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  /*StrictMode ajuda a identificar problemas durante o desenvolvimento */
  <React.StrictMode>
    {/* Ele ativa o React Router e diz qual conjunto de rotas (o router) deve ser usado na aplicação. */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
