import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";
import Navigation from "../../Layout/Navigation";

const CreateDeck = (decks) => {
  const initialState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialState });
  const history = useHistory();

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
      id: decks.length + 1,
    };

    createDeck(deck);

    // TODO got to deck view
    history.push("/");
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const breadcrumbItems = [
    {
      name: "Create Deck",
      href: "#",
    },
  ];

  return (
    <div className="container-sm">
      <form onSubmit={handleFormSubmit}>
        <Navigation items={breadcrumbItems} />
        {/* <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav> */}
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
          <button
            type="button"
            onClick={() => history.goBack()}
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

export default CreateDeck;
