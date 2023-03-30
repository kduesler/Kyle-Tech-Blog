// const { update } = require("../../models/User");

const delButtonHandler = async (event) => {
  event.preventDefault();

  const id = event.target.dataset.pid;

    const response = await fetch(`/dashboard/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert("Failed to delete post");
    }
  };

const updateFormHandler = async (event) => {

  event.preventDefault();
  const title = document.querySelector("#post-title").value.trim();
  const contents = document.querySelector("#post-content").value.trim();

  const id = event.target.dataset.pid;

  const response = await fetch(`/dashboard/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, contents }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response.body);
  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert('Failed to update post');
  }

};

document
  .querySelector(".delete-btn")
  .addEventListener("click", delButtonHandler);

document
  .querySelector(".update-btn")
  .addEventListener("click", updateFormHandler);
