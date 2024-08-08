package com.example.backend.bo.custom;

import com.example.backend.dto.ItemDto;

import java.sql.SQLException;

public interface ItemBo {
    boolean addItem(ItemDto itemDto) throws SQLException;
    ItemDto searchItem(int id) throws SQLException;
}
