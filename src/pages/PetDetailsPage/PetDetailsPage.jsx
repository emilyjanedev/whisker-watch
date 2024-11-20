import { useParams } from "react-router-dom";

function PetDetailsPage() {
  const { id } = useParams();
  return <div>PetDetailsPage {id}</div>;
}

export default PetDetailsPage;
