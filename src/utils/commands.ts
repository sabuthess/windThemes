import { Command } from "@tauri-apps/plugin-shell";

const setDarkMode = async () => {
  const key =
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize";

  await Command.create("reg", [
    "add",
    key,
    "/v",
    "SystemUsesLightTheme",
    "/t",
    "REG_DWORD",
    "/d",
    "0",
    "/f",
  ]).execute();

  await Command.create("reg", [
    "add",
    key,
    "/v",
    "AppsUseLightTheme",
    "/t",
    "REG_DWORD",
    "/d",
    "0",
    "/f",
  ]).execute();

  await Command.create("taskkill", ["/f", "/im", "explorer.exe"]).execute();

  await Command.create("explorer.exe", []).execute();
};

const lightMode = async () => {
  const key =
    "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize";

  await Command.create("reg", [
    "add",
    key,
    "/v",
    "SystemUsesLightTheme",
    "/t",
    "REG_DWORD",
    "/d",
    "1",
    "/f",
  ]).execute();

  await Command.create("reg", [
    "add",
    key,
    "/v",
    "AppsUseLightTheme",
    "/t",
    "REG_DWORD",
    "/d",
    "1",
    "/f",
  ]).execute();
};

export { lightMode, setDarkMode };
