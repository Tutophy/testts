
import React, { useState, useEffect } from 'react';
import HomeFeed from './components/HomeFeed';
import FleshaFeed from './components/FleshaFeed';
import Messaging from './components/Messaging';
import Profile from './components/Profile';
import CommunitiesView from './components/CommunitiesView';
import BottomNav from './components/BottomNav';
import CreateVideoView from './components/CreateVideo';
import RecordVideoView from './components/RecordVideoView';
import LiveStream from './components/LiveStream';
import StatusViewer from './components/StatusViewer';
import CreatorStudio from './components/CreatorStudio';
import SnapMapView from './components/SnapMapView';
import VisualSearchView from './components/VisualSearchView';
import ARTryOnView from './components/ARTryOnView';
import CommentsView from './components/CommentsView';
import CreatePost from './components/CreatePost';
import StoryViewer from './components/StoryViewer';
import Discover from './components/Discover';
import Settings from './components/Settings';
import CreateOptionsModal from './components/CreateOptionsModal';
import { User, VideoPost, Conversation, Sound, Gift, Hashtag, Status, Product, CreatorAnalytics, Server, Role, Broadcast, GenericPost, Comment, Story, PostVisibility, ModerationDetails, CreatorEarnings } from './types';
import { 
  mockUsers, 
  mockVideoPosts, 
  loggedInUser as initialLoggedInUser, 
  mockConversations, 
  mockSounds, 
  mockGifts, 
  mockHashtags,
  mockStatuses,
  mockProducts,
  mockAnalytics,
  mockServers,
  mockRoles,
  mockBroadcasts,
  mockGenericPosts,
  mockStories,
  mockCreatorEarnings,
} from './data';

export type View = 'home' | 'flesha' | 'discover' | 'inbox' | 'profile' | 'communities';

const simulateContentModeration = (post: GenericPost | VideoPost): Promise<{
  status: 'approved' | 'rejected';
  reason?: string;
  details?: ModerationDetails;
}> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const badWords = ['hate', 'spam', 'violation', 'badword'];
      let isSafe = true;
      const reasons: string[] = [];
      const details: ModerationDetails = {};

      // 1. Text moderation
      const textContent = 'caption' in post ? post.caption : post.content;
      if (textContent) {
        const hasBadWords = badWords.some(word => textContent.toLowerCase().includes(word));
        if (hasBadWords) {
          isSafe = false;
          reasons.push('Text violates community guidelines.');
          details.textAnalysis = { isSafe: false, reason: 'Contains prohibited keywords.' };
        } else {
          details.textAnalysis = { isSafe: true };
        }
      }

      // 2. Image moderation
      if ('imageUrls' in post && post.imageUrls) {
        const flaggedUrls = post.imageUrls.filter(url => url.includes('unsafe'));
        if (flaggedUrls.length > 0) {
          isSafe = false;
          reasons.push('Image content violates guidelines.');
          details.imageAnalysis = { isSafe: false, reason: 'Contains unsafe imagery.', flaggedUrls };
        } else {
          details.imageAnalysis = { isSafe: true };
        }
      }

      // 3. Video moderation
      const videoUrl = 'videoUrl' in post ? post.videoUrl : undefined;
      if (videoUrl && videoUrl.includes('unsafe')) {
          isSafe = false;
          reasons.push('Video content violates guidelines.');
          details.videoAnalysis = { isSafe: false, reason: 'Video may contain sensitive content.' };
      } else if (videoUrl) {
          details.videoAnalysis = { isSafe: true };
      }

      if (isSafe) {
        resolve({ status: 'approved', details });
      } else {
        resolve({ status: 'rejected', reason: reasons.join(' '), details });
      }
    }, 2500);
  });
};


