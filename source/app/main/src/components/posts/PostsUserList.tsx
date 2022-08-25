import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserPostsContext } from '../../context/UserPostsContext';
import { PostsList as PostsListUI } from '@ui/main/posts/PostsList';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { IErrorQuery } from '../../mocks/errorQuery';
import { PostUserItem } from './PostUserItem';
import {
  useGetUserPostsQuery,
  userPostsSelectors,
  userPostsAdapter
} from '../../store/slices/postsSlice';
import { IUserItem } from '@main/mocks/users';

export const PostsUserList = () => {
  const location = useLocation() as { state: { id: number; username: string } };
  const navigate = useNavigate();
  const userPostsContext = useContext(UserPostsContext);

  const { isLoading, isFetching, isError, error } = useGetUserPostsQuery({
    limit: userPostsContext.limit,
    page: userPostsContext.page,
    userId: location.state.id
  });

  const { user, cursor, postsIds } = useGetUserPostsQuery(
    {
      limit: userPostsContext.limit,
      page: userPostsContext.page,
      userId: location.state.id
    },
    {
      selectFromResult: (result) => {
        return {
          user: result.data?.user,
          cursor: result.data?.cursor,
          postsIds: userPostsSelectors.selectIds(
            result.data?.posts ?? userPostsAdapter.getInitialState()
          )
        };
      }
    }
  );

  const loadNextPosts = () => {
    userPostsContext.loadNextUserPosts();
  };

  const loadPrevPosts = () => {
    userPostsContext.loadPrevUserPosts();
  };

  const onGoBack = () => {
    navigate(-1);
  };

  console.log(user);

  return (
    <PostsListUI
      loading={isLoading || isFetching}
      error={getErrorMessage(isError, error as IErrorQuery)}
      hasNext={cursor?.next}
      hasPrev={cursor?.prev}
      loadNextPosts={loadNextPosts}
      loadPrevPosts={loadPrevPosts}
      user={user as IUserItem}
      onGoBack={onGoBack}
    >
      {postsIds.map((postId) => (
        <PostUserItem key={postId} postId={postId} />
      ))}
    </PostsListUI>
  );
};
