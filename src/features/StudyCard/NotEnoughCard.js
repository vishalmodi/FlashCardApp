import React from "react";

const NotEnoughCard = ({goToAddCards, totalCard}) => {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h5 className="card-title">Not enough cards</h5>
            </div>
          </div>
          <div className="card-text">
            <p>
              You need at least 3 cards to study. There are {totalCard} cards in
              this deck.
            </p>
          </div>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col">
              <button
                type="button"
                onClick={() => goToAddCards()}
                className="btn btn-primary mr-2"
              >
                Add Cards
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default NotEnoughCard