import { getAllOrders } from "../model/Orders.js";
import { getAllCustomers } from "../model/Customer.js";
import { getAllItems, updateItem } from "../model/Item.js";
import { saveOrder } from "../model/Orders.js";

var itemId;
var itemQty;
var orderQty;

$(document).ready(function () {
  refresh();
});

$(".orderManageBtn").click(function () {
  refresh();
});

function refresh() {
  $("#orderManage .orderId").val(createOrderId());
  $("#orderManage .orderDate").val(new Date().toISOString().split("T")[0]);
  loadCustomer();
  loadItems();
}

// function extractNumber(id) {
//   var match = id.match(/OD(\d+)/);
//   if (match && match.length > 1) {
//     return match[1];
//   }
//   return null;
// }

function createOrderId() {
  let orders = getAllOrders();

  if (!orders || orders.length === 0) {
    return "OD0-001";
  } else {
    let lastOrder = orders[orders.length - 1];
    let id = lastOrder && lastOrder.orderId ? lastOrder.orderId : "OD0-000";

    // Extract numeric part (assuming the format is "C00-###")
    let number = parseInt(id.split("-")[1]);
    number++;

    // Create new ID with desired format ("O00-001")
    return "OD0-" + number.toString().padStart(3, "0");
  }
}

function loadCustomer() {
  let cmb = $("#orderManage .customers");
  cmb.empty();
  let option = [];
  let customers = getAllCustomers();
  option.unshift("");
  for (let i = 0; i < customers.length; i++) {
    option.push(customers[i].custId);
  }

  $.each(option, function (index, value) {
    cmb.append($("<option>").val(value).text(value));
  });
}

$("#orderManage .customers").change(function () {
  let customer = getAllCustomers().find((c) => c.custId === $(this).val());
  $("#orderManage .custId").val(customer.custId);
  $("#orderManage .custName").val(customer.custName);
  $("#orderManage .custAddress").val(customer.custAddress);
  $("#orderManage .custSalary").val(customer.custSalary);
});

function loadItems() {
  let cmb = $("#orderManage .itemCmb");
  cmb.empty();
  let option = [];
  let items = getAllItems();

  for (let i = 0; i < items.length; i++) {
    option.push(items[i].itemId);
  }

  option.unshift("");

  $.each(option, function (index, value) {
    cmb.append($("<option>").val(value).text(value));
  });
}

$("#orderManage .itemCmb").change(function () {
  let item = getAllItems().find((i) => i.itemId === $(this).val());
  itemId = item.itemId;
  itemQty = item.itemQty;
  $("#orderManage .addBtn").text("Add");
  $("#orderManage .itemCode").val(item.itemId);
  $("#orderManage .itemName").val(item.itemName);
  $("#orderManage .itemQty").val(item.itemQty);
  $("#orderManage .itemPrice").val(item.itemPrice);
});

let getItems = [];

function clear(tableCount) {
  if (tableCount === 1) {
    $("#orderManage .itemCode").val("");
    $("#orderManage .itemName").val("");
    $("#orderManage .itemPrice").val("");
    $("#orderManage .itemQty").val("");
    $("#orderManage .orderQty").val("");
    $("#orderManage .SubTotal").text("");
    $("#orderManage .Cash").val("");
    $("#orderManage .Total").text("");
    $("#orderManage .Discount").val("");
    $("#orderManage .itemCmb").val("");
  } else {
    $("#orderManage .custId").val("");
    $("#orderManage .custName").val("");
    $("#orderManage .custAddress").val("");
    $("#orderManage .custSalary").val("");
    $("#orderManage .itemCode").val("");
    $("#orderManage .itemName").val("");
    $("#orderManage .itemPrice").val("");
    $("#orderManage .itemQty").val("");
    $("#orderManage .orderQty").val("");
  }
}

