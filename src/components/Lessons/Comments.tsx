import RenderUser from "./RenderUser";

type Props = {
  comments?: CommentType;
};

type CommentType = {
  id: string;
  articleId?: number;
  lessonId: number;
  profileId: number;
  profileName?: string;
  commentBody: string;
  createdDate: string;
};

const Comments = ({ comments }: Props) => {
  return (
    <div className="mx-1">
      
      <div className="my-1 space-y-2">
        <div
          key={comments?.id}
          className=" gap-3 p-2 rounded-lg bg-black/10 shadow-md"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            {/* User Avatar */}
            <div className="w-18 h-10 flex-shrink-0">
              <RenderUser
                userId={comments?.profileId}
                userName={comments?.profileName}
              />
            </div>
            <p className="break-words font-thin text-sm whitespace-pre-wrap text-gray-900">
              {comments?.createdDate.slice(0, 10)}{" "}
              {comments?.createdDate.slice(11, 16)}
            </p>
          </div>

          {/* Comment Content */}
          <div className="flex-1 bg-white rounded-lg p-3 shadow-sm    ">
            <p className="break-words font-thin text-sm whitespace-pre-wrap text-gray-900">
              {comments?.commentBody}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
