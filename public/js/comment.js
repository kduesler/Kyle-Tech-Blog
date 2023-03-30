const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector("#comment-content").value.trim();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/comments/`, {
    method: "POST",
    body: JSON.stringify({
      comment,
      blog_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.reload();

  } else {
    alert("Failed to create comment");
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newCommentFormHandler);
