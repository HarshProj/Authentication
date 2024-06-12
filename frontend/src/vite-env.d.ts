/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    REACT_APP_SERVER_DOMAIN:string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }