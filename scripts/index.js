const loadLessons = () =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then((json) => {
        displayLessons(json.data);
    })
}

const displayLessons = (lessons) =>{
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    for(let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `<button class="btn btn-outline btn-primary"><img src="./assets/fa-book-open.png" alt="">Lesson-${lesson.level_no}</button>`;


        levelContainer.appendChild(btnDiv);
    }
 
}
loadLessons();