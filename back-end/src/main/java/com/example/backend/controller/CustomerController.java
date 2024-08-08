package com.example.backend.controller;

import com.example.backend.bo.custom.CustomerBo;
import com.example.backend.bo.custom.impl.CustomerBoImpl;
import com.example.backend.dto.CustomerDto;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/customer")
public class CustomerController extends HttpServlet {

    CustomerBo customerBo = new CustomerBoImpl();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getContentType() == null || !req.getContentType().toLowerCase().startsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        try ( var reader = req.getReader(); var writer = resp.getWriter()) {

            Jsonb jsonb = JsonbBuilder.create();
            CustomerDto customerDto = jsonb.fromJson(reader, CustomerDto.class);

            try {
                if (customerBo.addCustomer(customerDto)){
                    resp.setStatus(HttpServletResponse.SC_CREATED);
                    writer.write("Customer Added Successfully");
                }
                else {
                    resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    writer.write("Failed to add Customer");
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }

        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //System.out.println("=====================================================Get Customer");
        try{
            int id = Integer.parseInt(req.getParameter("id"));
            System.out.println(id);
            CustomerDto customerDto = customerBo.searchCustomer(id);
            System.out.println(customerDto);
            if (customerDto != null){
                resp.setContentType("application/json");
                Jsonb jsonb = JsonbBuilder.create();
                jsonb.toJson(customerDto, resp.getWriter());
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getContentType() == null || !req.getContentType().toLowerCase().startsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        try (var reader = req.getReader(); var writer = resp.getWriter()) {

            Jsonb jsonb = JsonbBuilder.create();
            CustomerDto customerDto = jsonb.fromJson(reader, CustomerDto.class);

            if (customerBo.updateCustomer(customerDto)) {
                resp.setStatus(HttpServletResponse.SC_CREATED);
                writer.write("Customer Updated Successfully");
            } else {
                resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                writer.write("Failed to update Customer");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void destroy() {
        super.destroy();
    }
}
