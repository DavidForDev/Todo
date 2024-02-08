import { ReactNode, SetStateAction } from "react";

export interface User {
  userName: string;
}

export interface MessageCardTypes {
  message: string;
  messageType: string;
}

export interface ModalTypes {
  detail: {
    id: string;
    name: string;
    content: any;
    visibleStatus: boolean;
    rightSide: boolean;
    leftSide: boolean;
    more: any;
  };
}

export interface ModalWrapperTypes {
  children?: ReactNode;
  admitFunction?: () => void;
  modalId: string;
}

export interface NavCardTypes {
  detail: {
    name: string;
    svg: any;
    href: string;
    quantity?: string;
    toggleModal?: () => void;
  };
}

export interface TaskCardTypes {
  detail: {
    tags: object[];
    taskName: string;
    _id: string;
    createdAt: number;
  };
}

export interface TagTypes {
  detail: {
    color: string;
    name: string;
  };
  removeFunction?: () => void;
}

export interface AttachTypes {
  name: string;
}

export interface TaskItemCardTypes {
  detail: {
    _id: string;
    taskItemName: string;
    description: string;
    attach: AttachTypes[];
    author: User;
    createdAt: number;
  };
}

export interface InputTypes {
  placeholder?: string;
  type?: string;
  label?: string;
  giveValue?: any;
  requireSign?: boolean | false;
  defaultValue?: string;
  disabledStatus?: boolean;
  value?: any;
}

export interface TagsTypes {
  label?: string;
  giveValue?: any;
  requireSign?: boolean | false;
  placeholder?: string;
  coloration?: boolean;
  wordsLength?: number;
  limitTag?: number;
  defaultTags?: any;
}

export interface TextAreaTypes {
  placeholder?: string;
  label?: string;
  giveValue?: any;
  requireSign?: boolean | false;
  defaultValue?: string;
}

export interface FormWrapperTypes {
  placeholder?: string;
  type?: string;
  label?: string;
  requireSign?: boolean | false;
  children?: any;
}
