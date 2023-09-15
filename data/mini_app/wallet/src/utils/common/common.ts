export function repeat<T>(cb: (i: number) => T, times = 1): T[] {
  const res = [];

  for (let i = 0; i < times; i++) {
    res.push(cb(i));
  }

  return res;
}

export function copyToClipboard<T extends string>(text: T): Promise<T> {
  return new Promise((resolve) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        resolve(text);
      })
      .catch(() => {
        const input = document.createElement('input');
        input.style.opacity = '0';
        input.style.position = 'fixed';
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy', false, '');
        input.remove();
        resolve(text);
      });
  });
}

export function isRtl(languageCode?: string): boolean {
  return languageCode === 'fa';
}

/* TODO определять OS не по userAgent, а по имени клиента (MacOS, Android, iOS, Desktop, Web),
     который телега нам скоро начнет присылать. Задача NCWV-11  */
function getOS(): 'MacOS' | 'Android' | 'iOS' | 'Windows' | 'Linux' | null {
  const userAgent = window.navigator.userAgent,
    platform =
      // eslint-disable-next-line
      // @ts-ignore
      window.navigator?.userAgentData?.platform || window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os: 'MacOS' | 'Android' | 'iOS' | 'Windows' | 'Linux' | null = null;

  if (macosPlatforms.includes(platform)) {
    os = 'MacOS';
  } else if (iosPlatforms.includes(platform)) {
    os = 'iOS';
  } else if (windowsPlatforms.includes(platform)) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (/Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

export function isMacos(): boolean {
  return getOS() === 'MacOS';
}

export function isWindows(): boolean {
  return getOS() === 'Windows';
}

export function isLinux(): boolean {
  return getOS() === 'Linux';
}

export function isAndroid(): boolean {
  return getOS() === 'Android';
}

export function isIOS(): boolean {
  return getOS() === 'iOS';
}

export function isUnicode(char: string): boolean {
  return /^[\p{L}\p{N}]*$/u.test(char);
}

export const isClientSupportsInvoices = () => {
  return isAndroid()
    ? window.Telegram.WebApp.isVersionAtLeast('6.2')
    : window.Telegram.WebApp.isVersionAtLeast('6.1');
};

export const isClientSupportsSideMenu = () => {
  if (window.Telegram.WebView.initParams) {
    return !window.Telegram.WebView.initParams.tgWebAppSideMenuUnavail;
  }

  return undefined;
};

export const printFullName = (
  firstName?: string,
  lastName?: string,
): string => {
  return [firstName, lastName].filter(Boolean).join(' ');
};

export const isPageReloaded = () => {
  if (process.env.NODE_ENV !== 'test') {
    return (
      (window.performance.navigation &&
        window.performance.navigation.type ===
          window.performance.navigation.TYPE_RELOAD) ||
      (
        window.performance.getEntriesByType(
          'navigation',
        ) as PerformanceNavigationTiming[]
      ).some(({ type }) => type === 'reload')
    );
  } else {
    return false;
  }
};

export const generateTelegramLink = (
  name: string,
  params: Record<string, string> = {},
) => {
  const searchParams = new URLSearchParams(params);

  return `https://t.me/${name}?${searchParams.toString()}`;
};

export const isTelegramLink = (link: string) => {
  return link.startsWith('https://t.me');
};
