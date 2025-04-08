import { graphql } from "../graphql";


export const ProductQuery = graphql(/* GraphQL */ `
  query ProductCarouselQuery($languages: [Locales] = en, $market: String, $parentCategory: [String], $limit: Int = 10) {
    GenericProduct(
      locale: $languages
      limit: $limit
      where: {
        ParentCategories: { in: $parentCategory }
        LowestPriceOfVariationPerMarket: { MarketName: { eq: $market } }
      }
    ) {
      items {
        Code
        DisplayName
        RelativePath
        DefaultImageUrl
        Name
        LowestPriceOfVariationPerMarket {
          Currency
          MarketName
          Price
          VariationCode
        }
      }
    }
  }
`); 