import { Allotment } from "allotment"
import "allotment/dist/style.css"
import { Header } from "./components/Header"
import { MaterialWrapper } from './components/MaterialWrapper';
import { EditArea } from "./components/EditArea"
import { Setting } from "./components/Setting"
import { useComponetsStore } from "./stores/components";
import { Preview } from "./components/Preview";
export default function LowCodeEditor() {

  const { mode } = useComponetsStore();
  return <div className="h-[100vh] flex flex-col">
    <div className="h-[70px] flex items-center border-b-[1px] border-[#000]"><Header /></div>
    {
      mode ==='edit'? <Allotment>
      <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
        <MaterialWrapper />
      </Allotment.Pane>
      <Allotment.Pane>
        <EditArea />
      </Allotment.Pane>
      <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
        <Setting />
      </Allotment.Pane>
    </Allotment>
    : <Preview />
    }
  </div>

}