// ======================================
// FITRED - SOCIAL NETWORK
// ======================================
const postImage =
    document.getElementById("postImage");
// POSTS
console.log("FITRED loaded");
const postForm = document.getElementById("postForm");
const postContent = document.getElementById("postContent");
const feedContainer = document.getElementById("feedContainer");

let posts =
    JSON.parse(localStorage.getItem("fitredPosts")) || [];

function savePosts() {
    localStorage.setItem(
        "fitredPosts",
        JSON.stringify(posts)
    );
}

function renderPosts() {

    feedContainer.innerHTML = "";

    posts.forEach((post, index) => {

        const postCard = document.createElement("div");

        postCard.classList.add(
            "card",
            "post-card"
        );

        let commentsHTML = "";

        const comments = post.comments || [];

        comments.forEach((comment, commentIndex) => {

           commentsHTML += `
                <div class="comment-box">

                    <p class="comment-text">
                        💬 ${comment.text}
                    </p>

                    <div class="comment-reactions">

                        <button
                            class="reaction-btn"
                            data-post="${index}"
                            data-comment="${commentIndex}"
                            data-type="like"
                        >
                            ❤️ ${comment.like}
                        </button>

                        <button
                            class="reaction-btn"
                            data-post="${index}"
                            data-comment="${commentIndex}"
                            data-type="laugh"
                        >
                            😂 ${comment.laugh}
                        </button>

                        <button
                            class="reaction-btn"
                            data-post="${index}"
                            data-comment="${commentIndex}"
                            data-type="strong"
                        >
                            💪 ${comment.strong}
                        </button>

                    </div>

                </div>
                `;

        });

       postCard.innerHTML = `
            <h3>
                <i class="fa-solid fa-user"></i>
                Nefi
            </h3>
            <p class="post-date">
                ${post.date || "Just now"}
            </p>
            <p>${post.content}</p>
                ${post.image ?
                    `
                    <img
                        src="${post.image}"
                        class="post-image"
                        alt="Post Image"
                    >
                    `
                    : ""}
            <div class="post-actions">

                <button
                    class="like-btn"
                    data-index="${index}"
                >
                    ❤️ ${post.likes}
                </button>

                <button
                    class="delete-post-btn"
                    data-index="${index}"
                >
                    🗑 Delete
                </button>

            </div>

            <div class="comments-section">

                <h4>Comments</h4>

                <div class="comments-list">
                    ${commentsHTML}
                </div>

                <input
                    type="text"
                    class="comment-input"
                    placeholder="Write a comment..."
                >

                <button
                    class="comment-btn"
                    data-index="${index}"
                >
                    Add Comment
                </button>

            </div>
        `;

        feedContainer.appendChild(postCard);

    });

    activateLikes();
    activateComments();
    activateDeletePosts();
    activateReactions();
}

function activateLikes() {

    const buttons =
        document.querySelectorAll(".like-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const index = button.dataset.index;

            posts[index].likes++;

            savePosts();
            renderPosts();

        });

    });

}
function activateDeletePosts() {

    const deleteButtons =
        document.querySelectorAll(
            ".delete-post-btn"
        );

    deleteButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    button.dataset.index;

                posts.splice(index, 1);

                savePosts();
                renderPosts();

            }
        );

    });

}

function activateComments() {

    const buttons =
        document.querySelectorAll(".comment-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const index = button.dataset.index;

            const postCard =
                button.closest(".post-card");

            const input =
                postCard.querySelector(
                    ".comment-input"
                );

            const comment =
                input.value.trim();

            if (!comment) return;

            posts[index].comments.push({
                text: comment,
                like: 0,
                laugh: 0,
                strong: 0
            });

            savePosts();
            renderPosts();

        });

    });

}
function activateReactions() {

    const reactionButtons =
        document.querySelectorAll(".reaction-btn");

    reactionButtons.forEach(button => {

        button.addEventListener("click", () => {

            const postIndex =
                button.dataset.post;

            const commentIndex =
                button.dataset.comment;

            const type =
                button.dataset.type;

            posts[postIndex]
                .comments[commentIndex][type]++;

            savePosts();
            renderPosts();

        });

    });

}
postForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const content =
        postContent.value.trim();

    if (!content) return;

    const file =
        postImage.files[0];

    if (file) {

        const reader =
            new FileReader();

        reader.onload = function(event) {

            posts.unshift({

                content: content,
                image: event.target.result,
                date: new Date().toLocaleString(),  
                likes: 0,
                comments: []

            });

            savePosts();
            renderPosts();

        };

        reader.readAsDataURL(file);

    } else {

        posts.unshift({

            content: content,
            image: "",
            date: new Date().toLocaleString(),
            likes: 0,
            comments: []

        });

        savePosts();
        renderPosts();

    }

    postContent.value = "";
    postImage.value = "";

});


// ======================================
// CHALLENGES
// ======================================

const challengeForm =
    document.getElementById(
        "challengeForm"
    );

const challengeTitle =
    document.getElementById(
        "challengeTitle"
    );

const challengeDescription =
    document.getElementById(
        "challengeDescription"
    );

const challengeList =
    document.getElementById(
        "challengeList"
    );

let challenges =
    JSON.parse(
        localStorage.getItem(
            "fitredChallenges"
        )
    ) || [];

function saveChallenges() {

    localStorage.setItem(
        "fitredChallenges",
        JSON.stringify(challenges)
    );

}

function renderChallenges() {

    challengeList.innerHTML = "";

    challenges.forEach(
        (challenge, index) => {

            const card =
                document.createElement("div");

            card.classList.add(
                "card",
                "challenge-card"
            );

            card.innerHTML = `
                <h3>
                    🏆 ${challenge.title}
                </h3>

                <p>
                    ${challenge.description}
                </p>

                <button
                    class="accept-btn"
                    data-index="${index}"
                >
                    ${
                        challenge.accepted
                        ? "✅ Accepted"
                        : "Accept Challenge"
                    }
                </button>
            `;

            challengeList.appendChild(card);

        }
    );

    activateChallengeButtons();

}

function activateChallengeButtons() {

    const buttons =
        document.querySelectorAll(
            ".accept-btn"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    button.dataset.index;

                challenges[index].accepted =
                    true;

                saveChallenges();
                renderChallenges();

            }
        );

    });

}

challengeForm.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();

        const title =
            challengeTitle.value.trim();

        const description =
            challengeDescription.value.trim();

        if (
            !title ||
            !description
        ) {
            return;
        }

        challenges.unshift({

            title: title,
            description: description,
            accepted: false

        });

        saveChallenges();
        renderChallenges();

        challengeTitle.value = "";
        challengeDescription.value = "";

    }
);


// ======================================
// INITIAL LOAD
// ======================================

renderPosts();
renderChallenges();
