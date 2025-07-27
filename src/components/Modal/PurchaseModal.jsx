import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
const PurchaseModal = ({ closeModal, isOpen, plant }) => {
  const { _id, name, category, quantity, price, description, image, seller } =
    plant || {};
  const { user } = useAuth();

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  // Total Price Calculation

  const [orderData, setOrderData] = useState({
    customer: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
    seller,
    plantId: _id,
    plantName: name,
    plantCategory: category,
    plantImage: image,
    quantity: 1,
    price: price,
  });
  
  useEffect(()=>{
    setOrderData((prev) => {
        return {
          ...prev,
          customer: {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
          },
        };
      });
  },[user])

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= quantity) {
      setSelectedQuantity(value);
      setTotalPrice(value * price);
      setOrderData((prev) => {
        return {
          ...prev,
          price: value * price,
          quantity: value,
        };
      });
    }
  };
  const handlePurchase = () => {
console.log(orderData);
  };
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Info Before Purchase
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Plant: {name}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Category: {category}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Customer: {user?.displayName}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-500">Price per unit: ${price}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Available Quantity: {quantity}
              </p>
            </div>
            <hr className="mt-2" />
            <p className="font-semibold my-2">Order Summary</p>

            <div className="mt-2">
              <input
                value={selectedQuantity}
                onChange={handleQuantityChange}
                type="number"
                min="1"
                max={quantity}
                className="border rounded-md p-2 w-1/2"
              />
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Selected quantity: {selectedQuantity}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Total Price: ${totalPrice}
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={handlePurchase}
                className="w-full bg-blue-500 text-white py-2 rounded-md"
              >
                Confirm Purchase
              </button>
            </div>
            
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
