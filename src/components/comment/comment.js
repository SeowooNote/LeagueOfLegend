import React, { useEffect, useState } from 'react'
import { firebaseAuth, firebaseDataBase } from '../../firebase/firebase'
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';

export default function Comment({ championId }) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const onCommentHandler = (e) => {
        setComment(e.target.value);
    }

    const onCommentSubmitHandler = async() => {
        if(comment.trim() === '') return;

        const championCommentsCollection = collection(firebaseDataBase, 'comments', championId, 'commentList');

        await addDoc(championCommentsCollection, {
            content: comment,
            userId: firebaseAuth.currentUser.uid,
            createAt: new Date()
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
                    orderBy('createAt', 'desc') // 수정: 'createAt'으로 변경
                );

                const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
                    const commentsData = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
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
            {/* <div className='flex items-center text-lol-gold p-4 gap-4'>
                <div className='w-14 h-14 rounded-full bg-white'></div>
                <div className=''>
                    <div>{}</div>
                    <div>date</div>
                </div>
                <div className=''>contents</div>
            </div> */}

            {comments.length === 0 ? (
                <p>댓글이 없습니다.</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.content}</p>
                    </div>
                ))
            )}

            <div>
                <div className='flex justify-between items-center text-lol-text-color1'>
                    <input id='comment' name='comment' value={comment} type='text' autoComplete='comment' required onChange={onCommentHandler} onKeyDown={onKeyDownHandler} className='w-4/5 bg-lol-dark-blue' placeholder='해당 챔피언에 대한 의견을 남겨주세요.'/>
                    <button onClick={onCommentSubmitHandler} className='w-1/5 bg-lol-dark-blue text-lol-gold hover:text-lol-gold1 hover:bg-lol-sky-blue-hover'>댓글 작성</button>
                </div>
            </div>
        </div>
    );
}
