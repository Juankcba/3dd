import React, { useEffect } from "react";

const Ad = ({ slotId, width, height }) => {
  return (
    <ins
      className="adsbygoogle"
      style={{
        display: "inline-block",
        width: `${width}px`,
        height: `${height}px`,
      }}
      data-ad-client="ca-pub-4957515253159486"
      data-ad-slot={slotId}
    />
  );
};

export default Ad;
