"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerStateProvider = exports.ServerStateContext = void 0;
const react_1 = __importStar(require("react"));
const PRIVATE_PROPS = ['request', 'response'];
exports.ServerStateContext = (0, react_1.createContext)(null);
function ServerStateProvider({ serverState, setServerState, children, }) {
    const [pending, startTransition] = (0, react_1.useTransition)();
    const setServerStateCallback = (0, react_1.useCallback)((input, propValue) => {
        /**
         * By wrapping this state change in a transition, React renders the new state
         * concurrently in a new "tree" instead of Suspending and showing the (blank)
         * fallback. This is preferred behavior, though we may want to revisit how
         * we make this decision globally for the developer - and consider providing
         * the `pending` flag also provided by the hook to display in the UI.
         */
        startTransition(() => {
            return setServerState((prev) => {
                let newValue;
                if (typeof input === 'function') {
                    newValue = input(prev);
                }
                else if (typeof input === 'string') {
                    newValue = { [input]: propValue };
                }
                else {
                    newValue = input;
                }
                if (__DEV__) {
                    const privateProp = PRIVATE_PROPS.find((prop) => prop in newValue);
                    if (privateProp) {
                        console.warn(`Custom "${privateProp}" property in server state is ignored. Use a different name.`);
                    }
                }
                return {
                    ...prev,
                    ...newValue,
                };
            });
        });
    }, [setServerState, startTransition]);
    const value = (0, react_1.useMemo)(() => ({
        pending,
        serverState,
        setServerState: setServerStateCallback,
    }), [serverState, setServerStateCallback, pending]);
    return (react_1.default.createElement(exports.ServerStateContext.Provider, { value: value }, children));
}
exports.ServerStateProvider = ServerStateProvider;
