import React, { useEffect, useState } from 'react'

export default function Champion() {
    const [championData, setChampionData] = useState(null);
    const [championId, setChampionId] = useState(null);
    const [championName, setChampionName] = useState(null);
    const [championDescription, setChampionDescription] = useState(null);
    const [showPopup, setShowPopup] = useState(false);


    const onChampionHnadler = (championId, championName, championBlurb) => {
        setChampionId(championId);
        setChampionName(championName);
        setChampionDescription(championBlurb);
        setShowPopup(true);
        console.log(championId);
        console.log(championName);
        console.log(championBlurb);
    }

    const onCloseHandler = () => {
        setShowPopup(false);
    }

    useEffect(async () => {
        const fetchChampionData = async () => {
            try {
                const response = await fetch(
                    "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/champion.json"
                );

                if(response.ok) {
                    const data = await response.json();
                    setChampionData(data);
                } else {
                    throw new Error("Failed to fetch data");
                }
            } catch(error) {
                console.log("Error fetching champion data: ", error);
            }
        }

        fetchChampionData();
    }, []);

    return (
        <div className='flex flex-col items-center bg-lol-dark-blue'>
            <div className='flex'>
                <h1 className='text-lol-header-text-color'>리그오브레전드 챔피언 데이터</h1>
            </div>
            {championData ? (
            <div className='flex flex-wrap w-4/5'>
                {Object.values(championData.data).sort((a, b) => {
                    return a.name.localeCompare(b.name);
                }).map(champion => (
                <div key={champion.id} onClick={() => onChampionHnadler(champion.id, champion.name, champion.blurb)} className='flex flex-col items-center transition hover:scale-125'>
                    <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.id}.png`}
                    alt={champion.name}
                    />
                    <h2 className='text-lol-header-text-color'>{champion.name}</h2>
                </div>
                ))}
            </div>
            ) : (
            <p>Loading champion data...</p>
            )}
            {showPopup ? (
                <div className='fixed w-4/5'>
                    <div className='relative w-4/5 champion-box'>
                        <div className='close' onClick={onCloseHandler}></div>
                        <img
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`}
                        alt={championName}
                        className='absolute w-full'
                        />
                        <div className='absolute text-7xl text-lol-text-color1 champion-name'>{championName}</div>
                        <div className='absolute -1/4 text-3xl text-lol-text-color2 champion-description'>{championDescription}</div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}
