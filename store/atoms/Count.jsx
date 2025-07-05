import {atom, selector} from "recoil";

export const countAtom = atom({
    key: "countAtom",
    default: 0
})

// Selector in Recoil
export  const evenSelector = selector({
    key: "evenSelector",
    get: (props) =>{
        const count = props.get(countAtom);
        return (count % 2 === 0);
    }
})