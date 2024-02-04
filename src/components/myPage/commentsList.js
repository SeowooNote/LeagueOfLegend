import React, { useEffect, useState } from "react";
import { firebaseAuth, firebaseDataBase } from "../../firebase/firebase";
import {
    query,
    where,
    collection,
    getDocs,
    doc,
    deleteDoc,
} from "firebase/firestore";

export default function CommentsList() {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(
                    "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/champion.json"
                );
                const data = await response.json();
                const championsIds = Object.keys(data.data).map(
                    (key) => data.data[key].id
                );
                console.log(championsIds);
                const userUID = firebaseAuth.currentUser.uid;
                console.log(userUID);

                const fetchedComments = [];

                // 각 문서(champion)를 순회하면서 commentList 하위 컬렉션의 문서들에서 userId가 일치하는지 확인
                for (const champion of championsIds) {
                    const q = query(
                        collection(
                            firebaseDataBase,
                            "comments",
                            champion,
                            "commentList"
                        ),
                        where("userId", "==", userUID)
                    );
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        const commentData = doc.data();
                        console.log(
                            `Comment in ${champion}:`,
                            commentData.content
                        );
                        fetchedComments.push({
                            id: doc.id, // 문서 ID 추가
                            content: commentData.content,
                            icon: `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion}.png`,
                        });
                    });
                }

                setComments(fetchedComments);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching comments:", error);
                setIsLoading(false);
            }
        };

        fetchComments();

        // Cleanup 함수
        return () => {
            // 필요한 경우 정리 작업 추가
        };
    }, []);

    const handleDelete = async (id) => {
        console.log(id);
        const docRef = doc(firebaseDataBase, "comments", id);
        try {
            await deleteDoc(docRef); // 해당 ID의 문서 삭제
            console.log("Document successfully deleted!");
            // 삭제 후 UI 업데이트 등 필요한 작업 수행
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    return (
        <div className="w-full h-96 flex flex-col">
            <div className="w-full h-1/5 flex items-center">
                <div className="text-2xl ml-10 text-lol-gold">남긴 댓글</div>
            </div>
            <div className="w-full h-4/5 overflow-scroll">
                {isLoading ? (
                    <div className="w-96 flex flex-row text-2xl ml-10 text-lol-gold">
                        <svg
                            className="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4" // 수정: strokeWidth로 변경
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        댓글 가져오는 중...
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {comments.map((comment, index) => (
                            <div
                                className="flex flex-row items-center mb-4 justify-between"
                                key={index}
                            >
                                <div className="flex flex-row items-center">
                                    <div className="w-16 h-16 ml-10">
                                        <img
                                            className="w-full h-full"
                                            src={comment.icon}
                                            alt={`${comment.icon} icon`}
                                        ></img>
                                    </div>
                                    <div className="text-xl text-lol-gold ml-10">
                                        {comment.content}
                                    </div>
                                </div>
                                <div className="w-1/6 flex flex-row">
                                    <div className="text-lg text-lol-gold ml-10 cursor-pointer">
                                        수정
                                    </div>
                                    <div
                                        className="text-lg text-red-500 ml-5 cursor-pointer"
                                        onClick={() => handleDelete(comment.id)}
                                    >
                                        삭제
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
