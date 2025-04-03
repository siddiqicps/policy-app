import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
  } from "@react-router/dev/routes";
  
  export default [
    index("./pages/login/index.tsx"),
    // route("about", "./about.tsx"),
  
    layout("./layouts/layout.tsx", [
      route("dashboard", "./routes/home.tsx"),
      route("view-policy", "./pages/view-policy/index.tsx"),
      route("edit-policy", "./pages/edit-policy/index.tsx")
    //   route("upload-policy", "./pages/welcome/welcome.tsx"),
    ]),
  
    // ...prefix("concerts", [
    //   index("./concerts/home.tsx"),
    //   route(":city", "./concerts/city.tsx"),
    //   route("trending", "./concerts/trending.tsx"),
    // ]),
  ] satisfies RouteConfig;
  