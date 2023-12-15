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

    useEffect(() => {
        fetchChampionData();
    }, []);

    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-col w-4/5 justify-center items-center '>
                <div className='flex'>
                    <h1 className='text-lol-header-text-color'>리그오브레전드 챔피언 데이터</h1>
                </div>
                {championData ? (
                <div className='grid grid-cols-10'>
                        {Object.values(championData.data).sort((a, b) => {
                            return a.name.localeCompare(b.name);
                        }).map(champion => (
                        <div key={champion.id} onClick={() => onChampionHnadler(champion.id, champion.name, champion.blurb)} className='flex flex-col items-center transition hover:scale-125'>
                            <img
                            src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.id}.png`}
                            alt={champion.name}
                            />
                            <h2 className='text-lol-gold'>{champion.name}</h2>
                        </div>
                        ))}
                </div>
                ) : (
                <p>Loading champion data...</p>
                )}
                {showPopup ? (
                    <div className='fixed top-10 w-4/5'>
                        <div className='relative w-full champion-box'>
                            <div className='close absolute' onClick={onCloseHandler}></div>
                            <img
                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`}
                            alt={championName}
                            className='w-full backdrop-brightness-0'
                            />
                            <div className='text-7xl text-lol-text-color1 champion-name'>{championName}</div>
                            <div className='text-2xl text-lol-gold champion-description'>{championDescription}</div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
