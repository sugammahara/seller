import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Productcard from "./Productcard";
import { fetchDataFromApi } from "../API/api";

const Category = () => {
  const { type } = useParams();
  const [category, setcategory] = useState([]);
  useEffect(() => {
    getcategory();
  }, []);
  const getcategory = async () => {
    let result = await fetchDataFromApi(
      `/api/alls?populate=*&filters[category]=${type}`
    );
    setcategory(result.data);
  };

  return (
    <div>
      <h1 className="mt-12 text-white uppercase">{type} Art</h1>
      <div className="grid grid-cols-3 gap-4 mt-16">
        {category.map((cat) => (
          <div>
            
            <a href={`/overview/${cat.id}`}>
              <Productcard key={cat.id} item={cat} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
