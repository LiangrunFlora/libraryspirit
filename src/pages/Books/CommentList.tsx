import * as React from 'react';
import './CommentList.css'
import userCover from '../../resources/HomeImage/userCover.png'


interface CommentListProps {
  commentInfo:CommentInfo[]
}
const CommentList:React.FC<CommentListProps> = ({commentInfo}) => {
  return (
    <div className="bilibili-comments">
      <ul className="comment-list">
        {commentInfo.map((comment, index) => (
          <li key={index} className="comment-item">
            <div className="user-info">
              <img src={userCover} alt="avatar" className="avatar"/>
              <span className="user-name">{comment.user_name}</span>
            </div>
            <div className="comment-content">{comment.content}</div>
            <div className="comment-info">
              <span className="comment-time">{comment.comment_date.toLocaleString()}</span>
              <span className="comment-like">赞</span>
              <span className="comment-reply">回复</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList