import React, { useState } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc?: string;
  fallbackSrc?: string;
  wrapperClassName?: string;
}

const DEFAULT_PLACEHOLDER = '/images/img-placeholder.svg';
const DEFAULT_FALLBACK = '/images/fallback.svg';

const ImageWithPlaceholder: React.FC<Props> = ({
  src = '',
  alt = '',
  className = '',
  placeholderSrc = DEFAULT_PLACEHOLDER,
  fallbackSrc = DEFAULT_FALLBACK,
  wrapperClassName = '',
  loading = 'lazy',
  decoding = 'async',
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => setLoaded(true);
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!error) {
      setError(true);
      (e.currentTarget as HTMLImageElement).src = fallbackSrc;
    }
  };

  return (
    <div className={`relative ${wrapperClassName}`}>
      {!loaded && (
        <div className={`absolute inset-0 animate-pulse bg-gradient-to-br from-red-400 to-orange-400 dark:from-zinc-800 dark:to-zinc-700`}>
          <img
            src={placeholderSrc}
            alt="placeholder"
            aria-hidden="true"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        decoding={decoding as any}
        {...rest}
      />
    </div>
  );
};

export default ImageWithPlaceholder;
