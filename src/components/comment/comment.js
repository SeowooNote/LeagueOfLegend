import React, { useEffect, useState } from 'react';
import { firebaseAuth, firebaseDataBase } from '../../firebase/firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, getDoc, doc } from 'firebase/firestore';

export default function Comment({ championId }) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const onCommentHandler = (e) => {
        setComment(e.target.value);
    }

    const onCommentSubmitHandler = async () => {
        if (comment.trim() === '') return;

        const championCommentsCollection = collection(firebaseDataBase, 'comments', championId, 'commentList');

        await addDoc(championCommentsCollection, {
            content: comment,
            userId: firebaseAuth.currentUser.uid,
            createAt: serverTimestamp()
        });

        setComment('');
    }

    const onKeyDownHandler = (e) => {
        // if(e.key !== 'Enter') {
        //     onCommentSubmitHandler();
        // }
    }

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsQuery = query(
                    collection(firebaseDataBase, 'comments', championId, 'commentList'),
                    orderBy('createAt', 'desc')
                );

                const unsubscribe = onSnapshot(commentsQuery, async (snapshot) => {
                    const commentsData = [];
                    for (const commentDoc of snapshot.docs) {
                        const commentData = commentDoc.data();
                        // 사용자 정보 가져오기
                        const userDocRef = doc(firebaseDataBase, 'users', commentData.userId);
                        const userDocSnapshot = await getDoc(userDocRef);

                        if (userDocSnapshot.exists()) {
                            const userData = userDocSnapshot.data();
                            commentsData.push({
                                id: commentDoc.id,
                                ...commentData,
                                userName: userData.displayName, // 사용자 이름 추가
                                nickname: userData.nickname, // 사용자 닉네임 추가
                                profileImage: userData.profileImage, // 사용자 프로필 이미지 추가
                                createAt: commentData.createAt ? commentData.createAt.toDate() : null
                            });
                        }
                    }
                    setComments(commentsData);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }

        fetchComments();
    }, [championId]);

    return (
        <div>
            {comments.length === 0 ? (
                <p>댓글이 없습니다.</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id}>
                        <p className='text-1xl text-lol-gold'>
                            {comment.content}
                            {/* 추가: 작성 시간 및 사용자 정보 표시 */}
                            {comment.createAt && (
                                <span className='text-sm text-lol-silver'>
                                    작성 시간: {comment.createAt.toLocaleString()} | 작성자: {comment.nickname} | 프로필 이미지: {comment.profileImage}
                                </span>
                            )}
                        </p>
                    </div>
                ))
            )}

            <div>
                <div className='flex justify-between items-center text-lol-text-color1'>
                    <input id='comment' name='comment' value={comment} type='text' autoComplete='comment' required onChange={onCommentHandler} onKeyDown={onKeyDownHandler} className='w-4/5 bg-lol-dark-blue h-14 pl-2.5' placeholder='해당 챔피언에 대한 의견을 남겨주세요.'/>
                    <button onClick={onCommentSubmitHandler} className='w-1/5 bg-lol-dark-blue text-lol-gold hover:text-lol-gold1 hover:bg-lol-sky-blue-hover h-14'>댓글 작성</button>
                </div>
            </div>
        </div>
    );
}