$("#orderManage .addBtn").click(function (event) {
  event.preventDefault();
  if ($("#orderManage .addBtn").text() === "Delete") {
    dropItem();
  } else {
    let getItem = {
      itemCode: $("#orderManage .itemCode").val(),
      itemName: $("#orderManage .itemName").val(),
      itemPrice: parseFloat($("#orderManage .itemPrice").val()),
      itemQty: parseInt($("#orderManage .orderQty").val(), 10),
      total:
        parseFloat($("#orderManage .itemPrice").val()) *
        parseInt($("#orderManage .orderQty").val(), 10),
    };

    let itemQty = parseInt($("#orderManage .itemQty").val(), 10);
    let orderQty = parseInt($("#orderManage .orderQty").val(), 10);

    if (itemQty >= orderQty) {
      if (
        $("#orderManage .custId").val() !== "" &&
        $("#orderManage .custName").val() !== null
      ) {
        if (orderQty > 0) {
          let item = getItems.find((I) => I.itemCode === getItem.itemCode);
          if (item == null) {
            getItems.push(getItem);
            loadTable();
            clear(1);
            setTotal();
          } else {
            alert("Already Added");
          }
        } else {
          alert("Invalid Quantity");
        }
      } else {
        alert("Invalid Customer");
      }
    } else {
      alert("Not Enough Quantity");
    }
  }
});

function loadTable() {
  $("#orderManage .tableRow").empty();
  for (let i = 0; i < getItems.length; i++) {
    $("#orderManage .tableRow").append(
      "<tr> " +
        "<td>" +
        getItems[i].itemCode +
        "</td>" +
        "<td>" +
        getItems[i].itemName +
        "</td>" +
        "<td>" +
        getItems[i].itemPrice +
        "</td>" +
        "<td>" +
        getItems[i].itemQty +
        "</td>" +
        "<td>" +
        getItems[i].total +
        "</td>" +
        "</tr>"
    );
  }
}

function setTotal() {
  let total = 0;
  for (let i = 0; i < getItems.length; i++) {
    total += getItems[i].total;
  }
  $("#orderManage .Total").text(total);
}

$("#orderManage .placeOrder").click(function () {
  let cash = parseFloat($("#orderManage .Cash").val());
  let total = parseFloat($("#orderManage .Total").text());
  let discount = parseFloat($("#orderManage .Discount").val());

  if (cash >= total) {
    if (discount >= 0 && discount <= 100) {
      let subTotal = total - (total * discount) / 100;
      $("#orderManage .SubTotal").text(subTotal.toFixed(2));
      let balance = cash - subTotal;
      $("#orderManage .Balance").val(balance.toFixed(2));

      let Order = {
        orderId: $("#orderManage .orderId").val(),
        orderDate: $("#orderManage .orderDate").val(),
        custId: $("#orderManage .custId").val(),
        items: getItems,
        total: total,
        discount: discount,
        subTotal: subTotal,
        cash: cash,
        balance: balance,
      };

      saveOrder(Order);
      updateItemData();

      getItems = [];
      loadTable();
      clear(2);
      refresh();
    } else {
      alert("Invalid Discount");
    }
  } else {
    alert("Not Enough Cash");
  }
});

function updateItemData() {
  let items = getAllItems();
  for (let i = 0; i < getItems.length; i++) {
    let item = items.find((I) => I.itemId === getItems[i].itemCode);
    item.itemQty -= getItems[i].itemQty;
    let index = items.findIndex((I) => I.itemId === getItems[i].itemCode);
    updateItem(index, item);
  }
}

$(".item-details .tableRow").on("click", "tr", function () {
  let itemCode = $(this).children("td:eq(0)").text();
  let itemName = $(this).children("td:eq(1)").text();
  let price = $(this).children("td:eq(2)").text();
  let qty = $(this).children("td:eq(3)").text();

  $("#orderManage .itemCode").val(itemCode);
  $("#orderManage .itemName").val(itemName);
  $("#orderManage .itemPrice").val(price);
  $("#orderManage .orderQty").val(qty);

  $("#orderManage .item-select .addBtn").text("Delete");
});

function dropItem() {
  let itemCode = $("#orderManage .itemCode").val();
  let index = getItems.findIndex((I) => I.itemCode === itemCode);
  getItems.splice(index, 1);
  loadTable();
  clear(1);
  setTotal();
}
