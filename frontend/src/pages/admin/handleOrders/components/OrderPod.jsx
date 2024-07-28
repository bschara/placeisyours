import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
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

const getFileName = (filePath) => {
  const pathComponents = filePath.split("\\");
  return pathComponents[pathComponents.length - 1];
};

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
      <div className="orders-pod">
        <p>Item Name: {order.itemName}</p>
        <p>Category: {order.category}</p>
        <img
          className="selected-image"
          src={order.mainImage}
          alt={order.itemName}
        />
        <p>Status: {order.status}</p>
        <p>Buyer Email: {order.buyerEmail}</p>
        <p>Buyer Phone Number: {order.buyerPhoneNumber}</p>
        <p>Buyer Full Name: {order.buyerFullName}</p>
        <p>Item Price: {order.itemPrice}</p>
        <p>Item ID: {order.itemID}</p>
        <p>Item Size: {order.itemSize ? order.itemSize : "no size"}</p>
      </div>
    </AccordionDetails>
  </Accordion>
);

const OrderPod = ({ title, orders, onDeleteSelected, onPlaceOrders }) => {
  const token = Cookies.get("authToken"); // Replace 'bearerToken' with the actual cookie name

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

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
        const order = orders.find((order) => order.itemID === itemID);
        if (order.category === "sDrop") {
          handleSpecialDeleteOrder(itemID, order.itemSize);
        } else {
          handleDeleteOrder(itemID);
        }
      }
    });
  };

  const handleDeleteOrder = (itemID) => {
    axios
      .put(
        `http://theplaceisyours.club/api/orders/handleCancelOrder`,
        { itemID: itemID },
        config
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error deleting the order!", error);
      });
  };

  const handleSpecialDeleteOrder = (itemID, itemSize) => {
    axios
      .put(
        `http://theplaceisyours.club/api/orders/handleSpecialCancelOrder`,
        { itemID: itemID, itemSize: itemSize },
        config
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error deleting the special order!", error);
      });
  };
  const handlePlaceOrders = () => {
    const selectedOrderKeys = Object.keys(selectedOrders);
    selectedOrderKeys.forEach((itemID) => {
      const order = orders.find((order) => order.itemID === itemID);
      if (order.category === "sDrop") {
        if (order.status === "pending_payment") {
          handleSpecialPlaceOrderPay(itemID);
        } else {
          handleSpecialPlaceOrderProc(itemID);
        }
      } else {
        if (order.status === "pending_payment") {
          handlePlaceOrderPay(itemID);
        } else {
          handlePlaceOrderProc(itemID);
        }
      }
    });
  };

  const handlePlaceOrderProc = (itemID) => {
    axios
      .put(
        `http://theplaceisyours.club/api/orders/handlePendingProcessing`,
        {
          itemID: itemID,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error processing the order!", error);
      });
  };

  const handlePlaceOrderPay = (itemID) => {
    axios
      .put(
        `http://theplaceisyours.club/api/orders/handlePendingPayment`,
        {
          itemID: itemID,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error placing the order!", error);
      });
  };

  const handleSpecialPlaceOrderProc = (itemID) => {
    axios
      .put(
        `http://theplaceisyours.club/api/orders/handleSpecialPendingProcessing`,
        {
          itemID: itemID,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error processing the order!", error);
      });
  };

  const handleSpecialPlaceOrderPay = (itemID) => {
    axios
      .put(
        `http://theplaceisyours.club/api/orders/handleSpecialPendingPayment`,
        {
          itemID: itemID,
        },
        config
      )
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
