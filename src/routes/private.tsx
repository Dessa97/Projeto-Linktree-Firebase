// Instância de autenticação do Firebase.
import { auth } from "../services/firebaseConnection";
//Função que observa mudanças no estado de autenticação.
import { onAuthStateChanged } from "firebase/auth";
//ReactNode: Tipo para aceitar qualquer elemento React como children.
import { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

//Define que o componente Private deve receber algo que será renderizado dentro dele (children).
interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps): any {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };
        localStorage.setItem("@reactlinks", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });
    return () => {
      unsub();
    };
  }, []);
  if (loading) {
    return <div></div>;
  }
  if (!signed) {
    return <Navigate to="/login" />;
  }
  return children;
}
