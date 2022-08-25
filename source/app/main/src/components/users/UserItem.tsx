import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AllUsersContext } from '../../context/AllUsersContext';
import {
  useGetUsersQuery,
  usersSelectors,
  usersAdapter
} from '../../store/slices/usersSlice';
import { UserItem as UserItemUI } from '@ui/main/users/UserItem';

export const UserItem = ({ userId }: { userId: string | number }) => {
  const allUsersContext = useContext(AllUsersContext);
  const navigate = useNavigate();
  const { user } = useGetUsersQuery(
    {
      limit: allUsersContext.limit,
      page: allUsersContext.page
    },
    {
      selectFromResult: (result) => {
        return {
          user: usersSelectors.selectById(
            result.data?.users ?? usersAdapter.getInitialState(),
            userId
          )
        };
      }
    }
  );

  const onShowUserPost = (
    id: string | number | undefined,
    username: string | undefined
  ) => {
    navigate('/app/users_post', { state: { id: id, username: username } });
  };

  return <UserItemUI user={user} onShowUserPost={onShowUserPost} />;
};
