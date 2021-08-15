let lastCommentId = 12;
const commentBox = document.getElementById('comment-box');
function getCommentElement(commentId) {
    return document.getElementById(`comment${commentId}`);
}

const getComments = function() {
    const data = [
        {
            "id": 1,
            "comment": "I am alive",
            "author": "Abhishek",
            "childrens": [
                {
                    "id": 2,
                    "comment": "thanks for comment",
                    "author": "Abhilekh",
                    "childrens": [
                        {
                            "id": 3,
                            "comment": "I am alive",
                            "author": "Abhishek",
                            "childrens": [
                                {
                                    "id": 4,
                                    "comment": "thanks for comment",
                                    "author": "Abhilekh",
                                    "childrens": []
                                },
                                {
                                    "id": 5,
                                    "comment": "very good day",
                                    "author": "Susmita",
                                    "childrens": []
                                }
                            ]
                        },
                        {
                            "id": 6,
                            "comment": "I am alive",
                            "author": "Abhishek",
                            "childrens": [
                                {
                                    "id": 6,
                                    "comment": "thanks for comment",
                                    "author": "Abhilekh",
                                    "childrens": []
                                },
                                {
                                    "id": 7,
                                    "comment": "very good day",
                                    "author": "Susmita",
                                    "childrens": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 8,
                    "comment": "very good day",
                    "author": "Susmita",
                    "childrens": []
                }
            ]
        },
        {
            "id": 9,
            "comment": "I am not alive",
            "author": "Abhishek",
            "childrens": [
            ]
        },
        {
            "id": 10,
            "comment": "I am going to be alive",
            "author": "Abhishek",
            "childrens": [
                {
                    "id": 11,
                    "comment": "thanks for comment",
                    "author": "Abhilekh",
                    "childrens": []
                },
                {
                    "id": 12,
                    "comment": "very good day",
                    "author": "Susmita",
                    "childrens": []
                }
            ]
        }
    ];
    return new Promise((resolve) => {
        resolve(data);
    })
}

getComments().then((response) => {
    const commentArea = document.querySelector('#comment-area');
    mapComments(response, commentArea);
})

function printCommentDetails(comment) {
    return `<div id="comment${comment.id}" class="reply-section">
        <div style="display: flex; align-items: center;">
            <p class="comment-author">Author: ${comment.author} </p>
            <a href="#">Edit</a>
        </div>
        <p>${comment.comment}</p>
        <a href="#" onclick="clickReply(${comment.id})">Reply</a>
    </div>`;
}

const mapComments = function(comments, element) {
    comments.forEach(comment => {

        const li = document.createElement('li');
        li.innerHTML = printCommentDetails(comment);
        element.appendChild(li);

        if (comment.childrens.length > 0) {
            const ul = document.createElement('ul');
            li.appendChild(ul);
            mapComments(comment.childrens, ul);
        }
    })
}

const clickReply = (commentId) => {
    const comment = getCommentElement(commentId);
    let formElement = document.getElementById(`form${commentId}`);
    if(!formElement) {
        formElement = document.createElement('form');
        formElement.setAttribute('onsubmit', `replyOnComment(this, ${commentId})`);
        formElement.setAttribute('id', `form${commentId}`); 
        formElement.innerHTML = commentBox.innerHTML;

        comment.appendChild(formElement)
    } else {
        if (formElement.style.display === 'none') {
            formElement.style.display = 'block';
          } else {
            formElement.style.display = 'none';
          }
    }  
}

const replyOnComment = (formElement, commentId) => {
    const repliedComment = formElement.elements[0].value;
    lastCommentId = lastCommentId + 1;
    const comment = getCommentElement(commentId);

    let ul = comment.nextElementSibling;
    if (!ul) {
        ul = document.createElement('ul');
        comment.appendChild(ul);
    }

    const li = document.createElement('li');

    const commentDetails = {
        id: lastCommentId,
        comment: repliedComment,
        author: 'Abhishek'
    }
    li.innerHTML = printCommentDetails(commentDetails);
    ul.appendChild(li);

    formElement.style.display = 'none';
}