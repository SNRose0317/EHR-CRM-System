/**
 * Global error logger utility
 * Captures and logs all errors for debugging
 */
interface ErrorLogEntry {
    timestamp: string;
    type: 'error' | 'unhandledRejection' | 'console';
    message: string;
    stack?: string;
    source?: string;
    lineno?: number;
    colno?: number;
    error?: any;
}
declare class ErrorLogger {
    private logs;
    private maxLogs;
    private originalConsoleError;
    constructor();
    private setupErrorHandlers;
    private logError;
    getLogs(): ErrorLogEntry[];
    clearLogs(): void;
    getLastError(): ErrorLogEntry | null;
    exportLogs(): string;
    printLogs(): void;
}
declare const errorLogger: ErrorLogger;
export default errorLogger;
//# sourceMappingURL=errorLogger.d.ts.map