import type { Component, Directive } from "vue";

declare module "vue" {
  export interface GlobalComponents
    extends Record<string, Component<any, any, any, any, any>> {}
  export interface GlobalDirectives
    extends Record<string, Directive<any, any>> {}
}

export {};
