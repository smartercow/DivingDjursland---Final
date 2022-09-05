import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/Main.scss";
import "../styles/slider.css";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { createTheme, NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/router";
import AdminLayout from "../components/Admin/Dashboard/Layout";
function MyApp({ Component, pageProps }) {
  const OceanByPeter = createTheme({
    type: "OceanByPeter",
    theme: {
      colors: {
        primary: "#0A2540",
        secondary: "#0072F5",
        tertiary: "#EBFBFF",
        primarySolidHover: "#cff0f8",
        primarySolidContrast: "$white",
        primaryShadow: "$green500",

        gradient:
          "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
        link: "#5379FE",

        myColor: "#ff4ecd",
      },
      space: {},
      fonts: {},
    },
  });

  const router = useRouter();

  if (router.pathname.startsWith("/admin")) {
    return (
      <NextUIProvider theme={OceanByPeter}>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </NextUIProvider>
    );
  }

  return (
    <NextUIProvider theme={OceanByPeter}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );
}

export default MyApp;
