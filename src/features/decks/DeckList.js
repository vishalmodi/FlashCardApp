import React, { useEffect, useState } from "react";
import { listDecks } from "../../utils/api/index";
import { useHistory } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";

const DeckList = () => {
  
  const [decks, setDecks] = useState([]);
  const history = useHistory()

  // console.log(decks);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      const data = await listDecks(abortController.signal);
      setDecks(data);
    }
    loadDecks();
  }, []);

  const RenderCard = ({ deck }) => {
    // console.log("deck", deck);
    return (
      <div className="card mb-3">
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
              <button type="button" class="btn btn-secondary mr-2">
                View
              </button>
              <button type="button" class="btn btn-primary">
                Study
              </button>
            </div>
            <div className="col text-right">
              <button type="button" class="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleCreateDeck = () => {
    history.push('/deck/new')
  }

  return (
    <div className="container-sm">
      <div className="container mb-2">
      <div>
        <button type="button" onClick={handleCreateDeck} class="btn btn-secondary mb-2">
          Create Deck
        </button>
      </div>
        { decks && decks.length > 0 &&
          decks.map((deck) => (<RenderCard deck={deck} />))
        }
      </div>
    </div>
  );
};

export default DeckList;
