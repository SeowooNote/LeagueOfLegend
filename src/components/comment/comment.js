import React, { useState } from 'react'
import { firebaseAuth, firebaseDataBase } from '../../firebase/firebase'
import { addDoc, collection } from 'firebase/firestore';

export default function Comment() {
    const [comment, setComment] = useState("");

    const onCommentHandler = (e) => {
        setComment(e.target.value);
    }

    const onCommentSubmitHandler = async() => {

    }

    const onKeyDownHandler = () => {
        // if(e.key !== 'Enter') return;
        // onCommentSubmitHandler();
    }

    return (
        <div>
            <div className='flex items-center text-lol-gold p-4 gap-4'>
                <div className='w-14 h-14 rounded-full bg-white'></div>
                <div className=''>
                    <div>{}</div>
                    <div>date</div>
                </div>
                <div className=''>contents</div>
            </div>
            <div>
                <div className='flex justify-between items-center text-lol-text-color1'>
                    <input id='comment' name='comment' value={comment} type='text' autoComplete='comment' required onChange={onCommentHandler} onKeyDown={onKeyDownHandler} className='w-4/5 bg-lol-dark-blue' placeholder='해당 챔피언에 대한 의견을 남겨주세요.'/>
                    <button className='w-1/5 bg-lol-dark-blue text-lol-gold hover:text-lol-gold1 hover:bg-lol-sky-blue-hover'>댓글 작성</button>
                </div>
            </div>
        </div>
    );
}
