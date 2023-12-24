import React, { useEffect, useState } from "react";
import { listDecks } from "../../utils/api";
import { useHistory } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import CreateDeck from "./CreateDeck";
import StudyCard from "../StudyCard/StudyCard";
// import { BrowserRouter as Router } from "react-router-dom";

const DeckList = () => {
  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState(0)
  const history = useHistory();

  // console.log(decks);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      const data = await listDecks(abortController.signal);
      setDecks(data);
    }
    loadDecks();
  }, []);

  const openStudyCard = (deck) => {
    setSelectedDeckId(deck.id)
    history.push(`/decks/${deck.id}/study`);
  };

  const RenderCard = ({ deck }) => {
    // console.log("deck", deck);
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
              <button type="button" className="btn btn-secondary mr-2">
                View
              </button>
              <button type="button" onClick={() => openStudyCard(deck)} className="btn btn-primary">
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

  const handleCreateDeck = () => {
    history.push("/deck/new");
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
        <Route exact={true} path={"/deck/new"}>
          <CreateDeck />
        </Route>
        <Route path={"/decks/:deckId/study"}>
          <StudyCard />
        </Route>
      </Switch>
    </div>
  );
};

export default DeckList;
