import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllComment,
  addComment,
  updateComment,
  deleteComment,
} from "../action/commentAction";
import { StateOptions } from "../../util/enum";

const initialState: {
  fetchCommentState: StateResponseData;
  addCommentState: StateResponseData;
  updateCommentState: StateResponseData;
  deleteCommentState: StateResponseData;
} = {
  fetchCommentState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  addCommentState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  updateCommentState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
  deleteCommentState: {
    state: StateOptions.INITIAL,
    data: null,
    status: null,
    loading: false,
    error: false,
    message: "",
  },
};

const CommentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all comment
      .addCase(fetchAllComment.fulfilled, (state, action) => {
        state.fetchCommentState.data = action.payload;
        state.fetchCommentState.loading = false;
        state.fetchCommentState.error = false;
        state.fetchCommentState.state = StateOptions.FULFILLED;
      })
      .addCase(fetchAllComment.pending, (state) => {
        state.fetchCommentState.loading = true;
        state.fetchCommentState.error = false;
        state.fetchCommentState.state = StateOptions.PENDING;
      })
      .addCase(fetchAllComment.rejected, (state, action) => {
        state.fetchCommentState.error = true;
        state.fetchCommentState.loading = false;
        state.fetchCommentState.message = action.error.message;
        state.fetchCommentState.state = StateOptions.REJECTED;
      })
      // Add comment
      .addCase(addComment.fulfilled, (state, action) => {
        state.addCommentState.data = action.payload;
        state.addCommentState.message = "Comment added successfully!";
        state.addCommentState.loading = false;
        state.addCommentState.error = false;
        state.addCommentState.state = StateOptions.FULFILLED;
      })
      .addCase(addComment.pending, (state) => {
        state.addCommentState.loading = true;
        state.addCommentState.error = false;
        state.addCommentState.state = StateOptions.PENDING;
      })
      .addCase(addComment.rejected, (state, action) => {
        const { message } = action.error;
        state.addCommentState.error = true;
        state.addCommentState.loading = false;
        state.addCommentState.message =
          action.error.message || "Adding comment failed";
        state.addCommentState.state = StateOptions.REJECTED;
      })

      // Delete Comment

      .addCase(deleteComment.fulfilled, (state, action) => {
        state.deleteCommentState.data = action.payload;
        state.deleteCommentState.message = "Comment deleted successfully!";
        state.deleteCommentState.loading = false;
        state.deleteCommentState.error = false;
        state.deleteCommentState.state = StateOptions.FULFILLED;
      })
      .addCase(deleteComment.pending, (state) => {
        state.deleteCommentState.loading = true;
        state.deleteCommentState.error = false;
        state.deleteCommentState.state = StateOptions.PENDING;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.deleteCommentState.error = true;
        state.deleteCommentState.loading = false;
        state.deleteCommentState.message =
          action.error.message || "Deleting comment failed";
        state.deleteCommentState.state = StateOptions.REJECTED;
      })
      // Update Comment plan
      .addCase(updateComment.fulfilled, (state, action) => {
        state.updateCommentState.data = action.payload;
        state.updateCommentState.message = "Comment updated successfully!";
        state.updateCommentState.loading = false;
        state.updateCommentState.error = false;
        state.updateCommentState.state = StateOptions.FULFILLED;
      })
      .addCase(updateComment.pending, (state) => {
        state.updateCommentState.loading = true;
        state.updateCommentState.error = false;
        state.updateCommentState.state = StateOptions.PENDING;
      })
      .addCase(updateComment.rejected, (state, action) => {
        const { message } = action.error;
        state.updateCommentState.error = true;
        state.updateCommentState.loading = false;
        state.updateCommentState.message =
          action.error.message || "Updating comment failed";
        state.updateCommentState.state = StateOptions.REJECTED;
      });
  },
});

export const CommentSliceAction = CommentSlice.actions;
export default CommentSlice.reducer;
