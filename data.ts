
import { User, VideoPost, Comment, Conversation, Message, Sound, Gift, Hashtag, Status, Product, CreatorAnalytics, Role, Server, Broadcast, ServerMessage, NestedComment, ForumPost, Pin, Board, GenericPost, Story, SecuritySettings, LoginActivity, CreatorEarnings } from './types';

export const mockSounds: Sound[] = [
    { id: 's1', title: 'Funky Groove', artist: 'BeatMaster', coverUrl: 'https://picsum.photos/seed/sound1/100' },
    { id: 's2', title: 'Lo-Fi Chill', artist: 'Chillhop', coverUrl: 'https://picsum.photos/seed/sound2/100' },
    { id: 's3', title: 'Viral Dance Beat', artist: 'DJ Trend', coverUrl: 'https://picsum.photos/seed/sound3/100' },
    { id: 's4', title: 'Acoustic Melody', artist: 'Indie Folk', coverUrl: 'https://picsum.photos/seed/sound4/100' },
];

export const mockGifts: Gift[] = [
    { id: 'g1', name: 'Rose', cost: 1, iconUrl: '🌹' },
    { id: 'g2', name: 'Heart', cost: 5, iconUrl: '❤️' },
    { id: 'g3', name: 'Sparkles', cost: 10, iconUrl: '✨' },
    { id: 'g4', name: 'Diamond', cost: 50, iconUrl: '💎' },
    { id: 'g5', name: 'Rocket', cost: 100, iconUrl: '🚀' },
];

// --- New Pinterest Mock Data ---
export const mockPins: Pin[] = [
    { id: 'pin1', imageUrl: 'https://picsum.photos/seed/pin1/500/750', title: 'Modern Living Room Ideas' },
    { id: 'pin2', imageUrl: 'https://picsum.photos/seed/pin2/500/800', title: 'Minimalist Desk Setup' },
    { id: 'pin3', imageUrl: 'https://picsum.photos/seed/pin3/500/650', title: 'Summer Outfit Inspiration' },
    { id: 'pin4', imageUrl: 'https://picsum.photos/seed/pin4/500/700', title: 'Healthy Breakfast Bowls' },
    { id: 'pin5', imageUrl: 'https://picsum.photos/seed/prod1/500/750', title: 'The official hoodie of the Code Ninja clan.', productId: 'p1' }, // Shoppable pin
    { id: 'pin6', imageUrl: 'https://picsum.photos/seed/pin6/500/900', title: 'DIY Bookshelf Ideas' },
];

export const mockBoards: Board[] = [
    { id: 'board1', name: 'Home Decor', pins: [mockPins[0], mockPins[5]], coverPinUrl: mockPins[0].imageUrl },
    { id: 'board2', name: 'Tech & Gadgets', pins: [mockPins[1], mockPins[4]], coverPinUrl: mockPins[1].imageUrl },
    { id: 'board3', name: 'Fashion', pins: [mockPins[2]], coverPinUrl: mockPins[2].imageUrl },
];

// Placeholder video URLs
const videoSources = [
    'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
];

export const mockStories: Story[] = [
    { id: 'story1', authorId: 'u2', mediaUrl: 'https://picsum.photos/seed/story1/1080/1920', mediaType: 'image', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), durationSeconds: 5, views: ['u1', 'u3'] },
    { id: 'story2', authorId: 'u2', mediaUrl: videoSources[3], mediaType: 'video', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), durationSeconds: 15, views: ['u1'] },
    { id: 'story3', authorId: 'u4', mediaUrl: 'https://picsum.photos/seed/story2/1080/1920', mediaType: 'image', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), durationSeconds: 5, views: [] },
];

const mockSecuritySettings: Record<string, SecuritySettings> = {
    u1: { mfaEnabled: true, loginAlerts: true },
    u2: { mfaEnabled: false, loginAlerts: true },
    u3: { mfaEnabled: false, loginAlerts: false },
    u4: { mfaEnabled: true, loginAlerts: false },
    u5: { mfaEnabled: false, loginAlerts: true },
};

