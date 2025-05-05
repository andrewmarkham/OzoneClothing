import { GenericNode } from "@/graphql/graphql";

export const CategoryFilters = (props: {lang: string, categories: GenericNode[]}) => {
  return (
    <div className="flex flex-row space-x-4 my-4">
      {props.categories.map((category, index) => (
        <a className="text-lg border-2 border-black rounded-full px-4" key={index} 
          href={`/${props.lang}${category?.RelativePath ?? ''}`}>{category?.DisplayName}</a>
      ))}
    </div>
  );
};
