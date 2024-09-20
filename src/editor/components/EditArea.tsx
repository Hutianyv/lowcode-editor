import React, { MouseEventHandler, useEffect, useState, useLayoutEffect, useCallback  } from "react";
import { useComponentConfigStore } from "../stores/component-config";
import { Component, useComponetsStore } from "../stores/components"
import HoverMask from "../components/HoverMask";
import SelectedMask from "../components/SelectedMask";
import { compress, uncompress } from "../../utils/fflate"
import { debounce } from "lodash-es";

export function EditArea() {
    const { components, curComponentId, setCurComponentId, setComponents} = useComponetsStore();
    const { componentConfig } = useComponentConfigStore();

    
    const getComponentsFromUrl = () => {
        let components: Component[] | undefined;
        try {
            const hash = uncompress(decodeURIComponent(window.location.hash.slice(1)));
            components = JSON.parse(hash);
        } catch (err) {
            console.error("Error parsing components from URL:", err);
        }
        return components;
    };

    useLayoutEffect(() => {
        const components = getComponentsFromUrl();
        if (components) {
            setComponents(components);
        }
    }, []);
    
    const updateHash = useCallback(
        debounce((newHash) => {
            window.location.hash = newHash;
        }, 300), 
        []
    );
    useEffect(() => {
        const hash = JSON.stringify(components);
        updateHash(encodeURIComponent(compress(hash)));
    }, [components]);

    function renderComponents(components: Component[]): React.ReactNode {
        return components.map((component: Component) => {
            const config = componentConfig?.[component.name]

            if (!config?.dev) {
                return null;
            }
            
            return React.createElement(
                config.dev,
                {
                    key: component.id,
                    id: component.id,
                    name: component.name,
                    styles: component.styles,
                    ...config.defaultProps,
                    ...component.props,
                },
                renderComponents(component.children || [])
            )
        })
    }

    const [hoverComponentId, setHoverComponentId] = useState<number>();

    const handleMouseOver: MouseEventHandler = (e)  => {
        const path = e.nativeEvent.composedPath();

        for (let i = 0; i < path.length; i += 1) {
            const ele = path[i] as HTMLElement;

            const componentId = ele.dataset?.componentId;
            if (componentId) {
                setHoverComponentId(+componentId);
                return;
            }
        }
    }
  
    const handleClick: MouseEventHandler = (e) => {
        const path = e.nativeEvent.composedPath();

        for (let i = 0; i < path.length; i += 1) {
            const ele = path[i] as HTMLElement;

            const componentId = ele.dataset?.componentId;
            if (componentId) {
                setCurComponentId(+componentId);
                return;
            }
        }
    }

    return <div className="h-[100%] edit-area" onMouseOver={handleMouseOver} onMouseLeave={() => {
        setHoverComponentId(undefined);
    }} onClick={handleClick}>
        {renderComponents(components)}
        {hoverComponentId && hoverComponentId !== curComponentId && (
            <HoverMask
                portalWrapperClassName='portal-wrapper'
                containerClassName='edit-area'
                componentId={hoverComponentId}
            />
        )}
        {curComponentId && (
            <SelectedMask
                portalWrapperClassName='portal-wrapper'
                containerClassName='edit-area'
                componentId={curComponentId}
            />
        )}
        <div className="portal-wrapper"></div>
    </div>
}
