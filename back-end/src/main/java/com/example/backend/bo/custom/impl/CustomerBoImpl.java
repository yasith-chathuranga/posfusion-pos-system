package com.example.backend.bo.custom.impl;

import com.example.backend.bo.custom.CustomerBo;
import com.example.backend.dao.custom.CustomerDao;
import com.example.backend.dao.custom.impl.CustomerDaoImpl;
import com.example.backend.dto.CustomerDto;
import com.example.backend.entity.Customer;

import java.io.IOException;
import java.sql.SQLException;

public class CustomerBoImpl implements CustomerBo {

    CustomerDao customerDao = new CustomerDaoImpl();

    @Override
    public boolean addCustomer(CustomerDto customerDto) throws IOException, SQLException {
        return customerDao.saveCustomer(
                new Customer(
                        customerDto.getId(),
                        customerDto.getName(),
                        customerDto.getAddress(),
                        customerDto.getSalary()
                )
        );
    }

    @Override
    public CustomerDto searchCustomer(int id) throws SQLException {
        Customer customer = customerDao.searchCustomer(id);
        if (customer != null) {
            System.out.println(customer+"=============================== bo");
            return new CustomerDto(customer.getId(), customer.getName(), customer.getAddress(), customer.getSalary());
        } else {
            return null;
        }
    }

    @Override
    public boolean updateCustomer(CustomerDto customerDto) throws SQLException {
        return customerDao.updateCustomer(
                new Customer(
                        customerDto.getId(),
                        customerDto.getName(),
                        customerDto.getAddress(),
                        customerDto.getSalary()
                )
        );
    }
}
