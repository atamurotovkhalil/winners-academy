import { useCallback, useEffect, useState } from "react";
import RenderUser from "./RenderUser";

type Props = {
  userId: string;
  lessonId: string | undefined;
};

type CommentType = {
  _id: string;
  lessonId: string;
  userId: string;
  commentBody: string;
  createdAt: string;
};

const Comments = ({ userId, lessonId }: Props) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);

  const fetchComments = useCallback(async () => {
    if (!lessonId) return;

    try {
      const response = await fetch(`http://localhost:3000/comments`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to get comments: ${response.statusText}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setComments(data);
      } else if (data?.data?.comment) {
        setComments(data.data.comment);
      } else {
        setComments([]);
      }
    } catch (error) {}
  }, [lessonId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);
  const lessonComments = comments.filter((com) => com.lessonId === lessonId);

  // Sort comments by oldest first (immutably)
  const sortedComments = [...lessonComments].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const sendComment = async () => {
    if (!comment.trim()) return;

    try {
      // If 10 comments already exist, delete the oldest first
      if (lessonComments.length >= 10) {
        const oldestCommentId = sortedComments[0]?._id;
        if (oldestCommentId) {
          const deleteResponse = await fetch(
            `http://localhost:3000/comments/${oldestCommentId}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!deleteResponse.ok) {
            console.error("Error deleting oldest comment");
            return;
          }
        }
      }

      // Then add the new comment
      const response = await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, userId, commentBody: comment }),
      });

      if (!response.ok) {
        console.error("An error occurred while submitting the comment");
      } else {
        console.log("Comment submitted successfully!");
        setComment("");
        await fetchComments(); // Refresh comments
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="mx-1">
      <p className="font-bold  italic">Comments:</p>
      <div className="my-1 space-y-2">
        {lessonComments.length > 0 ? (
          lessonComments.map((c) => (
            <div
              key={c._id}
              className="flex items-start gap-3 p-2 rounded-lg bg-black/10 shadow-md"
            >
              {/* User Avatar */}
              <div className="w-18 h-10 flex-shrink-0">
                <RenderUser userId={c.userId} />
              </div>

              {/* Comment Content */}
              <div className="flex-1 bg-white rounded-lg p-3 shadow-sm    ">
                <p className="break-words font-thin text-sm whitespace-pre-wrap text-gray-900">
                  {c.commentBody}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

      <p className="font-bold italic">Leave a comment:</p>
      <div className="mx-auto my-3">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-[100px] border border-black rounded-xs p-2"
        />
        <button
          onClick={sendComment}
          className="text-gray-300 lg:text-[16px] md:text-[16px] text-[12px] rounded-xs hover:bg-gray-300 hover:text-black bg-black lg:py-3 lg:px-5 md:py-3 md:px-5 py-2 px-3 my-3"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Comments;
