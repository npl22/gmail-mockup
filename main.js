const Router = require('./router.js');

document.addEventListener("DOMContentLoaded", function(event) {
  const sidebarNavLi = document.querySelectorAll(".sidebar-nav li");

  sidebarNavLi.forEach((li) => {
    li.addEventListener("click", (e) => {
      window.location.hash = li.innerText.toLowerCase();
    });
  });

  const content = document.querySelector(".content");
  const router = new Router(content);
  router.start();

});
