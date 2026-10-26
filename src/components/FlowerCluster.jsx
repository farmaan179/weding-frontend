const PETALS = [0, 45, 90, 135, 180, 225, 270, 315];

function Flower({ cx, cy, scale, color }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      {PETALS.map((angle) => (
        <ellipse
          key={angle}
          cx="0"
          cy="-17"
          rx="8"
          ry="15"
          fill={color}
          stroke="#e3b4b4"
          strokeWidth="0.6"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle r="8" fill="#e8c872" />
      <circle r="3.5" fill="#c9a24b" />
    </g>
  );
}

function FlowerCluster({ className = "" }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      <path
        d="M10 150 C 30 100, 60 70, 110 50 C 90 90, 60 120, 10 150 Z"
        fill="#8aa67a"
      />
      <path
        d="M20 150 C 70 140, 110 110, 140 70 C 100 80, 50 100, 20 150 Z"
        fill="#6f8f63"
      />
      <Flower cx={95} cy={95} scale={1.15} color="#f6d3d3" />
      <Flower cx={48} cy={62} scale={0.8} color="#fbe8e0" />
      <Flower cx={130} cy={45} scale={0.65} color="#f3c4c4" />
    </svg>
  );
}

export default FlowerCluster;