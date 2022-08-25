import React from 'react';
import { format } from 'date-fns';

import { IPost } from '../../mocks/posts';
import {
  PostItem as PostItemUI,
  PostElement,
  PostImage,
  PostImageContent,
  Post as PostUI,
  PostTitle,
  PostContent,
  PostDescription,
  PostUsername
} from './UIPosts';

interface Props {
  post: IPost;
  onShowUserPost: (arg0: string | number, arg1: string) => void;
  onShowPost: (arg0: string | number) => void;
}

export const PostItem = ({ post, onShowUserPost, onShowPost }: Props) => {
  return (
    <PostItemUI>
      <PostElement>
        {!post.image ? null : (
          <PostImage>
            <PostImageContent src={post.image} />
          </PostImage>
        )}
        <PostUI full={!post.image ? true : false}>
          <PostTitle onClick={() => onShowPost(post.id)}>
            {post.title}
          </PostTitle>
          <PostContent>{post.post}</PostContent>
          <PostDescription>
            {format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}
            <PostUsername
              onClick={() =>
                onShowUserPost(post?.user?.id, post?.user?.username)
              }
            >
              {post?.user?.username}
            </PostUsername>
          </PostDescription>
        </PostUI>
      </PostElement>
    </PostItemUI>
  );
};
