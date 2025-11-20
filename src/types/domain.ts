export interface ToolSchemaInputText {
  type: "text";
  key: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}
export interface ToolSchemaInputTextarea {
  type: "textarea";
  key: string;
  label: string;
  rows?: number;
}
export interface ToolSchemaInputSelect {
  type: "select";
  key: string;
  label: string;
  options: { label: string; value: string }[];
}
export interface ToolSchemaInputSwitch {
  type: "switch";
  key: string;
  label: string;
  default?: boolean;
}
export interface ToolSchemaInputFile {
  type: "file";
  key: string;
  label: string;
  accept?: string;
}
export type ToolSchemaInput =
  | ToolSchemaInputText
  | ToolSchemaInputTextarea
  | ToolSchemaInputSelect
  | ToolSchemaInputSwitch
  | ToolSchemaInputFile;

export interface ToolSchema {
  inputs: ToolSchemaInput[];
  actions: { label: string; key: string; primary?: boolean }[];
  outputs: {
    type: "text" | "code" | "image" | "table";
    key: string;
    label: string;
  }[];
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  tags: string[];
  icon?: string;
  summary: string;
  type: "native" | "embed" | "link";
  route?: string;
  capabilities?: string[];
  schema?: ToolSchema;
  examples?: Array<{ title: string; input: Record<string, any>; output?: any }>;
  meta?: {
    createdAt?: string;
    updatedAt?: string;
    author?: string;
    version?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  order?: number;
  description?: string;
}

export interface UserProfile {
  id: string;
  name?: string;
  avatar?: string;
  locale?: string;
  theme?: "dark" | "light";
  pinnedToolIds: string[];
  recentToolIds: string[];
  favorites: { id: string; name: string; toolIds: string[] }[];
}
