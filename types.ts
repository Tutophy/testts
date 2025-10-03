
export interface LoginActivity {
  id: string;
  device: string;
  location: string;
  timestamp: string;
  isCurrent: boolean;
}

export interface SecuritySettings {
  mfaEnabled: boolean;
  loginAlerts: boolean;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
  displayName: string;
  followers: number;
  following: number;
  followingIds?: string[];
  likes: number; // Total likes received
  isLive?: boolean;
  bitmojiUrl?: string; // Snapchat inspired
  location?: { lat: number; lng: number; city: string; }; // Snapchat inspired
  boards?: Board[]; // Pinterest inspired
  stories?: Story[];
  // New schema-aligned fields
  verification_status: 'none' | 'pending' | 'verified' | 'rejected';
  account_type: 'personal' | 'business' | 'creator' | 'organization';
  subscription_type: 'free' | 'premium';
  isBot?: boolean;
  reputation_score?: number;
  // New security features
  securitySettings?: SecuritySettings;
  loginActivity?: LoginActivity[];
}

export interface Sound {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
}

export type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

export interface Reaction {
  userId: string;
  type: ReactionType;
}

export interface Comment {
  id: string;
  authorId: string;
  timestamp: string;
  content?: string;
  type: 'text' | 'voice' | 'sticker';
  stickerUrl?: string;
  voiceUrl?: string;
  durationSeconds?: number;
  // New schema-aligned fields
  likes_count?: number;
  is_pinned?: boolean;
}

export type PostVisibility = 'public' | 'friends' | 'followers' | 'private';

export interface ModerationDetails {
    textAnalysis?: {
        isSafe: boolean;
        reason?: string;
    };
    imageAnalysis?: {
        isSafe: boolean;
        reason?: string;
        flaggedUrls?: string[];
    };
    videoAnalysis?: {
        isSafe: boolean;
        reason?: string;
    }
}

export interface BasePost {
    id: string;
    authorId: string;
    timestamp: string;
    reactions: Reaction[];
    comments: Comment[];
    shares: number;
    saves: number;
    // New schema-aligned fields
    visibility: PostVisibility;
    tags?: string[];
    is_pinned?: boolean;
    views?: number;
    recommendationReason?: {
        type: 'social' | 'trending';
        text: string;
    };
    // AI Content Moderation
    moderationStatus?: 'pending' | 'approved' | 'rejected';
    moderationReason?: string;
    moderationDetails?: ModerationDetails;
}


export interface VideoPost extends BasePost {
  videoUrl: string;
  caption: string;
  sound: Sound;
  duetWithVideoId?: string; // ID of the video this is a duet with
  effects: string[]; // Names of effects used
  allowDuets: boolean;
  quality?: 'SD' | 'HD' | '4K';
  thumbnailUrl?: string;
}

export interface GenericPost extends BasePost {
    content: string;
    imageUrls?: string[];
    videoUrl?: string;
}

export interface Message {
  id:string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead?: boolean;
  type: 'text' | 'share' | 'voice';
  sharedVideoPostId?: string;
  durationSeconds?: number;
}

export interface Conversation {
  id: string;
  participants: string[];
  messages: Message[];
}

export interface Gift {
  id: string;
  name: string;
  cost: number; // in-app currency
  iconUrl: string;
}

export interface Hashtag {
  tag: string;
  videoCount: number;
}

export interface Status {
    id: string;
    authorId: string;
    contentUrl: string;
    timestamp: string;
    type: 'image' | 'video';
}

export interface Story {
    id: string;
    authorId: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    timestamp: string;
    durationSeconds: number;
    views: string[]; // Array of userIds
}

export interface Product {
    id:string;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
    allowVirtualTryOn?: boolean; // Pinterest inspired
}

export interface CreatorAnalytics {
    totalViews: number;
    watchTimeHours: number;
    followerGrowth: { date: string; change: number }[];
}

export interface EarningsBreakdown {
    subscriptions: number;
    advertisements: number;
    premiumContent: number;
    virtualGifts: number;
    nftSales: number;
    affiliate: number;
}

export interface CreatorEarnings {
    total: number;
    breakdown: EarningsBreakdown;
    period: 'month' | 'week' | 'year';
    currency: 'USD';
}


// Discord Inspired
export interface Role {
    id: string;
    name: string;
    color: string; // hex color
}

export interface Channel {
    id: string;
    name: string;
    type: 'text' | 'voice' | 'forum' | 'ama'; // Reddit inspired
    messages: ServerMessage[];
    posts?: ForumPost[]; // Reddit inspired
}

export interface ChannelCategory {
    id: string;
    name: string;
    channels: Channel[];
}

export interface Server {
    id: string;
    name: string;
    iconUrl: string;
    members: { userId: string, roleId: string }[];
    categories: ChannelCategory[];
}

export interface ServerMessage extends Message {
    serverId: string;
    channelId: string;
}

// Telegram Inspired
export interface Broadcast {
    id: string;
    authorId: string;
    name: string;
    description: string;
    subscribers: number;
    messages: BroadcastMessage[];
}

export interface BroadcastMessage {
    id: string;
    text: string;
    timestamp: string;
    views: number;
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
}

// Reddit Inspired
export interface NestedComment {
    id: string;
    authorId: string;
    content: string;
    upvotes: number;
    timestamp: string;
    replies: NestedComment[];
}

export interface ForumPost {
    id: string;
    authorId: string;
    title: string;
    content: string;
    upvotes: number;
    timestamp: string;
    comments: NestedComment[];
}

// Pinterest Inspired
export interface Pin {
    id: string;
    imageUrl: string;
    title: string;
    productId?: string; // For shoppable pins
}

export interface Board {
    id: string;
    name: string;
    pins: Pin[];
    coverPinUrl: string;
}

// Custom Types for Component Props
export type CreateVideoCallback = (caption: string, sound: Sound, effects: string[], videoBlob?: Blob) => void;
