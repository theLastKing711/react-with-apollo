import { MutableRefObject, useEffect, useLayoutEffect } from "react"


const useEndOfContentFetchMore = (element:MutableRefObject<HTMLDivElement | null>, fn: Function, args: any[]) => {

    // const [topScroll, setTopScroll] = useState(window.scrollY);

    useLayoutEffect(() => {
        const onScroll = () => {
             // setTopScroll(window.innerTopScroll);
             fn();
        }

        window.addEventListener("scroll", onScroll);
        
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, args);
    
}

export default useEndOfContentFetchMore