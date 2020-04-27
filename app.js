const
  postsContainer = document.getElementById('post-container'),
  loading = document.querySelector('.loader'),
  filter = document.getElementById('filter');


let limit = 3;
let page = 1;
let posts = 0;

/* FUNCTIONS */

function alternativeGetPosts() {
  fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    .then(res => res.json())
    .then(data => data.forEach(post => {
      const postEl = document.createElement('div');
      postEl.classList.add('post');
      postEl.innerHTML = `
    <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">
            ${post.body}
          </p>
        </div>
    `;
      postsContainer.append(postEl);
    }));

}

function showLoading() {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show');
  }, 1000);
  setTimeout(() => {
    page++;
    alternativeGetPosts();
  }, 300);

}

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerHTML.toUpperCase();
    const body = post.querySelector('.post-body').innerHTML.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }

  });
}

alternativeGetPosts();




/* EVENT LISTENER */

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);