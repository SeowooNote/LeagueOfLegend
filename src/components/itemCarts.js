import React from "react";
import goldImg from "../assets/goldImg.webp";

export default function ItemCarts({ closeCart, cartItems, removeFromCart }) {
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
          <div
            className="absolute index-0 inset-0 bg-gray-900 opacity-75"
            onClick={() => closeCart()}
          ></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block bg-lol-dark-blue text-left transform transition-all sm:my-8 sm:align-middle sm:w-2/5">
          <div className="z-10 h-[500px] border-4 border-lol-gold1 box-border text-2xl">
            <div className="text-lol-text-color1 h-full overflow-y-auto flex flex-col">
              {cartItems.length === 0 ? ( // 장바구니가 비어있는 경우
                <div className="text-center mt-10 text-lol-header-text-color">
                  장바구니가 비어있습니다.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="w-auto mt-7 ml-5 mr-10">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${item.id}.png`}
                          alt={item.name}
                          className="w-12 h-12 ml-4 border-2 border-lol-gold1"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-lol-header-text-color">
                          {item.name}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center">
                        <div className="text-lol-header-text-color">
                          <img
                            src={goldImg}
                            alt="Gold Icon"
                            className="inline-block w-6 h-6 mr-1"
                          />
                          {item.gold.total}
                        </div>
                        <button
                          className="ml-6 text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {cartItems.length > 0 && ( // 장바구니가 비어있지 않은 경우에만 표시
                <div className="fixed bg-lol-dark-blue w-full left-0 top-[490px] h-[65px] text-lol-text-color1 flex justify-between border-4 border-lol-gold1">
                  <button
                    className="ml-4 mt-1 w-fit h-fit p-2 rounded-md cursor-pointer text-white text-xl"
                    onClick={handleCloseCart}
                  >
                    닫기
                  </button>
                  <div className="mr-5 mt-3">
                    <img
                      src={goldImg}
                      alt="Gold Icon"
                      className="inline-block w-6 h-6 mr-1"
                    />
                    {totalAmount}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
