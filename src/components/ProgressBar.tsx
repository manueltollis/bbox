import React from "react";

const ProgressBar = ({ fill }: { fill: number }) => {
  const amount = Math.min(100, Math.max(0, fill));

  return (
    <div className="bg-primary/50 relative h-1 w-full rounded-full">
      <div
        style={{
          width: `${amount}%`,
          transition: "width .3s linear",
          height: "100%",
        }}
        className="bg-primary absolute left-0 top-0 h-2 rounded-full"
      />
    </div>
  );
};

export default ProgressBar;
