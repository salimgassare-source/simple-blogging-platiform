let posts = JSON.parse(localStorage.getItem("posts")) || [];

displayPosts();

function savePosts(){
    localStorage.setItem("posts", JSON.stringify(posts));
}

function addPost(){

    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let image = document.getElementById("image").value;

    let date = new Date().toLocaleString();

    posts.push({
        title,
        content,
        image,
        date,
        likes: 0
    });

    savePosts();
    displayPosts();
}

function displayPosts(list = posts){

    let postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";

    list.forEach((post, index) => {

        postsDiv.innerHTML += `
        <div class="post">

            ${post.image ? `<img src="${post.image}">` : ""}

            <h3>${post.title}</h3>
            <small>${post.date}</small>

            <p>${post.content}</p>

            <div class="actions">
                <span class="like" onclick="likePost(${index})">
                    ❤️ ${post.likes}
                </span>

                <button onclick="deletePost(${index})">Delete</button>
            </div>

        </div>
        `;
    });
}

function deletePost(index){
    posts.splice(index,1);
    savePosts();
    displayPosts();
}

function likePost(index){
    posts[index].likes++;
    savePosts();
    displayPosts();
}

function searchPosts(){

    let searchValue = document.getElementById("search").value.toLowerCase();

    let filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchValue) ||
        post.content.toLowerCase().includes(searchValue)
    );

    displayPosts(filtered);
}






