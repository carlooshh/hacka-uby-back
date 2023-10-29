import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FRB_PROJECT_ID,
  private_key_id: process.env.FRB_PRIVATE_KEY_ID,
  private_key:
    process.env.FRB_PRIVATE_KEY?.split(String.raw`\n`).join("\n") || "",
  client_email: process.env.FRB_CLIENT_EMAIL,
  client_id: process.env.FRB_CLIENT_ID,
  auth_uri: process.env.FRB_AUTH_URI,
  token_uri: process.env.FRB_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FRB_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FRB_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FRB_UNIVERSE_DOMAIN,
};

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db = getFirestore();

export default db;
