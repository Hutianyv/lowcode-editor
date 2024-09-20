import { useEffect, useRef } from 'react'
import { CommonComponentProps } from '../../interface'
import { useDrag } from 'react-dnd'

const Image = ({ id, name, styles, src, altText }: CommonComponentProps) => {
  const divRef = useRef<HTMLImageElement>(null);
  const [_, drag] = useDrag({
    type: name,
    item: {
        type: name,
        dragType: 'move',
        id: id
    }
  });
  useEffect(() => {
    drag(divRef)
  }, [])
  return (
    <img ref={divRef} data-component-id={id} style={styles} src={src} alt={altText} className={'m-[20px]'}/>
  )
}
export default Image