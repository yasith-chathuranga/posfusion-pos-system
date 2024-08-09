import { saveCustomer } from "../model/Customer.js";
import { getAllCustomers } from "../model/Customer.js";
import { updateCustomer } from "../model/Customer.js";
import { deleteCustomer } from "../model/Customer.js";

$(document).ready(function () {
  refresh();
});

document
  .querySelector("#customerManage #customerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

var custId;
var custName;
var custAddress;
var custSalary;

$("#customerManage .saveBtn").click(function () {
  custId = $("#customerManage .custId").val();
  custName = $("#customerManage .custName").val();
  custAddress = $("#customerManage .custAddress").val();
  custSalary = $("#customerManage .custSalary").val();

  let customer = {
    custId: custId,
    custName: custName,
    custAddress: custAddress,
    custSalary: custSalary,
  };

  let validResult = validate(customer);

  if (validResult) {
    saveCustomer(customer);
    refresh();
  }
});

async function validate(customer) {
  let valid = true;

  if (/^C00-\d{3}$/.test(customer.custId)) {
    $("#customerManage .invalidCustId").text("");
    valid = true;
  } else {
    $("#customerManage .invalidCustId").text("Invalid Customer Id");
    valid = false;
  }

  if (/^(?:[A-Z][a-z]*)(?: [A-Z][a-z]*)*$/.test(customer.custName)) {
    $("#customerManage .invalidCustName").text("");

    if (valid) {
      valid = true;
    }
  } else {
    $("#customerManage .invalidCustName").text("Invalid Customer Name");
    valid = false;
  }

  if (/^[A-Z][a-z, ]+$/.test(customer.custAddress)) {
    $("#customerManage .invalidCustAddress").text("");

    if (valid) {
      valid = true;
    }
  } else {
    $("#customerManage .invalidCustAddress").text("Invalid Customer Address");
    valid = false;
  }

  if (customer.custSalary != null && customer.custSalary > 0) {
    $("#customerManage .invalidCustSalary").text("");
    if (valid) {
      valid = true;
    }
  } else {
    $("#customerManage .invalidCustSalary").text("Invalid Customer Salary");
    valid = false;
  }

  let customers = await getAllCustomers();
  for (let i = 0; i < customers.length; i++) {
    if (customers[i].custId === customer.custId) {
      $("#customerManage .invalidCustId").text("Customer Id Already Exists");
      valid = false;
    }
  }

  return valid;
}

function loadTable(customer) {
  console.log(customer,"=============#$$$$$$$$$========================table Load");
  $("#customerManage .tableRow").append(
    "<tr> " +
      "<td>" +
      customer.custId +
      "</td>" +
      "<td>" +
      customer.custName +
      "</td>" +
      "<td>" +
      customer.custAddress +
      "</td>" +
      "<td>" +
      customer.custSalary +
      "</td>" +
      "</tr>"
  );
}

async function createCustomerId() {
  let customers = await getAllCustomers();
  console.log(customers,"Enna yanna apith");

  if (!customers || customers.length === 0) {
    $('#customerManage .custId').val("C00-001")
  } else {
    let lastCustomer = customers[customers.length - 1];
    console.log(lastCustomer,"_-------------------------last");
    let id =
      lastCustomer && lastCustomer.custId ? lastCustomer.custId : "C00-000";

    console.log(id);
    // Extract numeric part (assuming the format is "C00-###")
    let number = parseInt(id.split("-")[1]);
    number++;
    console.log(number)
    const nextId = 'C0' + number;
    console.log(nextId);
    $('#customerManage .custId').val(nextId)
  }
}

function refresh() {
  createCustomerId()
  $("#customerManage .custName").val("");
  $("#customerManage .custAddress").val("");
  $("#customerManage .custSalary").val("");
  $("#customerManage .invalidCustId").text("");
  $("#customerManage .invalidCustName").text("");
  $("#customerManage .invalidCustAddress").text("");

  reloadTable();
}

$("#customerManage .cleatBtn").click(function () {
  refresh();
});

$("#customerManage .searchBtn").click(function () {
  let customer = searchCustomer($("#customerManage .custId").val());
})
  async function searchCustomer(id) {
    try {
      const customers = await getAllCustomers();
      let customer = customers.find(c => c.custId === id);
      console.log(customer, " =================")
      if (customer) {
        $('#customerManage .custName').val(customer.custName);
        $('#customerManage .custAddress').val(customer.custAddress);
        $('#customerManage .custSalary').val(customer.custSalary);
      } else {
        alert('Customer Not Found');
      }
      return customer;
    } catch (error) {
      console.error(error)
      return null;
    }
}

  $('#customerManage .updateBtn').click(async function () {
  let UpdateCustomer = {
    custId: 'C00',
    custName: $('#customerManage .custName').val(),
    custAddress: $('#customerManage .custAddress').val(),
    custSalary: $('#customerManage .custSalary').val()
  };

  let validResult = validate(UpdateCustomer);

  UpdateCustomer.custId = $("#customerManage .custId").val();

    if (validResult) {
      let customers = await getAllCustomers();
    let index = customers.findIndex((c) => c.custId === UpdateCustomer.custId);
    updateCustomer(index, UpdateCustomer);
    alert('Customer Updated');
    refresh();
  }
});

async function reloadTable() {
  let customers = await getAllCustomers();
  $('#customerManage .tableRow').empty()
  console.log(customers,"=====================================================table Load");
  // customers.forEach(c => {
  //     loadTable(c);
  // });
    getAllCustomers().then((customer) =>{
    customer.forEach((customer) => {
      loadTable(customer);
    })
  }).catch(
      (error) => {
        console.log(error);
      }
  )
}

  $('#customerManage .removeBtn').click(async function () {
    let customers = await getAllCustomers();
  let id = $("#customerManage .custId").val();

  let index = customers.findIndex((c) => c.custId === id);
    if (index >= 0) {
      deleteCustomer(id);
    refresh();
  } else {
    alert("Customer Not Found");
  }
});

$("#customerManage .tableRow").on("click", "tr", function () {
  let id = $(this).children("td:eq(0)").text();
  let name = $(this).children("td:eq(1)").text();
  let qty = $(this).children("td:eq(2)").text();
  let price = $(this).children("td:eq(3)").text();

  $("#customerManage .custId").val(id);
  $("#customerManage .custName").val(name);
  $("#customerManage .custAddress").val(qty);
  $("#customerManage .custSalary").val(price);
});
