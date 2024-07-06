import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderAccordion from "./OrderAccordion";

const OrderProcessingDisplay = () => {
  const [pendingPaymentOrders, setPendingPaymentOrders] = useState([]);
  const [pendingProcessingOrders, setPendingProcessingOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.9:8081/api/orders/ordersPendingPayment")
      .then((response) => {
        setPendingPaymentOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pending payment orders:", error);
      });

    axios
      .get("http://192.168.1.9:8081/api/orders/ordersPendingProcessing")
      .then((response) => {
        setPendingProcessingOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pending processing orders:", error);
      });
  }, []);

  return (
    <div>
      <OrderAccordion
        title="Pending Payment Orders"
        orders={pendingPaymentOrders}
      />
      <OrderAccordion
        title="Pending Processing Orders"
        orders={pendingProcessingOrders}
      />
    </div>
  );
};

export default OrderProcessingDisplay;
