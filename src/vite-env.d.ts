/// <reference types="vite/client" />

declare namespace NodeJS {
    interface ProcessEnv {
      VITE_PUBLIC_ID: string;
    }
  }
  