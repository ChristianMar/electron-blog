import React, { ReactNode, createContext, useState } from 'react';

export const AllPostsContext = createContext<{
  page: number;
  limit: number;
  loadingCreate: boolean;
  loadingEdit: boolean;
  loadingDelete: boolean;
  loadNextPosts: () => void;
  loadPrevPosts: () => void;
  loadPagePosts: (arg0: number) => void;
  changeCreate: (arg0: boolean) => void;
  changeDelete: (arg0: boolean) => void;
  changeEdit: (arg0: boolean) => void;
}>({
  page: 1,
  limit: 50,
  loadingCreate: false,
  loadingEdit: false,
  loadingDelete: false,
  loadNextPosts: () => {
    return;
  },
  loadPrevPosts: () => {
    return;
  },
  loadPagePosts: (arg0: number) => {
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

export const AllPostsContextProvider = ({
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

  const loadPagePosts = (pg: number) => {
    setPage(pg);
  };

  const loadNextPosts = () => {
    setPage(page + 1);
  };

  const loadPrevPosts = () => {
    setPage(page - 1);
  };

  return (
    <AllPostsContext.Provider
      value={{
        page: page,
        limit: limit,
        loadingCreate: createPost,
        loadingEdit: editPost,
        loadingDelete: deletePost,
        loadNextPosts: loadNextPosts,
        loadPrevPosts: loadPrevPosts,
        loadPagePosts: loadPagePosts,
        changeCreate: changeCreate,
        changeDelete: changeDelete,
        changeEdit: changeEdit
      }}
    >
      {children}
    </AllPostsContext.Provider>
  );
};
