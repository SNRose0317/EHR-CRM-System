// Common types and interfaces for the platform
export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface DatabaseError {
  message: string;
  code?: string;
  details?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: DatabaseError;
}

// Re-export commonly used types that might be shared across packages
export type UUID = string;
export type Timestamp = string;