import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { UserPostsContext } from '../../context/UserPostsContext';
import { PostItem as PostItemUI } from '@ui/main/posts/PostItem';
import { IPost } from '../../mocks/posts';
import {
  useGetUserPostsQuery,
  userPostsSelectors,
  userPostsAdapter
} from '../../store/slices/postsSlice';

export const PostUserItem = ({ postId }: { postId: string | number }) => {
  const location = useLocation() as { state: { id: number; username: string } };
  const userPostsContext = useContext(UserPostsContext);
  const navigate = useNavigate();

  const { post } = useGetUserPostsQuery(
    {
      limit: userPostsContext.limit,
      page: userPostsContext.page,
      userId: location.state.id
    },
    {
      selectFromResult: (result) => {
        return {
          post: userPostsSelectors.selectById(
            result.data?.posts ?? userPostsAdapter.getInitialState(),
            postId
          )
        };
      }
    }
  );

  const onShowUserPost = (id: string | number, username: string) => {
    navigate('/app/users_post', { state: { id: id, username: username } });
  };

  const onShowPost = (id: string | number) => {
    navigate('/app/post', { state: { id: id } });
  };

  return (
    <PostItemUI
      post={post as IPost}
      onShowUserPost={onShowUserPost}
      onShowPost={onShowPost}
    />
  );
};
