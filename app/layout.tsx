import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalContextNavButtonsProvider } from "./context/_____NavButtonContext";
import { GlobalContextOntoObjectPropertyProvider } from "./context/OntoObjectPropertyContext";
import { GlobalContextOntoDataPropertyProvider } from "./context/OntoDataPropertyContext";
import { GlobalContextOntoIndividualProvider } from "./context/OntoIndividualContext";
import { GlobalContextOntoClassProvider } from "./context/OntoClassContext";
import { GlobalContextPrefixProvider } from "./context/PrefixSemanticsContext";
import { GlobalContextOntologizerLinesProvider } from "./context/OntologizerLinesContext";
import { GlobalContextProvider } from "./context/GlobalContext";
import { GlobalContextOntologizerLinesAnnotationsProvider } from "./context/OntologizerLinesAnnotationsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEMAPTIC BUILDER",
  description: "Create semantic maps for your data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextOntoObjectPropertyProvider>
          <GlobalContextOntoDataPropertyProvider>
            <GlobalContextOntoIndividualProvider>
              <GlobalContextOntoClassProvider>
                <GlobalContextPrefixProvider>
                  <GlobalContextOntologizerLinesProvider>
                    <GlobalContextOntologizerLinesAnnotationsProvider>
                      <GlobalContextProvider>{children}</GlobalContextProvider>
                    </GlobalContextOntologizerLinesAnnotationsProvider>
                  </GlobalContextOntologizerLinesProvider>
                </GlobalContextPrefixProvider>
              </GlobalContextOntoClassProvider>
            </GlobalContextOntoIndividualProvider>
          </GlobalContextOntoDataPropertyProvider>
        </GlobalContextOntoObjectPropertyProvider>
      </body>
    </html>
  );
}
