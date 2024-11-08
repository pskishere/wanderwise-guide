type NavigateOptions = {
  url: string;
  replace?: boolean;
}

// Check if we're in Taro environment
const isTaro = typeof process !== 'undefined' && process.env.TARO_ENV !== undefined;

// Import the necessary functions based on environment
const navigate = (options: NavigateOptions) => {
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
    const { useNavigate } = require('react-router-dom');
    const navigate = useNavigate();
    if (options.replace) {
      navigate(options.url, { replace: true });
    } else {
      navigate(options.url);
    }
  }
};

const back = () => {
  if (isTaro) {
    const Taro = require('@tarojs/taro');
    Taro.navigateBack();
  } else {
    window.history.back();
  }
};

export const router = {
  navigate,
  back,
};