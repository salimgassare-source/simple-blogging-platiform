let posts = JSON.parse(localStorage.getItem("posts")) || [];

displayPosts();

function savePosts(){
    localStorage.setItem("posts", JSON.stringify(posts));
}

function addPost(){

    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    posts.push({
        title: title,
        content: content
    });

    savePosts();
    displayPosts();
}

function displayPosts(){

    let postsDiv = document.getElementById("posts");

    if(!postsDiv) return;

    postsDiv.innerHTML = "";

    posts.forEach(function(post, index){

        postsDiv.innerHTML += `
        <div class="post">
            <h3>${post.title}</h3>

            <button onclick="readPost(${index})">Read More</button>
            <button onclick="editPost(${index})">Edit</button>
            <button onclick="deletePost(${index})">Delete</button>

        </div>
        `;
    });
}

function deletePost(index){
    posts.splice(index,1);
    savePosts();
    displayPosts();
}

function editPost(index){

    let newTitle = prompt("Edit title", posts[index].title);
    let newContent = prompt("Edit content", posts[index].content);

    posts[index].title = newTitle;
    posts[index].content = newContent;

    savePosts();
    displayPosts();
}

function readPost(index){

    localStorage.setItem("currentPost", JSON.stringify(posts[index]));

    window.location.href = "post.html";
}

function loadPost(){

    let post = JSON.parse(localStorage.getItem("currentPost"));

    if(post){

        let title = document.getElementById("postTitle");
        let content = document.getElementById("postContent");

        if(title) title.innerText = post.title;
        if(content) content.innerText = post.content;
    }
}

loadPost();