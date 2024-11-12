import { useState, useEffect } from "react";
import "./App.css";
import { UserProvider } from './components/UserContext';
import Header from './components/Header';
import Question from './components/Question';
import Results from './components/Results';
import UserForm from './components/UserForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
        question: "What's your favorite comics?",
        options: ["Batman 🦇", "Spawn 🖤", "SpiderMan 🕷️", "GreenLantern 💡"],
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air", 
    "Batman 🦇": "Noir",
    "Spawn 🖤": "Air",
    "SpiderMan 🕷️": "Earth",
    "GreenLantern 💡": "Water",
  };

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  async function fetchArtwork(requestString) {
    try {
      let requestString=answers.map(answer => elements[answer]).join(' ').toLowerCase();

      console.log("Requesting artwork for:", requestString);
      const search = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${requestString}&isOnView=true`);
      const data1 = await search.json();

      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${data1.objectIDs[0]}`);
      const data = await response.json();
      if (data) {
        setArtwork(data);
      } else {
        setArtwork(null);
      }
 
    } catch (error) {
      console.error("Error fetching artwork:", error);
      setArtwork(null);
    }
  }

  return (
    <UserProvider value={{ name: userName, setName: setUserName }}>
        <BrowserRouter 
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
        <Header />
        <Routes>
            <Route 
                path="/"
                element={<UserForm onSubmit={handleUserFormSubmit} />}
            />
            <Route
                path="/quiz"
                element={
                currentQuestionIndex < questions.length ? (
                    <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
                ) : (
                    <Results element={element} artwork={artwork} />
                )
                }
            />
            </Routes>
        </BrowserRouter>
    </UserProvider>
  );
}

export default App;
