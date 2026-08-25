import type { Metadata } from "next";
import "../globals.css";
import Providers from "../providers";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";
import { getDictionary } from "@/i18n/getDictionary";
import { locales, isLocale, defaultLocale } from "@/i18n/locales";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  return { title: dict.meta.title, description: dict.meta.description };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body>
        <LocaleProvider locale={lang} dict={dict}>
          <Providers>
            <LanguageSwitcher />
            {children}
          </Providers>
        </LocaleProvider>
        <footer
          style={{
            textAlign: "center",
            padding: "16px 0",
            fontSize: 12,
            color: "var(--spectrum-global-color-gray-600, #6e6e6e)",
          }}
        >
          {dict.footer.credit}
        </footer>
      </body>
    </html>
  );
}
