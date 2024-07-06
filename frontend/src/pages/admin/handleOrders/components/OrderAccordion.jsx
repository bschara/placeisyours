import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderPod from "./OrderPod";

const OrderAccordion = ({ title, orders }) => {
  const groupedOrders = orders.reduce((acc, order) => {
    const key = order.buyerFullName + " - " + order.buyerPhoneNumber;
    if (!acc[key]) acc[key] = [];
    acc[key].push(order);
    return acc;
  }, {});

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {Object.entries(groupedOrders).map(([groupTitle, groupOrders]) => (
            <OrderPod
              key={groupTitle}
              title={groupTitle}
              orders={groupOrders}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderAccordion;
