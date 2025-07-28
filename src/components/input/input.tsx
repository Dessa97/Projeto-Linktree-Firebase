//importa um tipo que permite ao componente aceitar todas as propriedades padrão do <input> HTML (type, value, onChange e placeholder).
import { InputHTMLAttributes } from "react";

//interface que herda todas as propriedades de um <input> do html.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
//Recebe como parâmetro props, do tipo InputProps, ou seja, qualquer atributo de input HTML.
export function Input(props: InputProps) {
  return (
    <input
      className="border-0 h-9 rounded-md outline-none px-2 mb-3"
      {...props}
    />
  );
}
