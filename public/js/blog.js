document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname;
    const homeLinks = document.querySelectorAll('.page-link');

    homeLinks.forEach(function (link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

const BASE_URL = 'http://localhost:3000';

//  FETCH DATA FROM API


fetchData('article', addDataUI);
document.querySelector('.b-article-content').addEventListener('click', async (event) => {
    if (event.target.classList.contains('update-article')) {
        const id = event.target.getAttribute('data-id');
        await openUpdateModal(id);
    } else if (event.target.classList.contains('delete-article')) {
        const id = event.target.getAttribute('data-id');
        await deleteArticle(id);
    }
});
async function fetchData(endpoint, cb) {

    const response = await fetch(`http://localhost:3000/${endpoint}`);
    const data = await response.json();
    cb(data);
}

function addDataUI(data) {

    let article = document.querySelector('.b-article-content');
    article.innerHTML = '';

    data.forEach(item => {
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
                               <button class="delete-article" data-id="${item.id || uuid.v4()}">Delete</button>
                               <button class="update-article" data-id="${item.id || uuid.v4()}" >Update</button>
                           </div>
                       </div>
                   </div>
               </div>`

    });

}

//UPDATE FORM
const updateModal = document.querySelector('#update-modal');
const updateBtn = document.querySelector('.update-article');
const closeModal = document.querySelector('.closer');

const updateImageInput = document.querySelector(".update-imginput");
const updateDateInput = document.querySelector(".update-dateinput");
const updateMonthInput = document.querySelector(".update-monthinput");
const updateTitleInput = document.querySelector(".update-titleinput");
const updateLabelInput = document.querySelector(".update-labelinput");

const saveUpdateBtn = document.querySelector('.saveUpdate');

closeModal.addEventListener('click', () => {
    updateModal.style.display = 'none';

})
window.addEventListener('click', event => {

    if (event.target == updateModal) {
        updateModal.style.display = 'none';
    }
});


async function openUpdateModal(id) {

    const response = await fetch(`http://localhost:3000/article/${id}`);
    const data = await response.json();



    updateImageInput.value = data.image
    updateDateInput.value = data.dateNum
    updateMonthInput.value = data.dateMonth
    updateTitleInput.value = data.title
    updateLabelInput.value = data.label

    updateModal.setAttribute('data-id', data.id);
    updateModal.style.display = 'block';


}

saveUpdateBtn.addEventListener('click', async (e) => {

    e.preventDefault();

    const id = updateModal.getAttribute('data-id');

    const updatedData = {
        image: updateImageInput.value,
        dateNum: updateDateInput.value,
        dateMonth: updateMonthInput.value,
        title: updateTitleInput.value,
        label: updateLabelInput.value,
    };

    const response = await fetch(`http://localhost:3000/article/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })

    const data = await response.json();

    fetchData('article', addDataUI);

    updateModal.style.display = 'none';
})


//DELETE ARTICLE

const articleContainer = document.querySelector('.b-article-content');

articleContainer.addEventListener('click', async (event) => {
    const deleteBtn = event.target.closest('.delete-article');
    if (!deleteBtn) return;

    const id = deleteBtn.getAttribute('data-id');
    const confirmDelete = confirm("Are you sure you want to delete this article?");

    if (confirmDelete) {
        try {
            const response = await fetch(`http://localhost:3000/article/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the article');
            }

            console.log("Article deleted:", await response.json());

            deleteBtn.parentElement.remove();
        } catch (error) {
            console.error('Error deleting article:', error);
            alert('Failed to delete the article. Please try again.');
        }
    }
});







// OPEN AND CLOSE THE MODAL FOR POST

const modal = document.querySelector(".modal");
const btn = document.querySelector(".openModal")
const closer = document.querySelector(".close");
const addArticleBtn = document.querySelector('.addArticle');

closer.addEventListener("click", () => {
    modal.style.display = "none"

});

addArticleBtn.addEventListener("click", () => {
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

const imageInput = document.querySelector(".imginput");
const dateInput = document.querySelector(".dateinput");
const monthInput = document.querySelector(".monthinput");
const titleInput = document.querySelector(".titleinput");
const labelInput = document.querySelector(".labelinput");


async function loadArticles() {
    const response = await fetch('http://localhost:3000/article')
    const data = await response.json();

    const articleContainer = document.querySelector('.b-article-content');
    articleContainer.innerHTML = '';

    data.forEach(article => {
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
                                <button data-id="${article.id}>Update</button>
                            </div>
                        </div>
                    </div>
        </div>`;
    })

}

addArticleBtn.addEventListener('click', addNewArticleUI);

async function addNewArticleUI(e) {
    e.preventDefault();

    const newArticleData = {
        id: uuid.v4(),
        title: titleInput.value,
        dateNum: dateInput.value,
        dateMonth: monthInput.value,
        label: labelInput.value,
        image: imageInput.value
    };


    const response = await fetch('http://localhost:3000/article', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArticleData)
    });
    loadArticles();

}

