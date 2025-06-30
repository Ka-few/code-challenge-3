let postList = document.getElementById('posts-list'); // container for post titles
let newPostBtn = document.getElementById('new-post-btn');  // "Add new" button
let newPostForm = document.getElementById('new-post-form'); // the form container

//Select the form inputs
let titGet = document.getElementById('title');
let authGet = document.getElementById('author');
let contGet = document.getElementById('content');
let imageGet = document.getElementById('image');

let postContent = document.getElementById('post-content');// The main display container

// Load posts on page load
const main = function () {
  fetch('https://code-challenge-3-ar80.onrender.com/posts')
    .then(response => response.json())
    .then(posts => displayPosts(posts))
    .catch(() => {
      alert('Posts could not load. Please try again later.');
    })
};

main()

// Render post titles in the sidebar
function displayPosts(posts) {
  postList.innerHTML = '';

  posts.forEach(post => {
    let item = document.createElement('div');
    item.textContent = post.title;
    item.classList.add('post-item');
    item.addEventListener('click', () => handlePostClick(post.id));
    postList.appendChild(item);
  });

  // Display the first post on page load
  if (posts.length > 0) {
    handlePostClick(posts[0].id);
  }
  
}

//Display the selected posts on the main display area
function handlePostClick(id) {
  fetch(`https://code-challenge-3-ar80.onrender.com/posts/${id}`)
    .then(response => response.json())    
    .then(post => {
      postContent.innerHTML = `
        <h2>${post.title}</h2>
        <p><em>By:</em> ${post.author}</p>
        ${post.image ? `<img src="${post.image}" alt="${post.title}" style="max-width: 100%; margin: 1rem 0;">` : ''}
        <p>${post.content}</p>
        <button id="delete-btn" style="background-color: crimson; color: white; margin-top: 1rem;">Delete Post</button>
      `;

      // Add delete event to the created delete button
      document.getElementById('delete-btn').addEventListener('click', () => deletePost(id));
    })
    .catch(() => {
        postContent.innerHTML = `<p style="color: red;">Failed to load post.</p>`;
    });
}

// addNewPostListener function for adding form data and posting data to JSON server
const addNewPostListener = function (e) {
  e.preventDefault(); // Prevent form from reloading the page

  const newPost = {
    title: titGet.value,
    author: authGet.value,
    content: contGet.value,
    image: imageGet.value
  };

  // Basic validation to ensure the user fills the recomended fields
  if (!newPost.title || !newPost.author || !newPost.content) {
    alert('Please fill in all required fields.');
    return;
  }

  // Send POST request to JSON Server
  fetch('https://code-challenge-3-ar80.onrender.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost)
  })
    .then(response => response.json())
    .then(data => {
      // Reset form
      newPostForm.reset();
      newPostForm.style.display = 'none'; //hide form 

      // Refresh post list
      main(); // Fetch posts again to include the new one
    })
    .catch(() => {
      alert('There was an error saving your post.');
    });
}

//add the add new button functionality and toogle the new-post-form visibility
newPostBtn.addEventListener('click', () => {
  let showForm = newPostForm.style.display === 'block';
  newPostForm.style.display = showForm ? 'none' : 'block';
});

// submit a new blog post
newPostForm.addEventListener('submit', addNewPostListener);

// Delete an individual displayed post
function deletePost(id) {
  const confirmed = confirm('Are you sure you want to delete this post?');

  if (!confirmed) return;

  fetch(`https://code-challenge-3-ar80.onrender.com/posts/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok){
        alert('Failed to delete!');
      } 
      return;

      postContent.innerHTML = '<p>The post was successfully deleted.</p>';
      main();// Refresh post list
    })
    .catch(() => {
      alert('Cannot delete the post.');
    });
}