const mockLoginActivity: Record<string, LoginActivity[]> = {
    u1: [
        { id: 'la1', device: 'Chrome on macOS', location: 'Los Angeles, US', timestamp: new Date().toISOString(), isCurrent: true },
        { id: 'la2', device: 'iPhone 15 Pro', location: 'Los Angeles, US', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), isCurrent: false },
        { id: 'la3', device: 'Safari on macOS', location: 'San Francisco, US', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), isCurrent: false },
    ],
    u2: [{ id: 'la4', device: 'Android, rabt App', location: 'New York, US', timestamp: new Date().toISOString(), isCurrent: true }],
    u3: [{ id: 'la5', device: 'Firefox on Windows', location: 'San Francisco, US', timestamp: new Date().toISOString(), isCurrent: true }],
    u4: [{ id: 'la6', device: 'iPhone 14', location: 'London, UK', timestamp: new Date().toISOString(), isCurrent: true }],
    u5: [{ id: 'la7', device: 'Chrome on Android', location: 'Tokyo, JP', timestamp: new Date().toISOString(), isCurrent: true }],
};


const tempUsers: Omit<User, 'likes'>[] = [
  {
    id: 'u1',
    username: 'dev_alex',
    displayName: 'Alex C. 👨‍💻',
    avatar: 'https://i.pravatar.cc/150?u=alex_doe',
    bitmojiUrl: 'https://api.pravatar.cc/150?u=alex_doe_bitmoji',
    bio: 'Just creating and scrolling ✨',
    followers: 1500,
    following: 250,
    followingIds: ['u2', 'u4', 'u5'],
    location: { lat: 34.0522, lng: -118.2437, city: 'Los Angeles' },
    boards: mockBoards,
    account_type: 'creator',
    subscription_type: 'premium',
    verification_status: 'verified',
    reputation_score: 120,
    securitySettings: mockSecuritySettings.u1,
    loginActivity: mockLoginActivity.u1,
  },
  { id: 'u2', username: 'jane_creates', displayName: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=jane_smith', bio: 'DIY & life hacks. Follow for more!', followers: 23000, following: 300, followingIds: ['u1', 'u3', 'u4', 'u5'], isLive: true, location: { lat: 40.7128, lng: -74.0060, city: 'New York' }, stories: mockStories.filter(s => s.authorId === 'u2'), account_type: 'creator', subscription_type: 'free', verification_status: 'none', reputation_score: 95, securitySettings: mockSecuritySettings.u2, loginActivity: mockLoginActivity.u2 },
  { id: 'u3', username: 'code_ninja', displayName: 'Code Ninja', avatar: 'https://i.pravatar.cc/150?u=code_ninja', bitmojiUrl: 'https://api.pravatar.cc/150?u=code_ninja_bitmoji', bio: 'Turning coffee into code. We sell merch!', followers: 5000, following: 100, followingIds: ['u1', 'u2'], location: { lat: 37.7749, lng: -122.4194, city: 'San Francisco' }, boards: [{ id: 'board4', name: 'Coding Setups', pins: [mockPins[1], mockPins[4]], coverPinUrl: mockPins[1].imageUrl }], account_type: 'business', subscription_type: 'free', verification_status: 'verified', reputation_score: 150, securitySettings: mockSecuritySettings.u3, loginActivity: mockLoginActivity.u3 },
  { id: 'u4', username: 'dance_machine', displayName: 'Art Lover 🎨', avatar: 'https://i.pravatar.cc/150?u=art_lover', bio: 'Teaching you the latest dance trends.', followers: 1.2 * 1000000, following: 450, followingIds: ['u1', 'u2', 'u5'], location: { lat: 51.5072, lng: -0.1276, city: 'London' }, stories: mockStories.filter(s => s.authorId === 'u4'), account_type: 'personal', subscription_type: 'premium', verification_status: 'none', reputation_score: 250, securitySettings: mockSecuritySettings.u4, loginActivity: mockLoginActivity.u4 },
  { id: 'u5', username: 'travel_bug', displayName: 'Travel Bug ✈️', avatar: 'https://i.pravatar.cc/150?u=travel_bug', bio: 'Exploring one country at a time.', followers: 12000, following: 150, followingIds: ['u1', 'u2', 'u4'], location: { lat: 35.6895, lng: 139.6917, city: 'Tokyo' }, account_type: 'personal', subscription_type: 'free', verification_status: 'none', reputation_score: 80, securitySettings: mockSecuritySettings.u5, loginActivity: mockLoginActivity.u5 },
  { id: 'bot1', username: 'TokTikBot', displayName: 'TokTik Bot', avatar: 'https://i.pravatar.cc/150?u=toktik_bot', bio: 'I am a helpful bot. Type /help', followers: 0, following: 0, followingIds: [], isBot: true, account_type: 'personal', subscription_type: 'free', verification_status: 'none', reputation_score: 0 },
];

const mockComments: Comment[] = [
  { id: 'c1', authorId: 'u2', content: 'This is hilarious! 😂', type: 'text', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), likes_count: 15 },
  { id: 'c2', authorId: 'u3', content: 'Great tutorial!', type: 'text', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), likes_count: 22 },
  { id: 'c4', authorId: 'u4', type: 'sticker', stickerUrl: 'https://picsum.photos/seed/sticker1/128', timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(), likes_count: 5 },
  { id: 'c5', authorId: 'u1', type: 'voice', durationSeconds: 8, timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), likes_count: 2 },
];

