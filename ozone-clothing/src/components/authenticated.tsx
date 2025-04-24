/* eslint-disable @next/next/no-html-link-for-pages */

import { User } from "@auth0/nextjs-auth0/types";
import { LogOut } from "lucide-react";


export default function Authenticated(props: { user:  User | null | undefined}) {
    return (
      <div>
        <a title={props.user?.name ?? ""} href="/auth/logout"><LogOut /></a>
      </div>
    )
  }