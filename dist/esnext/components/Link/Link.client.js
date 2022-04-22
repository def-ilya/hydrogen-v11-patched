import React, { useCallback } from 'react';
import { useRouter } from '../Router';
import { createPath } from 'history';
import { useNavigate } from '../../hooks/useNavigate';
/**
 * The `Link` component lets users navigate from one page to another.
 * It renders an accessible `<a>` element.
 */
export const Link = React.forwardRef(function Link(props, ref) {
    const navigate = useNavigate();
    const { location } = useRouter();
    const { reloadDocument, target, replace: _replace, to, onClick, clientState, } = props;
    const internalClick = useCallback((e) => {
        if (onClick)
            onClick(e);
        if (!reloadDocument && // do regular browser stuff
            e.button === 0 && // Ignore everything but left clicks
            (!target || target === '_self') && // Let browser handle "target=_blank"
            !isModifiedEvent(e) // Ignore modifier key clicks
        ) {
            e.preventDefault();
            // If the URL hasn't changed, the regular <a> will do a replace
            const replace = !!_replace || createPath(location) === createPath({ pathname: to });
            navigate(props.to, {
                replace,
                clientState,
            });
        }
    }, [reloadDocument, target, _replace, to, clientState, onClick, location]);
    return (React.createElement("a", { ...without(props, ['to', 'replace', 'clientState', 'reloadDocument']), ref: ref, onClick: internalClick, href: props.to }, props.children));
});
function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function without(obj, props) {
    const newObj = {};
    for (const key of Object.keys(obj)) {
        if (!props.includes(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
