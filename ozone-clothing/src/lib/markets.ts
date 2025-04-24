import { MARKET_COOKIE, MarketDetails } from "@jhoose-commerce/core";
import { cookies } from "next/headers";

export async function getCurrentMarketFromCookie() : Promise<MarketDetails | undefined> {

    const cookieStore = await cookies();
  
    if (cookieStore &&  cookieStore.has(MARKET_COOKIE)) {
  
        const currentMarketJson = cookieStore.get(MARKET_COOKIE)?.value;
        if (currentMarketJson) {
            const currentMarket = JSON.parse(currentMarketJson) as MarketDetails;
  
            return currentMarket;
        }
    }
    return undefined;
  }