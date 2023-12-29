import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { createCard, readCard, updateCard } from "../../utils/api/index";
import Navigation from "../../Layout/Navigation";
import { useReadDeckEffect } from "../../utils/effects";

const AddEditStudyCard = ({ refreshHandler }) => {
  const ADD_CARD = "Add Card";
  const EDIT_CARD = "Edit Card";
  const initialState = {
    id: 0,
    front: "",
    back: "",
    deckId: "",
  };
  const history = useHistory();
  const {
    path,
    params: { deckId, cardId },
  } = useRouteMatch();

  const [formData, setFormData] = useState({ ...initialState });
  const [formType, setFormType] = useState("");
  const [deck, setDeck] = useState({});

  // these variables helps to avoid duplicate code
  const isFormTypeAdd = formType === "add" ? true : false;
  const isFormTypeEdit = formType === "edit" ? true : false;

  // Determine whether the component call to add or edit card.
  useEffect(() => {
    if (path.endsWith("/new")) {
      setFormType("add");
    } else {
      setFormType("edit");
    }
  }, [path]);

  // Retrieve existing deck info
  useReadDeckEffect(
    deckId,
    (data) => {
      setDeck(data);
    },
    [deckId]
  );

  // Retrieve card info for edit flow,
  useEffect(() => {
    if (isFormTypeEdit) {
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
    }
  }, [cardId, formType, isFormTypeEdit]);

  const breadcrumbItems = [
    {
      name: `${deck.name}`,
      href: `/decks/${deckId}`,
    },
    {
      name: isFormTypeAdd ? ADD_CARD : EDIT_CARD,
      href: "#",
    },
  ];

  const goGoDeckView = () => {
    history.push(`/decks/${deckId}`);
  };

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // create new card
    if (isFormTypeAdd) {
      const cardData = {
        front: formData.front,
        back: formData.back,
      };

      createCard(deckId, cardData);

      // display blank inputs to add new card
      setFormData({ ...initialState });

      refreshHandler();
    } else {
      // update existing card
      const cardData = {
        ...formData,
      };

      updateCard(cardData);

      refreshHandler();

      goGoDeckView();
    }
  };

  return (
    <div className="container-sm">
      <form onSubmit={handleFormSubmit}>
        <Navigation items={breadcrumbItems} />
        <h2>{isFormTypeAdd ? `${deck.name}: ${ADD_CARD}` : EDIT_CARD}</h2>

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

export default AddEditStudyCard;
