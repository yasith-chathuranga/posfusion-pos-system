package com.example.backend.dao.custom.impl;

import com.example.backend.dao.custom.CustomerDao;
import com.example.backend.db.ConnectionManager;
import com.example.backend.entity.Customer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CustomerDaoImpl implements CustomerDao {

    private Connection connection;
    PreparedStatement pstm;

    @Override
    public boolean saveCustomer(Customer customer) throws SQLException {
        connection = ConnectionManager.getInstance().getConnection();

        pstm = connection.prepareStatement("INSERT INTO customer VALUES (?,?,?,?)");
        pstm.setInt(1, customer.getId());
        pstm.setString(2, customer.getName());
        pstm.setString(3, customer.getAddress());
        pstm.setDouble(4, customer.getSalary());

        return pstm.executeUpdate() > 0;

    }

    @Override
    public Customer searchCustomer(int id) throws SQLException {
        connection = ConnectionManager.getInstance().getConnection();

        pstm = connection.prepareStatement("SELECT * FROM customer WHERE cust_id=?");
        pstm.setInt(1, id);

        ResultSet resultSet = pstm.executeQuery();
        if (resultSet.next()) {
            return new Customer(
                    resultSet.getInt(1),
                    resultSet.getString(2),
                    resultSet.getString(3),
                    resultSet.getDouble(4)
            );
        }
        return null;
    }

    @Override
    public boolean updateCustomer(Customer customer) throws SQLException {
        connection = ConnectionManager.getInstance().getConnection();

        pstm = connection.prepareStatement("UPDATE customer SET cust_name = ? , cust_address = ? , cust_salary = ? WHERE cust_id=?");
        pstm.setString(1, customer.getName());
        pstm.setString(2, customer.getAddress());
        pstm.setDouble(3, customer.getSalary());
        pstm.setInt(4, customer.getId());

        return pstm.executeUpdate() > 0;
    }

    @Override
    public boolean deleteCustomer(int id) throws SQLException {
        connection = ConnectionManager.getInstance().getConnection();

        pstm = connection.prepareStatement("DELETE FROM customer WHERE cust_id=?");
        pstm.setInt(1, id);

        return pstm.executeUpdate() > 0;
    }
}