import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./orderPod.css";

const OrderItemAccordion = ({ order, isSelected, onSelect }) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isSelected}
            onChange={(e) => onSelect(order.itemID, e.target.checked)}
          />
        }
        label={<Typography variant="subtitle1">{order.itemName}</Typography>}
      />
    </AccordionSummary>
    <AccordionDetails>
      <div>
        <p>Item Name: {order.itemName}</p>
        <p>Category: {order.category}</p>
        <p>Main Image: {order.mainImage}</p>
        <p>Status: {order.status}</p>
        <p>Buyer Email: {order.buyerEmail}</p>
        <p>Buyer Phone Number: {order.buyerPhoneNumber}</p>
        <p>Buyer Full Name: {order.buyerFullName}</p>
        <p>Item Price: {order.itemPrice}</p>
        <p>Item ID: {order.itemID}</p>
      </div>
    </AccordionDetails>
  </Accordion>
);

const OrderPod = ({ title, orders, onDeleteSelected, onPlaceOrders }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState({});

  const handleSelectAll = (e) => {
    const newSelectedOrders = {};
    orders.forEach((order) => {
      newSelectedOrders[order.itemID] = e.target.checked;
    });
    setSelectedOrders(newSelectedOrders);
    setSelectAll(e.target.checked);
  };

  const handleSelectOrder = (itemID, checked) => {
    setSelectedOrders((prevSelectedOrders) => ({
      ...prevSelectedOrders,
      [itemID]: checked,
    }));
  };

  const handleDeleteSelected = () => {
    const selectedOrderKeys = Object.keys(selectedOrders);
    selectedOrderKeys.forEach((itemID) => {
      if (selectedOrders[itemID]) {
        axios
          .put(`http://192.168.1.9:8081/api/orders/handleCancelOrder`, {
            itemID: itemID,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("There was an error canceling the order!", error);
          });
      }
    });
  };

  const handlePlaceOrders = () => {
    const selectedOrderKeys = Object.keys(selectedOrders);
    selectedOrderKeys.forEach((itemID) => {
      const order = orders.find((order) => order.itemID === itemID);
      if (order.status === "pending_payment") {
        handlePlaceOrderPay(itemID);
      } else {
        handlePlaceOrderProc(itemID);
      }
    });
  };

  const handlePlaceOrderProc = (itemID) => {
    axios
      .put(`http://192.168.1.9:8081/api/orders/handlePendingProcessing`, {
        itemID: itemID,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error processing the order!", error);
      });
  };

  const handlePlaceOrderPay = (itemID) => {
    axios
      .put(`http://192.168.1.9:8081/api/orders/handlePendingPayment`, {
        itemID: itemID,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error placing the order!", error);
      });
  };

  useEffect(() => {
    const allSelected = Object.values(selectedOrders).every(Boolean);
    setSelectAll(allSelected);
  }, [selectedOrders]);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <FormControlLabel
          control={<Checkbox checked={selectAll} onChange={handleSelectAll} />}
          label={<Typography variant="h6">{title}</Typography>}
        />
        <div className="buttons">
          <button onClick={handleDeleteSelected}>Delete Selected</button>
          <button onClick={handlePlaceOrders}>Place Orders</button>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {orders.map((order) => (
            <OrderItemAccordion
              key={order.itemID}
              order={order}
              isSelected={selectedOrders[order.itemID] || false}
              onSelect={handleSelectOrder}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
export default OrderPod;