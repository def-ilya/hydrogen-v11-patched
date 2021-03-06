import React, { createContext, useMemo, useCallback, 
// @ts-ignore
useTransition, } from 'react';
const PRIVATE_PROPS = ['request', 'response'];
export const ServerStateContext = createContext(null);
export function ServerStateProvider({ serverState, setServerState, children, }) {
    const [pending, startTransition] = useTransition();
    const setServerStateCallback = useCallback((input, propValue) => {
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
    const value = useMemo(() => ({
        pending,
        serverState,
        setServerState: setServerStateCallback,
    }), [serverState, setServerStateCallback, pending]);
    return (React.createElement(ServerStateContext.Provider, { value: value }, children));
}
