import { useState } from 'react'
import { formatDistance } from 'date-fns'

const Post = ({ thread, onLike, onRepost }) => {
const [showReplies, setShowReplies] = useState(false)

return (
    <div className="thread-post">
        <div className="user-avatar">
            <img src={thread.user.avatar} alt={thread.user.username} />
        </div>
        <div className="thread-content">
        <div className="thread-header">
            <h4>{thread.user.username}</h4>
            <span className="timestamp">
            {formatDistance(new Date(thread.createdAt), new Date(), { addSuffix: true })}
            </span>
        </div>
        <p>{thread.content}</p>
        {thread.image && (
            <img className="thread-image" src={thread.image} alt="Thread content" />
        )}
        <div className="thread-actions">
            <button onClick={onLike}>
            <i className="far fa-heart"></i>
            <span>{thread.likes}</span>
            </button>
            <button onClick={() => setShowReplies(!showReplies)}>
            <i className="far fa-comment"></i>
            <span>{thread.replies?.length}</span>
            </button>
            <button onClick={onRepost}>
            <i className="fas fa-retweet"></i>
            <span>{thread.reposts}</span>
            </button>
            <button>
            <i className="far fa-share-square"></i>
            </button>
            </div>
        </div>
    </div>
)
}

export default Post
