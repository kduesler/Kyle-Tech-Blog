// const { update } = require("../../models/User");

const delButtonHandler = async (event) => {
    event.preventDefault();

  if (event.target.hasAttribute("post_id")) {
    const id = event.target.getAttribute("post_id");

    const response = await fetch(`/dashboard/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert("Failed to delete post");
    }
  }
};


const updateFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();


  if (event.target.hasAttribute('post_id')) {
    const id = event.target.getAttribute('post_id');

    const response = await fetch(`/dashboard/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert('Failed to update post');
    }
  }
};

// const editFormHandler = async (event) => {
//     event.preventDefault();
//     const title = document.querySelector('#post-title').value.trim();
//     const content = document.querySelector('#post-content').value.trim();
//     const id = window.location.toString().split('/')[
//       window.location.toString().split('/').length - 1
//     ];
//       const response = await fetch(`/dashboard/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//           title,
//           content
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       if (response.ok) {
//         document.location.replace('/dashboard/');
//       } else {
//         alert(response.statusText);
//       }
// }


// document
//   .querySelector('.update-btn')
//   .addEventListener('submit', editFormHandler);

document
  .querySelector(".delete-btn")
  .addEventListener("click", delButtonHandler);

document
  .querySelector(".update-btn")
  .addEventListener("click", updateFormHandler )
