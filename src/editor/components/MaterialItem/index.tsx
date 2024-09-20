
import { useDrag } from "react-dnd";

export interface MaterialItemProps {
    name: string
    desc: string
}

export function MaterialItem(props: MaterialItemProps) {

    const {
        name,
        desc
    } = props;

    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name
        }
    });

    return <div
        ref={drag}
        className='
            border-solid
            rounded-[4px]
            border-[1px]
            border-[#000]
            py-[8px] px-[10px] 
            m-[10px]
            cursor-move
            inline-block
            bg-blue-300
            hover:bg-blue-500
        '
    >
        {desc}
    </div>
}
