import { forwardRef } from 'react';

import { FiatCurrency } from 'api/wallet/generated';

import { ReactComponent as AedLogo } from './icons/AED.svg';
import { ReactComponent as AmdLogo } from './icons/AMD.svg';
import { ReactComponent as ArsLogo } from './icons/ARS.svg';
import { ReactComponent as AudLogo } from './icons/AUD.svg';
import { ReactComponent as AznLogo } from './icons/AZN.svg';
import { ReactComponent as BgnLogo } from './icons/BGN.svg';
import { ReactComponent as BrlLogo } from './icons/BRL.svg';
import { ReactComponent as BynLogo } from './icons/BYN.svg';
import { ReactComponent as CadLogo } from './icons/CAD.svg';
import { ReactComponent as ChfLogo } from './icons/CHF.svg';
import { ReactComponent as ClpLogo } from './icons/CLP.svg';
import { ReactComponent as CopLogo } from './icons/COP.svg';
import { ReactComponent as EgpLogo } from './icons/EGP.svg';
import { ReactComponent as EurLogo } from './icons/EUR.svg';
import { ReactComponent as GbpLogo } from './icons/GBP.svg';
import { ReactComponent as GelLogo } from './icons/GEL.svg';
import { ReactComponent as GtqLogo } from './icons/GTQ.svg';
import { ReactComponent as HkdLogo } from './icons/HKD.svg';
import { ReactComponent as IdrLogo } from './icons/IDR.svg';
import { ReactComponent as IlsLogo } from './icons/ILS.svg';
import { ReactComponent as InrLogo } from './icons/INR.svg';
import { ReactComponent as JpyLogo } from './icons/JPY.svg';
import { ReactComponent as KrwLogo } from './icons/KRW.svg';
import { ReactComponent as KztLogo } from './icons/KZT.svg';
import { ReactComponent as MdlLogo } from './icons/MDL.svg';
import { ReactComponent as MxnLogo } from './icons/MXN.svg';
import { ReactComponent as MyrLogo } from './icons/MYR.svg';
import { ReactComponent as NokLogo } from './icons/NOK.svg';
import { ReactComponent as NzdLogo } from './icons/NZD.svg';
import { ReactComponent as PlnLogo } from './icons/PLN.svg';
import { ReactComponent as RonLogo } from './icons/RON.svg';
import { ReactComponent as RsdLogo } from './icons/RSD.svg';
import { ReactComponent as RubLogo } from './icons/RUB.svg';
import { ReactComponent as SarLogo } from './icons/SAR.svg';
import { ReactComponent as SekLogo } from './icons/SEK.svg';
import { ReactComponent as SgdLogo } from './icons/SGD.svg';
import { ReactComponent as TryLogo } from './icons/TRY.svg';
import { ReactComponent as TwdLogo } from './icons/TWD.svg';
import { ReactComponent as UahLogo } from './icons/UAH.svg';
import { ReactComponent as UsdLogo } from './icons/USD.svg';
import { ReactComponent as DefaultLogo } from './icons/default.svg';

const CURRENCY_TO_FLAG: Record<
  FiatCurrency,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  USD: UsdLogo,
  EUR: EurLogo,
  GBP: GbpLogo,
  RUB: RubLogo,
  UAH: UahLogo,
  TRY: TryLogo,
  AED: AedLogo,
  KZT: KztLogo,
  BYN: BynLogo,
  ILS: IlsLogo,
  GEL: GelLogo,
  HKD: HkdLogo,
  TWD: TwdLogo,
  KRW: KrwLogo,
  INR: InrLogo,
  CAD: CadLogo,
  AMD: AmdLogo,
  AUD: AudLogo,
  PLN: PlnLogo,
  COP: CopLogo,
  BRL: BrlLogo,
  CHF: ChfLogo,
  MXN: MxnLogo,
  ARS: ArsLogo,
  SGD: SgdLogo,
  SAR: SarLogo,
  JPY: JpyLogo,
  RON: RonLogo,
  SEK: SekLogo,
  AZN: AznLogo,
  RSD: RsdLogo,
  IDR: IdrLogo,
  NOK: NokLogo,
  MYR: MyrLogo,
  BGN: BgnLogo,
  EGP: EgpLogo,
  GTQ: GtqLogo,
  CLP: ClpLogo,
  NZD: NzdLogo,
  MDL: MdlLogo,
  BDT: DefaultLogo,
  KGS: DefaultLogo,
  THB: DefaultLogo,
  UZS: DefaultLogo,
  VND: DefaultLogo,
} as const;

const FlagIcon = forwardRef<
  SVGSVGElement,
  {
    currency: FiatCurrency;
  }
>(({ currency, ...props }, ref) => {
  const Component = CURRENCY_TO_FLAG[currency];

  if (!Component) return null;

  return <Component ref={ref} {...props} />;
});

export default FlagIcon;
