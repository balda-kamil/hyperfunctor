import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { MarkDownResult } from "../utils";

const MyReactMarkdown = ({
  children,
}: {
  children: MarkDownResult;
}) => {

  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          console.log("HREF", href)
          let test =  new URL('/', href)
          console.log("TEST", test)
          if (!href) {
            return <a {...props}></a>;
          }
          return (
            <Link href={href}>
              <a {...props}></a>
            </Link>
          );
        },
      }}
    />
  );
};

export default MyReactMarkdown;
