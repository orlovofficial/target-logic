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
    edges: Post[];
    count: number;
    page_info: {
      end_cursor: string;
      has_next_page: boolean;
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
  edge_liked_by?: {
    count: number
  };
  edge_threaded_comments: {
    count: number;
    edges: Comment[];
    page_info: {
      end_cursor: string;
      has_next_page: boolean;
    }
  }
}

export interface Post {
  thumbnail_src?: string;
  display_resources?: Array<any>;
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
  taken_at_timestamp?: string;
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
  edge_media_to_parent_comment?: {
    count?: number;
    page_info: {
      end_cursor: string;
      has_next_page: boolean;
    };
    edges: Comment[];
  };
  __typename?: string;
  owner?: User;
  comments_disabled?: boolean;
  edge_sidecar_to_children?: any;
  is_video?: boolean;
  video_url?: string;
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

export interface Tag {
  description?: string;
  edge_hashtag_to_media?: {
    count: number;
    edges: Post[];
    page_info: {
      end_cursor: string;
      has_next_page: boolean;
    };
  };
  edge_hashtag_to_related_tags?: {
    edges: any;
  };
  edge_hashtag_to_top_posts?: {
    edges: Post[];
  };
  id?: string;
  name?: string;
  profile_pic_url?: string;
}

export interface Place {
  address_json?: string;
  blurb?: string;
  directory?: {
    city: {
      id: string;
      name: string;
      slug: string;
    };
    country: {
      id: string;
      name: string;
      slug: string;
    };
  };
  edge_location_to_media?: {
    count: number;
    edges: Post[];
    page_info: {
      end_cursor: string;
      has_next_page: boolean;
    };
  };
  edge_location_to_top_posts?: {
    count: number;
    edges: Post[];
    page_info: {
      end_cursor: string;
      has_next_page: boolean;
    };
  };
  id?: string;
  lat?: number;
  lng?: number;
  name?: string;
  phone?: string;
  profile_pic_url?: string;
  slug?: string;
  website?: string;
}

export interface SearchState {
  searchList: Search[];
}

export interface UserPageState {
  data: User;
  hashtag: Tag;
  location: Place;
  viewType: string;
  isLoadNow: boolean;
}

export interface PostPageState {
  data: Post;
  viewType: string;
  isLoadNow: boolean;
}
