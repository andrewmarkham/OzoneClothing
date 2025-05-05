import { MARKET_COOKIE, MarketDetails } from "@jhoose-commerce/core";
import { cookies, headers } from "next/headers";

export async function getCurrentMarketFromCookie() : Promise<MarketDetails | undefined> {

    const cookieStore = await cookies();
  
    if (cookieStore &&  cookieStore.has(MARKET_COOKIE)) {
        console.log("has cookie")
        const currentMarketJson = cookieStore.get(MARKET_COOKIE)?.value;
        console.log(currentMarketJson)
        if (currentMarketJson) {
            const currentMarket = JSON.parse(currentMarketJson) as MarketDetails;
            console.log(currentMarket)
            return currentMarket;
        }
    }
    return undefined;
  }


export async function getMarketDetails(lang: string) : Promise<MarketDetails>  {
    let marketDetails =  await getCurrentMarketFromCookie();
  
    console.log(marketDetails)
    console.log("Lang : " +lang)
    // If the language in the cookie is different from the language in the props, we need to update the marketDetails from the header
    if (marketDetails?.language !== lang) { 
      const _headers = await headers();
      const cookieHeader = _headers.get("Set-Cookie")?.trim();
  
      const marketDetailsFromHeader = cookieHeader?.split(";").map((cookiePart: string) => {
        const parts = cookiePart.trim().split("=");
        if (parts[0].trim() === "market") {
          return JSON.parse(decodeURIComponent(parts[1].trim()));
        }
      });
      
      if (marketDetailsFromHeader && marketDetailsFromHeader.length > 0) {
        marketDetails = marketDetailsFromHeader[0] ?? {};
      }
    }
  
    return marketDetails ?? { currency: "USD", market: "US", marketName: "TBC", language: "en", countries: [] };
  }