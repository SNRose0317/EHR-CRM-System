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
export type UUID = string;
export type Timestamp = string;
//# sourceMappingURL=index.d.ts.map