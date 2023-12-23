import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

const CreateDeck = (decks) => {
  const initialState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialState });
  const history = useHistory()

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const deck = {
        ...formData,
        id: decks.length + 1
    }

    createDeck(deck)

    // TODO got to deck view
    history.push("/")    

  }
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
        <h2>Create Deck</h2>
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
          <button type="button" onClick={() => history.goBack()} class="btn btn-secondary mr-2">
            Cancle
          </button>
          <button type="submit" class="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateDeck;
