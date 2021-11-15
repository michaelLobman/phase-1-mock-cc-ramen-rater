document.addEventListener("DOMContentLoaded", renderRamen);

function renderRamen(){
    fetch("http://localhost:3000/ramens")
    .then(resp => resp.json())
    .then(ramens => {
        const ramenMenu = document.getElementById('ramen-menu');
        for(const ramen of ramens){
            console.log(ramen)
            const ramenImage = document.createElement('img');
            ramenImage.src = ramen["image"];
            ramenImage.addEventListener('click', function(){
                const ramenDetail = document.getElementById('ramen-detail');
                ramenDetail.innerHTML = `
                <img class="detail-image" src=${ramen["image"]} alt=${ramen["name"]}/>
                <h2 class="name">${ramen["name"]}</h2>
                <h3 class="restaurant">${ramen["restaurant"]}</h3>
                `
                const ramenRating = document.getElementById('rating-display');
                ramenRating.textContent = ramen["rating"];

                const ramenComment = document.getElementById('comment-display');
                ramenComment.textContent = ramen["comment"];
            })
            ramenMenu.append(ramenImage);
        }
    })
    const createForm = document.getElementById('new-ramen');
    createForm.addEventListener('submit', createRamen);
}

function createRamen(e){
    e.preventDefault();
    const ramenMenu = document.getElementById('ramen-menu');
    const nameInput = document.getElementById('new-name');
    const imageInput = document.getElementById('new-image');
    const restInput = document.getElementById('new-restaurant');
    const ratingInput = document.getElementById('new-rating');
    const commentInput = document.getElementById('new-comment');
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "name": nameInput.value,
            "restaurant": restInput.value,
            "image": imageInput.value,
            "rating": ratingInput.value,
            "comment": commentInput.value,
        })
    })
    .then(() => {
        ramenMenu.innerHTML = '';
        renderRamen();
    })
}