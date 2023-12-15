import React, { useEffect, useState } from "react";
import goldImg from "../assets/goldimg.webp";

export default function Items() {
  const [itemData, setItemData] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [selectedItemDescription, setSelectedItemDescription] = useState(null);
  const [selectedItemGold, setSelectedItemGold] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const onItemHandler = (itemId, itemName, itemBlurb, itemGold) => {
    setSelectedItemId(itemId);
    setSelectedItemName(itemName);
    setSelectedItemDescription(itemBlurb);
    setSelectedItemGold(itemGold);
    setShowPopup(true);
    console.log(itemId, itemName, itemBlurb);
  };

  const onCloseHandler = () => {
    setShowPopup(false);
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
          <input
            type="text"
            placeholder="아이템 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 border-lol-gold1 p-2 h-full"
          />
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
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div className="inline-block bg-lol-dark-blue text-left transform transition-all sm:my-8 sm:align-middle sm:w-3/5">
                <div className="w-full h-full relative flex border-4 border-lol-gold1 p-4">
                  <div
                    className="close absolute cursor-pointer top-2 right-2 text-white text-xl"
                    onClick={onCloseHandler}
                  ></div>
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${selectedItemId}.png`}
                    alt={selectedItemName}
                    className="w-1/3 h-full object-cover"
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
