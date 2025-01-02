// import Layout from "antd/es/layout/layout";
import { useSearch } from "../contextAPI/SearchContext";
import Layout from "../components/layout/Layout";
export default function Search() {
  const [values, setValues] = useSearch();

  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <h6>
            {values?.results?.length < 1
              ? "No Product Found"
              : `Found ${values?.results?.length}`}
          </h6>
          <div className="row">
            {values?.results?.map((val) => (
              <div className="col-md-4 col-lg-4 col-sm-4" key={val._id}>
                <div className="card m-3 ">
                  <img
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${val._id}`}
                    alt={val.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{val.name}</h5>
                    <p className="card-text">
                      {val.description.substring(0, 30)}
                    </p>
                    <p className="card-text">$ {val.price}</p>
                    <button className="btn btn-primary ms-1">
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
