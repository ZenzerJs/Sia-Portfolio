export function CursorDot() {
  return (
    <div id="cursor-dot" className="cursor-dot" aria-hidden="true">
      <div className="cursor-dot__inner" aria-hidden="true">
        <svg
          className="cursor-dot__arrow"
          viewBox="0 0 45 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M43.6466 13.3979C32.8541 13.3979 25.712 9.10371 22.228 1.00019"
            stroke="#F0EFE9"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M43.6466 13.398C32.8541 13.3979 25.712 17.6922 22.228 25.7957"
            stroke="#F0EFE9"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M42.8208 13.398L1 13.3979"
            stroke="#F0EFE9"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <div className="cursor-dot__label">View work</div>
      </div>
    </div>
  );
}
