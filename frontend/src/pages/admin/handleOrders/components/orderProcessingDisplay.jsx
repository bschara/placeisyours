import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import OrderAccordion from "./OrderAccordion";

const OrderProcessingDisplay = () => {
  const [pendingPaymentOrders, setPendingPaymentOrders] = useState([]);
  const [pendingProcessingOrders, setPendingProcessingOrders] = useState([]);
  const [specialPendingProcessing, setSpecialPendingProcessing] = useState([]);
  const [specialPendingPayment, setSpecialPendingPayment] = useState([]);

  useEffect(() => {
    const token = Cookies.get("authToken");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(
        "http://theplaceisyours.club/api/orders/ordersPendingPayment",
        config
      )
      .then((response) => {
        setPendingPaymentOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pending payment orders:", error);
      });

    axios
      .get(
        "http://theplaceisyours.club/api/orders/ordersPendingProcessing",
        config
      )
      .then((response) => {
        setPendingProcessingOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pending processing orders:", error);
      });
    axios
      .get(
        "http://theplaceisyours.club/api/orders/specialOrdersPendingPayment",
        config
      )
      .then((response) => {
        setSpecialPendingPayment(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pending payment orders:", error);
      });

    axios
      .get(
        "http://theplaceisyours.club/api/orders/specialOrdersPendingProcessing",
        config
      )
      .then((response) => {
        setSpecialPendingProcessing(response.data);
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
      <OrderAccordion
        title="Pending Payment Special Orders"
        orders={specialPendingPayment}
      />
      <OrderAccordion
        title="Pending Processing Special Orders"
        orders={specialPendingProcessing}
      />
    </div>
  );
};

export default OrderProcessingDisplay;
