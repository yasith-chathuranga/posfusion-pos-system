package com.example.backend.dao;

import com.example.backend.dao.custom.impl.CustomerDaoImpl;
import com.example.backend.dao.custom.impl.ItemDaoImpl;
import com.example.backend.dao.custom.impl.OrderDaoImpl;
import com.example.backend.dao.custom.impl.OrderDetailDaoImpl;

public class DAOFactory {
    private static DAOFactory daoFactory;

    private DAOFactory() {
    }

    public static DAOFactory getInstance() {
        return (daoFactory == null) ? (daoFactory = new DAOFactory()) : daoFactory;
    }

    public enum DAOType {
        CUSTOMER, ITEM, ORDER, ORDER_DETAIL
    }

    public SuperDAO getDAO(DAOType daoType) {
        return switch (daoType) {
            case CUSTOMER -> new CustomerDaoImpl();
            case ITEM -> new ItemDaoImpl();
            case ORDER -> new OrderDaoImpl();
            case ORDER_DETAIL -> new OrderDetailDaoImpl();
        };
    }
}
