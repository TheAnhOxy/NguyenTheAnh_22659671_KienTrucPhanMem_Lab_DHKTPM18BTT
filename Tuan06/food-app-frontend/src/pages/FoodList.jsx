import React, { useEffect, useState } from "react";
import api from "../api/axios";

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    api.get("/foods").then((res) => setFoods(res.data.data));
  }, []);

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {foods.map((food) => (
        <div
          key={food.id}
          className="border p-4 rounded-lg shadow hover:shadow-lg transition"
        >
          <img
            src="https://via.placeholder.com/150"
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="font-bold mt-2">{food.name}</h3>
          <p className="text-red-500 font-semibold">
            {food.price.toLocaleString()}đ
          </p>
          <button className="mt-2 bg-orange-500 text-white px-4 py-1 rounded">
            Thêm giỏ hàng
          </button>
        </div>
      ))}
    </div>
  );
};
