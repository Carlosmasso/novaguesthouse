import type { ReactNode } from "react";
import type { Lang } from "@/lib/dict";
import { LangProvider } from "@/lib/i18n";
import { LightboxProvider } from "./Lightbox";
import Header from "./Header";
import Footer from "./Footer";
import BookFab from "./BookFab";

/** Marco común de todas las páginas: idioma (fijado por la ruta), lightbox, cabecera y pie. */
export default function Shell({ lang, solid = false, children }: { lang: Lang; solid?: boolean; children: ReactNode }) {
  return (
    <LangProvider lang={lang}>
      <LightboxProvider>
        <Header forceSolid={solid} />
        {children}
        <Footer />
        <BookFab />
      </LightboxProvider>
    </LangProvider>
  );
}