export const mockVideoPosts: VideoPost[] = [
  {
    id: 'v1',
    authorId: 'u2',
    videoUrl: videoSources[0],
    thumbnailUrl: 'https://picsum.photos/seed/thumb1/400/800',
    caption: 'My morning routine. What do you think? #morningroutine #dayinthelife',
    sound: mockSounds[0],
    reactions: [{userId: 'u1', type: 'like'}, {userId: 'u3', type: 'like'}],
    comments: mockComments,
    shares: 2300,
    saves: 450,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    effects: ['Beauty Filter', 'Vintage VHS'],
    allowDuets: true,
    quality: 'HD',
    visibility: 'public',
    tags: ['morningroutine', 'dayinthelife'],
    is_pinned: false,
    views: 150000,
  },
  {
    id: 'v2',
    authorId: 'u3',
    videoUrl: videoSources[1],
    thumbnailUrl: 'https://picsum.photos/seed/thumb2/400/800',
    caption: 'React tip you probably didn\'t know! #coding #webdev #reactjs',
    sound: mockSounds[1],
    reactions: [],
    comments: [{ id: 'c3', authorId: 'u1', content: 'Mind blown 🤯', type: 'text', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), likes_count: 42 }],
    shares: 5400,
    saves: 1200,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    effects: ['Green Screen'],
    allowDuets: true,
    quality: 'HD',
    visibility: 'public',
    tags: ['coding', 'webdev', 'reactjs'],
    is_pinned: false,
    views: 250000,
  },
  {
    id: 'v3',
    authorId: 'u4',
    videoUrl: videoSources[2],
    thumbnailUrl: 'https://picsum.photos/seed/thumb3/400/800',
    caption: 'New dance challenge alert! Can you do this? #dancechallenge #fyp',
    sound: mockSounds[2],
    reactions: [],
    comments: [],
    shares: 150000,
    saves: 12000,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    effects: ['Disco Lights'],
    allowDuets: false,
    quality: '4K',
    visibility: 'public',
    tags: ['dancechallenge', 'fyp'],
    is_pinned: false,
    views: 12000000,
  },
   {
    id: 'v4',
    authorId: 'u5',
    videoUrl: videoSources[3],
    thumbnailUrl: 'https://picsum.photos/seed/thumb4/400/800',
    caption: 'This place is unreal! 📍Bali, Indonesia #travel #wanderlust',
    sound: mockSounds[3],
    reactions: [],
    comments: [],
    shares: 22000,
    saves: 800,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    effects: ['Drone Zoom'],
    allowDuets: true,
    quality: 'HD',
    visibility: 'public',
    tags: ['travel', 'wanderlust'],
    is_pinned: false,
    views: 500000,
  },
  {
    id: 'v5',
    authorId: 'u1',
    videoUrl: videoSources[4],
    thumbnailUrl: 'https://picsum.photos/seed/thumb5/400/800',
    caption: 'Trying the viral recipe hack #foodhacks #recipe',
    sound: mockSounds[0],
    reactions: [],
    comments: [],
    shares: 500,
    saves: 50,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    effects: ['Zoom In'],
    allowDuets: true,
    quality: 'SD',
    visibility: 'public',
    tags: ['foodhacks', 'recipe'],
    is_pinned: false,
    views: 12000,
  },
  {
    id: 'v6',
    authorId: 'u2',
    videoUrl: videoSources[0],
    thumbnailUrl: 'https://picsum.photos/seed/thumb6/400/800',
    caption: 'Duetting with @dance_machine! Did I nail it? #duet',
    sound: mockSounds[2],
    reactions: [],
    comments: [],
    shares: 1200,
    saves: 150,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(),
    duetWithVideoId: 'v3',
    effects: [],
    allowDuets: true,
    quality: 'HD',
    visibility: 'public',
    tags: ['duet'],
    is_pinned: false,
    views: 75000,
  }
];

