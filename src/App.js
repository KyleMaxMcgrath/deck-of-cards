import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import Card from './Card';
import axios from 'axios';
import {v4 as uuid} from 'uuid';

function App() {

  let deckId = useRef('');
  let [cards, setCards] = useState([]);

  const effect = () => {
    async function getDeck() {
      let res = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      deckId.current = res.data.deck_id;
    }
    getDeck();
  }

  useEffect(() => {
    effect();
  }, []);

  const draw = () => {
    if(cards.length==52) {
      setCards([]);
      effect();
    } else {
      setCards((cards) => ([...cards, <Card key={uuid()} deckId={deckId.current}/>]));
    }
  }

  let buttonStyle = cards.length>0 ? 
  {
    margin: "-175px 200px 200px 200px"
  } : 
  {
    margin: "175px 200px 200px 200px"
  };
  
  return (
    <div className="App">
      <button style={buttonStyle} onClick={draw}>{cards.length==52 ? "Reset" : "Draw"}</button>
      {cards}
    </div>
  );
}

export default App;
