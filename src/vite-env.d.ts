/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VUE_APP_TITLE: string
  readonly VITE_VUE_APP_BASE_DOMAIN: string
  readonly VITE_VUE_APP_BASE_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
