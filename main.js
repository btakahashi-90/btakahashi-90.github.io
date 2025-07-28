// main.js
fetch("/assets/nav.html")
  .then(res => res.text())
  .then(html => {
    const navContainer = document.createElement("div");
    navContainer.innerHTML = html;
    document.body.insertBefore(navContainer, document.body.firstChild);
  });

