import { NewsletterForm } from "../components/NewsletterForm";
import {
  CreateProductReviewDocument,
  useCreateProductReviewMutation,
} from "../generated/graphql";

const Home = () => {
  const [createReview, createReviewResult] = useCreateProductReviewMutation();

  const addReview = async () => {
    const data = await createReview({
      mutation: CreateProductReviewDocument,
      variables: {
        review: {
          headline: "dodaner z kompa. sss",
          name: "Kamil",
          email: "siemka@example.pl",
          content: "Kkjdfskjsdfkj",
          rating: 3,
        },
      },
    });
    console.log(data);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-indigo-600">Pricing</h2>
          <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Take control of your team.
          </p>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <button onClick={addReview} type="button">
          Dodaj komentarz
        </button>
      </div>
      <pre>{JSON.stringify(createReviewResult.data, null, 2)}</pre>
    </div>
  );
};

export default Home;
