export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comment: {
        Row: {
          created_at: string
          id: number
          post_id: number
          profile_id: number
          text: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          post_id: number
          profile_id: number
          text?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number
          profile_id?: number
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      like: {
        Row: {
          created_at: string
          id: number
          post_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          post_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "like_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      post: {
        Row: {
          created_at: string
          id: number
          image_url: string | null
          profile_id: number
          text: string | null
          title: string
          type: string | null
          user_id: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image_url?: string | null
          profile_id: number
          text?: string | null
          title: string
          type?: string | null
          user_id: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image_url?: string | null
          profile_id?: number
          text?: string | null
          title?: string
          type?: string | null
          user_id?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          about: string | null
          avatar_url: string | null
          cover_url: string | null
          created_at: string
          email: string
          id: number
          name: string
          type: string | null
          user_id: string
          username: string
        }
        Insert: {
          about?: string | null
          avatar_url?: string | null
          cover_url?: string | null
          created_at?: string
          email: string
          id?: number
          name: string
          type?: string | null
          user_id: string
          username: string
        }
        Update: {
          about?: string | null
          avatar_url?: string | null
          cover_url?: string | null
          created_at?: string
          email?: string
          id?: number
          name?: string
          type?: string | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      subscription: {
        Row: {
          active: boolean
          amount: number | null
          created_at: string
          creator_profile_id: number
          fan_profile_id: number
          id: number
          stripe_customer_id: string
        }
        Insert: {
          active: boolean
          amount?: number | null
          created_at?: string
          creator_profile_id: number
          fan_profile_id: number
          id?: number
          stripe_customer_id: string
        }
        Update: {
          active?: boolean
          amount?: number | null
          created_at?: string
          creator_profile_id?: number
          fan_profile_id?: number
          id?: number
          stripe_customer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_creator_profile_id_fkey"
            columns: ["creator_profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_fan_profile_id_fkey"
            columns: ["fan_profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
