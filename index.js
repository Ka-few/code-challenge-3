const postList = document.getElementById('posts-list'); // container for post titles
const newPostBtn = document.getElementById('new-post-btn');  // "Add new" button
const newPostForm = document.getElementById('new-post-form'); // the form container

//Select the form inputs
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const contentInput = document.getElementById('content');
const imageInput = document.getElementById('image');

const postContent = document.getElementById('post-content');

const main = function () {
  fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(posts => displayPosts(posts))
    .catch(error => console.error('Error fetching posts:', error));
};

main(); // Run on page load


function displayPosts(posts) {
  const postsContainer = document.getElementById('posts-list');
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    const item = document.createElement('div');
    item.textContent = post.title;
    item.classList.add('post-item');
    item.addEventListener('click', () => loadPost(post.id));
    postsContainer.appendChild(item);
  });
}

main()