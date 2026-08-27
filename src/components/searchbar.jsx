import React from "react";

export default function SearchBar({
  value = "",
  onChange,
  placeholder = "Search...",
}) {
  return (
    <>
      <div className="myduka-searchbar">
        <svg
          className="myduka-searchbar-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="11"
            cy="11"
            r="7"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M20 20L16.65 16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <input
          type="search"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder={placeholder}
          aria-label="Search"
        />

        {value && (
          <button
            type="button"
            className="myduka-searchbar-clear"
            onClick={() => onChange?.("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <style>{`
        .myduka-searchbar {
          width: 100%;
          height: 46px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
          background: #ffffff;
          border: 1px solid #d9e1ec;
          border-radius: 10px;
          box-sizing: border-box;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .myduka-searchbar:focus-within {
          border-color: #0baa78;
          box-shadow: 0 0 0 3px rgba(11, 170, 120, 0.12);
        }

        .myduka-searchbar-icon {
          flex-shrink: 0;
          color: #7b8ca5;
        }

        .myduka-searchbar input {
          width: 100%;
          min-width: 0;
          border: none;
          outline: none;
          background: transparent;
          color: #14213d;
          font-size: 14px;
          font-family: inherit;
        }

        .myduka-searchbar input::placeholder {
          color: #91a0b5;
        }

        .myduka-searchbar input::-webkit-search-cancel-button {
          display: none;
        }

        .myduka-searchbar-clear {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          color: #7b8ca5;
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
          padding: 0;
        }

        .myduka-searchbar-clear:hover {
          color: #14213d;
        }
      `}</style>
    </>
  );
}