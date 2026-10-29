import { lazy } from "react";
import { reactions } from "./reactions";
import bannerExample from "../assets/sunny-rocco.webp";

// Each tool gets a card on /tools and a page at /tools/<slug>. The page header
// comes from these fields; `Tool` renders only the tool itself, and loads when
// its page opens. A `<slug>-art` class can adjust the card artwork.
export const tools = [
  {
    slug: "banner-splitter",
    name: "Banner splitter",
    kind: "Instagram",
    summary: "Cut one wide banner into posts that line up on your profile grid.",
    description: "Posts are 4:5, but your profile grid only shows the middle 3:4 of each one. This cuts a banner into posts with that overlap built in, so it lines up without anything getting cropped.",
    image: bannerExample,
    reaction: reactions.smirk,
    Tool: lazy(() => import("../pages/Tools/BannerSplitter/BannerSplitter")),
  },
];
