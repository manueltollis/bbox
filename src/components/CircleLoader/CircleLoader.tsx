import "./CircleLoader.css";

const CircleLoader = () => {
  return (
    <svg height="200" width="200">
      <circle
        className="circle"
        cx="100"
        cy="100"
        r="95"
        stroke="#0077FF"
        strokeLinecap="round"
        strokeWidth="10"
        fillOpacity="0"
      />
    </svg>
  );
};

export default CircleLoader;
