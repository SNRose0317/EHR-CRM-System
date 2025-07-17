/**
 * Global error logger utility
 * Captures and logs all errors for debugging
 */
class ErrorLogger {
    constructor() {
        this.logs = [];
        this.maxLogs = 50;
        this.originalConsoleError = console.error;
        this.setupErrorHandlers();
    }
    setupErrorHandlers() {
        // Override console.error to capture all console errors
        console.error = (...args) => {
            this.logError({
                timestamp: new Date().toISOString(),
                type: 'console',
                message: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' '),
                stack: new Error().stack
            });
            // Call original console.error
            this.originalConsoleError.apply(console, args);
        };
        // Only set up browser-specific handlers if we're in a browser environment
        if (typeof window !== 'undefined') {
            // Global error handler
            window.addEventListener('error', (event) => {
                this.logError({
                    timestamp: new Date().toISOString(),
                    type: 'error',
                    message: event.message,
                    stack: event.error?.stack,
                    source: event.filename,
                    lineno: event.lineno,
                    colno: event.colno,
                    error: event.error
                });
            });
            // Unhandled promise rejection handler
            window.addEventListener('unhandledrejection', (event) => {
                this.logError({
                    timestamp: new Date().toISOString(),
                    type: 'unhandledRejection',
                    message: `Unhandled Promise Rejection: ${event.reason}`,
                    stack: event.reason?.stack,
                    error: event.reason
                });
            });
        }
    }
    logError(entry) {
        this.logs.push(entry);
        // Keep only the last maxLogs entries
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs);
        }
        // Save to localStorage (browser only)
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                localStorage.setItem('errorLogger', JSON.stringify(this.logs));
            }
            catch (e) {
                // Ignore localStorage errors
            }
        }
        // Log to console for immediate visibility
        console.log('🔴 Error Logged:', entry);
    }
    getLogs() {
        return [...this.logs];
    }
    clearLogs() {
        this.logs = [];
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                localStorage.removeItem('errorLogger');
            }
            catch (e) {
                // Ignore localStorage errors
            }
        }
    }
    getLastError() {
        return this.logs[this.logs.length - 1] || null;
    }
    exportLogs() {
        return JSON.stringify(this.logs, null, 2);
    }
    printLogs() {
        console.log('=== ERROR LOGGER HISTORY ===');
        this.logs.forEach((log, index) => {
            console.log(`\n--- Error ${index + 1} ---`);
            console.log('Timestamp:', log.timestamp);
            console.log('Type:', log.type);
            console.log('Message:', log.message);
            if (log.source)
                console.log('Source:', log.source);
            if (log.lineno)
                console.log('Line:', log.lineno);
            if (log.colno)
                console.log('Column:', log.colno);
            if (log.stack)
                console.log('Stack:', log.stack);
            if (log.error)
                console.log('Error Object:', log.error);
        });
        console.log('=========================');
    }
}
// Create singleton instance
const errorLogger = new ErrorLogger();
// Expose to window for debugging
if (typeof window !== 'undefined') {
    window.errorLogger = errorLogger;
}
export default errorLogger;
//# sourceMappingURL=errorLogger.js.map