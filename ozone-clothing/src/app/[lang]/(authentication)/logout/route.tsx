'use server'
import { Locale } from "@/lib/dictionaries";
import { removeAnonymousIdCookie, removeCustomerContext } from "@jhoose-commerce/core-nextjs";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ lang: Locale }> }
  ) {
    
    const {lang } = await params;

    await removeAnonymousIdCookie();
    await removeCustomerContext();
    
    return Response.redirect(`${process.env.APP_BASE_URL}/${lang}/`)
  }