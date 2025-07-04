import {countAtom, evenSelector} from "../store/atoms/Count";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";


function Count() {

    const count= useRecoilValue(countAtom);
    const isEven = useRecoilValue(evenSelector);
    const setCount = useSetRecoilState(countAtom)

    const increase = () =>{
        setCount(count => count+1);
    }
    const decrease = () =>{
        setCount(count => count-1);
    }

    return <>

        <div>
            {count}
        </div>
        <div>
            {isEven? "Even":"Odd"}
        </div>
        <button className="border border-2 border-accent m-5 p-2" onClick={increase}>Increase</button>
        <button className="border border-2 border-accent m-5 p-2" onClick={decrease}>Decrease</button>
    </>
}

export default Count;