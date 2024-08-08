let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("open");
};

$(document).ready(function () {
  $("#home").show();

  $(".nav-link").click(function (event) {
    event.preventDefault();

    $("section").hide();

    var targetSection = $(this).attr("href");

    $(targetSection).show();
    switch (targetSection) {
      case "#customerManage":
        $(".sectionName").text("Customer Manage");
        break;
      case "#itemManage":
        $(".sectionName").text("Item Manage");
        break;
      case "#orderManage":
        $(".sectionName").text("Order Manage");
        break;
      case "#orderDetailsPage":
        $(".sectionName").text("Order Details Manage");
        break;
      default:
        $(".sectionName").text("Home Page");
    }
  });
});

// Disable tab key default focusing
document.querySelector("body").addEventListener("keydown", function (event) {
  if (event.key === "Tab" || event.keyCode === 9) {
    event.preventDefault();
  }
});

// document
//   .querySelector("#itemManage")
//   .addEventListener("keydown", function (event) {
//     if (event.key === "Tab" || event.keyCode === 9) {
//       event.preventDefault();
//     }
//   });

// document
//   .querySelector("#orderManage")
//   .addEventListener("keydown", function (event) {
//     if (event.key === "Tab" || event.keyCode === 9) {
//       event.preventDefault();
//     }
//   });
