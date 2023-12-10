import React, { useEffect, useState } from 'react'

export default function Champion() {
    const [championData, setChampionData] = useState(null);

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
        <div>
            <h1>리그오브레전드 챔피언 데이터</h1>
            {championData ? (
            <div>
                {Object.values(championData.data).map(champion => (
                <div key={champion.id}>
                    <h2>{champion.name}</h2>
                    <img
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
                    alt={champion.name}
                    />
                    <p>ID: {champion.id}</p>
                    <p>Title: {champion.title}</p>
                    <p>Blurb: {champion.blurb}</p>
                </div>
                ))}
            </div>
            ) : (
            <p>Loading champion data...</p>
            )}
        </div>
    )
}
