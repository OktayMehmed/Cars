import { useEffect } from "react";

import { useParams } from "react-router-dom";

const CarPage = ({ setCarId }) => {
  const { id } = useParams();

  useEffect(() => {
    setCarId(id);
  }, [id,setCarId]);

  return <>Car</>;
};

export default CarPage;
