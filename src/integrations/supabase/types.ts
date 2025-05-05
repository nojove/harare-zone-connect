export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agent_codes: {
        Row: {
          agent_id: string
          code: string
          created_at: string
          id: string
          is_active: boolean
        }
        Insert: {
          agent_id: string
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
        }
        Update: {
          agent_id?: string
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "agent_codes_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      banners: {
        Row: {
          category_id: string | null
          content: string
          created_at: string
          end_date: string
          id: string
          image: string | null
          is_flagged: boolean
          placement: string
          profile_id: string
          start_date: string
          status: string
          title: string
          updated_at: string
          video: string | null
        }
        Insert: {
          category_id?: string | null
          content: string
          created_at?: string
          end_date: string
          id?: string
          image?: string | null
          is_flagged?: boolean
          placement: string
          profile_id: string
          start_date: string
          status?: string
          title: string
          updated_at?: string
          video?: string | null
        }
        Update: {
          category_id?: string | null
          content?: string
          created_at?: string
          end_date?: string
          id?: string
          image?: string | null
          is_flagged?: boolean
          placement?: string
          profile_id?: string
          start_date?: string
          status?: string
          title?: string
          updated_at?: string
          video?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "banners_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "banners_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          name: string
          type: string
        }
        Insert: {
          color: string
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          name: string
          type: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      classifieds: {
        Row: {
          category_id: string | null
          contact_info: string
          created_at: string
          description: string
          expires_at: string
          id: string
          images: string[] | null
          is_flagged: boolean
          location: string
          price: number | null
          profile_id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          contact_info: string
          created_at?: string
          description: string
          expires_at: string
          id?: string
          images?: string[] | null
          is_flagged?: boolean
          location: string
          price?: number | null
          profile_id: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          contact_info?: string
          created_at?: string
          description?: string
          expires_at?: string
          id?: string
          images?: string[] | null
          is_flagged?: boolean
          location?: string
          price?: number | null
          profile_id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classifieds_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classifieds_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      directory_listings: {
        Row: {
          bio: string | null
          business_name: string | null
          cell_number: string
          created_at: string
          id: string
          is_visible: boolean
          location: string
          name: string
          profile_id: string
          service_type: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          business_name?: string | null
          cell_number: string
          created_at?: string
          id?: string
          is_visible?: boolean
          location: string
          name: string
          profile_id: string
          service_type?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          business_name?: string | null
          cell_number?: string
          created_at?: string
          id?: string
          is_visible?: boolean
          location?: string
          name?: string
          profile_id?: string
          service_type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "directory_listings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          description: string
          end_date: string | null
          event_date: string
          has_rsvp: boolean
          id: string
          image: string | null
          is_flagged: boolean
          location: string
          map_location: Json | null
          profile_id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          end_date?: string | null
          event_date: string
          has_rsvp?: boolean
          id?: string
          image?: string | null
          is_flagged?: boolean
          location: string
          map_location?: Json | null
          profile_id: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string | null
          event_date?: string
          has_rsvp?: boolean
          id?: string
          image?: string | null
          is_flagged?: boolean
          location?: string
          map_location?: Json | null
          profile_id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          allow_call: boolean
          allow_email: boolean
          allow_sms: boolean
          bio: string | null
          business_name: string | null
          cell_number: string
          created_at: string
          full_name: string
          id: string
          is_visible: boolean
          location: string
          role: Database["public"]["Enums"]["user_role"]
          service_type: string | null
          updated_at: string
        }
        Insert: {
          allow_call?: boolean
          allow_email?: boolean
          allow_sms?: boolean
          bio?: string | null
          business_name?: string | null
          cell_number: string
          created_at?: string
          full_name: string
          id: string
          is_visible?: boolean
          location: string
          role?: Database["public"]["Enums"]["user_role"]
          service_type?: string | null
          updated_at?: string
        }
        Update: {
          allow_call?: boolean
          allow_email?: boolean
          allow_sms?: boolean
          bio?: string | null
          business_name?: string | null
          cell_number?: string
          created_at?: string
          full_name?: string
          id?: string
          is_visible?: boolean
          location?: string
          role?: Database["public"]["Enums"]["user_role"]
          service_type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          agent_code_id: string | null
          amount: number
          created_at: string
          currency: string
          id: string
          item_id: string
          item_type: string
          payment_method: string
          payment_reference: string | null
          profile_id: string
          status: string
        }
        Insert: {
          agent_code_id?: string | null
          amount: number
          created_at?: string
          currency?: string
          id?: string
          item_id: string
          item_type: string
          payment_method: string
          payment_reference?: string | null
          profile_id: string
          status?: string
        }
        Update: {
          agent_code_id?: string | null
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          item_id?: string
          item_type?: string
          payment_method?: string
          payment_reference?: string | null
          profile_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_agent_code_id_fkey"
            columns: ["agent_code_id"]
            isOneToOne: false
            referencedRelation: "agent_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
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
      user_role: "user" | "agent" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["user", "agent", "admin"],
    },
  },
} as const
