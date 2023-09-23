const refs = {
  postsContainer: document.querySelector('.posts-container'),
  form: document.querySelector('form'),
  del: document.querySelector('.delete'),
};
const BASE__URL = 'http://localhost:3000/posts';
fetch(BASE__URL)
  .then(response => response.json())
  .then(posts => {
    let html = '';
    posts.forEach(post => {
      const postHTML = createPostHTML(post);
      html += postHTML;
    });
    refs.postsContainer.insertAdjacentHTML('beforeend', html);
  })
  .catch(error => {
    console.error('Ошибка при получении постов:', error);
  });
refs.postsContainer.addEventListener('click', delCard);

//* ===
function delCard(event) {
  if (event.target.classList.contains('delete')) {
    const card = event.target.closest('.container-card');
    const id = card.dataset.id;
    deletePost(id).then(() => {
      card.remove();
    });
  }
}
function deletePost(id) {
  const options = {
    method: 'DELETE',
  };
  return fetch(`${BASE__URL}/${id}`, options);
}
//* ===

//* ===
function getPosts() {
  fetch(BASE__URL)
    .then(response => response.json())
    .then(posts => {
      refs.postsContainer.innerHTML = '';
      let html = '';
      posts.forEach(post => {
        const postHTML = createPostHTML(post);
        html += postHTML;
      });
      refs.postsContainer.insertAdjacentHTML('beforeend', html);
    })
    .catch(error => {
      console.error('Ошибка при получении постов:', error);
    });
}
function createPostHTML(post) {
  const aa = `<div class="container-card" data-id="${post.id}">
    <p>Title = ${post.post.title}</p>
    <p>Body = ${post.post.body}</p>
    <button class="delete">Удалить</button>
    <button class="edit">Редактировать</button>
    </div>`;

  return aa;
}
getPosts();
refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(refs.form);
  const title = formData.get('name');
  const body = formData.get('text');
  if (!title || !body) {
    alert('Пожалуйста, заполните все поля');
    return;
  }
  addPost({
    userId: 1,
    title,
    body,
  }).then(() => {
    getPosts();
  });
});
//* ===

function addPost(post) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ post }),
  };
  return fetch(`${BASE__URL}`, options).then(res => res.json());
}
function openModal(post) {
  const modal = document.querySelector('.modal');
  const titleInput = document.querySelector('.modal input[name="title"]');
  const bodyInput = document.querySelector('.modal textarea[name="body"]');
  const saveButton = document.querySelector('.modal button.save');

  titleInput.value = post.post.title;
  bodyInput.value = post.post.body;

  saveButton.onclick = () => {
    post.post.title = titleInput.value;
    post.post.body = bodyInput.value;

    updatePost(post).then(() => {
      getPosts(closeModal);
    });
  };

  modal.style.display = 'block';
}
function closeModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
}
function updatePost(post) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post: post.post })
  };
  return fetch(`${BASE__URL}/${post.id}`, options);
}
function getPosts(callback) {
  fetch(BASE__URL)
    .then(response => response.json())
    .then(posts => {
      refs.postsContainer.innerHTML = '';
      let html = '';
      posts.forEach(post => {
        const postHTML = createPostHTML(post);
        html += postHTML;
      });
      refs.postsContainer.insertAdjacentHTML('beforeend', html);

      if (callback) {
        callback();
      }
    })
    .catch(error => {
      console.error('Ошибка при получении постов:', error);
    });
}
refs.postsContainer.addEventListener('click', event => {
  if (event.target.classList.contains('edit')) {
    const card = event.target.closest('.container-card');
    const id = card.dataset.id;

    getPost(id).then(post => {
      openModal(post);
    });
  }
});
function getPost(id) {
  return fetch(`${BASE__URL}/${id}`).then(response =>
    response.json()
  );
}
