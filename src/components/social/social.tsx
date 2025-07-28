// Importa o tipo ReactNode para permitir passar qualquer conteúdo React como filho
import { ReactNode } from "react";

interface SocialProps {
  url: string;
  /*children é o icone da rede social */
  children: ReactNode;
}

export function Social({ url, children }: SocialProps) {
  return (
    <a
      href={url}
      //informa que é um link externo
      rel="noopener noreferrer"
      //abre o link em outra aba
      target="_blank"
    >
      {children}
    </a>
  );
}
