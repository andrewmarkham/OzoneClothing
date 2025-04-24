import { graphql } from "@/graphql";

export const ProductCategoryQuery = graphql(/* GraphQL */ `
    query ProductCategoryQuery($languages: [Locales] = en, $segment: String) {
            GenericNode(locale: $languages, where: { RouteSegment: { eq: $segment } }) {
              total
              items {
                ...GenericNodeFragment
                _link {
                  GenericNode {
                    total
                    items {
                      ...GenericNodeFragment
                    }
                  }
                }
              }
            }
          }`);
 
