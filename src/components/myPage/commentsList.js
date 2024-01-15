import React from "react";
import { useEffect, useState } from "react";
import { firebaseAuth, firebaseDataBase } from "../../firebase/firebase"; // Firebase 설정에 따라 수정

export default function CommentsList() {
  const [userUID, setUserUID] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // 사용자가 로그인한 경우
        setUserUID(authUser);
      } else {
        // 사용자가 로그아웃한 경우
        setUserUID(null);
      }
    });

    return () => {
      // Clean up 함수
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // 현재 로그인된 사용자의 UID
    const userUID = firebaseAuth.currentUser.uid;

    // Firebase 데이터베이스에서 댓글 가져오기
    const commentsRef = firebaseDataBase.ref("comments/Aatrox/commentList");

    commentsRef
      .once("value")
      .then((snapshot) => {
        const comments = snapshot.val();

        // comments를 순회하면서 현재 사용자의 댓글 찾기
        if (comments) {
          Object.keys(comments).forEach((commentKey) => {
            const comment = comments[commentKey];

            // 현재 사용자의 UID와 댓글의 userId가 일치하는 경우
            if (comment.userId === userUID) {
              // 댓글 가져온 후 처리 로직 작성
              console.log("댓글 내용:", comment.content);
            }
          });
        }
      })
      .catch((error) => {
        console.error("댓글 가져오기 실패:", error);
      });
  }); // user 상태가 변경될 때마다 실행

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-1/5 flex items-center">
        <div className="text-2xl ml-10 text-lol-gold">남긴 댓글</div>
      </div>
      <div className="w-full h-fit">
        <div className="w-full h-16 flex flex-row">
          <div className="w-16 h-16 ml-10">
            <img
              src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Garen.png"
              alt="대충 챔피언 초상화"
            ></img>
          </div>
          <div className="text-xl text-lol-gold my-auto ml-10">
            "님들 이거 개꿀딱임"
          </div>
          <div className="w-1/6 h-16 absolute right-0 flex flex-row">
            <div className="text-lg text-lol-gold my-auto ml-10">수정</div>
            <div className="text-lg text-red-500 my-auto ml-5">삭제</div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit">
        <div className="w-full h-16 flex flex-row">
          <div className="w-16 h-16 ml-10">
            <img
              src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Garen.png"
              alt="대충 챔피언 초상화"
            ></img>
          </div>
          <div className="text-xl text-lol-gold my-auto ml-10">
            "가붕이쉑 ㄹㅇㅋㅋ"
          </div>
          <div className="w-1/6 h-16 absolute right-0 flex flex-row">
            <div className="text-lg text-lol-gold my-auto ml-10">수정</div>
            <div className="text-lg text-red-500 my-auto ml-5">삭제</div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit">
        <div className="w-full h-16 flex flex-row">
          <div className="w-16 h-16 ml-10">
            <img
              src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Aatrox.png"
              alt="대충 챔피언 초상화"
            ></img>
          </div>
          <div className="text-xl text-lol-gold my-auto ml-10">
            "개씹사기 챔 ㅎㄷㄷ"
          </div>
          <div className="w-1/6 h-16 absolute right-0 flex flex-row">
            <div className="text-lg text-lol-gold my-auto ml-10">수정</div>
            <div className="text-lg text-red-500 my-auto ml-5">삭제</div>
          </div>
        </div>
      </div>
    </div>
  );
}
