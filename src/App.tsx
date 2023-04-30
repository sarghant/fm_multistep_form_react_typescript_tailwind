import { Sidebar } from "./components/sidebar/Sidebar";
import { CardBody } from "./components/card_body/CardBody";
import { useFormSteps } from "./context/FormStepsContext";

const cardDefaultStyles = {
  minWidth: "900px",
  maxWidth: "956px",
  height: "600px",
};
const cardMobileStyles = {
  width: "100vw",
  height: "100vh",
};

function App() {
  const { screenX, onResize } = useFormSteps();
  window.onresize = () => onResize();
  return (
    <div
      className="sm:rounded-3xl bg-blue-100 sm:bg-white flex items-center sm:items-start sm:justify-start gap-4 sm:p-4 shadow-md shadow-transparent"
      style={screenX > 640 ? { ...cardDefaultStyles } : { ...cardMobileStyles }}
    >
      <Sidebar />
      <CardBody />
    </div>
  );
}

export default App;