export const mockUsers: User[] = tempUsers.map(user => ({
    ...user,
    likes: mockVideoPosts.filter(p => p.authorId === user.id).reduce((sum, p) => sum + p.reactions.length, 0)
}));

export const loggedInUser: User = { 
    ...mockUsers.find(u => u.id === 'u1')!,
};

const messages1: Message[] = [
  { id: 'm1', senderId: 'u2', type: 'text', text: 'Hey Alex! Loved your last video!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), isRead: true },
  { id: 'm2', senderId: 'u1', type: 'text', text: 'Thanks Jane! Yours are always so creative.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), isRead: true },
  { id: 'm3', senderId: 'u2', type: 'voice', text: 'Voice message', durationSeconds: 7, timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), isRead: false },
];

const messages2: Message[] = [
  { id: 'm4', senderId: 'u4', type: 'text', text: 'Wanna collab on a dance video?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), isRead: true },
  { id: 'm5', senderId: 'u1', type: 'text', text: 'Definitely! I\'m not a great dancer though haha', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), isRead: false },
  { id: 'm7', senderId: 'u1', type: 'share', sharedVideoPostId: 'v3', text: 'You killed this one!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), isRead: false },
];

export const mockConversations: Conversation[] = [
  { id: 'conv1', participants: ['u1', 'u2'], messages: messages1 },
  { id: 'conv2', participants: ['u1', 'u4'], messages: messages2 },
];

export const mockHashtags: Hashtag[] = [
    { tag: 'fyp', videoCount: 1.2 * 1000000000 },
    { tag: 'dancechallenge', videoCount: 580 * 1000000 },
    { tag: 'tutorial', videoCount: 230 * 1000000 },
    { tag: 'comedy', videoCount: 890 * 1000000 },
    { tag: 'foodhacks', videoCount: 150 * 1000000 },
];

export const mockStatuses: Status[] = [
    { id: 'st1', authorId: 'u2', contentUrl: 'https://picsum.photos/seed/status1/1080/1920', type: 'image', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { id: 'st2', authorId: 'u4', contentUrl: videoSources[3], type: 'video', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
    { id: 'st3', authorId: 'u5', contentUrl: 'https://picsum.photos/seed/status2/1080/1920', type: 'image', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() },
];

export const mockProducts: Product[] = [
    { id: 'p1', name: 'Ninja Hoodie', price: '$49.99', imageUrl: 'https://picsum.photos/seed/prod1/400', description: 'The official hoodie of the Code Ninja clan.', allowVirtualTryOn: true},
    { id: 'p2', name: 'Binary Mug', price: '$15.99', imageUrl: 'https://picsum.photos/seed/prod2/400', description: 'Drink your coffee in style.'},
    { id: 'p3', name: 'Sticker Pack', price: '$9.99', imageUrl: 'https://picsum.photos/seed/prod3/400', description: 'High-quality vinyl stickers for your laptop.'},
];

export const mockAnalytics: CreatorAnalytics = {
    totalViews: 12700000,
    watchTimeHours: 8900,
    followerGrowth: [
        { date: 'Mon', change: 120 },
        { date: 'Tue', change: 250 },
        { date: 'Wed', change: 180 },
        { date: 'Thu', change: 300 },
        { date: 'Fri', change: 450 },
        { date: 'Sat', change: 600 },
        { date: 'Sun', change: 520 },
    ]
};

const earningsBreakdown = {
    subscriptions: 1250.50,
    advertisements: 850.25,
    premiumContent: 300.00,
    virtualGifts: 575.75,
    nftSales: 2500.00,
    affiliate: 125.10,
};

export const mockCreatorEarnings: CreatorEarnings = {
    total: Object.values(earningsBreakdown).reduce((sum, val) => sum + val, 0),
    breakdown: earningsBreakdown,
    period: 'month',
    currency: 'USD',
};

// --- New Discord/Telegram Mock Data ---

export const mockRoles: Role[] = [
    { id: 'r1', name: 'Admin', color: '#F87171' }, // red-400
    { id: 'r2', name: 'Moderator', color: '#60A5FA' }, // blue-400
    { id: 'r3', name: 'Member', color: '#E5E7EB' }, // gray-200
    { id: 'r4', name: 'Bot', color: '#34D399' }, // emerald-400
];

const server1Messages: ServerMessage[] = [
    { id: 'sm1', serverId: 's1', channelId: 'ch1', senderId: 'u2', text: 'Welcome to the official creators server!', type: 'text', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
    { id: 'sm2', serverId: 's1', channelId: 'ch1', senderId: 'u3', text: 'Glad to be here. Any tips for growing my channel?', type: 'text', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() },
    { id: 'sm3', serverId: 's1', channelId: 'ch2', senderId: 'u4', text: 'Just dropped a new dance tutorial, check it out in #announcements!', type: 'text', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
    { id: 'sm4', serverId: 's1', channelId: 'ch1', senderId: 'bot1', text: 'Hello! I am TokTikBot. Type `/help` for a list of commands.', type: 'text', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
];

// --- New Reddit Mock Data ---
export const mockForumComments: NestedComment[] = [
    { id: 'fc1', authorId: 'u2', content: 'This is a great point. I never thought about it that way.', upvotes: 15, timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(), replies: [
        { id: 'fc2', authorId: 'u3', content: 'Exactly! It changes the whole perspective.', upvotes: 8, timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), replies: [] },
    ]},
    { id: 'fc3', authorId: 'u4', content: 'I disagree, I think the original method is better.', upvotes: -5, timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), replies: [] },
];

export const mockForumPosts: ForumPost[] = [
    { id: 'fp1', authorId: 'u1', title: 'What is the best state management library for React?', content: 'I have been using Redux for a while, but I am curious about other options like Zustand or Jotai. What are your thoughts?', upvotes: 124, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), comments: mockForumComments },
    { id: 'fp2', authorId: 'u3', title: 'Showdev: I made a tool to generate code snippets automatically', content: 'Check out my new project on GitHub! It uses AI to generate boilerplate code for you. Link in the comments.', upvotes: 350, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), comments: [] },
];


export const mockServers: Server[] = [
    {
        id: 's1',
        name: 'Official Creators Hub',
        iconUrl: 'https://picsum.photos/seed/server1/100',
        members: [
            { userId: 'u1', roleId: 'r2' },
            { userId: 'u2', roleId: 'r1' },
            { userId: 'u3', roleId: 'r3' },
            { userId: 'u4', roleId: 'r3' },
            { userId: 'bot1', roleId: 'r4' },
        ],
        categories: [
            {
                id: 'cat1',
                name: 'Text Channels',
                channels: [
                    { id: 'ch1', name: 'general', type: 'text', messages: server1Messages.filter(m => m.channelId === 'ch1') },
                    { id: 'ch2', name: 'announcements', type: 'text', messages: server1Messages.filter(m => m.channelId === 'ch2') },
                ],
            },
            {
                id: 'cat2',
                name: 'Voice Channels',
                channels: [
                    { id: 'ch3', name: 'Lounge', type: 'voice', messages: [] },
                    { id: 'ch4', name: 'Collab Planning', type: 'voice', messages: [] },
                ]
            }
        ]
    },
    {
        id: 's2',
        name: 'Gamers Assemble',
        iconUrl: 'https://picsum.photos/seed/server2/100',
        members: [{ userId: 'u1', roleId: 'r3' }, { userId: 'u3', roleId: 'r1' }],
        categories: [
             {
                id: 'cat3',
                name: 'Main',
                channels: [
                    { id: 'ch5', name: 'off-topic', type: 'text', messages: [] }
                ]
             }
        ]
    },
    {
        id: 's3',
        name: 'TokTik Forums',
        iconUrl: 'https://picsum.photos/seed/server3/100',
        members: [{ userId: 'u1', roleId: 'r3' }, { userId: 'u2', roleId: 'r2' }, { userId: 'u3', roleId: 'r3' }, { userId: 'u4', roleId: 'r3' }],
        categories: [
             {
                id: 'cat4',
                name: 'Community Hub',
                channels: [
                    { id: 'ch6', name: 'dev-talk', type: 'forum', messages: [], posts: mockForumPosts },
                    { id: 'ch7', name: 'ama-with-creator', type: 'ama', messages: [], posts: [{ id: 'fp3', authorId: 'u4', title: 'AMA: I\'m a professional dancer with 1.2M followers, ask me anything!', content: 'I\'ll be answering questions live on Friday at 3pm EST. Submit your questions below and upvote your favorites!', upvotes: 500, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), comments: [] }] }
                ]
             }
        ]
    }
];

export const mockBroadcasts: Broadcast[] = [
    {
        id: 'b1',
        authorId: 'u4',
        name: "Art Lover's Updates",
        description: "Behind the scenes, new videos, and more!",
        subscribers: 1100000,
        messages: [
            { id: 'bm1', text: 'New video dropping tomorrow at 5 PM EST! Get ready for the biggest challenge yet. 🔥', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), views: 250000 },
            { id: 'bm2', text: 'Here\'s a sneak peek from the new video set!', mediaUrl: 'https://picsum.photos/seed/broadcast1/400/300', mediaType: 'image', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), views: 180000 },
        ]
    }
];


