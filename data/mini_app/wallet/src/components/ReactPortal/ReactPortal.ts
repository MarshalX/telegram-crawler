import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

type ReactPortalParams = {
  children: ReactNode;
  wrapperId: string;
};

export function ReactPortal({
  children,
  wrapperId = 'portal-wrapper',
}: ReactPortalParams) {
  let element = document.getElementById(wrapperId) as HTMLElement;
  if (!element) {
    element = createWrapperAndAppendToBody(wrapperId);
  }
  return createPortal(children, element);
}
