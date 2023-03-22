import { Link, navigate } from 'gatsby';
import React, { useCallback, useEffect, useRef, useState } from 'react';

type IndexedPost = {
  title: string;
  description: string;
  path: string;
};

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const searchIndex = useRef<IndexedPost[]>([]);
  const searchInput = useRef<HTMLInputElement>(null);
  const searchResults = useCallback(() => {
    const regex = new RegExp(`${searchValue}`, 'i');

    return searchIndex.current.filter(post => regex.test(post.title));
  }, [searchValue]);

  const searchFocusListener = () => {
    searchInput.current?.focus();
  };

  useEffect(() => {
    window.addEventListener('keyup', searchFocusListener);

    return () => window.removeEventListener('keyup', searchFocusListener);
  }, []);

  const reset = () => {
    setSearchValue('');
  };

  const onSearchFocus = () => {
    setSearchVisible(true);
    fetch('/search/posts.json')
      .then(data => data.json())
      .then(res => {
        searchIndex.current = res;
      });
  };

  const onKeyUp: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'ArrowUp') {
      if (highlightedIndex > 0) {
        setHighlightedIndex(highlightedIndex - 1);
      }
    } else if (e.key === 'ArrowDown') {
      if (highlightedIndex + 1 !== searchResults().length) {
        setHighlightedIndex(highlightedIndex + 1);
      }
    } else if (e.key === 'Enter') {
      navigate(searchResults()[highlightedIndex].path);
    }

    setTimeout(() => document.querySelector('.search-highlighted')?.scrollIntoView({ block: 'nearest' }), 1);
  };

  return (
    <div className="relative">
      <div className="relative w-80">
        <input
          ref={searchInput}
          type="text"
          placeholder='Search (Press  "/" to focus)'
          className="bg-background-form border border-gray-500 rounded-full px-4 pl-10 py-2 outline-none focus:border-brand-500 w-80"
          value={searchValue}
          autoComplete="off"
          onChange={e => setSearchValue(e.target.value)}
          onFocus={onSearchFocus}
          onKeyUp={onKeyUp}
        />
        <div className="absolute top-0 ml-3" style={{ top: '10px' }}>
          <svg fill="currentColor" className="text-gray-500 h-5 w-5" viewBox="0 0 24 24" width="24" height="24">
            <path
              className="heroicon-ui"
              d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
            ></path>
          </svg>
        </div>
        {searchValue.length > 0 && (
          <button className="absolute top-0 right-0 text-2xl mr-3 cursor-pointer text-gray-600 hover:text-gray-800 h-fit" onClick={reset}>
            &times;
          </button>
        )}
      </div>
      {searchValue.length > 0 && searchVisible && (
        <div
          className="normal-case absolute border left-0 right-0 w-108 max-w-full text-left mb-4 mt-2 rounded-lg shadow overflow-hidden z-10 overflow-y-auto"
          style={{ maxHeight: '32rem' }}
        >
          {searchResults().length > 0 ? (
            <div className="flex flex-col">
              {searchResults().map((a: IndexedPost, idx: number) => (
                <Link
                  to={a.path ?? '#'}
                  className={`bg-background-form border-b border-gray-400 text-xl cursor-pointer p-4 search-hover ${
                    highlightedIndex === idx && 'underline search-highlighted'
                  }`}
                  key={a.title ?? idx}
                >
                  {a.title}
                  <span className="block font-normal text-copy-primary text-sm my-1">{a.description}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-background-form font-normal w-full border-b cursor-pointer p-4">
              <p className="my-0">
                No results for '<strong>{searchValue}</strong>'
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
