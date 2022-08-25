import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Post as PostUI } from '@ui/main/posts/Post';
import { IPost } from '../../mocks/posts';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { IErrorQuery } from '../../mocks/errorQuery';
import {
  useDeletePostMutation,
  useGetPostQuery
} from '../../store/slices/postsSlice';
import { ILogged } from '@main/mocks/auth';
import { selectCurrentUser } from '@main/store/slices/userSlice';
import { ModalContext } from '@main/context/ModalContext';

export const Post = () => {
  const modalContext = useContext(ModalContext);
  const user: ILogged = useSelector(selectCurrentUser);
  const location = useLocation() as { state: { id: number } };
  const navigate = useNavigate();

  const { isLoading, isFetching, isError, error, data } = useGetPostQuery({
    postId: location.state.id
  });
  const [
    deletePost,
    {
      isLoading: isLoadingDelete,
      isSuccess,
      isError: isErrorDelete,
      error: errorDelete
    }
  ] = useDeletePostMutation();

  useEffect(() => {
    if (isLoadingDelete === false && isSuccess === true) navigate(-1);
  }, [isLoadingDelete]);

  const onShowUserPost = (id: string | number, username: string) => {
    navigate('/app/users_post', { state: { id: id, username: username } });
  };

  const onGoBack = () => {
    navigate(-1);
  };
  const onEditPost = () => {
    modalContext.handleOpen('EDIT_POST', { post: data?.post });
  };

  const onDeletePost = () => {
    deletePost({ postId: location.state.id });
  };

  return (
    <PostUI
      post={data as unknown as { post: IPost | undefined }}
      onShowUserPost={onShowUserPost}
      loading={isLoading || isFetching}
      error={getErrorMessage(isError, error as IErrorQuery)}
      loadingDelete={isLoadingDelete}
      errorDelete={getErrorMessage(isErrorDelete, errorDelete as IErrorQuery)}
      onGoBack={onGoBack}
      userId={user.id}
      onEditPost={onEditPost}
      onDeletePost={onDeletePost}
    />
  );
};
