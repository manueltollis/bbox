const Lineloader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-3/4 "
      width="1484"
      height="20"
      viewBox="0 0 1484 20"
    >
      <g transform="translate(-953.5 -1182.5)">
        <line
          id="loading-bar"
          x2="1464"
          transform="translate(963.5 1192.5)"
          fill="none"
          stroke="rgba(22,255,255,0.22)"
          stroke-linecap="round"
          stroke-width="10"
        />
        <line
          id="loading-line-main"
          x2="1464"
          transform="translate(963.5 1192.5)"
          fill="none"
          stroke="#0077FF"
          stroke-linecap="round"
          stroke-width="10"
        >
          <animate
            attributeName="x2"
            begin="0s"
            dur="5s"
            values="0;1464"
            calcMode="linear"
            repeatCount="none"
          />
        </line>
      </g>
    </svg>
  );
};

export default Lineloader;
