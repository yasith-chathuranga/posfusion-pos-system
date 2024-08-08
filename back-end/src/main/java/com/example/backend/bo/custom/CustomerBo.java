package com.example.backend.bo.custom;

import com.example.backend.dto.CustomerDto;

import java.io.IOException;
import java.sql.SQLException;

public interface CustomerBo {
    boolean addCustomer(CustomerDto customerDto) throws IOException, SQLException;
    CustomerDto searchCustomer(int id) throws IOException, SQLException;
}
