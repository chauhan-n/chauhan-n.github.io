document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("id");

  if (!blogId) {
    document.getElementById("blog-content").innerHTML = "<p>No blog specified.</p>";
    return;
  }

  fetch("data/blogs.json")
    .then(response => response.json())
    .then(data => {
      const blog = data[blogId];
      if (!blog) {
        document.getElementById("blog-content").innerHTML = "<p>Blog not found.</p>";
        return;
      }
    document.getElementById("blog-content").innerHTML = `
      <h1>${blog.title}</h1>
      <p><small>${blog.date}</small></p>
      <p>${blog.tags.map(tag => `<span class="tag">${tag}</span>`).join(" ")}</p>
      <div>
        ${Array.isArray(blog.content_html) ? blog.content_html.join("") : blog.content_html}
       </div>
    `;
    })
    .catch(err => {
      console.error("Error loading blog:", err);
      document.getElementById("blog-content").innerHTML = "<p>Error loading blog.</p>";
    });
});
