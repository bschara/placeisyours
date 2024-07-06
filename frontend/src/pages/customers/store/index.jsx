import ItemsComponent from "./components/itemsComponent/ItemsComponent";
import "./store.css";
import CustomerNavbar from "../../../components/navbar";

const CustomerStorePage = () => {
  return (
    <div className="store-whole-page">
      <div className="navv">
        <CustomerNavbar />
      </div>
      <ItemsComponent />
    </div>
  );
};

export default CustomerStorePage;
