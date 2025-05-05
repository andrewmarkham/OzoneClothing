/* eslint-disable @next/next/no-html-link-for-pages */

import { User } from "@auth0/nextjs-auth0/types";
import { LogOut } from "lucide-react";


export default function Authenticated(props: { user:  User | null | undefined, locale: string}) {
    const logoutUrl = `${process.env.NEXT_APP_BASE_URL}/${props.locale}`;

    return (
      <div>
        <a title={props.user?.name ?? ""} href={`/auth/logout?returnTo=${logoutUrl}/logout/`}><LogOut /></a>
      </div>
    )
  }