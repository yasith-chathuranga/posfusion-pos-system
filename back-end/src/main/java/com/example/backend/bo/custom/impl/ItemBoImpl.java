package com.example.backend.bo.custom.impl;

import com.example.backend.bo.custom.ItemBo;
import com.example.backend.dao.custom.ItemDao;
import com.example.backend.dao.custom.impl.ItemDaoImpl;
import com.example.backend.dto.ItemDto;
import com.example.backend.entity.Item;

import java.sql.SQLException;

public class ItemBoImpl implements ItemBo {

    ItemDao itemDao = new ItemDaoImpl();

    @Override
    public boolean addItem(ItemDto itemDto) throws SQLException {
        return itemDao.addItem(
                new Item(
                        itemDto.getId(),
                        itemDto.getName(),
                        itemDto.getQty(),
                        itemDto.getPrice()
                )
        );
    }

    @Override
    public ItemDto searchItem(int id) throws SQLException {
        ItemDto itemDto = itemDao.searchItem(id);

        if (itemDto != null) {
            return new ItemDto(
                    itemDto.getId(),
                    itemDto.getName(),
                    itemDto.getQty(),
                    itemDto.getPrice()
            );
        }
        return null;
    }

    @Override
    public boolean updateItem(ItemDto itemDto) throws SQLException {
        return itemDao.updateItem(
                new Item(
                        itemDto.getId(),
                        itemDto.getName(),
                        itemDto.getQty(),
                        itemDto.getPrice()
                )
        );
    }

    @Override
    public boolean deleteItem(int id) throws SQLException {
        return itemDao.deleteItem(id);
    }
}
