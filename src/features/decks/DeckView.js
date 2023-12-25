import React, { useEffect, useState } from "react";
import Navigation from "../../Layout/Navigation";
import { readDeck } from "../../utils/api";
import { useHistory, useParams } from "react-router-dom";

const DeckView = () => {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const data = await readDeck(deckId, abortController.signal);
        setDeck(data);
        // setActiveCard(data.cards[0]);
        // setCardNo(0);
        // setTotalCard(data.cards.length);
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
  ];

  const openStudyCard = (deck) => {
    history.push(`/decks/${deck.id}/study`);
  };

  const openEditDeck = (deck) => {
    history.push(`/decks/${deck.id}`);
  };

  const RenderDeckCard = () => {
    return (
      <div id="{deck.id}" className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h5 className="card-title">{deck.name}</h5>
            </div>
          </div>
          <div className="card-text">
            <p>{deck.description}</p>
          </div>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col">
              <button
                type="button"
                onClick={() => openEditDeck(deck)}
                className="btn btn-secondary mr-2"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => openStudyCard(deck)}
                className="btn btn-primary"
              >
                Study
              </button>
            </div>
            <div className="col text-right">
              <button type="button" className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RenderCard = ({ card }) => {
    return (
      <div id="{deck.id}" className="card mb-1">
        <div className="card-body">
          <div className="card-text">
            <div className="row">
              <div className="col">
                <p>{card.front}</p>
              </div>
              <div className="col">
                <p>{card.back}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col text-right">
              <button
                type="button"
                onClick={() => openEditDeck(deck)}
                className="btn btn-secondary mr-2"
              >
                Edit
              </button>
              <button type="button" className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RenderCardList = () => {
    return (
      <div className="container mb-2">
        <h5 className="card-title mt-4">Cards</h5>
        {deck &&
          deck.cards &&
          deck.cards.length > 0 &&
          deck.cards.map((card, index) => (
            <RenderCard key={index} card={card} />
          ))}
      </div>
    );
  };

  return (
    <div className="container-sm">
      <Navigation items={breadcrumbItems} />
      <RenderDeckCard />
      <RenderCardList />
    </div>
  );
};

export default DeckView;
