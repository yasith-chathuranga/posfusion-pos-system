package com.example.backend.dao.custom;

import com.example.backend.dao.SuperDAO;
import com.example.backend.entity.OrderDetail;

import java.sql.SQLException;

public interface OrderDetailDao extends SuperDAO {
    boolean save(OrderDetail entity) throws SQLException;
}
