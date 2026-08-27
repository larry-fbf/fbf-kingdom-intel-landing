"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const clarityIds = {
  masterclass: "y6e5kqw1k1",
  workshop: "y6e6rbfrug",
  fbfChallenge: process.env.NEXT_PUBLIC_CLARITY_FBFCHALLENGE_ID,
};

function isValidClarityId(id: string | undefined): id is string {
  return Boolean(id && /^[a-z0-9]+$/i.test(id));
}

function getClarityId(pathname: string) {
  if (typeof window !== "undefined" && window.location.hostname.includes("fbfchallenge.com")) {
    return clarityIds.fbfChallenge;
  }

  if (pathname === "/workshop" || pathname.startsWith("/workshop/")) {
    return clarityIds.workshop;
  }

  return clarityIds.masterclass;
}

export default function MicrosoftClarity() {
  const pathname = usePathname() || "/";
  const clarityId = getClarityId(pathname);

  if (!isValidClarityId(clarityId)) return null;

  return (
    <Script id={`microsoft-clarity-${clarityId}`} strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityId}");
      `}
    </Script>
  );
}
