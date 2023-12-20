import React, { useEffect, useRef, useState } from "react";
import Comment from "../components/comment/comment";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { firebaseDataBase } from "../firebase/firebase";

export default function Champion() {
  const [championData, setChampionData] = useState(null);
  const [championId, setChampionId] = useState(null);
  const [championName, setChampionName] = useState(null);
  const [championDescription, setChampionDescription] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [searchChampion, setSearchChampion] = useState(null);
  const modalRef = useRef();

  const onChampionHnadler = (championId, championName, championBlurb) => {
    setChampionId(championId);
    setChampionName(championName);
    setChampionDescription(championBlurb);
    setShowPopup(true);
    console.log(championId);
    console.log(championName);
    console.log(championBlurb);
  };

  const onCloseHandler = () => {
    setShowPopup(false);
  };

  const fetchChampionData = async () => {
    try {
      const response = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/champion.json"
      );
      if (response.ok) {
        const data = await response.json();
        setChampionData(data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log("Error fetching champion data: ", error);
    }
  };

  const commentsToChampionDocument = async () => {
    try {
      const response = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/champion.json"
      );
      if(response.ok) {
        const data = await response.json();
        const championsIds = Object.keys(data.data).map((key) => data.data[key].id);
        console.log(championsIds);
        // for(const key in championsIds) {
        //   const ref = doc(collection(firebaseDataBase, 'comments', 'champions'));
        //   await addDoc(ref, {
        //     championName : championsIds[key]
        //   })
        // }
        for(const key in championsIds) {
          // console.log(championsIds[key]);
          
        }
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log("Error fetching champion data: ", error);
    }

    
  }
  

  const filterChampionData = (searchChampion) => {
    if (!championData) {
      return [];
    }
    if (!searchChampion) {
      return Object.values(championData.data);
    }
    const filteredChampions = Object.values(championData.data).filter(
      (champion) =>
        champion.name.toLowerCase().includes(searchChampion.toLowerCase())
    );
    return filteredChampions;
  };



  const onOutsideHandler = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target))
      setShowPopup(false);
  };

  useEffect(() => {
    fetchChampionData();
    // commentsToChampionDocument();
    commentsToChampionDocument();
    if(showPopup){
      document.addEventListener('mousedown', onOutsideHandler);
    }else{
      document.removeEventListener('mousedown', onOutsideHandler);
    }
    return () => {
      document.removeEventListener("mousedown", onOutsideHandler);
    };
  }, [showPopup]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col  w-4/5">
        <div className="flex justify-between items-center my-3">
          <h1 className="text-lol-gold text-2xl">
            리그 오브 레전드 챔피언 데이터
          </h1>
          <input
            type="text"
            placeholder="챔피언 검색"
            value={searchChampion}
            onChange={(e) => setSearchChampion(e.target.value)}
            className="border-4 border-lol-gold1 p-2"
          />
        </div>
        {championData ? (
          <div className="grid grid-cols-10">
            {filterChampionData(searchChampion)
              .sort((a, b) => {
                return a.name.localeCompare(b.name);
              })
              .map((champion) => (
                <div
                  key={champion.id}
                  onClick={() =>
                    onChampionHnadler(
                      champion.id,
                      champion.name,
                      champion.blurb
                    )
                  }
                  className="flex flex-col items-center transition hover:scale-125 2xl:mb-3.5"
                >
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.id}.png`}
                    alt={champion.name}
                  />
                </div>
              ))}
          </div>
        ) : (
          <p>Loading champion data...</p>
        )}
        {showPopup ? (
          <div>
            <div className="fixed top-0 left-0 w-full h-full inset-0 bg-gray-900 opacity-75 z-40"></div>
            <div
              className="fixed top-10 w-4/5 border-4 border-lol-gold1 z-50"
              ref={modalRef}
            >
              <div className="relative w-full champion-box">
                <div className="close absolute" onClick={onCloseHandler}></div>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`}
                  alt={championName}
                  className="w-full champion-image"
                />
                <div className="text-7xl text-lol-text-color1 champion-name">
                  {championName}
                </div>
                <div className="text-2xl text-lol-gold champion-description">
                  {championDescription}
                </div>
              </div>
              {/* <Comment/> */}
            </div>
          </div>
        ) : (
          <></>
        )}
        {filterChampionData(searchChampion).length === 0 && (
          <p className="text-lol-header-text-color text-4xl text-center m-12">
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
