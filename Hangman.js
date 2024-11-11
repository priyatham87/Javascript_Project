const keyboard = document.querySelector(".keyboard")

const guessesText = document.querySelector(".guess-text b")

const wordDisplay = document.querySelector(".word-display")

const hangmanImg = document.querySelector(".img-box img")


//Words and hints
wordList = [
    {
        word: "ocean",
        hint: "A large body of saltwater"
    },
    {
        word: "guitar",
        hint: "A musical instrument with strings"
    },
    {
        word: "library",
        hint: "A place full of books"
    },
    {
        word: "elephant",
        hint: "The largest land animal"
    },
    {
        word: "bicycle",
        hint: "A two-wheeled mode of transport"
    },
    {
        word: "mountain",
        hint: "A large natural elevation of the earth's surface"
    },
    {
        word: "laptop",
        hint: "A portable computer"
    },
    {
        word: "piano",
        hint: "A keyboard musical instrument"
    },
    {
        word: "rainbow",
        hint: "A colorful arc in the sky after rain"
    },
    {
        word: "garden",
        hint: "A place where plants and flowers grow"
    }
];



var currentWord, wrongGuessCount = 0;

const maxGuesses = 6;

const getRandomWord = () => {
    //Geting Random Word and Hint from the WordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]

    currentWord = word;

    localStorage.setItem("word", currentWord)

    console.log(word);

    document.querySelector(".hint-text b").innerText = hint

    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");

}
getRandomWord();

let winner = []

const initGame = (btn, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if (currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {

            if (letter === clickedLetter) {
                wordDisplay.querySelectorAll("li")[index].innerText = letter;

                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")

                //push clicking letter in to an winner array
                winner.push(clickedLetter)
            }
        })
    }
    else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImg.src = `./hangman-${wrongGuessCount}.svg`;
    }
    //After clicking the button it get disabled
    btn.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    //if incorrect letter is 6 open gameover page
    if (wrongGuessCount == maxGuesses) {
        location.assign("./Gameover.html")
    }
    //clicking letter store in newWord string
    newWord = "";
    for (w = 0; w < winner.length; w++) {
        newWord += winner[w]
    }
    //comapare newword and currentword length if it is same then open winner page
    matchWord = (newWord.length == currentWord.length);
    if (matchWord == true) {
        location.assign("./winner.html")
    }
}

//creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);

    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}