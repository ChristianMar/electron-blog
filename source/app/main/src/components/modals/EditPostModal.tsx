import React, { useContext, useEffect } from 'react';
import { Form } from 'react-final-form';
import { useTranslate } from 'react-polyglot';
import { useSelector } from 'react-redux';

import { IPost, IPostEdit } from '@main/mocks/posts';
import { useEditPostMutation } from '@main/store/slices/postsSlice';
import { isRequired } from '@main/utils/validationRules';
import { ILogged } from '@main/mocks/auth';
import { selectCurrentUser } from '@main/store/slices/userSlice';
import { getErrorMessage } from '@main/utils/getErrorMessage';
import { IErrorQuery } from '@main/mocks/errorQuery';
import { CreateEditPostModalWidget } from '@ui/main/modals/CreateEditPostModalWidget';

export const EditPostModal = ({
  handleClose,
  options
}: {
  handleClose: () => void;
  options: { post: IPost };
}) => {
  const user: ILogged = useSelector(selectCurrentUser);
  const t = useTranslate();
  const [editPost, { isLoading, isSuccess, isError, error }] =
    useEditPostMutation();

  useEffect(() => {
    if (isLoading === false && isSuccess === true) {
      handleClose();
    }
  }, [isLoading]);

  const onSubmit = (data: IPostEdit) => {
    editPost({ ...data, image: data.image === '' ? null : data.image });
  };

  return (
    <Form
      keepDirtyOnReinitialize
      onSubmit={onSubmit}
      validate={(values) => {
        const errors: {
          title?: string;
          post?: string;
        } = {};
        errors['title'] = isRequired(
          t('validation.errors.required', { field: t('postModal.title') }),
          values['title']
        );
        errors['post'] = isRequired(
          t('validation.errors.required', { field: t('postModal.post') }),
          values['post']
        );
        return errors;
      }}
      initialValues={{
        title: options.post.title,
        post: options.post.post,
        image: options.post.image,
        createdAt: options.post.createdAt,
        userId: user.id,
        postId: options.post.id
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <CreateEditPostModalWidget
            labels={{
              modalTile: t('postModal.modalEditTile'),
              title: t('postModal.title'),
              post: t('postModal.post'),
              image: t('postModal.image'),
              close: t('common.close'),
              save: t('common.save')
            }}
            onSubmit={handleSubmit}
            onClose={handleClose}
            loading={isLoading}
            error={getErrorMessage(isError, error as IErrorQuery)}
          />
        </form>
      )}
    />
  );
};