export const mockGenericPosts: GenericPost[] = [
    {
        id: 'gp1',
        authorId: 'u3',
        content: 'Just pushed a major update to my side project! Feeling accomplished today. Check out the new features and let me know what you think. #webdev #coding #react',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        reactions: [{userId: 'u1', type: 'like'}, {userId: 'u2', type: 'love'}],
        comments: [],
        shares: 12,
        saves: 5,
        visibility: 'public',
        tags: ['webdev', 'coding', 'react'],
        is_pinned: true,
        views: 500,
    },
    {
        id: 'gp2',
        authorId: 'u5',
        content: 'The street food in Tokyo is on another level. This is takoyaki, and it was incredible! 🐙',
        imageUrls: ['https://picsum.photos/seed/post2/1200/800'],
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        reactions: [{userId: 'u1', type: 'love'}, {userId: 'u2', type: 'wow'}, {userId: 'u4', type: 'like'}],
        comments: mockComments.slice(0, 2),
        shares: 56,
        saves: 23,
        visibility: 'public',
        tags: ['travel', 'food', 'tokyo'],
        is_pinned: false,
        views: 2300,
    },
    {
        id: 'gp3',
        authorId: 'u2',
        content: 'Working on some new DIY home decor projects. Which of these two styles do you prefer for a living room refresh? Let me know in the comments! 👇',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        reactions: [],
        comments: [],
        shares: 5,
        saves: 2,
        visibility: 'followers',
        tags: ['diy', 'homedecor'],
        is_pinned: false,
        views: 800,
    },
    {
        id: 'gp4',
        authorId: 'u4',
        content: 'Photo dump from my last performance! 📸 So grateful for everyone who came out to support. The energy was electric! ⚡️',
        imageUrls: [
            'https://picsum.photos/seed/post4a/800/600',
            'https://picsum.photos/seed/post4b/600/800',
            'https://picsum.photos/seed/post4c/800/800',
            'https://picsum.photos/seed/post4d/600/600',
        ],
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        reactions: [{userId: 'u1', type: 'love'}, {userId: 'u2', type: 'wow'}, {userId: 'u5', type: 'like'}],
        comments: [],
        shares: 98,
        saves: 41,
        visibility: 'public',
        is_pinned: false,
        views: 15000,
    },
    {
        id: 'gp5',
        authorId: 'u1',
        content: 'A quick screen recording of the new animation library I\'m working on. Smooth, right? 😉',
        videoUrl: videoSources[4],
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        reactions: [{userId: 'u3', type: 'like'}],
        comments: [],
        shares: 3,
        saves: 1,
        visibility: 'friends',
        tags: ['programming', 'animation'],
        is_pinned: false,
        views: 1100,
    }
];
