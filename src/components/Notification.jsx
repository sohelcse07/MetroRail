import React, { useState, useEffect, useCallback } from 'react';
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
import { useUser } from '../context/UserContext';

const BASE_URL = 'https://metro-rail-smart-ticket.onrender.com';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [expandedNotificationId, setExpandedNotificationId] = useState(null);
  const [commentsMap, setCommentsMap] = useState({});
  const [reactionsMap, setReactionsMap] = useState({});
  const [newCommentMap, setNewCommentMap] = useState({});
  const [loading, setLoading] = useState({
    notifications: true,
    details: false,
    reactions: {},
    comments: {}
  });
  const [error, setError] = useState(null);
  const [showReactionPickerMap, setShowReactionPickerMap] = useState({});
  const { token } = useAuth();
  const { user } = useUser();

  // Available reactions with metadata
  const REACTION_TYPES = {
    like: { icon: FaThumbsUp, color: 'text-blue-500', label: 'Like' },
    dislike: { icon: FaThumbsDown, color: 'text-blue-500', label: 'Dislike' },
    love: { icon: FaHeart, color: 'text-red-500', label: 'Love' },
    laugh: { icon: FaLaugh, color: 'text-yellow-500', label: 'Laugh' },
    sad: { icon: FaSadTear, color: 'text-gray-500', label: 'Sad' },
    angry: { icon: FaAngry, color: 'text-red-600', label: 'Angry' },
    wow: { icon: FaSurprise, color: 'text-purple-500', label: 'Wow' },
    neutral: { icon: FaMeh, color: 'text-gray-400', label: 'Neutral' }
  };

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
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, notifications: true }));
      const response = await fetch(`${BASE_URL}/notification/get-all`);
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const data = await response.json();
      setNotifications(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(prev => ({ ...prev, notifications: false }));
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Fetch comments and reactions for a notification
  const fetchNotificationDetails = useCallback(async (notificationId) => {
    try {
      setLoading(prev => ({ 
        ...prev, 
        details: true,
        comments: { ...prev.comments, [notificationId]: true },
        reactions: { ...prev.reactions, [notificationId]: true }
      }));

      const [commentsRes, reactionsRes] = await Promise.all([
        fetch(`${BASE_URL}/notification/comments-list/${notificationId}`),
        fetch(`${BASE_URL}/notification/reactions-list/${notificationId}`)
      ]);

      if (!commentsRes.ok || !reactionsRes.ok) {
        throw new Error('Failed to fetch notification details');
      }

      const [commentsData, reactionsData] = await Promise.all([
        commentsRes.json(),
        reactionsRes.json()
      ]);

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
      setLoading(prev => ({ 
        ...prev, 
        details: false,
        comments: { ...prev.comments, [notificationId]: false },
        reactions: { ...prev.reactions, [notificationId]: false }
      }));
    }
  }, []);

  const toggleExpandNotification = useCallback((notificationId) => {
    if (expandedNotificationId === notificationId) {
      setExpandedNotificationId(null);
      setShowReactionPickerMap(prev => ({ ...prev, [notificationId]: false }));
    } else {
      setExpandedNotificationId(notificationId);
      fetchNotificationDetails(notificationId);
    }
  }, [expandedNotificationId, fetchNotificationDetails]);

  // Add a comment
  const handleAddComment = useCallback(async (e, notificationId) => {
    e.preventDefault();
    const commentText = newCommentMap[notificationId]?.trim();
    if (!commentText || !token) return;

    try {
      setLoading(prev => ({ 
        ...prev, 
        comments: { ...prev.comments, [notificationId]: true }
      }));

      const response = await fetch(`${BASE_URL}/notification/comments/add/${notificationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ comment: commentText }),
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
      
      // Update notification comment count
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, total_comments: notif.total_comments + 1 } 
            : notif
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(prev => ({ 
        ...prev, 
        comments: { ...prev.comments, [notificationId]: false }
      }));
    }
  }, [newCommentMap, token]);

  // Add or update a reaction
  const handleAddReaction = useCallback(async (reactionType, notificationId) => {
    if (!token || !user?.id) return;

    try {
      setLoading(prev => ({ 
        ...prev, 
        reactions: { ...prev.reactions, [notificationId]: true }
      }));

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
      
      // Update reactions for this notification
      setReactionsMap(prev => {
        const currentReactions = prev[notificationId] || [];
        const existingIndex = currentReactions.findIndex(r => r.user === user.id);
        
        let updatedReactions;
        if (existingIndex >= 0) {
          updatedReactions = [...currentReactions];
          updatedReactions[existingIndex] = data;
        } else {
          updatedReactions = [...currentReactions, data];
        }
        
        return {
          ...prev,
          [notificationId]: updatedReactions
        };
      });
      
      // Update notification reaction count
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, total_reactions: notif.total_reactions + 1 } 
            : notif
        )
      );
      
      // Close the reaction picker
      setShowReactionPickerMap(prev => ({
        ...prev,
        [notificationId]: false
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(prev => ({ 
        ...prev, 
        reactions: { ...prev.reactions, [notificationId]: false }
      }));
    }
  }, [token, user]);

  // Get user's reaction to a specific notification
  const getUserReaction = useCallback((notificationId) => {
    if (!user?.id) return null;
    const notificationReactions = reactionsMap[notificationId] || [];
    const userReaction = notificationReactions.find(r => r.user === user.id);
    return userReaction ? userReaction.reaction : null;
  }, [user, reactionsMap]);

  // Get reaction icon component
  const getReactionIcon = useCallback((reaction, size = 'text-base') => {
    const reactionData = REACTION_TYPES[reaction];
    if (!reactionData) return null;
    const Icon = reactionData.icon;
    return <Icon className={`${size} ${reactionData.color}`} />;
  }, []);

  if (loading.notifications && notifications.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            <button 
              onClick={fetchNotifications}
              className="mt-2 text-sm text-red-600 hover:text-red-500 font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No notifications</h3>
        <p className="mt-1 text-gray-500">You don't have any notifications yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        <button 
          onClick={fetchNotifications}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
      
      <div className="space-y-6">
        {notifications.map(notification => {
          const notificationId = notification.id;
          const isExpanded = expandedNotificationId === notificationId;
          const comments = commentsMap[notificationId] || [];
          const showReactionPicker = showReactionPickerMap[notificationId] || false;
          const newComment = newCommentMap[notificationId] || '';
          const userReaction = getUserReaction(notificationId);
          const reactions = reactionsMap[notificationId] || [];
          // const reactionCount = reactions.length;

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
                    className={`flex items-center ${isExpanded ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                    onClick={() => toggleExpandNotification(notificationId)}
                    disabled={loading.details}
                  >
                    <FaComment className="mr-1" />
                    <span>{notification.total_comments} comments</span>
                    {loading.comments[notificationId] && (
                      <span className="ml-1">
                        <svg className="animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    )}
                  </button>
                  
                  {/* Reactions Button */}
                  <div className="relative">
                    <button 
                      className={`flex items-center ${userReaction ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowReactionPickerMap(prev => ({
                          ...prev,
                          [notificationId]: !prev[notificationId]
                        }));
                      }}
                      disabled={loading.reactions[notificationId]}
                    >
                      {userReaction ? (
                        getReactionIcon(userReaction)
                      ) : (
                        <FaThumbsUp className="mr-1" />
                      )}
                      <span className="ml-1">{notification.total_reactions} reactions</span>
                      {loading.reactions[notificationId] && (
                        <span className="ml-1">
                          <svg className="animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                      )}
                    </button>
                    
                    {/* Reaction Picker */}
                    {showReactionPicker && (
                      <div 
                        className="absolute bottom-full left-0 mb-2 bg-white shadow-lg rounded-full p-2 flex space-x-1 border border-gray-200 z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {Object.entries(REACTION_TYPES).map(([reaction, { icon: Icon, color }]) => (
                          <button
                            key={reaction}
                            onClick={() => handleAddReaction(reaction, notificationId)}
                            className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${
                              userReaction === reaction ? 'bg-gray-100' : ''
                            }`}
                            title={REACTION_TYPES[reaction].label}
                          >
                            <Icon className={`text-xl ${color}`} />
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
                <div className="border-t border-gray-200 p-6 h-72 overflow-y-auto">
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
                        disabled={loading.comments[notificationId]}
                      />
                      <button
                        type="submit"
                        className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 disabled:opacity-50"
                        disabled={!newComment.trim() || loading.comments[notificationId]}
                      >
                        {loading.comments[notificationId] ? (
                          <svg className="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <FaPaperPlane />
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notification;