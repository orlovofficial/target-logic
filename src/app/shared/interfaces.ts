export interface User {
  profile_pic_url?: string;
  username?: string;
  id?: string;
  full_name?: string;
  biography?: string;
  external_url?: string;
  is_verified?: boolean;
  is_private?: boolean;
  edge_felix_video_timeline?: any;
  edge_follow?: any;
  edge_followed_by?: any;
  edge_owner_to_timeline_media?: any;
}

export interface Post {
  thumbnail_src?: string;
  location?: any;
  edge_media_to_caption?: any;
  taken_at_timestamp?: number;
  edge_liked_by?: any;
  edge_media_to_comment?: any;
  video_view_count?: number;
  id?: string
  shortcode?: string;
  __typename?: string;
  comments_disabled?: boolean;
  owner?: any;
  accessibility_caption?: string;
}
