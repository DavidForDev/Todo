import { cloneElement } from "react";

// =========== this "helper" helps us to give props to children

// ====== FOR EXAMPLE:

/*
    export const MyComponent = ({children}) => {
        return (
            // ======= if we want to give props to children....
            <div>{useChildrenProp(children, {modalId: Id})}</div> -- instend of -- <div>{children}</div>
        )
    }
*/

export const GiveChildrenProp = (children: JSX.Element, props: any) => {
  return cloneElement(children, props);
};
