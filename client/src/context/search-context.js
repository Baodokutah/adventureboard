import React from 'react';

export const SearchContext = React.createContext();
export const PostTitleContext = React.createContext();
export const StudyPostTitleContext = React.createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};