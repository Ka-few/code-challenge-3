const postList = document.getElementById('posts-list'); // container for post titles
const newPostBtn = document.getElementById('new-post-btn');  // "Add new" button
const newPostForm = document.getElementById('new-post-form'); // the form container

//Select the form inputs
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const contentInput = document.getElementById('content');
const imageInput = document.getElementById('image');

const postContent = document.getElementById('post-content');

// Load posts on page load
const main = function () {
  fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(posts => displayPosts(posts))
    .catch(error => console.error('Error fetching posts:', error));
};

main()

// Render post titles in the sidebar
function displayPosts(posts) {
  postList.innerHTML = '';

  posts.forEach(post => {
    const item = document.createElement('div');
    item.textContent = post.title;
    item.classList.add('post-item');
    item.addEventListener('click', () => handlePostClick(post.id));
    postList.appendChild(item);
  });
}


function handlePostClick(id) {
  fetch(`http://localhost:3000/posts/${id}`)
    .then(response => response.json())    
    .then(post => {
      postContent.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>By:</strong> ${post.author}</p>
        ${post.image ? `<img src="${post.image}" alt="${post.title}" style="max-width: 100%; margin: 1rem 0;">` : ''}
        <p>${post.content}</p>
      `;
    })
    .catch(error => {
      console.error('Error loading post:', error);
      postContent.innerHTML = `<p style="color: red;">Failed to load post.</p>`;
    });
}

