import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../../utils/api";
import Navigation from "../../Layout/Navigation";
import AddEditStudyCard from "../StudyCard/AddEditStudyCard";
import { DELETE_DECK_MSG } from "../Constants";

const DeckView = () => {
  const history = useHistory();
  const {
    path,
    url,
    params: { deckId },
  } = useRouteMatch();
  const [deck, setDeck] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const data = await readDeck(deckId, abortController.signal);
        setDeck(data);
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
  }, [deckId, refresh]);

  const refreshHandler = () => {
    setRefresh(!refresh);
  };

  const breadcrumbItems = [
    {
      name: `${deck.name}`,
      href: "#",
    },
  ];

  const openStudyCard = (deck) => {
    history.push(`${url}/study`);
  };

  const openEditDeck = (deck) => {
    history.push(`${url}/edit`);
  };

  const openAddCard = () => {
    history.push(`${url}/cards/new`);
  };

  const openEditCard = (cardId) => {
    history.push(`${url}/cards/${cardId}/edit`);
  };

  const handleDeleteDeck = (deckId) => {
    let canDelete = window.confirm(DELETE_DECK_MSG);

    if (canDelete) {
      deleteDeck(deckId);
      history.push('/')
    }
  };

  const handleDeleteStudyCard = (cardId) => {
    let canDelete = window.confirm(
      "Delete this card? \n\nYou will not be able to recover it."
    );

    if (canDelete) {
      deleteCard(cardId)
      refreshHandler()
    }
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
                className="btn btn-primary  mr-2"
              >
                Study
              </button>
              <button
                type="button"
                onClick={openAddCard}
                className="btn btn-primary"
              >
                Add Cards
              </button>
            </div>
            <div className="col text-right">
              <button
                type="button"
                onClick={() => handleDeleteDeck(deck.id)}
                className="btn btn-danger"
              >
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
                onClick={() => openEditCard(card.id)}
                className="btn btn-secondary mr-2"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDeleteStudyCard(card.id)}
                className="btn btn-danger"
              >
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

  const RenderDeckView = () => {
    return (
      <>
        <Navigation items={breadcrumbItems} />
        <RenderDeckCard />
        <RenderCardList />
      </>
    );
  };

  return (
    <div className="container-sm">
      <Switch>
        <Route exact={true} path={`${path}`}>
          <RenderDeckView />
        </Route>
        <Route exact={true} path={`${path}/cards/new`}>
          <AddEditStudyCard refreshHandler={refreshHandler} />
        </Route>
        <Route path={`${path}/cards/:cardId/edit`}>
          <AddEditStudyCard refreshHandler={refreshHandler} />
        </Route>
      </Switch>
    </div>
  );
};

export default DeckView;
