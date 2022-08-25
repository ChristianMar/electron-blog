import React, { ReactNode, createContext, useState } from 'react';

export const AllUsersContext = createContext<{
  page: number;
  limit: number;
  loadNextUser: () => void;
  loadPrevUser: () => void;
}>({
  page: 1,
  limit: 50,
  loadNextUser: () => {
    return;
  },
  loadPrevUser: () => {
    return;
  }
});

export const AllUsersContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [page, setPage] = useState(1);

  const limit = 50;

  const loadNextUser = () => {
    setPage(page + 1);
  };

  const loadPrevUser = () => {
    setPage(page - 1);
  };

  return (
    <AllUsersContext.Provider
      value={{
        page: page,
        limit: limit,
        loadNextUser: loadNextUser,
        loadPrevUser: loadPrevUser
      }}
    >
      {children}
    </AllUsersContext.Provider>
  );
};
