/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { useUser } from "@auth0/nextjs-auth0";
import Authenticated from "./authenticated";
import { User } from "lucide-react";

export  function Authentication() {
    const { user } = useUser();

    console.log(user);

    const isAuthenticated = user ? true : false;
    return (
      <div>
        {isAuthenticated ? <Authenticated user={user} /> : <a href="/auth/login"><User /></a> }
      </div>
    )
  }