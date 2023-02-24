export {};

declare global {
  interface Window {
    recaptchaVerifier: {};
    confirmationResult: {};
  }

  type HTMLEvent = React.MouseEvent<
    MouseEvent,
    EventTarget & HTMLElement,
    EventTarget
  >;
}
