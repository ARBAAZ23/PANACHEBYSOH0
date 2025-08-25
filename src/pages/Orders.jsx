import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

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
                  const productRes = await axios.get(
                    `${backendUrl}api/product/${item.id}`
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
                    size: size,
                    image: product.image,
                    quantity: quantity,
                  };
                } catch (error) {
                  console.error("Failed to fetch product:", error);
                  return {
                    ...item,
                    name: "Unknown Product",
                    price: 0,
                    image: [],
                    size: "N/A",
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

        setOrderData(enrichedOrders.reverse());
      }
    } catch (error) {
      console.error("Error loading user orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 px-4 sm:px-8 lg:px-20 bg-gray-50 min-h-screen">
      {/* Title */}
      <div className="text-2xl mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* Orders List */}
      <div className="space-y-6 mb-3">
        {orderData.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            You haven’t placed any orders yet.
          </p>
        ) : (
          orderData.map((order, index) => (
            <div
              key={order._id}
              className="p-5 border bg-white rounded-xl shadow-sm hover:shadow-md transition animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Each Order Info */}
              <div className="flex flex-col gap-6">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <h3 className="font-semibold text-lg">
                    Order #{order._id.slice(-6)}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Date:{" "}
                    <span className="text-gray-700">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  {order.items.map((item, idx) => {
                    console.log(order);
                    console.log("Order item:", item);

                    const imageSrc = item.image[1] || item.image[0];

                    return (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center gap-6 border-b pb-4"
                      >
                        <img
                          src={imageSrc}
                          alt={item.name || "Product"}
                          className="w-26 h-[130px] object-contain rounded-md"
                        />

                        <div className="flex flex-col gap-2 text-sm sm:text-base w-full">
                          <p className="font-semibold text-lg">{item.name}</p>
                          <div className="flex flex-wrap items-center gap-4 text-gray-600">
                            <p>
                              Price:{" "}
                              <span className="font-medium text-black">
                                {currency}
                                {item.price}
                              </span>
                            </p>
                            <p>
                              Quantity:{" "}
                              <span className="font-medium">
                                {item.quantity}
                              </span>
                            </p>
                            <p>
                              Size:{" "}
                              <span className="font-medium">{item.size}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Status + Action */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
                  <p
                    className={`font-semibold ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Shipped"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Status: {order.status}
                  </p>
                  <button className="mt-2 sm:mt-0 px-5 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
