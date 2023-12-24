import React, { useEffect, useState } from "react";
import Navigation from "../../Layout/Navigation";
import { readDeck } from "../../utils/api";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const StudyCard = () => {
  const { deckId } = useParams();
  const history = useHistory();
  // console.log(deckId)
  const [deck, setDeck] = useState({});
  const [activeCard, setActiveCard] = useState({});
  const [cardNo, setCardNo] = useState(0);
  const [totalCard, setTotalCard] = useState(0);
  const [isCardFlip, setIsCardFlip] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const data = await readDeck(deckId, abortController.signal);
        setDeck(data);
        setActiveCard(data.cards[0]);
        setCardNo(0);
        setTotalCard(data.cards.length);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("readDeck error for :", deckId);
        } else {
          throw error;
        }
      }
    }

    loadDeck();

    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const breadcrumbItems = [
    {
      name: `${deck.name}`,
      href: "#",
    },
    {
      name: "Study",
      href: "#",
    },
  ];

  const loadNextCard = () => {
    if (cardNo < totalCard - 1) {
      let nextCardNo = cardNo + 1;
      displayCard(nextCardNo);
    } else {
      let restart = window.confirm("Restart Card?");
      if (restart) {
        displayCard(0);
      } else {
        history.push("/");
      }
    }
  };

  const displayCard = (nextCardNo) => {
    setActiveCard(deck.cards[nextCardNo]);
    setCardNo(nextCardNo);
    setIsCardFlip(false);
  };

  const goToAddCards = () => {
    // TODO - add missing functionality
  };

  const DisplayCard = () => {
    return (
      <div id="{deck.id}" className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h5 className="card-title">
                Card {cardNo + 1} of {totalCard}
              </h5>
            </div>
          </div>
          <div className="card-text">
            <p>{isCardFlip ? activeCard.back : activeCard.front}</p>
          </div>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col">
              <button
                type="button"
                onClick={() => setIsCardFlip(!isCardFlip)}
                className="btn btn-secondary mr-2"
              >
                Flip
              </button>
              {isCardFlip && (
                <button
                  type="button"
                  onClick={() => loadNextCard()}
                  className="btn btn-primary"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NotEnoughCard = () => {
    return (
      <div id="{deck.id}" className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h5 className="card-title">Not enough cards</h5>
            </div>
          </div>
          <div className="card-text">
            <p>
              You need at least 3 cards to study. There are {totalCard} cards in
              this deck.
            </p>
          </div>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col">
              <button
                type="button"
                onClick={() => goToAddCards()}
                className="btn btn-secondary mr-2"
              >
                Add Cards
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-sm">
      <Navigation items={breadcrumbItems} />
      <h1>{`Study: ${deck.name}`}</h1>
      {totalCard >= 3 ? <DisplayCard /> : <NotEnoughCard />}
    </div>
  );
};

export default StudyCard;
