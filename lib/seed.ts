import content from "../data/content.json";
import settings from "../data/settings.json";
import type { Settings, SiteContent } from "./types";

export const seedContent = content as unknown as SiteContent;
export const seedSettings = settings as unknown as Settings;
