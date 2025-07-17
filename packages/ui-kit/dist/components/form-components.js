import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Reusable Form Section Component
export const FormSection = ({ title, description, children }) => (_jsxs("div", { className: "bg-card rounded-2xl p-6 border border-border shadow-lg", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-lg font-bold text-foreground", children: title }), description && (_jsx("p", { className: "text-sm text-muted-foreground mt-1", children: description }))] }), children] }));
// Reusable Form Field Component
export const FormField = ({ label, description, children }) => (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-secondary-foreground mb-1", children: label }), description && (_jsx("p", { className: "text-xs text-muted-foreground mb-2 leading-relaxed", children: description })), children] }));
//# sourceMappingURL=form-components.js.map