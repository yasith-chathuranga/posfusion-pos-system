import { getAllOrders } from "../model/Orders.js";

document
  .querySelector("#orderDetailsPage #orderDetailsForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

$(document).ready(function () {
  refresh();
});

$(".orderDetailsBtn").click(function () {
  refresh();
});

function loadTable() {
  let orders = getAllOrders();
  console.log(orders);
  $("#orderDetailsPage .tableRow").empty();
  for (let i = 0; i < orders.length; i++) {
    $("#orderDetailsPage .tableRow").append(
      "<tr> " +
        "<td>" +
        orders[i].orderId +
        "</td>" +
        "<td>" +
        orders[i].custId +
        "</td>" +
        "<td>" +
        orders[i].orderDate +
        "</td>" +
        "<td>" +
        orders[i].total +
        "</td>" +
        "<td>" +
        orders[i].discount +
        "</td>" +
        "<td>" +
        orders[i].subTotal +
        "</td>" +
        "</tr>"
    );
  }
}

function refresh() {
  $("#orderDetailsPage .orderId").val("");
  $("#orderDetailsPage .invalidCode").text("");
  loadTable();
}

$("#orderDetailsPage .searchBtn").click(function () {
  let id = $("#orderDetailsPage .orderId").val();
  let orders = getAllOrders();
  let item = orders.find((item) => item.orderId === id);
  if (item) {
    $("#orderDetailsPage .invalidCode").text("");
    $("#orderDetailsPage .tableRow").empty();
    $("#orderDetailsPage .tableRow").append(
      "<tr> " +
        "<td>" +
        item.orderId +
        "</td>" +
        "<td>" +
        item.custId +
        "</td>" +
        "<td>" +
        item.orderDate +
        "</td>" +
        "<td>" +
        item.total +
        "</td>" +
        "<td>" +
        item.discount +
        "</td>" +
        "<td>" +
        item.subTotal +
        "</td>" +
        "</tr>"
    );
  } else {
    $("#orderDetailsPage .invalidCode").text("Item Id does not exist");
  }
});

$("#orderDetailsPage .clearBtn").click(function () {
  refresh();
});
