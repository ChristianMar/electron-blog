import React, { useContext } from 'react';

import { AllPostsContext } from '../../context/AllPostsContext';
import { PostsList as PostsListUI } from '@ui/main/posts/PostsList';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { IErrorQuery } from '../../mocks/errorQuery';
import { PostItem } from './PostItem';
import {
  useGetPostsQuery,
  postsSelectors,
  postsAdapter
} from '../../store/slices/postsSlice';

export const PostsList = () => {
  const allPostsContext = useContext(AllPostsContext);

  const { isLoading, isFetching, isError, error } = useGetPostsQuery({
    limit: allPostsContext.limit,
    page: allPostsContext.page
  });

  const { cursor, postsIds } = useGetPostsQuery(
    {
      limit: allPostsContext.limit,
      page: allPostsContext.page
    },
    {
      selectFromResult: (result) => {
        return {
          cursor: result.data?.cursor,
          postsIds: postsSelectors.selectIds(
            result.data?.posts ?? postsAdapter.getInitialState()
          )
        };
      }
    }
  );

  const loadNextPosts = () => {
    allPostsContext.loadNextPosts();
  };

  const loadPrevPosts = () => {
    allPostsContext.loadPrevPosts();
  };

  return (
    <PostsListUI
      loading={isLoading || isFetching}
      error={getErrorMessage(isError, error as IErrorQuery)}
      hasNext={cursor?.next}
      hasPrev={cursor?.prev}
      loadNextPosts={loadNextPosts}
      loadPrevPosts={loadPrevPosts}
    >
      {postsIds.map((postId) => (
        <PostItem key={postId} postId={postId} />
      ))}
    </PostsListUI>
  );
};
