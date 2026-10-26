function Divider() {
  return (
    <svg width="160" height="20" viewBox="0 0 160 20" className="my-3">
      <line x1="0" y1="10" x2="60" y2="10" stroke="#c9a24b" strokeWidth="1.5" />
      <path
        d="M80 2 L88 10 L80 18 L72 10 Z"
        fill="#c9a24b"
      />
      <line x1="100" y1="10" x2="160" y2="10" stroke="#c9a24b" strokeWidth="1.5" />
    </svg>
  );
}

export default Divider;