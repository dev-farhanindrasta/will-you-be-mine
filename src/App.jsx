import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import "./App.css";

function App() {
  const [gif, setGif] = useState(
    "https://media.giphy.com/media/TjSPQgowhhJdHgvnwA/giphy.gif"
  );
  const [yesSize, setYesSize] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [yesClick, setYesClick] = useState(false);

  const boxRef = useRef(null);

  const MAX_SCALE = 2;

  const yesSoundRef = useRef(new Audio("/src/audio/wow-meme.m4a"));
  const noSoundRef = useRef(new Audio("/src/audio/sad-violin.m4a"));

  const handleNoHover = () => {
    const box = boxRef.current;
    const boxRect = box.getBoundingClientRect();

    const buttonWidth = 100;
    const buttonHeight = 50;

    const maxX = boxRect.width - buttonWidth;
    const maxY = boxRect.height - buttonHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    setNoPosition({ x: randomX, y: randomY });

    setYesSize((prev) => (prev < MAX_SCALE ? prev + 0.3 : MAX_SCALE));

    setGif("https://media.giphy.com/media/nR4L10XlJcSeQ/giphy.gif");
  };

  const handleNoClick = () => {
    setAccepted(true);
    setYesClick(false);
    noSoundRef.current.currentTime = 0;
    noSoundRef.current.play();
    setGif("https://media.giphy.com/media/7AzEXdIb1wyCTWJntb/giphy.gif");
  };

  const handleYesClick = () => {
    yesSoundRef.current.currentTime = 0;
    yesSoundRef.current.play();

    setAccepted(true);
    setYesClick(true);

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0 },
    });

    // Extra burst for drama
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.2 },
      });
    }, 300);

    setGif("https://media.giphy.com/media/PUBxelwT57jsQ/giphy.gif");
  };

  const handleYesHover = () => {
    setGif("https://media.giphy.com/media/yBv1LrKkWDmU08iOJ8/giphy.gif");
  };

  return (
    <div className="container">
      <div className="box" ref={boxRef}>
        <img src={gif} alt="reaction" className="image" />

        {!accepted ? (
          <>
            <p className="title">
              Yasmin Bby, Will You Be Mine?
            </p>
            <div className="button-group" >
              <button
                className="yes-btn"
                style={{ transform: `scale(${yesSize})` }}
                onMouseEnter={handleYesHover}
                onClick={handleYesClick}
              >
                Yes 💖
              </button>

              <button
                className="no-btn"
                style={{
                  left: noPosition.x,
                  top: noPosition.y
                }}
                onMouseEnter={handleNoHover}
                onClick={handleNoClick}
              >
                No 😏
              </button>
            </div>
          </>
        ) : (!yesClick ? (
          <div className="yay-container">
            <p className="title">NOOOOOO</p>
            <img
              src="https://media.giphy.com/media/13A7YlLvYVDnmU/giphy.gif"
              alt="mind blown"
              className="image-larger"
            />
          </div>
        ) : (
          <div className="yay-container">
            <p className="title">YAYYY 🎉, I LOVE YOU BBY💖</p>
            <img
              src="https://media.giphy.com/media/75ZaxapnyMp2w/giphy.gif"
              alt="mind blown"
              className="image-larger"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
