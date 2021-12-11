import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Card.css';

const Card = ({deckId}) => {

    let [imgUrl, setImgUrl] = useState(null);

    useEffect(() => {
        async function getImage() {
            let res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            setImgUrl((imgUrl) => (res && res.data && res.data.cards && res.data.cards[0] && res.data.cards[0].image));
        }
        getImage();
    }, []);

    const randomAngle = () => {
        return Math.random()*20-10;
    }

    let style = { transform: `rotate(${randomAngle()}deg)`};

    let element = imgUrl ? <img style={style} className='Card' src={imgUrl} width={100}/> : "";

    return element;
};

export default Card;