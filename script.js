const quiz = [
    {
      question: "Dove ci siamo conosciuti?",
      answers: ["Scuola", "Online", "Al bar"],
      correct: 1
    },
    {
      question: "Chi ha fatto la prima mossa?",
      answers: ["Io", "Tu", "Destino 😏"],
      correct: 2
    },
    {
      question: "Qual è il nostro posto preferito?",
      answers: ["Casa", "Ristorante", "Ovunque insieme"],
      correct: 2
    }
  ];
  
  let current = 0;
  
  function loadQuestion() {
    if (current >= quiz.length) {
      document.querySelector(".card").innerHTML = `
        <h2>Hai vinto ❤️</h2>
        <p>Sei ufficialmente la persona perfetta per me.</p>
        <p>Ora cerca il tuo regalo 😘</p>
      `;
      return;
    }
  
    const q = quiz[current];
    document.getElementById("question").innerHTML = q.question;
  
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
  
    q.answers.forEach((ans, i) => {
      const btn = document.createElement("button");
      btn.innerText = ans;
      btn.onclick = () => checkAnswer(i);
      answersDiv.appendChild(btn);
    });
  
    document.getElementById("feedback").innerText = "";
  }
  
  function checkAnswer(i) {
    if (i === quiz[current].correct) {
      document.getElementById("feedback").innerText = "Giusto ❤️";
      current++;
      setTimeout(loadQuestion, 1000);
    } else {
      document.getElementById("feedback").innerText = "Nooo 😂 riprova!";
    }
  }
  
  loadQuestion();