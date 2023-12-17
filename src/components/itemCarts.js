import React from "react";

export default function ItemCarts({ closeCart, cartItems }) {
  const handleCloseCart = () => {
    // closeCart 함수 호출하여 장바구니 닫기
    closeCart();
  };
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.gold.total,
    0
  );

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block bg-lol-dark-blue text-left transform transition-all sm:my-8 sm:align-middle sm:w-3/5">
          <div className="text-4xl">
            <div
              className="close absolute cursor-pointer top-2 right-2 text-white text-xl"
              onClick={handleCloseCart}
            ></div>
            <div>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <p>{item.name}</p>
                  <p>가격: {item.gold.total}</p>
                </div>
              ))}
            </div>
            <div>
              <p>최종 금액: {totalAmount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
