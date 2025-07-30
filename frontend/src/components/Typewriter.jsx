import React, { useEffect, useState, useRef } from 'react';

const sanitizeText = (input) => {
  if (typeof input !== 'string') return '';
  return input.replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, '');
};

const Typewriter = ({ text, speed = 30 }) => {
  const sanitizedText = sanitizeText(text);
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!sanitizedText) return;

    intervalRef.current = setInterval(() => {
      const i = indexRef.current;
      if (i >= sanitizedText.length) {
        clearInterval(intervalRef.current);
        return;
      }

      const nextChar = sanitizedText.charAt(i);
      setDisplayedText(prev => prev + nextChar);
      indexRef.current += 1;

    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [sanitizedText, speed]);

  return (
    <p className="typewriterText">
      {displayedText}
      <span className="cursor">|</span>
    </p>
  );
};

export default Typewriter;
