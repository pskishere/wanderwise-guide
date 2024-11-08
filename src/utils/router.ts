import { NavigateOptions } from '@tarojs/taro';

// Check if we're in Taro environment
const isTaro = typeof process !== 'undefined' && process.env.TARO_ENV !== undefined;

type RouterNavigateOptions = {
  url: string;
  replace?: boolean;
}

class Router {
  navigate(options: RouterNavigateOptions) {
    if (isTaro) {
      // For Taro environment
      const Taro = require('@tarojs/taro');
      if (options.replace) {
        Taro.redirectTo({ url: options.url });
      } else {
        Taro.navigateTo({ url: options.url });
      }
    } else {
      // For React Router environment
      const navigate = window.routerNavigate;
      if (options.replace) {
        navigate(options.url, { replace: true });
      } else {
        navigate(options.url);
      }
    }
  }

  back() {
    if (isTaro) {
      const Taro = require('@tarojs/taro');
      Taro.navigateBack();
    } else {
      window.history.back();
    }
  }
}

export const router = new Router();

// Declare global window interface
declare global {
  interface Window {
    routerNavigate: (path: string, options?: { replace?: boolean }) => void;
  }
}