import React, { useState, useEffect } from 'react';
import { 
  FaThumbsUp, 
  FaThumbsDown, 
  FaHeart, 
  FaLaugh, 
  FaSadTear, 
  FaAngry, 
  FaSurprise, 
  FaMeh, 
  FaComment,
  FaTimes,
  FaPaperPlane
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const BASE_URL = 'https://metro-rail-smart-ticket.onrender.com';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [expandedNotificationId, setExpandedNotificationId] = useState(null);
  const [commentsMap, setCommentsMap] = useState({});
  const [reactionsMap, setReactionsMap] = useState({});
  const [newCommentMap, setNewCommentMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReactionPickerMap, setShowReactionPickerMap] = useState({});
  const { token, user } = useAuth();

  // Initialize newCommentMap when notifications are loaded
  useEffect(() => {
    if (notifications.length > 0) {
      const initialNewComments = {};
      notifications.forEach(notification => {
        initialNewComments[notification.id] = '';
      });
      setNewCommentMap(initialNewComments);
    }
  }, [notifications]);

  // Fetch all notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/notification/get-all`);
        if (!response.ok) throw new Error('Failed to fetch notifications');
        const data = await response.json();
        setNotifications(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Fetch comments and reactions when notification is expanded
  const fetchNotificationDetails = async (notificationId) => {
    try {
      setLoading(true);
      const [commentsRes, reactionsRes] = await Promise.all([
        fetch(`${BASE_URL}/notification/comments-list/${notificationId}`),
        fetch(`${BASE_URL}/notification/reactions-list/${notificationId}`)
      ]);

      if (!commentsRes.ok || !reactionsRes.ok) {
        throw new Error('Failed to fetch notification details');
      }

      const commentsData = await commentsRes.json();
      const reactionsData = await reactionsRes.json();

      setCommentsMap(prev => ({
        ...prev,
        [notificationId]: commentsData.results || []
      }));

      setReactionsMap(prev => ({
        ...prev,
        [notificationId]: reactionsData.results || []
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpandNotification = (notificationId) => {
    if (expandedNotificationId === notificationId) {
      setExpandedNotificationId(null);
      setShowReactionPickerMap(prev => ({ ...prev, [notificationId]: false }));
    } else {
      setExpandedNotificationId(notificationId);
      fetchNotificationDetails(notificationId); // Always fetch details when expanding
    }
  };

  // Add a comment
  const handleAddComment = async (e, notificationId) => {
    e.preventDefault();
    if (!newCommentMap[notificationId]?.trim()) return;

    try {
      const response = await fetch(`${BASE_URL}/notification/comments/add/${notificationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ comment: newCommentMap[notificationId] }),
      });
      
      if (!response.ok) throw new Error('Failed to add comment');
      
      const data = await response.json();
      setCommentsMap(prev => ({
        ...prev,
        [notificationId]: [...(prev[notificationId] || []), data]
      }));
      setNewCommentMap(prev => ({
        ...prev,
        [notificationId]: ''
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  // Add or update a reaction
  const handleAddReaction = async (reactionType, notificationId) => {
    try {
      const response = await fetch(`${BASE_URL}/notification/reactions/add/${notificationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ reaction: reactionType }),
      });
      
      if (!response.ok) throw new Error('Failed to add reaction');
      
      const data = await response.json();
      
      // Update reactions for this specific notification
      setReactionsMap(prev => {
        const currentReactions = prev[notificationId] || [];
        const existingIndex = currentReactions.findIndex(r => r.user === user?.id);
        
        let updatedReactions;
        if (existingIndex >= 0) {
          // Update existing reaction
          updatedReactions = [...currentReactions];
          updatedReactions[existingIndex] = data;
        } else {
          // Add new reaction
          updatedReactions = [...currentReactions, data];
        }
        
        return {
          ...prev,
          [notificationId]: updatedReactions
        };
      });
      
      // Close the reaction picker
      setShowReactionPickerMap(prev => ({
        ...prev,
        [notificationId]: false
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  // Get reaction icon
  const getReactionIcon = (reaction, size = 'w-5 h-5') => {
    switch (reaction) {
      case 'like': return <FaThumbsUp className={`${size} text-blue-500`} />;
      case 'dislike': return <FaThumbsDown className={`${size} text-blue-500`} />;
      case 'love': return <FaHeart className={`${size} text-red-500`} />;
      case 'laugh': return <FaLaugh className={`${size} text-yellow-500`} />;
      case 'sad': return <FaSadTear className={`${size} text-gray-500`} />;
      case 'angry': return <FaAngry className={`${size} text-red-600`} />;
      case 'wow': return <FaSurprise className={`${size} text-purple-500`} />;
      case 'neutral': return <FaMeh className={`${size} text-gray-400`} />;
      default: return null;
    }
  };

  // Count reactions by type for a specific notification
  const countReactions = (notificationId, type) => {
    const notificationReactions = reactionsMap[notificationId] || [];
    return notificationReactions.filter(r => r.reaction === type).length;
  };

  // Get user's reaction to a specific notification
  const getUserReaction = (notificationId) => {
    if (!user) return null;
    const notificationReactions = reactionsMap[notificationId] || [];
    const userReaction = notificationReactions.find(r => r.user === user.id);
    return userReaction ? userReaction.reaction : null;
  };

  if (loading && notifications.length === 0) return <div className="text-center py-10">Loading notifications...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Notifications</h1>
      
      {notifications.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No notifications available</p>
        </div>
      ) : (
        <div className="space-y-6">
          {notifications.map(notification => {
            const notificationId = notification.id;
            const isExpanded = expandedNotificationId === notificationId;
            const comments = commentsMap[notificationId] || [];
            const reactions = reactionsMap[notificationId] || [];
            const showReactionPicker = showReactionPickerMap[notificationId] || false;
            const newComment = newCommentMap[notificationId] || '';
            const userReaction = getUserReaction(notificationId);

            return (
              <div 
                key={notificationId} 
                className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 ${
                  isExpanded ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {/* Notification Header */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">{notification.title}</h2>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {new Date(notification.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{notification.description}</p>
                  
                  {/* Action Buttons */}
                  <div className="mt-4 flex items-center space-x-4">
                    {/* Comments Button */}
                    <button 
                      className="flex items-center text-gray-500 hover:text-blue-500"
                      onClick={() => toggleExpandNotification(notificationId)}
                    >
                      <FaComment className="mr-1" />
                      <span>{comments.length>0?comments.length:""} comments</span>
                    </button>
                    
                    {/* Reactions Button */}
                    <div className="relative">
                      <button 
                        className="flex items-center text-gray-500 hover:text-blue-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowReactionPickerMap(prev => ({
                            ...prev,
                            [notificationId]: !prev[notificationId]
                          }));
                        }}
                      >
                        {userReaction ? (
                          <>
                            {getReactionIcon(userReaction)}
                            <span className="ml-1">{reactions.length>0?reactions.length:""} reactions</span>
                          </>
                        ) : (
                          <>
                            <FaThumbsUp className="mr-1" />
                            <span>{reactions.length>0?reactions.length:""} reactions</span>
                          </>
                        )}
                      </button>
                      
                      {/* Reaction Picker */}
                      {showReactionPicker && (
                        <div 
                          className="absolute bottom-full left-0 mb-2 bg-white shadow-lg rounded-full p-2 flex space-x-1 border border-gray-200 z-10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {['like', 'dislike', 'love', 'laugh', 'wow', 'sad', 'angry', 'neutral'].map((reaction) => (
                            <button
                              key={reaction}
                              onClick={() => handleAddReaction(reaction, notificationId)}
                              className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${
                                userReaction === reaction ? 'bg-gray-100' : ''
                              }`}
                              title={reaction}
                            >
                              {getReactionIcon(reaction, 'w-6 h-6')}
                            </button>
                          ))}
                          <button 
                            onClick={() => setShowReactionPickerMap(prev => ({
                              ...prev,
                              [notificationId]: false
                            }))}
                            className="p-2 text-gray-400 hover:text-gray-600"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Expanded Comments Section */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-6">
                    {/* Reaction Summary */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {['like', 'dislike', 'love', 'laugh', 'wow', 'sad', 'angry', 'neutral'].map((reaction) => {
                          const count = countReactions(notificationId, reaction);
                          if (count === 0) return null;
                          return (
                            <div 
                              key={reaction} 
                              className="flex items-center px-3 py-1 rounded-full"
                              style={{
                                backgroundColor: {
                                  like: '#EFF6FF',
                                  dislike: '#EFF6FF',
                                  love: '#FEE2E2',
                                  laugh: '#FEF3C7',
                                  wow: '#F3E8FF',
                                  sad: '#F3F4F6',
                                  angry: '#FEE2E2',
                                  neutral: '#F3F4F6'
                                }[reaction],
                                color: {
                                  like: '#3B82F6',
                                  dislike: '#3B82F6',
                                  love: '#DC2626',
                                  laugh: '#D97706',
                                  wow: '#9333EA',
                                  sad: '#6B7280',
                                  angry: '#DC2626',
                                  neutral: '#6B7280'
                                }[reaction]
                              }}
                            >
                              {getReactionIcon(reaction)}
                              <span className="ml-1 text-sm">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Comments List */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-500 mb-4">
                        Comments ({comments.length})
                      </h3>
                      
                      {comments.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
                      ) : (
                        <div className="space-y-4">
                          {comments.map(comment => (
                            <div key={comment.id} className="flex gap-3">
                              {/* User Avatar */}
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                  {comment.user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                              </div>
                              
                              {/* Comment Content */}
                              <div className="flex-1">
                                <div className="flex items-baseline gap-2">
                                  <h4 className="font-medium text-gray-900">
                                    {comment.user?.name || 'Anonymous'}
                                  </h4>
                                  <span className="text-xs text-gray-500">
                                    {new Date(comment.created_at).toLocaleString()}
                                  </span>
                                </div>
                                <p className="text-gray-700 mt-1">{comment.comment}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Add Comment Form */}
                    {token && (
                      <form 
                        onSubmit={(e) => handleAddComment(e, notificationId)} 
                        className="flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewCommentMap(prev => ({
                            ...prev,
                            [notificationId]: e.target.value
                          }))}
                          placeholder="Write a comment..."
                          className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <button
                          type="submit"
                          className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
                          disabled={!newComment.trim()}
                        >
                          <FaPaperPlane />
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notification;