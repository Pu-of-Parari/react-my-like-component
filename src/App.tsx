import React, { ReactElement, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const Heart = ({ onRemove }: { onRemove: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 1000); // 1s後に♥を削除

    return () => clearTimeout(timer);
  }, [onRemove]);

  return <div className="heart-animation">♥</div>;
};

function LikeButton() {
  const [count, setCount] = useState(999);
  const [liked, setLiked] = useState(false);
  const [hearts, setHearts] = useState<ReactElement[]>([]);

  const addHeart = () => {
    setCount(count + 1);
    setLiked(true);

    const newHeart = (
      <Heart key={Date.now().toString()} onRemove={() => removeHeart()} />
    );
    setHearts([...hearts, newHeart]);
    setTimeout(() => setLiked(false), 300);
  };

  const removeHeart = () => {
    setHearts((currentHearts) => currentHearts.slice(1));
  };
  return (
    <span className="likeButton" onClick={addHeart}>
      <FontAwesomeIcon icon={faHeart} className={liked ? "liked" : ""} />
      <span className="count"> {count}</span>
      <div className="heats-container">
        {hearts.map((_, index) => (
          <Heart key={index} onRemove={removeHeart} />
        ))}
      </div>
    </span>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LikeButton />
      </header>
    </div>
  );
}

export default App;
