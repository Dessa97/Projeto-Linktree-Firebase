//initializeApp: iniciar a aplicação Firebase.
import { initializeApp } from "firebase/app";
//getFirestore: usar o banco de dados Firestore.
import { getFirestore } from "firebase/firestore";
//getAuth: usar o sistema de autenticação
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdkjcaEdzP78eDEo5SisyEpSSNTT8uV1o",
  authDomain: "reactlinks-4fa11.firebaseapp.com",
  projectId: "reactlinks-4fa11",
  storageBucket: "reactlinks-4fa11.firebasestorage.app",
  messagingSenderId: "919449360190",
  appId: "1:919449360190:web:bf4d5c6fc07d926e8c7e6f",
};

//inicializando a instância do Firebase com a configuração fornecida.
const app = initializeApp(firebaseConfig);
//conecta ao serviço de autenticação
const auth = getAuth(app);
//db conecta ao banco de dados Firestore
const db = getFirestore(app);

export { auth, db };
