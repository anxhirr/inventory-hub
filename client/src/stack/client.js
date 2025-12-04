import { StackClientApp } from "@stackframe/react";
import { useNavigate } from "react-router-dom";

export const stackClientApp = new StackClientApp({
  tokenStore: "cookie",
  projectId: "8e71168c-02db-460c-8196-4d4fb416edfb",
  publishableClientKey: "pck_nxck7yw0f5w6qbfe6zv61thj7apd50qdrgevsgzm9dnwg",
  redirectMethod: {
    useNavigate,
  },
});
