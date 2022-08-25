import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AllPostsContext } from '../../context/AllPostsContext';
import { PostItem as PostItemUI } from '@ui/main/posts/PostItem';
import { IPost } from '../../mocks/posts';
import {
  useGetPostsQuery,
  postsSelectors,
  postsAdapter
} from '../../store/slices/postsSlice';

export const PostItem = ({ postId }: { postId: string | number }) => {
  const allPostsContext = useContext(AllPostsContext);
  const navigate = useNavigate();

  const { post } = useGetPostsQuery(
    {
      limit: allPostsContext.limit,
      page: allPostsContext.page
    },
    {
      selectFromResult: (result) => {
        return {
          post: postsSelectors.selectById(
            result.data?.posts ?? postsAdapter.getInitialState(),
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
