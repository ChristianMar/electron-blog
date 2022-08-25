import {
  createEntityAdapter,
  EntityAdapter,
  EntityState
} from '@reduxjs/toolkit';

import {
  IPost,
  IPosts,
  IPostsGet,
  IPostUserGet,
  IPostGet,
  IPostCreate,
  IPostEdit
} from '../../mocks/posts';
import { postsApi } from '../api/postsApi';

export const postsAdapter: EntityAdapter<IPost> = createEntityAdapter<IPost>({
  selectId: (post) => post.id,
  sortComparer: (a, b) =>
    a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
});

export const userPostsAdapter: EntityAdapter<IPost> =
  createEntityAdapter<IPost>({
    selectId: (post) => post.id,
    sortComparer: (a, b) =>
      a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
  });

const postsInitialState = {
  cursor: {},
  posts: postsAdapter.getInitialState({})
};

const userPostsInitialState = {
  user: {},
  cursor: {},
  posts: userPostsAdapter.getInitialState({})
};

export const extendedPostsSlice = postsApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (data: IPostsGet) => ({
        url: '/posts/all_posts',
        method: 'POST',
        body: data,
        tagTypes: ['Posts']
      }),
      transformResponse: (responseData: IPosts<IPost>) => {
        return {
          cursor: responseData.cursor,
          posts: postsAdapter.addMany(
            postsInitialState.posts,
            responseData.posts
          )
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.posts.ids.map((id) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'LIST' }
            ]
          : [{ type: 'Posts', id: 'LIST' }]
    }),
    getUserPosts: builder.query({
      query: (data: IPostUserGet) => ({
        url: '/posts/user_posts',
        method: 'POST',
        body: data,
        tagTypes: ['UserPost']
      }),
      transformResponse: (responseData: IPosts<IPost>) => {
        return {
          user: responseData.user,
          cursor: responseData.cursor,
          posts: userPostsAdapter.addMany(
            userPostsInitialState.posts,
            responseData.posts
          )
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.posts.ids.map((id) => ({
                type: 'UserPost' as const,
                id
              })),
              { type: 'UserPost', id: 'LIST' }
            ]
          : [{ type: 'UserPost', id: 'LIST' }]
    }),
    getPost: builder.query({
      query: (data: IPostGet) => ({
        url: '/posts/get_post',
        method: 'POST',
        body: data,
        tagTypes: ['Post']
      }),
      transformResponse: (responseData: IPost) => responseData,
      providesTags: (result) => [{ type: 'Post', id: result?.id }]
    }),
    addPost: builder.mutation({
      query: (data: IPostCreate) => ({
        url: '/posts/create_post',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Posts', 'Post', 'UserPost']
    }),
    editPost: builder.mutation({
      query: (data: IPostEdit) => ({
        url: '/posts/update_post',
        method: 'POST',
        body: data
      }),
      transformResponse: (responseData: IPost, meta, arg: IPostEdit) => {
        console.log(responseData, arg);
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Posts', id: arg.postId },
        { type: 'UserPost', id: arg.postId },
        'Post'
      ]
    }),
    deletePost: builder.mutation({
      query: (data: IPostGet) => ({
        url: '/posts/delete_post',
        method: 'POST',
        body: data
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Posts', id: arg.postId },
        { type: 'UserPost', id: arg.postId },
        'Post'
      ]
    })
  })
});

export const postsSelectors = postsAdapter.getSelectors<EntityState<IPost>>(
  (state) => state
);

export const userPostsSelectors = userPostsAdapter.getSelectors<
  EntityState<IPost>
>((state) => state);

export const {
  useGetPostsQuery,
  useGetUserPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  endpoints
} = extendedPostsSlice;
