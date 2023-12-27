import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard } from "../../utils/api/index";
import Navigation from "../../Layout/Navigation";
import { useReadDeckEffect } from "../../utils/effects";

const AddCard = () => {
  const history = useHistory();
  const { deckId } = useParams();

  const initialState = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialState });
  const [deck, setDeck] = useState({});

  console.log("Add Card:", formData);

  useReadDeckEffect(
    deckId,
    (data) => {
      setDeck(data);
    },
    [deckId]
  );

  const breadcrumbItems = [
    {
      name: `${deck.name}`,
      href: `/decks/${deckId}`,
    },
    {
      name: "Add Card",
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

    createCard(deckId, cardData);

    setFormData({ ...initialState });
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
            onClick={() => history.goBack()}
            className="btn btn-secondary mr-2"
          >
            Done
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCard;
