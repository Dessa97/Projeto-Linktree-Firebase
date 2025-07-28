//Importa componentes
import { Header } from "../../components/header/header";
import { Input } from "../../components/input/input";

//Hooks do React
import { FormEvent, useEffect, useState } from "react";

//Ícone de lixeira
import { FiTrash } from "react-icons/fi";

//Conexão com o banco de dados Firestore
import { db } from "../../services/firebaseConnection";
import {
  addDoc, // Adiciona documento com ID automático
  collection, // Referência a uma coleção
  onSnapshot, // Escuta alterações em tempo real
  query, // Cria consultas
  orderBy, // Ordena os resultados
  doc, // Referência a um documento específico
  deleteDoc, // Deleta documento
} from "firebase/firestore";

//Interface que define como um link é estruturado
interface LinkProps {
  id: string; // ID do documento no Firestore
  name: string; // Nome do link
  url: string; // URL
  bg: string; // Cor de fundo
  color: string; // Cor do texto
}

//Componente principal
export function Admin() {
  //Estados dos campos do formulário
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");

  //Estado que armazena todos os links vindos do Firestore
  const [links, setLinks] = useState<LinkProps[]>([]);

  //Carrega os links ao montar o componente e escuta mudanças em tempo real
  useEffect(() => {
    //Referência à coleção "links"
    const linksRef = collection(db, "links");

    //Consulta ordenando pelo campo "created" em ordem crescente
    const queryRef = query(linksRef, orderBy("created", "asc"));

    //Escuta alterações em tempo real (add, update, delete)
    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinkProps[];

      //Percorre cada documento retornado
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      //Atualiza o estado "links" com os dados do Firestore
      setLinks(lista);
    });

    //Quando o componente desmonta, para de escutar
    return () => {
      unsub();
    };
  }, []);

  //Função chamada quando o usuário envia o formulário
  function handleRegister(e: FormEvent) {
    e.preventDefault(); // Evita que a página recarregue

    //Validação simples
    if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos");
      return;
    }

    //Adiciona novo documento na coleção "links"
    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(), //Data de criação
    })
      .then(() => {
        //Limpa os campos após cadastrar
        setNameInput("");
        setUrlInput("");
        console.log("Cadastrado com Sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao Cadastrar!" + error);
      });
  }

  //Função para deletar link pelo ID
  async function handleDeleteLink(id: string) {
    //Pega referência ao documento específico
    const docRef = doc(db, "links", id);

    //Deleta o documento
    await deleteDoc(docRef);
  }

  //Renderização
  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      {/* Formulário de cadastro */}
      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
        <Input
          type="url"
          placeholder="Digite a url..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        {/* Escolha de cores */}
        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Cor do Link
            </label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Fundo do Link
            </label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {/* Pré-visualização */}
        {nameInput !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-2">
              Veja como está ficando:
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{ marginBottom: 8, backgroundColor: backgroundColorInput }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center"
        >
          Cadastrar
        </button>
      </form>

      {/* Listagem dos links cadastrados */}
      <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>
      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <p>{link.name}</p>
          <div>
            {/* Botão de deletar */}
            <button
              className="border-dashed p-1 rounded bg-neutral-900"
              onClick={() => handleDeleteLink(link.id)}
            >
              <FiTrash size={18} color="#FFF" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
