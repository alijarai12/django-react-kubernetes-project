import { useParams } from "react-router-dom";
import FormUpdate from "./FormUpdate";

const FormUpdateWrapper = () => {
  const { id } = useParams();
  return <FormUpdate id={Number(id)} />;
};

export default FormUpdateWrapper;
