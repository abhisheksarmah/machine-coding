const comments = [
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
let lastCommentId = 12;
const commentFormWrapper = document.getElementById('comment-form-wrapper');
const commentArea = document.getElementById('comment-area');

function getCommentElement(commentId) {
    return document.getElementById(`comment${commentId}`);
}

function getCommentCard(comment) {
    return `<div id="comment${comment.id}" class="media">
        <div class="media-object"/>&#x1F60E;</div>
        <div class="media-body">
            <h3 class="media-heading">${comment.author}</h3>
            <p>${comment.comment} </p>
            <div class="media-footer">
                <a href="#">Edit</a>
                <a href="#" onclick="clickReplyButton(${comment.id})">Reply</a>
            </div>
        </div>
    </div>`;    
}

const generateCommentListView = function(comments, element) {
    comments.forEach(comment => {

        const li = document.createElement('li');
        li.innerHTML = getCommentCard(comment);
        element.appendChild(li);

        if (comment.childrens && comment.childrens.length > 0) {
            const ul = document.createElement('ul');
            li.appendChild(ul);
            generateCommentListView(comment.childrens, ul);
        }
    })
}

const clickReplyButton = (commentId) => {
    const comment = getCommentElement(commentId);
    let formElement = document.getElementById(`form${commentId}`);
    if(!formElement) {
        formElement = document.createElement('form');
        formElement.setAttribute('onsubmit', `submitReply(this, ${commentId})`);
        formElement.setAttribute('id', `form${commentId}`); 
        formElement.setAttribute('class', 'form-wrapper'); 
        formElement.innerHTML = commentFormWrapper.innerHTML;
        comment.getElementsByClassName('media-body')[0].appendChild(formElement)
    } else {
        if (formElement.style.display === 'none') {
            formElement.style.display = 'block';
          } else {
            formElement.style.display = 'none';
          }
    }  
}

const submitReply = (formElement, commentId) => {
    const repliedComment = formElement.elements[0].value;
    lastCommentId = lastCommentId + 1;
    const comment = getCommentElement(commentId);
    const commentDetails = [{
        id: lastCommentId,
        comment: repliedComment,
        author: 'Abhishek'
    }]

    let ul = comment.nextElementSibling;
    if (!ul) {
        ul = document.createElement('ul');
        comment.insertAdjacentElement('afterend', ul);
    }

    generateCommentListView(commentDetails, ul)

    formElement.elements[0].value = '';
    formElement.style.display = 'none';
}

generateCommentListView(comments, commentArea);