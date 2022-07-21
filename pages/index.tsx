import { useQuery, gql } from "@apollo/client";
const Home = () => {
  const { loading, error, data } = useQuery(gql`
    query GetProductsList {
      products {
        id
        slug
        name
        price
      }
    }
  `);

  if(loading){
    return <p>Ładowanie...</p>
  }

  if(error){
    return <p>ERROR! {JSON.stringify(error)}</p>
  }

  return <div className="flex flex-col min-h-screen">
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>;
};

export default Home;
