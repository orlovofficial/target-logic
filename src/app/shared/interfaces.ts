export interface User {
  profile_pic_url?: string;
  profile_pic_url_hd?: string;
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
  edge_owner_to_timeline_media?: {
    edges: Post[],
    count: number,
    page_info: {
      end_cursor: string,
      has_next_page: boolean
    }
  };
  business_category_name?: string;
  category_enum?: string;
  category_id?: string;
}

export interface Comment {
  created_at: number;
  id: string;
  owner: User;
  text: string;
}

export interface Post {
  thumbnail_src?: string;
  display_url?: string;
  location?: {
    id: string;
    name: string;
    slug: string;
  };
  edge_media_to_caption?: {
    edges: Array<{
      node: {
        text: string;
      };
    }>;
  };
  taken_at_timestamp?: number;
  edge_media_preview_like?: {
    count: number;
  };
  edge_media_to_comment?: {
    count: number;
    edges: Comment[];
    page_info: {
      end_cursor: string;
      has_next_page: boolean;
    };
  };
  video_view_count?: number;
  id?: string
  shortcode?: string;
  __typename?: string;
  owner?: User;
  comments_disabled?: boolean;
  edge_media_to_tagged_user?: {
    edges: any;
  };
  accessibility_caption?: string;
}

export interface Search {
  img: string;
  name: string;
  title: string;
  position: number;
  href?: string;
  is_verified?: boolean;
}

export interface SearchState {
  searchList: Search[]
}

export interface UserPageState {
  data: User,
  viewType: string
}
