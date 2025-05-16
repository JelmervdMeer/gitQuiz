const quizData = [
    {
    vraag: "1. Hoe heet een opslagplaats van je project?",
    options: ["Repository", "GitHub", "Git", "Commit"],
    antwoord: "Repository",
    feedBack:"Een repository is een opslagplaats voor je project, waar je alle bestanden en de geschiedenis van wijzigingen kunt bijhouden."
  },
    {
        vraag: "2. Hoe heet een aparte lijn van ontikkeling binnen je project?",
        options: ["Branch", "Repository", "GitHub", "Commit"],  
        antwoord: "Branch"
    },
    {
        vraag: "3. Het haalt de laatste wijzingen op en voegt ze samen met je lokale branch",
        options: ["Git", "Commit", "Repository", "Commit"],
        antwoord: "Commit"
    },
    {
        vraag: "4. Hoe heet het proces van het opslaan van je project?",
        options: ["Commit", "Push", "Pull", "Branch"],
        antwoord: "Commit"
    },
    {
        vraag: "5. Hoe heet het proces van het uploaden van je project naar GitHub?",
        options: ["Push", "Pull", "Commit", "Branch"],
        antwoord: "Push"
    }
];

    let huidigeVraag = 0;
    let score = 0;      
    let tijdOver = 30;
    let timerInterval;
    const tijdElement = document.getElementById("tijd");
    const vraagElement = document.getElementById("vraag");
    const optiesElement = document.getElementById("opties");
    //const resultaatElement = document.getElementById("resultaat");
    const feedbackElement = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");
    const restartBtn = document.getElementById("restart");

    function laadVraag(){
        if(huidigeVraag < quizData.length) {
            const huidigeQuiz = quizData[huidigeVraag];
            vraagElement.textContent = huidigeQuiz.vraag;
            optiesElement.innerHTML = "";
            feedbackElement.innderHTML = "";
            
            huidigeQuiz.options.forEach(option => {
                const button = document.createElement("button");
                button.classList.add("option");
                button.textContent = option;
                button.addEventListener("click", () => {
                    if (option === huidigeQuiz.antwoord) {
                        score++;
                        feedbackElement.textContent = "Goed gedaan!";
                    } else {
                        feedbackElement.textContent = `Fout! ${huidigeQuiz.feedBack || ''}`;
                    }
                    huidigeVraag++;
                    setTimeout(laadVraag, 1000); // Kleine pauze voor volgende vraag
                });
                optiesElement.appendChild(button);
            });
        } else {
            endQuiz();
        }
    }
    function startTimer() {
        timerInterval = setInterval(() => {
            tijdOver--;
            tijdElement.textContent = tijdOver;
            if (tijdOver <= 0) {
                clearInterval(timerInterval);
                endQuiz();
            }
        }, 1000);
    }
      // End the quiz and show the results
      function endQuiz() {
        clearInterval(timerInterval);
        vraagElement.style.display = 'none';
        optiesElement.style.display = 'none';
        resultaatElement.style.display = 'block';
        scoreElement.textContent = score;
        restartBtn.style.display = 'block';
    }
     // Restart the quiz
     restartBtn.addEventListener('click', () => {
        // Reset variables
        currentQuestion = 0;
        score = 0;
        timeOver = 30;
        tijdElement.textContent = timeLeft;

        // Reset the display
        vraagElement.style.display = 'block';
        optiesElement.style.display = 'flex'; // Ensure options are displayed correctly
        resultaatElement.style.display = 'none';
        restartBtn.style.display = 'none';

        // Load the first question
        laadVraag();
    }); 
      // Initialize the quiz with the first question
      laadVraag();