const App: React.FC = () => {
  const [videoPosts, setVideoPosts] = useState<VideoPost[]>(mockVideoPosts);
  const [genericPosts, setGenericPosts] = useState<GenericPost[]>(mockGenericPosts);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [sounds] = useState<Sound[]>(mockSounds);
  const [gifts] = useState<Gift[]>(mockGifts);
  const [statuses] = useState<Status[]>(mockStatuses);
  const [stories, setStories] = useState<Story[]>(mockStories);
  const [products] = useState<Product[]>(mockProducts);
  const [hashtags] = useState<Hashtag[]>(mockHashtags);
  const [analytics] = useState<CreatorAnalytics>(mockAnalytics);
  const [earnings] = useState<CreatorEarnings>(mockCreatorEarnings);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [loggedInUser, setLoggedInUser] = useState<User>(initialLoggedInUser);
  const [servers] = useState<Server[]>(mockServers);
  const [roles] = useState<Role[]>(mockRoles);
  const [broadcasts] = useState<Broadcast[]>(mockBroadcasts);


  const [currentView, setCurrentView] = useState<View>('home');
  const [profileUserId, setProfileUserId] = useState<string | null>(null);

  const [isCreateOptionsOpen, setIsCreateOptionsOpen] = useState(false);
  const [isCreateUploadOpen, setIsCreateUploadOpen] = useState(false);
  const [isRecordVideoOpen, setIsRecordVideoOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<GenericPost | null>(null);
  const [isLiveOpen, setIsLiveOpen] = useState(false);
  const [liveHostId, setLiveHostId] = useState<string | null>(null);
  const [isStatusViewerOpen, setIsStatusViewerOpen] = useState(false);
  const [statusViewerUserId, setStatusViewerUserId] = useState<string | null>(null);
  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
  const [storyViewerUserId, setStoryViewerUserId] = useState<string | null>(null);
  const [isCreatorStudioOpen, setIsCreatorStudioOpen] = useState(false);
  const [isMapViewOpen, setIsMapViewOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [isARTryOnOpen, setIsARTryOnOpen] = useState(false);
  const [arProduct, setArProduct] = useState<Product | null>(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentingOnPost, setCommentingOnPost] = useState<GenericPost | VideoPost | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSetCurrentView = (view: View, userId?: string) => {
    setCurrentView(view);
    setProfileUserId(userId || null);
    window.scrollTo(0, 0);
  };
  
  const handleCreateVideo = (caption: string, sound: Sound, effects: string[], videoBlob?: Blob) => {
    const videoUrl = videoBlob
      ? URL.createObjectURL(videoBlob)
      : 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4';

    const newVideo: VideoPost = {
      id: `v${videoPosts.length + 1}`,
      authorId: loggedInUser.id,
      videoUrl,
      caption,
      sound,
      reactions: [],
      comments: [],
      shares: 0,
      saves: 0,
      timestamp: new Date().toISOString(),
      effects,
      allowDuets: true,
      visibility: 'public',
      moderationStatus: 'pending',
    };
    
    setVideoPosts([newVideo, ...videoPosts]);
    setIsCreateUploadOpen(false);
    setIsRecordVideoOpen(false);

    simulateContentModeration(newVideo).then(result => {
        setVideoPosts(currentPosts => 
            currentPosts.map(p => 
                p.id === newVideo.id 
                ? { ...p, moderationStatus: result.status, moderationReason: result.reason, moderationDetails: result.details }
                : p
            )
        );
    });
  };
  
  const handleCreatePost = (data: { content: string; visibility: PostVisibility; tags: string[] }, postId?: string) => {
    if (postId) {
        // Editing existing post
        let postToModerate: GenericPost | undefined;
        setGenericPosts(currentPosts =>
            currentPosts.map(p => {
                if (p.id === postId) {
                    postToModerate = { ...p, ...data, moderationStatus: 'pending' };
                    return postToModerate;
                }
                return p;
            })
        );

        if (postToModerate) {
            simulateContentModeration(postToModerate).then(result => {
                setGenericPosts(currentPosts =>
                    currentPosts.map(p =>
                        p.id === postId
                            ? { ...p, moderationStatus: result.status, moderationReason: result.reason, moderationDetails: result.details }
                            : p
                    )
                );
            });
        }
    } else {
        // Creating new post
        const newPost: GenericPost = {
            id: `gp${genericPosts.length + 1}`,
            authorId: loggedInUser.id,
            timestamp: new Date().toISOString(),
            reactions: [],
            comments: [],
            shares: 0,
            saves: 0,
            ...data,
            moderationStatus: 'pending',
        };

        setGenericPosts([newPost, ...genericPosts]);

        simulateContentModeration(newPost).then(result => {
            setGenericPosts(currentPosts =>
                currentPosts.map(p =>
                    p.id === newPost.id
                        ? { ...p, moderationStatus: result.status, moderationReason: result.reason, moderationDetails: result.details }
                        : p
                )
            );
        });
    }

    setIsCreatePostOpen(false);
    setEditingPost(null);
  };

  const handleOpenEditPost = (post: GenericPost) => {
      setEditingPost(post);
      setIsCreatePostOpen(true);
  };

  const handleStartLive = (hostId: string) => {
    setLiveHostId(hostId);
    setIsLiveOpen(true);
  };
  
  const handleEndLive = () => {
    setIsLiveOpen(false);
    setLiveHostId(null);
  };

  const handleViewStatus = (userId: string) => {
    setStatusViewerUserId(userId);
    setIsStatusViewerOpen(true);
  }

  const handleViewStory = (userId: string) => {
    setStoryViewerUserId(userId);
    setIsStoryViewerOpen(true);
  }
  
  const handleOpenARTryOn = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product && product.allowVirtualTryOn) {
        setArProduct(product);
        setIsARTryOnOpen(true);
    }
  }

  const handleOpenComments = (post: GenericPost | VideoPost) => {
    setCommentingOnPost(post);
    setIsCommentsOpen(true);
  }

  const handleAddComment = (postId: string, comment: Comment) => {
     setGenericPosts(posts => posts.map(p => p.id === postId ? {...p, comments: [...p.comments, comment]} : p));
     setVideoPosts(posts => posts.map(p => p.id === postId ? {...p, comments: [...p.comments, comment]} : p));
     setCommentingOnPost(post => post ? {...post, comments: [...post.comments, comment]} : null);
  }
  
  const handleUpdateSecuritySettings = (updatedSettings: Partial<User['securitySettings']>) => {
      const updatedUser = {
          ...loggedInUser,
          securitySettings: {
              ...loggedInUser.securitySettings!,
              ...updatedSettings
          }
      };
      setLoggedInUser(updatedUser);
      setUsers(users.map(u => u.id === loggedInUser.id ? updatedUser : u));
  }

  const onViewProfile = (userId: string) => handleSetCurrentView('profile', userId);

  const renderMainContent = () => {
    switch (currentView) {
      case 'flesha':
        return (
          <FleshaFeed
            videoPosts={videoPosts}
            users={users}
            loggedInUser={loggedInUser}
            onViewProfile={onViewProfile}
            onOpenComments={handleOpenComments}
          />
        );
      case 'discover':
        const allPosts = [...videoPosts, ...genericPosts]
            .filter(p => 'thumbnailUrl' in p || (p as GenericPost).imageUrls?.[0])
            .sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        return (
            <Discover 
                hashtags={hashtags} 
                users={users} 
                posts={allPosts} 
                products={products} 
                onViewProfile={onViewProfile}
                onOpenMap={() => setIsMapViewOpen(true)}
                onOpenVisualSearch={() => setIsVisualSearchOpen(true)}
                loggedInUser={loggedInUser}
            />
        );
      case 'communities':
        return <CommunitiesView servers={servers} users={users} roles={roles} loggedInUser={loggedInUser} />;
      case 'inbox':
        return <Messaging conversations={conversations} users={users} loggedInUser={loggedInUser} allVideoPosts={videoPosts} />;
      case 'profile':
        const profileUser = users.find(u => u.id === (profileUserId || loggedInUser.id));
        if (!profileUser) {
          setCurrentView('home');
          return null;
        }
        const userVideos = videoPosts.filter(p => p.authorId === profileUser.id);
        const userBroadcast = broadcasts.find(b => b.authorId === profileUser.id);

        return (
          <Profile
            user={profileUser}
            videoPosts={userVideos}
            products={products}
            broadcast={userBroadcast}
            loggedInUser={loggedInUser}
            onOpenCreatorStudio={() => setIsCreatorStudioOpen(true)}
            onOpenARTryOn={handleOpenARTryOn}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        );
      case 'home':
      default:
        return (
          <HomeFeed
            posts={genericPosts}
            users={users}
            stories={stories}
            loggedInUser={loggedInUser}
            onOpenComments={handleOpenComments}
            onViewProfile={onViewProfile}
            onEditPost={handleOpenEditPost}
            onNavigateToCommunities={() => handleSetCurrentView('communities')}
            onNavigateToInbox={() => handleSetCurrentView('inbox')}
            onOpenCreatePost={() => setIsCreatePostOpen(true)}
            onViewStory={handleViewStory}
           />
        );
    }
  };

  const liveHost = liveHostId ? users.find(u => u.id === liveHostId) : null;
  const statusViewerUser = statusViewerUserId ? users.find(u => u.id === statusViewerUserId) : null;
  const userStatuses = statusViewerUser ? statuses.filter(s => s.authorId === statusViewerUser.id) : [];
  const storyViewerUser = storyViewerUserId ? users.find(u => u.id === storyViewerUserId) : null;

  return (
    <div className="bg-black min-h-screen font-sans text-white">
      <main className="container mx-auto h-screen">
          {renderMainContent()}
      </main>
      
      <BottomNav 
        currentView={currentView}
        setCurrentView={handleSetCurrentView}
        onOpenCreate={() => setIsCreateOptionsOpen(true)}
      />

      {isCreateOptionsOpen && (
        <CreateOptionsModal
          onClose={() => setIsCreateOptionsOpen(false)}
          onRecord={() => { setIsCreateOptionsOpen(false); setIsRecordVideoOpen(true); }}
          onUpload={() => { setIsCreateOptionsOpen(false); setIsCreateUploadOpen(true); }}
          onPost={() => { setIsCreateOptionsOpen(false); setIsCreatePostOpen(true); }}
        />
      )}

      {isRecordVideoOpen && (
        <RecordVideoView
          user={loggedInUser}
          sounds={sounds}
          onCreate={handleCreateVideo}
          onClose={() => setIsRecordVideoOpen(false)}
        />
      )}

      {isCreateUploadOpen && (
        <CreateVideoView
          user={loggedInUser}
          sounds={sounds}
          onCreate={handleCreateVideo}
          onClose={() => setIsCreateUploadOpen(false)}
        />
      )}

      {isCreatePostOpen && (
        <CreatePost
            loggedInUser={loggedInUser}
            postToEdit={editingPost}
            onClose={() => {
                setIsCreatePostOpen(false);
                setEditingPost(null);
            }}
            onCreatePost={handleCreatePost}
            onCreateStory={() => { alert("Story creation coming soon!")}}
        />
      )}

      {isLiveOpen && liveHost && (
        <LiveStream
          host={liveHost}
          gifts={gifts}
          onEndLive={handleEndLive}
        />
      )}

      {isStatusViewerOpen && statusViewerUser && (
        <StatusViewer
          user={statusViewerUser}
          statuses={userStatuses}
          onClose={() => setIsStatusViewerOpen(false)}
        />
      )}

      {isStoryViewerOpen && storyViewerUser && (
        <StoryViewer
          user={storyViewerUser}
          onClose={() => setIsStoryViewerOpen(false)}
        />
      )}
      
      {isCreatorStudioOpen && (
        <CreatorStudio
          analytics={analytics}
          earnings={earnings}
          onClose={() => setIsCreatorStudioOpen(false)}
        />
      )}

      {isMapViewOpen && (
        <SnapMapView
          users={users.filter(u => u.location && u.bitmojiUrl)}
          onClose={() => setIsMapViewOpen(false)}
        />
      )}

      {isVisualSearchOpen && (
        <VisualSearchView
          mockProducts={products}
          onClose={() => setIsVisualSearchOpen(false)}
        />
      )}
      
      {isARTryOnOpen && arProduct && (
        <ARTryOnView
          initialProduct={arProduct}
          allProducts={products.filter(p => p.allowVirtualTryOn)}
          onClose={() => setIsARTryOnOpen(false)}
        />
      )}

      {isCommentsOpen && commentingOnPost && (
        <CommentsView
            post={commentingOnPost}
            users={users}
            loggedInUser={loggedInUser}
            onClose={() => setIsCommentsOpen(false)}
            onAddComment={handleAddComment}
        />
      )}

      {isSettingsOpen && (
        <Settings
            user={loggedInUser}
            onClose={() => setIsSettingsOpen(false)}
            onUpdateSecuritySettings={handleUpdateSecuritySettings}
        />
      )}
    </div>
  );
};

export default App;
