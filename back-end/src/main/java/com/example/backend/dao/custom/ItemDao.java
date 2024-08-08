package com.example.backend.dao.custom;

import com.example.backend.entity.Item;

import java.sql.SQLException;

public interface ItemDao {
    boolean addItem(Item item) throws SQLException;
}
