
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

