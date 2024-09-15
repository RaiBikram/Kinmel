
// import Layout from "../components/layout/Layout";
// import React from "react";
// import useCategory from "../hooks/useCategory";
// import { Link } from "react-router-dom";
// export default function AllCategories() {
//   const categories = useCategory();

//   return (
//     <Layout title={"all categories"}>
//       <div className="row">
//         {categories?.map((cat) => (
//           <div
//             className=" col-12 col-md-5 my-5 col-lg-3 gy-3 col-ms-8"
//             key={cat?._id}
//           >
//             <Link to={`/category/${cat?.slug}`} className="btn btn-primary">
//               <h5>{cat?.name}</h5>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </Layout>
//   );
// }
