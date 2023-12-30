import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { createDeck, updateDeck } from "../../utils/api/index";
import Navigation from "../../Layout/Navigation";
import { useReadDeckEffect } from "../../utils/effects";

const AddEditDeck = ({ decks }) => {
  const CREATE_DECK = "Create Deck";
  const EDIT_DECK = "Edit Deck";
  const initialState = {
    id: "",
    name: "",
    description: "",
  };

  const history = useHistory();
  const {
    path,
    params: { deckId },
  } = useRouteMatch();

  const [formData, setFormData] = useState({ ...initialState });
  const [formType, setFormType] = useState("");

  // Used for edit deck functionality.
  const [deck, setDeck] = useState({});
  const deckViewPath = `/decks/${deckId}`;

  const isFormTypeAdd = formType === "add" ? true : false;
  const isFormTypeEdit = formType === "edit" ? true : false;

  // Determine whether the component call to add or edit deck.
  useEffect(() => {
    if (path.endsWith("/new")) {
      setFormType("add");
    } else {
      setFormType("edit");
    }
  }, [path]);

  // Reterive existing deck information
  useReadDeckEffect(
    deckId,
    (data) => {
      if (isFormTypeEdit) {
        setDeck(data);
        setFormData(data);
      }
    },
    [deckId, formType]
  );

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (isFormTypeAdd) {
      const addDeck = {
        ...formData,
        id: decks.length + 1,
      };

      // create new deck
      createDeck(addDeck);

      // go to deck view
      history.push(`/decks/${addDeck.id}`);
    } else {
      // update deck
      updateDeck(formData);

      // go to deck view
      history.push(deckViewPath);
    }
  };

  const handleCancel = () => {
    if (isFormTypeAdd) {
      history.goBack();
    } else {
      history.push(deckViewPath);
    }
  };

  const getBreadCrumItems = () => {
    if (isFormTypeAdd) {
      return [
        {
          name: CREATE_DECK,
          href: "#",
        },
      ];
    } else {
      return [
        {
          name: `${deck.name}`,
          href: deckViewPath,
        },
        {
          name: EDIT_DECK,
          href: "#",
        },
      ];
    }
  };

  return (
    <div className="container-sm">
      <form onSubmit={handleFormSubmit}>
        <Navigation items={getBreadCrumItems()} />
        <h2>{isFormTypeAdd ? CREATE_DECK : EDIT_DECK}</h2>
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
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditDeck;
