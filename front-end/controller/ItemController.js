import { saveItem } from "../model/Item.js";
import { getAllItems } from "../model/Item.js";
import { deleteItem } from "../model/Item.js";
import { updateItem } from "../model/Item.js";

document
  .querySelector("#itemManage #itemForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

$(document).ready(function () {
  refresh();
});

var itemId;
var itemName;
var itemQty;
var itemPrice;

$("#itemManage .saveBtn").click(function () {
  itemId = $("#itemManage .itemId").val();
  itemName = $("#itemManage .itemName").val();
  itemQty = $("#itemManage .itemQty").val();
  itemPrice = $("#itemManage .itemPrice").val();

  let item = {
    itemId: itemId,
    itemName: itemName,
    itemQty: itemQty,
    itemPrice: itemPrice,
  };

  if (validate(item)) {
    saveItem(item);
    refresh();
  }
});

function validate(item) {
  let valid = true;

  if (/^I00-\d{3}$/.test(item.itemId)) {
    $("#itemManage .invalidCode").text("");
    valid = true;
  } else {
    $("#itemManage .invalidCode").text("Invalid Item Id");
    valid = false;
  }

  if (/^(?:[A-Z][a-z]*)(?: [A-Z][a-z]*)*$/.test(item.itemName)) {
    $("#itemManage .invalidName").text("");

    if (valid) {
      valid = true;
    }
  } else {
    $("#itemManage .invalidName").text("Invalid Item Name");
    valid = false;
  }

  if (item.itemQty != null && item.itemQty > 0) {
    $("#itemManage .invalidQty").text("");
    if (valid) {
      valid = true;
    }
  } else {
    $("#itemManage .invalidQty").text("Invalid Item Quantity");
    valid = false;
  }

  if (item.itemPrice != null && item.itemPrice > 0) {
    $("#itemManage .invalidPrice").text("");
    if (valid) {
      valid = true;
    }
  } else {
    $("#itemManage .invalidPrice").text("Invalid Item Price");
    valid = false;
  }

  let items = getAllItems();

  for (let i = 0; i < items.length; i++) {
    if (items[i].itemId === item.itemId) {
      $("#itemManage .invalidCode").text("Item Id already exists");
      valid = false;
      return valid;
    }
  }

  return valid;
}

// function extractNumber(id) {
//   var match = id.match(/I0(\d+)/);
//   if (match && match.length > 1) {
//     return match[1];
//   }
//   return null;
// }

function refresh() {
  $("#itemManage .itemId").val(createItemId());
  $("#itemManage .itemName").val("");
  $("#itemManage .itemQty").val("");
  $("#itemManage .itemPrice").val("");
  loadTable();
}

function createItemId() {
  let items = getAllItems();

  if (!items || items.length === 0) {
    return "I00-001";
  } else {
    let lastItem = items[items.length - 1];
    let id =
      lastItem && lastItem.itemId ? lastItem.itemId : "I00-000";

    // Extract numeric part (assuming the format is "C00-###")
    let number = parseInt(id.split("-")[1]);
    number++;

    // Create new ID with desired format ("I00-001")
    return "I00-" + number.toString().padStart(3, "0");
  }
}

function loadTable() {
  let items = getAllItems();
  $("#itemManage .tableRow").empty();
  for (let i = 0; i < items.length; i++) {
    $("#itemManage .tableRow").append(
      "<tr> " +
        "<td>" +
        items[i].itemId +
        "</td>" +
        "<td>" +
        items[i].itemName +
        "</td>" +
        "<td>" +
        items[i].itemQty +
        "</td>" +
        "<td>" +
        items[i].itemPrice +
        "</td>" +
        "</tr>"
    );
  }
}

$("#itemManage .tableRow").on("click", "tr", function () {
  let id = $(this).children("td:eq(0)").text();
  let name = $(this).children("td:eq(1)").text();
  let qty = $(this).children("td:eq(2)").text();
  let price = $(this).children("td:eq(3)").text();

  $("#itemManage .itemId").val(id);
  $("#itemManage .itemName").val(name);
  $("#itemManage .itemQty").val(qty);
  $("#itemManage .itemPrice").val(price);
});

$("#itemManage .removeBtn").click(function () {
  let id = $("#itemManage .itemId").val();
  let items = getAllItems();
  let item = items.findIndex((item) => item.itemId === id);
  if (item >= 0) {
    deleteItem(item);
    refresh();
  } else {
    $("#itemManage .invalidCode").text("Item Id does not exist");
  }
});

$("#itemManage .updateBtn").click(function () {
  alert("Update");
  let item = {
    itemId: "I00",
    itemName: $("#itemManage .itemName").val(),
    itemQty: $("#itemManage .itemQty").val(),
    itemPrice: $("#itemManage .itemPrice").val(),
  };

  let valid = validate(item);

  item.itemId = $("#itemManage .itemId").val();

  if (valid) {
    let items = getAllItems();
    let index = items.findIndex((i) => i.itemId === item.itemId);
    updateItem(index, item);
    refresh();
  }
});

$("#itemManage .cleatBtn").click(function () {
  refresh();
});

$("#itemManage .searchBtn").click(function () {
  let id = $("#itemManage .itemId").val();
  let items = getAllItems();
  let item = items.find((item) => item.itemId === id);
  if (item) {
    $("#itemManage .itemName").val(item.itemName);
    $("#itemManage .itemQty").val(item.itemQty);
    $("#itemManage .itemPrice").val(item.itemPrice);
  } else {
    $("#itemManage .invalidCode").text("Item Id does not exist");
  }
});
