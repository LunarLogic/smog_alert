import { name, email, message } from "./labelConstants.js";

const LABELS = {
  [name]: "Nadawca",
  [email]: "E-mail nadawcy",
  [message]: "Wiadomość"
};

export const formLabel = label => LABELS[label] || "Dane";
