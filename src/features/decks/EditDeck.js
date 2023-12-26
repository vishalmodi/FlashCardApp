import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Navigation from "../../Layout/Navigation";
import { useReadDeckEffect } from "../../utils/effects";
import { updateDeck } from "../../utils/api";

const EditDeck = () => {
  const initialState = {
    id: "",
    name: "",
    description: "",
  };
  const history = useHistory();
  const { deckId } = useParams();
  const deckViewPath = `/decks/${deckId}`
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({ ...initialState });

  useReadDeckEffect(
    deckId,
    (data) => {
      setDeck(data);
      setFormData(data);
    },
    [deckId]
  );

  const handleFormSubmit = (event) => {
    event.preventDefault();

    updateDeck(formData);

    history.push(deckViewPath);
  };

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleCancel = () => {
    history.push(deckViewPath)
  }
  
  const breadcrumbItems = [
    {
      name: `${deck.name}`,
      href: deckViewPath,
    },
    {
      name: "Edit Deck",
      href: "#",
    },
  ];

  return (
    <div className="container-sm">
      <form onSubmit={handleFormSubmit}>
        <Navigation items={breadcrumbItems} />
        <h2>Edit Deck</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
            required={true}
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            placeholder="Brief description of the deck"
            required={true}
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary mr-2"
          >
            Cancle
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDeck;
