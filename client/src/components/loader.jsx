import { ClipLoader } from "react-spinners";

function Loader({ loading }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50 backdrop-blur-sm z-[9999]">
      <ClipLoader loading={loading} color="#0000ff" size={50} />
    </div>
  );
}

export default Loader;
