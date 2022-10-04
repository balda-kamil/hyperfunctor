import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";

const newsletterFormSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const useAddToNewsletterMutation = () =>
  useMutation("add-to-newsletter", async ({ email }: { email: string }) => {
    await fetch("http://localhost:3001/api/hello", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  });

type newsletterFormData = yup.InferType<typeof newsletterFormSchema>;

export const NewsletterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<newsletterFormData>({
    resolver: yupResolver(newsletterFormSchema),
  });

  const { mutate } = useAddToNewsletterMutation();

  const onSubmit = handleSubmit((data) => mutate(data));

  return (
    <form onSubmit={onSubmit} className="mt-4 sm:flex sm:max-w-md">
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        id="email-address"
        autoComplete="email"
        required
        className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
        placeholder="Enter your email"
        {...register("email", { required: "Podaj email" })}
      />
      <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
        <button
          type="submit"
          className="w-full bg-indigo-500 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
};
