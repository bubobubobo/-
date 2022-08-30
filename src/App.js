import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import firebaseConfig from "./Firebase";
import Main from "./components/main/Main";
import { useState, useEffect } from "react";

function App() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  // 전체 collection reference!!!
  const ref = collection(db, "questions");

  const [questions, setQuestions] = useState([]);
  // CREATE : addDoc
  // const createQuestion = async () => {
  //   await addDoc(ref, { question: "질문", id: 2, answer: "정답" });
  // };

  // createQuestion();

  // UPDATE : doc, updateDoc
  const updateQuestion = async (id, answer) => {
    const questionDoc = doc(db, "questions", id);
    const newAnswer = { answer };
    await updateDoc(questionDoc, newAnswer);
  };

  // DELETE :
  const deleteQuestion = async (id) => {
    const questionDoc = doc(db, "questions", id);
    await deleteDoc(questionDoc);
  };

  useEffect(() => {
    const getQuestions = async () => {
      const questions = await getDocs(ref);
      const a = questions.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setQuestions(a);
    };

    getQuestions();
  }, []);

  return (
    <div>
      <Main />
      {questions.map((question) => {
        console.log(question);
        return (
          <div key={question.id}>
            <button onClick={() => updateQuestion(question.id, "새 정답")}>
              update answer
            </button>
            <button onClick={() => deleteQuestion(question.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
