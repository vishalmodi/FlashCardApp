import React, { useEffect, useState } from "react";
import { deleteDeck, listDecks } from "../../utils/api";
import { Route, Switch, useHistory } from "react-router-dom";
import AddEditDeck from "./AddEditDeck";
import StudyCard from "../StudyCard/StudyCard";
import DeckView from "./DeckView";
import NotFound from "../../Layout/NotFound";
import { DELETE_DECK_MSG } from "../Constants";

const DeckList = () => {
  const [decks, setDecks] = useState([]);
  // page will refresh whenver value change to either true or false
  const [refreshPage, setRefreshPage] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      const data = await listDecks(abortController.signal);
      setDecks(data);
    }
    loadDecks();
  }, [refreshPage]);

  const openStudyCard = (deckId) => {
    history.push(`/decks/${deckId}/study`);
  };

  const openDeckView = (deckId) => {
    history.push(`/decks/${deckId}`);
  };

  const handleDeleteDeck = (deckId) => {
    let canDelete = window.confirm(DELETE_DECK_MSG);

    if (canDelete) {
      deleteDeck(deckId);
      setRefreshPage(!refreshPage);
    }
  };

  const RenderCard = ({ deck }) => {
    return (
      <div id="{deck.id}" className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h5 className="card-title">{deck.name}</h5>
            </div>
            <div className="col text-right">
              <p>
                {" "}
                {deck.cards && deck.cards.length > 0 ? deck.cards.length : 0}
                {" cards"}
              </p>
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
                onClick={() => openDeckView(deck.id)}
                className="btn btn-secondary mr-2"
              >
                View
              </button>
              <button
                type="button"
                onClick={() => openStudyCard(deck.id)}
                className="btn btn-primary"
              >
                Study
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

  const handleCreateDeck = () => {
    history.push("/decks/new");
  };

  const RenderDeckList = () => {
    return (
      <div className="container mb-2">
        <div>
          <button
            type="button"
            onClick={handleCreateDeck}
            className="btn btn-secondary mb-2"
          >
            Create Deck
          </button>
        </div>
        {decks &&
          decks.length > 0 &&
          decks.map((deck, index) => <RenderCard key={index} deck={deck} />)}
      </div>
    );
  };

  return (
    <div className="container-sm">
      <Switch>
        <Route exact={true} path="/">
          <RenderDeckList />
        </Route>
        <Route exact={true} path={"/decks/new"}>
          <AddEditDeck decks={decks} />
        </Route>
        <Route path={"/decks/:deckId/study"}>
          <StudyCard />
        </Route>
        <Route path={"/decks/:deckId/edit"}>
          <AddEditDeck />
        </Route>
        <Route path={"/decks/:deckId"}>
          <DeckView />
        </Route>
        <Route path={`/decks/:deckId/cards`}>
          <DeckView />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default DeckList;
