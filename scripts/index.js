const loadLessons = () =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then((json) => 
        displayLessons(json.data));
};

    const loadLevelWord = (id) =>{
        const url = `https://openapi.programming-hero.com/api/level/${id}`;
        fetch(url)
        .then((res) => res.json())
        .then((data)=> displayLevelWord(data.data));
    };

    const displayLevelWord = (words) =>{
        const wordContainer = document.getElementById('word-container');
        wordContainer.innerHTML = '';

        for(let word of words){
            console.log(word);
            const card = document.createElement("div");
            card.innerHTML = `
            <div class="bg-white rounded-xl px-5 py-10 space-y-5 shadow-sm text-center">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning / Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">${word.meaning} / ${word.pronunciation}</div>
            <div class="flex justify-between items-center">

                <!-- First Button -->
                <button class="flex items-center justify-center">
                    <i class="fa-solid fa-circle-info btn hover:bg-[#00BCFF50] "></i>
                </button>

                <!-- Second Button -->
                <button class="flex items-center justify-center">
                    <i class=" fa-solid fa-volume-high btn hover:bg-[#00BCFF50]"></i>
                </button>

            </div>
        </div>
            `;
            wordContainer.append(card);
    }
};


const displayLessons = (lessons) =>{
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    for(let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `<button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><img src="./assets/fa-book-open.png" alt="">Lesson-${lesson.level_no}</button>`;


        levelContainer.appendChild(btnDiv);
    }
 
}
loadLessons();