import React, { useEffect, useState } from "react";
import goldImg from "../assets/goldImg.webp";
import ItemCarts from "./itemCarts";

export default function Items() {
  const [itemData, setItemData] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [selectedItemDescription, setSelectedItemDescription] = useState(null);
  const [selectedItemGold, setSelectedItemGold] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const onItemHandler = (itemId, itemName, itemBlurb, itemGold) => {
    setSelectedItemId(itemId);
    setSelectedItemName(itemName);
    setSelectedItemDescription(itemBlurb);
    setSelectedItemGold(itemGold);
    setShowPopup(true);
    // console.log(itemId, itemName, itemBlurb);
  };

  const onCloseHandler = () => {
    setShowPopup(false);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const onAddToCart = () => {
    const isItemInCart = cartItems.some((item) => item.id === selectedItemId);

    if (isItemInCart) {
      // 이미 장바구니에 있는 아이템이면 제거
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== selectedItemId)
      );
      alert("장바구니에서 제거되었습니다.");
      // 해당 아이템이 장바구니에 추가되었음을 표시하는 상태 업데이트 취소
      setAddedToCart((prevAddedToCart) => ({
        ...prevAddedToCart,
        [selectedItemId]: false,
      }));
    } else {
      // 아이템이 장바구니에 없으면 추가
      setCartItems((prevItems) => [
        ...prevItems,
        { id: selectedItemId, name: selectedItemName, gold: selectedItemGold },
      ]);
      // 해당 아이템이 장바구니에 추가되었음을 표시
      setAddedToCart((prevAddedToCart) => ({
        ...prevAddedToCart,
        [selectedItemId]: true,
      }));
      alert("장바구니에 추가되었습니다.");
    }

    setShowPopup(false);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const fetchItemData = async () => {
    try {
      const response = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/item.json"
      );

      if (response.ok) {
        const data = await response.json();
        setItemData(data.data);
      } else {
        throw new Error("데이터를 불러오는 데 실패했습니다");
      }
    } catch (error) {
      console.log("아이템 데이터를 불러오는 중 오류 발생: ", error);
    }
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  const filteredItems = Object.entries(itemData || {})
    .filter(
      ([itemId, item]) =>
        ![
          "7050",
          "3901",
          "3902",
          "3903",
          "1516",
          "1517",
          "1518",
          "1519",
          "1520",
          "1521",
          "1522",
          "3599",
          "3400",
          "7001",
          "1104",
          "1500",
          "1501",
          "1502",
          "1503",
          "1504",
          "1506",
          "1507",
          "1508",
          "1509",
          "1510",
          "1510",
          "1511",
          "1512",
          "1515",
          "2019",
          "3152",
          "2424",
        ].includes(itemId) && !itemId.startsWith("22")
    )
    .filter(([itemId, item]) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-4/5 justify-center items-center">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lol-header-text-color text-4xl mt-5 mb-5">
            리그 오브 레전드 아이템 데이터
          </h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="아이템 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 border-lol-gold1 p-2 h-full"
            />
            <div
              className="text-4xl text-lol-header-text-color"
              onClick={toggleCart}
            >
              Cart
            </div>
          </div>
          {showCart && (
            <ItemCarts
              closeCart={toggleCart}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          )}
        </div>
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
            {filteredItems.map(([itemId, item]) => (
              <div
                key={itemId}
                onClick={() =>
                  onItemHandler(itemId, item.name, item.description, item.gold)
                }
                className="flex flex-col items-center transition hover:scale-125 border-4 bg-lol-dark-blue border-lol-gold1 p-4"
              >
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${itemId}.png`}
                  alt={item.name}
                  className="w-full h-auto"
                />
                <h2 className="text-lol-header-text-color">{item.name}</h2>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lol-header-text-color text-4xl m-12">
            검색 결과가 없습니다.
          </p>
        )}
        {showPopup && (
          <div className="fixed inset-0 overflow-hidden">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div
                  className="z-0 absolute inset-0 bg-gray-900 opacity-75"
                  onClick={onCloseHandler}
                ></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div className="inline-block bg-lol-dark-blue text-left transform transition-all sm:my-8 sm:align-middle sm:w-3/5">
                <div className="z-10 w-full h-full relative flex border-4 border-lol-gold1 p-4">
                  <div
                    className="close absolute cursor-pointer top-0 right-2 text-white text-xl"
                    onClick={onCloseHandler}
                  ></div>
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${selectedItemId}.png`}
                    alt={selectedItemName}
                    className="w-1/5 h-full object-cover border-2 border-lol-gold1"
                  />
                  <div className="flex flex-col p-4 w-2/3">
                    <div className="text-4xl pb-3 text-lol-text-color1">
                      {selectedItemName}
                    </div>
                    <div className="text-xl text-lol-text-color2 max-h-[100%] pl-2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedItemDescription,
                        }}
                      />
                    </div>
                    <div className="text-lol-text-color2 text-xl mt-2">
                      <img
                        src={goldImg}
                        alt="Gold Icon"
                        className="inline-block w-6 h-6 mr-1"
                      />
                      {selectedItemGold
                        ? `${selectedItemGold.total}`
                        : "알 수 없음"}
                      <button
                        onClick={onAddToCart}
                        className={`mt-4 bg-lol-gold1 text-white p-2 rounded-md cursor-pointer ${
                          addedToCart[selectedItemId] ? "added-to-cart" : ""
                        } absolute bottom-5 right-5`}
                      >
                        {addedToCart[selectedItemId]
                          ? "장바구니에서 제거"
                          : "장바구니에 추가"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
