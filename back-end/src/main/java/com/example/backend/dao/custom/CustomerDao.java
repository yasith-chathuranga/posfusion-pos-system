package com.example.backend.dao.custom;

import com.example.backend.entity.Customer;

import java.sql.SQLException;

public interface CustomerDao {
    boolean saveCustomer(Customer customer) throws SQLException;
}
