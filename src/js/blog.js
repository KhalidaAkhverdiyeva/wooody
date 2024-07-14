
const BASE_URL = 'http://localhost:3000';

//  FETCH DATA FROM API

async function fetchData(endpoint, cb) {

    const response = await fetch(`http://localhost:3000/${endpoint}`);
    const data = await response.json();
    localStorage.setItem('apiData', JSON.stringify(data));
    cb(data);
}
fetchData('article', addDataUI);

function addDataUI(data) {
    data.map(item => {
        let article = document.querySelector('.b-article-content');
        article.innerHTML += `
     <div class="b-each-article">
            <div class="b-article-inside">
                <div class="b-article-left">
                    <img
                        class="b-article-img"
                        src="${item.image}"
                        alt=""
                    />
                    <div class="b-top-left-text">
                        <div>${item.dateNum}</div>
                        <div>${item.dateMonth}</div>
                    </div>
                    <div class="b-bottom-left-text">${item.label}</div>
                </div>
                <div class="b-article-right">
                    <div>
                        <div class="b-article-theme-top">
                            <div>
                                <span>Posted by</span>
                                <img
                                    src="https://woodmart.xtemos.com/wp-content/uploads/2018/10/avatar-home.jpg.webp"
                                    alt=""
                                />
                                <a href="">Mr. Mackey</a>
                            </div>
                            <div>
                                <i class="fa-solid fa-share-nodes"></i>
                                <i class="fa-regular fa-comment"></i>
                            </div>
                        </div>
                        <h4>${item.title}</h4>
                    </div>
                    <div>
                        <button>Delete</button>
                        <button>Update</button>
                    </div>
                </div>
            </div>
        </div>`
    })

}


// OPEN AND CLOSE THE MODAL FOR POST

const modal = document.querySelector(".modal");
const btn = document.querySelector(".openModal")
const closer = document.querySelector(".close");
const addArticle = document.querySelector('.addArticle');

closer.addEventListener("click", () => {
    modal.style.display = "none"

});

addArticle.addEventListener("click", () => {
    modal.style.display = "none"

});


btn.addEventListener("click", () => {
    modal.style.display = "block";
});
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


// POST NEW DATA

const nameInput = document.querySelector(".nameinput");
const imageInput = document.querySelector(".imginput");
const dateInput = document.querySelector(".dateinput");
const monthInput = document.querySelector(".monthinput");
const titleInput = document.querySelector(".titleinput");
const labeInput = document.querySelector(".labelinput");


function loadArticles() {
    const storedArticles = JSON.parse(localStorage.getItem('articles')) || [];
    const articleContainer = document.querySelector('.b-article-content');
    articleContainer.innerHTML = '';
    storedArticles.forEach(article => {
        storedArticles.forEach(article => {
            articleContainer.innerHTML += `
                <div class="b-each-article" data-id="${article.id}">
                    <div class="b-article-inside">
                        <div class="b-article-left">
                            <img class="b-article-img" src="${article.image}" alt="">
                            <div class="b-top-left-text">
                                <div>${article.dateNum}</div>
                                <div>${article.dateMonth}</div>
                            </div>
                            <div class="b-bottom-left-text">${article.label}</div>
                        </div>
                        <div class="b-article-right">
                            <div>
                                <div class="b-article-theme-top">
                                    <div>
                                        <span>Posted by</span>
                                        <img src="https://woodmart.xtemos.com/wp-content/uploads/2018/10/avatar-home.jpg.webp" alt="">
                                        <a href="">Mr. Mackey</a>
                                    </div>
                                    <div>
                                        <i class="fa-solid fa-share-nodes"></i>
                                        <i class="fa-regular fa-comment"></i>
                                    </div>
                                </div>
                                <h4>${article.title}</h4>
                            </div>
                            <div>
                                <button class="delete-article" data-id="${article.id}">Delete</button>
                                <button>Update</button>
                            </div>
                        </div>
                    </div>
                </div>`;
        })

    })

}

addArticle.addEventListener('click', addNewArticle)
async function addNewArticle(e) {

    e.preventDefault();
    const newArticleData = {
        id: uuid.v4(),
        title: titleInput.value,
        dateNum: dateInput.value,
        dateMonth: monthInput.value,
        label: labeInput.value,
        image: imageInput.value
    }

    const response = await fetch('http://localhost:3000/article', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArticleData)

    })

    const storedArticles = JSON.parse(localStorage.getItem('articles')) || [];
    storedArticles.push(newArticleData);
    localStorage.setItem('articles', JSON.stringify(storedArticles));

    loadArticles();

}



