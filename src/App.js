import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseConfig from "./Firebase";
import Main from "./components/main/Main";
import { useEffect } from "react";

function App() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const ref = collection(db, "questions");
  useEffect(() => {
    const getQuestions = async () => {
      const questions = await getDocs(ref);
      const a = questions.docs.map((doc) => ({ ...doc.data() }));
      console.log(a);
    };

    getQuestions();
  }, []);

  return (
    <div>
      <Main />
    </div>
  );
}

export default App;
