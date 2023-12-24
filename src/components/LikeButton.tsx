import React, { ReactElement, useEffect, useState, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

interface HeartProps {
  onRemove: () => void;
}

const Heart: FC<HeartProps> = ({ onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 1000); // 1s後に♥を削除

    return () => clearTimeout(timer);
  }, [onRemove]);

  return <div className="heart-animation">♥</div>;
};

const LikeButton: FC = () => {
  const [count, setCount] = useState<number>(999);
  const [liked, setLiked] = useState<boolean>(false);
  const [hearts, setHearts] = useState<ReactElement[]>([]);

  const addHeart = () => {
    setCount((prevCount) => prevCount + 1);
    setLiked(true);

    const newHeart = (
      <Heart key={Date.now().toString()} onRemove={() => removeHeart()} />
    );
    setHearts((prevHearts) => [...prevHearts, newHeart]);
    setTimeout(() => setLiked(false), 300);
  };

  const removeHeart = () => {
    setHearts((currentHearts) => currentHearts.slice(1));
  };
  return (
    <span className="likeButton" onClick={addHeart}>
      <FontAwesomeIcon icon={faHeart} className={liked ? "liked" : ""} />
      <span className="count"> {count}</span>
      <div className="heats-container">{hearts}</div>
    </span>
  );
};

export default LikeButton;
