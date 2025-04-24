import { graphql } from "@/graphql";

export const VariantDetail = graphql(/* GraphQL */ `
    query VariantQuery($productId: String!,$languages: [Locales] = en, ) {
        GenericVariant(
          locale: $languages
          where: { ProductParents: {GuidValue: { in: [$productId] }} }
        ) {
          items {
            Color
            Size
            Code
            DisplayName
            ProductParents {
              GuidValue
            }
            Language {
              Name
            }
          }
        }
      }
    `)