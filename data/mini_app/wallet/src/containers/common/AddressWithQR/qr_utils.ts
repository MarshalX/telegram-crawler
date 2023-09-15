import QRCodeStyling from 'qr-code-styling';

export interface QR {
  dataURL: string;
  holeSize: number;
  address: string;
}

function getDataURL(qrCode: QRCodeStyling): Promise<string> {
  return new Promise((resolve) => {
    qrCode.getRawData('png').then((blob) => {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        resolve(e.target?.result as string);
      });
      reader.readAsDataURL(blob as Blob);
    });
  });
}

function getHoleSize(qrCode: QRCodeStyling): Promise<number> {
  return new Promise((resolve) => {
    qrCode.getRawData('svg').then((blob) => {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        const container = document.createElement('div');
        container.innerHTML = e.target?.result as string;
        resolve(
          Number(
            (container.querySelector('image') as SVGImageElement)
              .getAttribute('width')
              ?.replace('px', ''),
          ) / window.devicePixelRatio,
        );
      });
      reader.readAsText(blob as Blob);
    });
  });
}

export function render({
  address,
  qrSize,
  data,
}: {
  address: string;
  qrSize: number;
  data: string;
}): Promise<QR> {
  return import('qr-code-styling')
    .then((qrCodeStyling) => {
      return new qrCodeStyling.default({
        width: qrSize * window.devicePixelRatio,
        height: qrSize * window.devicePixelRatio,
        margin: 0,
        type: 'svg',
        data,
        image: '/static/images/empty_square.svg',
        dotsOptions: {
          color: window.Telegram.WebApp.themeParams.text_color,
          type: 'rounded',
        },
        qrOptions: {
          errorCorrectionLevel: 'M',
        },
        cornersSquareOptions: {
          type: 'extra-rounded',
        },
        backgroundOptions: {
          color: 'transparent',
        },
      });
    })
    .then((qrCode) => {
      return Promise.all([getDataURL(qrCode), getHoleSize(qrCode)]);
    })
    .then(([dataURL, holeSize]) => {
      return {
        address,
        dataURL,
        holeSize,
      };
    });
}
