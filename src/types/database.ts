export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          bio: string | null
          full_name: string
          profile_id: number
          roles: Database["public"]["Enums"]["user_roles"][] | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          full_name: string
          profile_id?: number
          roles?: Database["public"]["Enums"]["user_roles"][] | null
          user_id: string
        }
        Update: {
          bio?: string | null
          full_name?: string
          profile_id?: number
          roles?: Database["public"]["Enums"]["user_roles"][] | null
          user_id?: string
        }
        Relationships: []
      }
      routes: {
        Row: {
          city: string
          description: string | null
          name: string
          points: Json
          route_id: string
          type: Database["public"]["Enums"]["route_type"]
          user_id: number
        }
        Insert: {
          city?: string
          description?: string | null
          name: string
          points: Json
          route_id?: string
          type?: Database["public"]["Enums"]["route_type"]
          user_id: number
        }
        Update: {
          city?: string
          description?: string | null
          name?: string
          points?: Json
          route_id?: string
          type?: Database["public"]["Enums"]["route_type"]
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "routes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      routes_favourite: {
        Row: {
          created_at: string
          record_id: string
          route_id: string
          user_id: number
        }
        Insert: {
          created_at?: string
          record_id?: string
          route_id: string
          user_id: number
        }
        Update: {
          created_at?: string
          record_id?: string
          route_id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "routes_favourite_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["route_id"]
          },
          {
            foreignKeyName: "routes_favourite_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      routes_moderation_history: {
        Row: {
          happened_at: string
          moderator_id: number | null
          record_id: string
          route_id: string
          status: Database["public"]["Enums"]["route_status"]
        }
        Insert: {
          happened_at?: string
          moderator_id?: number | null
          record_id?: string
          route_id: string
          status?: Database["public"]["Enums"]["route_status"]
        }
        Update: {
          happened_at?: string
          moderator_id?: number | null
          record_id?: string
          route_id?: string
          status?: Database["public"]["Enums"]["route_status"]
        }
        Relationships: [
          {
            foreignKeyName: "routes_moderation_history_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "routes_moderation_history_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["route_id"]
          },
        ]
      }
      routes_photos: {
        Row: {
          id: string
          path_to: string
          route_id: string
        }
        Insert: {
          id?: string
          path_to: string
          route_id: string
        }
        Update: {
          id?: string
          path_to?: string
          route_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "routes_photos_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["route_id"]
          },
        ]
      }
      routes_ratings: {
        Row: {
          created_at: string
          rating: number
          rating_id: string
          route_id: string
          user_id: number
        }
        Insert: {
          created_at?: string
          rating: number
          rating_id?: string
          route_id: string
          user_id: number
        }
        Update: {
          created_at?: string
          rating?: number
          rating_id?: string
          route_id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "routes_rating_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["route_id"]
          },
          {
            foreignKeyName: "routes_rating_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
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
      route_status: "uploaded" | "published" | "rejected" | "deleted"
      route_type: "bicycle" | "pedestrian"
      user_roles: "admin" | "default"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      route_status: ["uploaded", "published", "rejected", "deleted"],
      route_type: ["bicycle", "pedestrian"],
      user_roles: ["admin", "default"],
    },
  },
} as const
