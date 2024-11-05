import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockComments } from '@/services/mockComments';

interface CommentAuthor {
  name: string;
  avatar: string;
}

interface Comment {
  id: number;
  author: CommentAuthor;
  content: string;
  time: string;
  likes: number;
  replies?: Comment[];
  replyTo?: string;
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: mockComments,
  loading: false,
  error: null
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.unshift(action.payload);
    },
    addReply: (state, action: PayloadAction<{ parentId: number; reply: Comment }>) => {
      const findAndAddReply = (comments: Comment[]) => {
        for (const comment of comments) {
          if (comment.id === action.payload.parentId) {
            if (!comment.replies) {
              comment.replies = [];
            }
            comment.replies.push(action.payload.reply);
            return true;
          }
          if (comment.replies) {
            const found = findAndAddReply(comment.replies);
            if (found) return true;
          }
        }
        return false;
      };
      findAndAddReply(state.comments);
    },
    updateLikes: (state, action: PayloadAction<{ id: number; likes: number }>) => {
      const updateCommentLikes = (comments: Comment[]) => {
        for (const comment of comments) {
          if (comment.id === action.payload.id) {
            comment.likes = action.payload.likes;
            return true;
          }
          if (comment.replies) {
            const found = updateCommentLikes(comment.replies);
            if (found) return true;
          }
        }
        return false;
      };
      updateCommentLikes(state.comments);
    }
  }
});

export const { setLoading, setError, addComment, addReply, updateLikes } = commentSlice.actions;
export default commentSlice.reducer;