import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { updateCard, readCard } from "../../utils/api/index";
import Navigation from "../../Layout/Navigation";
import { useReadDeckEffect } from "../../utils/effects";

const EditCard = () => {
  const history = useHistory();
  const {
    params: { deckId, cardId },
  } = useRouteMatch();

  const initialState = {
    id: 0,
    front: "",
    back: "",
    deckId: "",
  };

  const [formData, setFormData] = useState({ ...initialState });
  const [deck, setDeck] = useState({});

  useReadDeckEffect(
    deckId,
    (data) => {
      setDeck(data);
    },
    [deckId]
  );

  useEffect(() => {
    const abortController = new AbortController();

    async function loadCard() {
      try {
        const data = await readCard(cardId, abortController.signal);
        setFormData(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("readCard error for :", cardId);
        } else {
          throw error;
        }
      }
    }

    loadCard();

    return () => {
      abortController.abort();
    };
  }, [cardId]);

  const breadcrumbItems = [
    {
      name: `${deck.name}`,
      href: `/decks/${deckId}`,
    },
    {
      name: "Edit Card",
      href: "#",
    },
  ];

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const cardData = {
      ...formData,
    };

    updateCard(cardData);

    goGoDeckView();
  };

  const goGoDeckView = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div className="container-sm">
      <form onSubmit={handleFormSubmit}>
        <Navigation items={breadcrumbItems} />
        <h2>{`${deck.name}: Add Card`}</h2>

        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            rows="3"
            placeholder="Front side of the card"
            required={true}
            value={formData.front}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="3"
            placeholder="Back side of the card"
            required={true}
            value={formData.back}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <button
            type="button"
            onClick={() => goGoDeckView()}
            className="btn btn-secondary mr-2"
          >
            Cancle
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCard;
