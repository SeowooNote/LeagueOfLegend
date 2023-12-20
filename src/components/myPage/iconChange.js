import { useEffect, useState } from "react";
import { firebaseAuth } from "../../firebase/firebase";

export default function IconChange({ closeIconChange }) {
  const [iconData, setIconData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const closeIconChangeHandler = () => {
    closeIconChange();
  };

  const fetchIconData = async () => {
    try {
      const response = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/profileicon.json"
      );

      if (response.ok) {
        const data = await response.json();
        const iconArray = Object.values(data.data).slice(0, 29);
        setIconData(iconArray);
        // console.log(data);
      } else {
        throw new Error("데이터를 불러오는 데 실패했습니다");
      }
    } catch (error) {
      console.log("아이콘 데이터를 불러오는 중 오류 발생: ", error);
    }
  };

  useEffect(() => {
    fetchIconData();
  }, []);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe(); // 컴포넌트 언마운트 시에 구독 해제
    };
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div
            className="absolute index-0 inset-0 bg-gray-900 opacity-75"
            onClick={() => closeIconChange()}
          ></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block w-full h-[500px] text-left transform transition-all sm:my-8 sm:align-middle sm:w-4/5">
          <div className="w-full h-full flex flex-row border-4 border-lol-gold1">
            {/* 왼쪽 프로필 */}
            <div className="w-3/12 bg-lol-dark-blue flex flex-col items-center border-r-4 border-lol-gold1">
              <div className="mx-auto flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-lol-dark-blue mt-12">
                  <img
                    src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/6.png"
                    alt="대충 아이콘 이미지"
                    className="rounded-full border-2 border-lol-gold1"
                  ></img>
                </div>
                <div className="w-full text-center mt-4 text-lol-gold">
                  <div className="text-2xl">
                    {firebaseAuth.currentUser.displayName}
                  </div>
                  <div>{firebaseAuth.currentUser.email}</div>
                </div>
              </div>
            </div>
            {/* 상단 제목 닫기버튼 */}
            <div className="w-9/12">
              <div className="w-full h-1/6 bg-lol-dark-blue flex flex-row border-b-4 border-lol-gold1">
                <div className="text-3xl text-lol-gold mt-5 ml-5">
                  아이콘 변경
                </div>
                <div
                  className="close absolute cursor-pointer"
                  onClick={closeIconChangeHandler}
                ></div>
              </div>
              {/* 아이콘 리스트 */}
              <div className="w-full h-5/6 bg-lol-dark-blue ">
                <div className="flex flex-wrap ml-2">
                  {iconData.map((icon, index) => (
                    <div
                      key={index}
                      className="w-1/8 p-2 transition hover:scale-125"
                    >
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${icon.id}.png`}
                        alt={`아이콘 ${icon.id}`}
                        className="w-20 h-20 rounded-full bg-lol-dark-blue m-1 border-2 border-lol-gold1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
