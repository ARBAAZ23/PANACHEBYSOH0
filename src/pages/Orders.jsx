import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const ORDER_STEPS = [
  "Order Placed",
  "Dispatched",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [trackingVisible, setTrackingVisible] = useState({});

  const toggleTracking = (orderId) => {
    setTrackingVisible((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const getCurrentStep = (status) => {
    switch (status) {
      case "Placed":
        return 0;
      case "Dispatched":
        return 1;
      case "Shipped":
        return 2;
      case "Out for Delivery":
        return 3;
      case "Delivered":
        return 4;
      default:
        return 0;
    }
  };

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const orders = response.data.orders;

        const enrichedOrders = await Promise.all(
          orders.map(async (order) => {
            const enrichedItems = await Promise.all(
              order.items.map(async (item) => {
                try {
                  const productId = item.productId || item.id || item._id;

                  if (!productId) {
                    console.warn("⚠️ Missing product ID:", item);
                    return {
                      ...item,
                      name: "Unknown Product",
                      price: 0,
                      image: [],
                      size: "N/A",
                      quantity: 0,
                    };
                  }

                  const productRes = await axios.get(
                    `${backendUrl}api/product/${productId}`
                  );
                  const product = productRes.data.product;

                  const size =
                    Object.keys(item).find((key) =>
                      ["S", "M", "L", "XL"].includes(key)
                    ) || "N/A";

                  const quantity = item[size] || 0;

                  return {
                    ...item,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    size,
                    quantity,
                  };
                } catch (error) {
                  console.error("❌ Product fetch failed:", error);
                  return {
                    ...item,
                    name: "Unknown Product",
                    price: 0,
                    image: [],
                    size: "N/A",
                    quantity: 0,
                  };
                }
              })
            );

            return {
              _id: order._id,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              items: enrichedItems,
            };
          })
        );

        // ✅ Sort by date (newest first)
        const sortedOrders = enrichedOrders.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setOrderData(sortedOrders);
      }
    } catch (error) {
      console.error("❌ Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 px-4 sm:px-8 lg:px-20 bg-gray-50 min-h-screen">
      {/* Title */}
      <div className="text-2xl text-center mb-10">
        <Title className="" text1="MY  " text2="ORDERS" />
        <p className="text-sm text-gray-500 mt-2">
          Track and manage all your purchases
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-8">
        {orderData.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            You haven’t placed any orders yet.
          </p>
        ) : (
          orderData.map((order, index) => {
            const currentStep = getCurrentStep(order.status);

            return (
              <div
                key={order._id}
                className="p-6 border bg-white rounded-2xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4 mb-6">
                  <h3 className="font-semibold text-lg tracking-wide text-gray-800">
                    Order{" "}
                    <span className="text-gray-600">#{order._id.slice(-6)}</span>
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Date:{" "}
                    <span className="text-gray-700 font-medium">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                {/* Order Items */}
                <div className="space-y-6">
                  {order.items.map((item, idx) => {
                    const imageSrc = item.image?.[1] || item.image?.[0] || "";

                    return (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center gap-6 border-b pb-5 last:border-none"
                      >
                        <img
                          src={imageSrc}
                          alt={item.name || "Product"}
                          className="w-full sm:w-52 sm:h-52 h-44 object-contain rounded-xl shadow-md bg-gray-100"
                        />

                        <div className="flex flex-col gap-2 text-sm sm:text-base w-full">
                          <p className="font-semibold text-lg text-gray-800">
                            {item.name}
                          </p>
                          <div className="flex flex-wrap items-center gap-6 text-gray-600">
                            <p>
                              Price:{" "}
                              <span className="font-medium text-black">
                                {currency}
                                {item.price}
                              </span>
                            </p>
                            <p>
                              Quantity:{" "}
                              <span className="font-medium text-black">
                                {item.quantity}
                              </span>
                            </p>
                            <p>
                              Size:{" "}
                              <span className="font-medium text-black">
                                {item.size}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Status + Payment + Track Order */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-3 sm:gap-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <p
                      className={`font-semibold text-sm sm:text-base px-4 py-1 rounded-full w-fit ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Dispatched"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </p>
                    <p
                      className={`font-medium text-sm sm:text-base px-4 py-1 rounded-full w-fit ${
                        order.paymentMethod === "COD"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {order.paymentMethod === "COD"
                        ? "Cash on Delivery"
                        : order.paymentMethod}
                    </p>
                    <p
                      className={`font-medium text-sm sm:text-base px-4 py-1 rounded-full w-fit ${
                        order.payment
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.payment ? "Paid" : "Unpaid"}
                    </p>
                  </div>

                  {/* Track Order Toggle */}
                  <button
                    onClick={() => toggleTracking(order._id)}
                    className="px-6 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition duration-300 shadow-sm"
                  >
                    {trackingVisible[order._id] ? "Hide Tracking" : "Track Order"}
                  </button>
                </div>

                {/* Order Tracking Progress */}
                {trackingVisible[order._id] && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between w-full max-w-xl mx-auto">
                      {ORDER_STEPS.map((step, index) => {
                        const stepStatus =
                          index < currentStep
                            ? "completed"
                            : index === currentStep
                            ? "current"
                            : "upcoming";

                        return (
                          <div
                            key={index}
                            className="flex-1 relative flex flex-col items-center text-center"
                          >
                            {/* Circle */}
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center border-2
                              ${
                                stepStatus === "completed"
                                  ? "bg-green-600 border-green-600 text-white"
                                  : stepStatus === "current"
                                  ? "bg-white border-green-600 text-green-600 font-semibold"
                                  : "bg-white border-gray-300 text-gray-400"
                              }
                            `}
                            >
                              {stepStatus === "completed" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                index + 1
                              )}
                            </div>

                            {/* Step Label */}
                            <span
                              className={`mt-2 text-xs sm:text-sm ${
                                stepStatus === "completed"
                                  ? "text-green-700 font-semibold"
                                  : stepStatus === "current"
                                  ? "text-green-600 font-semibold"
                                  : "text-gray-400"
                              }`}
                            >
                              {step}
                            </span>

                            {/* Connector line */}
                            {index !== ORDER_STEPS.length - 1 && (
                              <div
                                className={`absolute top-4 right-[-50%] w-full border-t-2 
                              ${
                                index < currentStep
                                  ? "border-green-600"
                                  : "border-gray-300"
                              }`}
                                style={{ zIndex: 0 }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;
