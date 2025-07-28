import { createBrowserRouter } from "react-router-dom";
import { Admin } from "./pages/admin/admin.tsx";
import { Home } from "./pages/home/home.tsx";
import { Login } from "./pages/login/login.tsx";
import { Networks } from "./pages/networks/networks.tsx";
import { Private } from "./routes/private.tsx";
import{ErrorPage} from "./pages/error/error.tsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      //A rota /admin só mostra a página <Admin /> se o usuário estiver autenticado, conforme verificação feita pelo componente <Private />.
      <Private>
        <Admin />
      </Private>
    ),
  },
  {
    path: "/networks",
    element: <Private><Networks /></Private>,
  },
  {path:"*",
    element:<ErrorPage/>
  }
]);

export { router };
