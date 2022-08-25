import React from 'react';

import { IUserItem } from '../../mocks/users';
import {
  UserItem as UserItemUI,
  UserElement,
  UserImage,
  UserImageContent,
  User,
  Username,
  Name
} from './UIUsers';

interface Props {
  user: IUserItem | undefined;
  onShowUserPost?: (
    arg0: string | number | undefined,
    arg1: string | undefined
  ) => void;
}

export const UserItem = ({ user, onShowUserPost }: Props) => {
  return (
    <UserItemUI>
      <UserElement>
        {!user?.avatar ? null : (
          <UserImage>
            <UserImageContent src={user?.avatar} />
          </UserImage>
        )}
        <User full={!user?.avatar ? true : false}>
          <Username
            onClick={
              !onShowUserPost
                ? () => {
                    return;
                  }
                : () => onShowUserPost(user?.id, user?.username)
            }
            clickable={!onShowUserPost ? false : true}
          >
            {user?.username}
          </Username>
          <Name>{`${user?.firstName} ${user?.lastName}`}</Name>
        </User>
      </UserElement>
    </UserItemUI>
  );
};
