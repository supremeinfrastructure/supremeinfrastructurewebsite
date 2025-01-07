 "use client";

import { useEffect, useState } from "react";

const IFrameComponent = ({ iframeSrc }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <iframe
      src={iframeSrc}
      className='w-full h-full border-0'
      allowFullScreen
    />
  );
};

export default IFrameComponent;
