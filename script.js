const quiz = [
  {
    question: "Quando ci siamo dati il primo bacio?",
    answers: ["23 aprile 2023", "22 aprile 2023", "24 aprile 2023"],
    correct: 1,
    imgWrong: 'images/quiz1/wrong.jpg',
    imgCorrect: 'images/quiz1/correct.jpg',
    textCorrect: 'Bravo vita mii',
    textWrong: '...senza parole'
  },
  {
    question: "Cosa fa sempre Bubu G?",
    answers: ["labrottino", "monello", "cuoricino"],
    correct: 0,
    imgWrong: 'images/quiz2/wrong.jpg',
    images: ['images/quiz2/labr1.jpg','images/quiz2/labr2.jpg','images/quiz2/labr3.jpg','images/quiz2/labr4.jpg',
      'images/quiz2/labr5.jpg','images/quiz2/labr6.png', 'images/quiz2/labr7.jpg'
    ],
    textWrong: 'non è la risposta corretta...\n almeno per oggi'
  },
  {
    question: "Cosa succede se Bubu G sta più di 7 minuti con Bubu P?",
    answers: ["il molesto", "dorme", "si annoia"],
    correct: 1,
    scatteredImgs: ['images/quiz3/dorme1.jpg','images/quiz3/dorme2.jpg','images/quiz3/dorme3.jpg','images/quiz3/dorme4.jpg',
      'images/quiz3/dorme5.jpg','images/quiz3/dorme6.jpg'],
    textWrong: 'zzz... sbagliato',
    imgWrong: 'images/quiz3/wrong.jpg',
  },
  {
    question: "Qual è il regalo che rende Bubu P super felice?",
    answers: ["vestiti", "cene", "fiori"],
    correct: 2,
    collageImages: ['images/quiz4/fiori1.jpg','images/quiz4/fiori2.jpg','images/quiz4/fiori3.jpg','images/quiz4/fiori4.jpg',
      'images/quiz4/fiori5.jpg','images/quiz4/fiori6.jpg','images/quiz4/fiori7.jpg','images/quiz4/fiori8.jpg'],
    textWrong: 'nooooo, \n che cuoricino però Bubu P',
    imgWrong: 'images/quiz4/wrong.jpg',
  },
  {
    question: "Dove siete ingrassati 10kg?",
    answers: ["susheria", "verdenova", "pizzeria"],
    correct: 1,
    imgWrong: 'images/quiz5/wrong.jpg',
    imgCorrect: 'images/quiz5/correct.jpg',
    textCorrect: 'Siii 2 lellone tassieee',
    textWrong: 'Sbagliato.. la foto è \n un indizio daii'
  },
  {
    question: "Qual è il posto più di merda in cui abbiamo mangiato?",
    answers: ["quel posto di merda del ramen"],
    correct: 0,
    imgCorrect: 'images/quiz6/correct.jpg',
    textCorrect: "Meglio l'aeresol che quel ramen \n BRAVOOOO",
  },
  {
    question: "Chi ha fatto il primo passo?",
    answers: ["Bubu G", "Bubu P", "è stato il destino"],
    correct: 1,
    imgWrong: 'images/quiz7/wrong.jpg',
    imgCorrect: 'images/quiz7/correct.jpg',
    textCorrect: 'Proprio lei.. E C LABBRAT',
    textWrong: 'T piacessss'
  },
  {
    question: "Dove eravate quando vi hanno detto di sposarvi?",
    answers: ["caserta", "salerno", "napoli"],
    correct: 1,
    imgWrong: 'images/quiz8/wrong.jpg',
    imgCorrect: 'images/quiz8/correct.jpg',
    textCorrect: "Ti amo... \n DAI CON L'ULTIMA",
    textWrong: 'Qui era sempre lì \n ma quando eravamo più giovani \n MI HAI DELUSO'
  },
  {
    question: "Il più grande traguardo di Bubu G?",
    answers: ["transalp xl 750 anno 2025", "giulietta", "laurea"],
    correct: 0,
    imgWrong: 'images/quiz9/wrong.jpg',
    imgCorrect: 'images/quiz9/correct.jpg',
    textCorrect: "UN LEONE!!!",
    textWrong: 'Uno dei traguardi \n ma non prendiamoci in giro..'
  }
];

  const loader = document.getElementById("loader");

  const STATE = {
    QUESTION: "question",
    RESULT: "result",
    GALLERY: "gallery",
    SCATTER: "scatter",
    COLLAGE: "collage",
    END: "end"
  };

  let state = STATE.QUESTION;
  
  let current = 0;
  let btnBack = document.getElementById("goBack");
  let btnAhead = document.getElementById("goAhead");
  let wrap = document.getElementById("wrap")

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  document.addEventListener("click", (e) => {
    if (e.target.closest(".gallery img")) {
      lightboxImg.src = e.target.src;
      lightbox.classList.add("open");

      // reset zoom
      lightboxImg.style.transform = "scale(1)";
    }
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("open");
  });

  let scale = 1;

  lightboxImg.addEventListener("wheel", (e) => {
    e.preventDefault();

    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(1, 3), scale);

    lightboxImg.style.transform = `scale(${scale})`;
  });

  lightboxImg.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;

      const dist = Math.sqrt(dx * dx + dy * dy);

      if (startDist === 0) startDist = dist;

      let zoom = dist / startDist;

      zoom = Math.min(Math.max(1, 3), zoom);

      lightboxImg.style.transform = `scale(${zoom})`;
    }
  });

  lightboxImg.addEventListener("touchend", () => {
    startDist = 0;
  });

  const music = document.getElementById("bgMusic");
    const title = document.getElementById("musicTitle");

    const btnPlay = document.getElementById("btnPlay");
    const btnPause = document.getElementById("btnPause");
    const btnStop = document.getElementById("btnStop");

    function resetButtons() {
      btnPlay.classList.remove("active");
      btnPause.classList.remove("active");
      btnStop.classList.remove("active");
    }

    function playMusic() {
      music.volume = 0.3;
      music.play().catch(console.log);

      resetButtons();
      btnPlay.classList.add("active");

      title.textContent = "🎵 Musica in riproduzione";
    }

    function pauseMusic() {
      music.pause();

      resetButtons();
      btnPause.classList.add("active");

      title.textContent = "⏸ Musica in pausa";
    }

    function stopMusic() {
      music.pause();
      music.currentTime = 0;

      resetButtons();
      btnStop.classList.add("active");

      title.textContent = "⏹ Musica ferma";
    }

  function preloadImages() {
    initial();
    showLoader();
    const allImages = [];

    quiz.forEach(q => {
      if (q.imgWrong) allImages.push(q.imgWrong);
      if (q.imgCorrect) allImages.push(q.imgCorrect);
      if (q.images) allImages.push(...q.images);
      if (q.scatteredImgs) allImages.push(...q.scatteredImgs);
      if (q.collageImages) allImages.push(...q.collageImages);
    });

    allImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // 🎵 PRELOAD AUDIO
    const music = new Audio("audio/music.mp3");
    music.preload = "auto";
    music.load();

    hideLoader();
  }

  function renderState(q, isCorrect) {
    hideNavButtons();

    // reset UI base
    document.getElementById("polaroid").style.display = "none";
    document.getElementById("gallery").style.display = "none";
    document.getElementById("scatter-container").style.display = "none";
    document.getElementById("collage-container").style.display = "none";
    document.getElementById("quiz2").style.display = "none";
    document.getElementById("quiz4").style.display = "none";
    if(isCorrect && current === 0){
       document.getElementById("group").classList.remove("btnGroup");
       document.getElementById("group").classList.add("btnGroup-firstQuestion");
    } else if(isCorrect && current > 0){
      document.getElementById("group").classList.add("btnGroup");
      document.getElementById("group").classList.remove("btnGroup-firstQuestion");
    }
    wrap.style.display = "none";

    const img = document.getElementById("reaction");
    img.style.display = "none";

    // 👉 DECISIONE BOTTONI (QUI MAGIA)
    switch (state) {

      case STATE.QUESTION:
        btnAhead.classList.add("hidden");
        btnBack.classList.add("hidden");
        break;

      case STATE.RESULT:
        document.getElementById("polaroid").style.display = "inline-block";
        const img = document.getElementById("reaction");
        img.style.display = "block";
        if(isCorrect){
          btnAhead.classList.remove("hidden");
          btnBack.classList.toggle("hidden", current === 0);
        } else {
          hideNavButtons();
        }
        break;

      case STATE.GALLERY:
        renderGallery(q.images);
        btnAhead.classList.remove("hidden");
        btnBack.classList.toggle("hidden", current === 0);
        break;
      case STATE.SCATTER:
        renderScattered(q.scatteredImgs);
        btnAhead.classList.remove("hidden");
        btnBack.classList.toggle("hidden", current === 0);
        break;
      case STATE.COLLAGE:
        renderCollage(q.collageImages);
        btnAhead.classList.remove("hidden");
        btnBack.classList.toggle("hidden", current === 0);
        break;

      case STATE.END:
        hideNavButtons();
        break;
    }
  }

  async function loadQuestion() {
    state = STATE.QUESTION;
    renderState(null, null);

    // ⏳ PICCOLO DELAY PER RESET UI (effetto transizione)
    document.querySelector(".card").style.opacity = 0;

    await new Promise(r => setTimeout(r, 250));

    document.querySelector(".card").style.opacity = 1;

    if (current >= quiz.length) {
      state = STATE.END;
      renderState(null, null);

      document.querySelector(".card").innerHTML = `
        <h2>Hai vinto ❤️</h2>
        <p>Dai erano semplici le domande...o meglio ho messo solo quelle di cui conoscevo la risposta.</p>
        <p>Sei tutta la mia vita.</p>
        <p>Hai visto? Ho fatto qualcosa da programmatrice che non sia per lavoro.</p>
        <p>Spero che ti sia piaciuto questo mini giochino e che tu sia fiero di me.</p>
        <br>
        <br>
        <p>Ora cerca il tuo regalo sotto il letto, te lo meriti!</p>
      `;
      return;
    }

    const q = quiz[current];

    document.getElementById("question").innerHTML = q.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach((ans, i) => {
      const btn = document.createElement("button");
      btn.classList.add("quiz-btn");
      btn.innerText = ans;
      btn.onclick = () => checkAnswer(i);
      answersDiv.appendChild(btn);
    });
  }
  
  function checkAnswer(i) {
    const q = quiz[current];
    let isCorrect = false;

    state = STATE.RESULT;

    const polaroid = document.getElementById("polaroid");
    const img = document.getElementById("reaction");

    const buttons = document.querySelectorAll(".quiz-btn");

    if (i === q.correct) {
      isCorrect = true;
      buttons.forEach((btn, index) => {
        btn.classList.remove("wrong","correct");
        if (index === quiz[current].correct) {
          btn.classList.add("correct");
        }
        btn.disabled = true;
      });

      setResult(true, q.textCorrect);

      if (q.images) {
        state = STATE.GALLERY;
      }

      else if (q.scatteredImgs) {
        state = STATE.SCATTER;
      }

      else if (q.collageImages) {
        state = STATE.COLLAGE;
      }

      else {
        img.src = q.imgCorrect;
        triggerPop();
      }

    } else {
      buttons.forEach((btn, index) => {
        btn.classList.remove("wrong","correct");
        if (index !== quiz[current].correct && index === i) {
          btn.classList.add("wrong");
        }
      });
      setResult(false, q.textWrong);
      img.src = q.imgWrong;
      triggerPop();
    }

    renderState(q, isCorrect);
  }
  
  function goBack(){
    current--;
    state = STATE.QUESTION;
    loadQuestion();
  }

  function goAhead(){
    current++;
    state = STATE.QUESTION;
    loadQuestion();
  }

  function setResult(isCorrect, text) {
    const polaroid = document.getElementById("polaroid");
    const feedback = document.getElementById("feedback");
    feedback.style.display = "inline-block";
    // reset classi
    polaroid.classList.remove("correct", "wrong");

    // applica stato
    if (isCorrect) {
      polaroid.classList.add("correct");
    } else {
      polaroid.classList.add("wrong");
      hideNavButtons();
    }

    feedback.innerText = text;
  }

  function triggerPop() {
    const polaroid = document.getElementById("polaroid");

    polaroid.classList.remove("pop");

    // forza reflow per riavviare animazione
    void polaroid.offsetWidth;

    polaroid.classList.add("pop");
  }

  function renderGallery(images) {
    const gallery = document.getElementById("gallery");
    gallery.style.display = "flex";
    const quiz2 = document.getElementById("quiz2");
    quiz2.style.display = "block";
    wrap.style.display = "flex";

    gallery.innerHTML = "";

    images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      gallery.appendChild(img);
    });

    // scroll alla 4ª immagine (centrale)
    setTimeout(() => {
      const imgs = gallery.querySelectorAll("img");
      if (imgs[3]) {
        imgs[3].scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
      }
    }, 100);
  }

  function scrollGallery(direction) {
    const gallery = document.getElementById("gallery");

    const scrollAmount = 250; // circa una foto

    gallery.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth"
    });
  }

  function renderScattered(images) {
    const container = document.getElementById("scatter-container");
    container.innerHTML = "";
    container.style.display = "inline-block";

    const cols = 3;
    const rows = Math.ceil(images.length / cols);

    const cellW = 100 / cols;
    const cellH = 100 / rows;

    images.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.classList.add("scattered-img");

      const col = i % cols;
      const row = Math.floor(i / cols);

      let left = col * cellW + Math.random() * 10;
      let top = row * cellH + Math.random() * 10;

      img.style.left = left + "%";
      img.style.top = top + "%";

      img.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
      img.style.setProperty("--r", `${Math.random() * 30 - 15}deg`);

      container.appendChild(img);
    });

    // 💥 TESTO "CORRETTO"
    const text = document.createElement("div");
    text.classList.add("scatter-text");

    text.innerText = "zzz... CORRETTO!";

    text.style.left = (20 + Math.random() * 40) + "%";
    text.style.top = (20 + Math.random() * 40) + "%";

    container.appendChild(text);
  }

  function renderCollage(images) {
    const container = document.getElementById("collage-container");
    container.style.display = "inline-block";
    container.innerHTML = "";
    const quiz4 = document.getElementById("quiz4");
    quiz4.style.display = "block";

    const positions = [
      { top: 5, left: 5, rot: -8 },
      { top: 10, left: 35, rot: 5 },
      { top: 5, left: 65, rot: -3 },

      { top: 35, left: 10, rot: 6 },
      { top: 35, left: 40, rot: -6 },
      { top: 35, left: 70, rot: 4 },

      { top: 65, left: 20, rot: -5 },
      { top: 65, left: 55, rot: 7 }
    ];

    images.slice(0, 8).forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.classList.add("collage-img");

      const pos = positions[i];

      img.style.top = pos.top + "%";
      img.style.left = pos.left + "%";

      // leggero random per naturalezza
      const jitter = (Math.random() * 6 - 3);

      img.style.transform = `rotate(${pos.rot + jitter}deg)`;

      container.appendChild(img);
    });
  }

  function hideNavButtons() {
    btnBack.classList.add("hidden");
    btnAhead.classList.add("hidden");
  }

  function showNavButtons() {
    btnAhead.classList.remove("hidden");
    btnBack.classList.remove("hidden");
  }

  function updateNavButtons() {
    // sempre mostra "avanti" dopo risposta
    btnAhead.classList.remove("hidden");

    // mostra "indietro solo se non sei alla prima domanda"
    if (current > 0) {
      btnBack.classList.remove("hidden");
    } else {
      btnBack.classList.add("hidden");
    }
  }

  preloadImages();

  function showLoader() {
    loader.classList.remove("hidden");
  }

  function hideLoader() {
    loader.classList.add("hidden");
    document.getElementById("card").style.display = "block";
    loadQuestion();
  }

  function initial(){
    hideNavButtons();

    // reset UI base
    document.getElementById("card").style.display = "none";
    document.getElementById("polaroid").style.display = "none";
    document.getElementById("gallery").style.display = "none";
    document.getElementById("scatter-container").style.display = "none";
    document.getElementById("collage-container").style.display = "none";
    document.getElementById("quiz2").style.display = "none";
    document.getElementById("quiz4").style.display = "none";
    wrap.style.display = "none";

    const img = document.getElementById("reaction");
    img.style.display = "none";
  }