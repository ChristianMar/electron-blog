import React, { ReactNode, createContext, useState } from 'react';

export const UserPostsContext = createContext<{
  page: number;
  limit: number;
  loadingCreate: boolean;
  loadingEdit: boolean;
  loadingDelete: boolean;
  loadNextUserPosts: () => void;
  loadPrevUserPosts: () => void;
  loadPageUserPosts: (arg0: number) => void;
  changeCreate: (arg0: boolean) => void;
  changeDelete: (arg0: boolean) => void;
  changeEdit: (arg0: boolean) => void;
}>({
  page: 1,
  limit: 50,
  loadingCreate: false,
  loadingEdit: false,
  loadingDelete: false,
  loadNextUserPosts: () => {
    return;
  },
  loadPrevUserPosts: () => {
    return;
  },
  loadPageUserPosts: (arg0: number) => {
    return;
  },
  changeCreate: (arg0: boolean) => {
    return;
  },
  changeDelete: (arg0: boolean) => {
    return;
  },
  changeEdit: (arg0: boolean) => {
    return;
  }
});

export const UserPostsContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [page, setPage] = useState(1);
  const [createPost, setCreatePost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const [editPost, setEditPost] = useState(false);

  const limit = 50;

  const changeCreate = (loading: boolean) => {
    setCreatePost(loading);
  };

  const changeDelete = (loading: boolean) => {
    setDeletePost(loading);
  };

  const changeEdit = (loading: boolean) => {
    setEditPost(loading);
  };

  const loadPageUserPosts = (pg: number) => {
    setPage(pg);
  };

  const loadNextUserPosts = () => {
    setPage(page + 1);
  };

  const loadPrevUserPosts = () => {
    setPage(page - 1);
  };

  return (
    <UserPostsContext.Provider
      value={{
        page: page,
        limit: limit,
        loadingCreate: createPost,
        loadingEdit: editPost,
        loadingDelete: deletePost,
        loadNextUserPosts: loadNextUserPosts,
        loadPrevUserPosts: loadPrevUserPosts,
        loadPageUserPosts: loadPageUserPosts,
        changeCreate: changeCreate,
        changeDelete: changeDelete,
        changeEdit: changeEdit
      }}
    >
      {children}
    </UserPostsContext.Provider>
  );
};
