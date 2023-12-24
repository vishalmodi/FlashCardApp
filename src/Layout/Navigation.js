import React from "react";

const Navigation = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Home</a>
        </li>
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index === items.length - 1 ? (
              // Active (last) item
              <span className="breadcrumb-item active">{item.name}</span>
            ) : (
              // Link for other items
              <a href={item.href}>{item.name}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Navigation;
