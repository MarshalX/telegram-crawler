import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import {
  FC,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MaskedInput, mask } from 'react-hook-mask';
import { useTranslation } from 'react-i18next';

import API from 'api/p2p';
import {
  AttributeTypePartRestDto,
  AttributeTypePartRestDtoNameEnum,
  AttributeValueRestDtoNameEnum,
  AttributesRestDto,
  AttributesRestRequest,
  PaymentDetailsRestDto,
} from 'api/p2p/generated-common';
import { FiatCurrency } from 'api/wallet/generated';

import customPalette from 'customPalette';

import { ButtonCell, Cell, DetailCell, SelectionCell } from 'components/Cells';
import { MainButton } from 'components/MainButton/MainButton';
import Section from 'components/Section/Section';
import Skeleton from 'components/Skeleton/Skeleton';
import { SnackbarContext } from 'components/Snackbar/SnackbarProvider';

import { logEvent } from 'utils/common/logEvent';

import { useGetPaymentMethodName } from 'hooks/p2p';
import { useColorScheme } from 'hooks/utils/useColorScheme';
import { useTheme } from 'hooks/utils/useTheme';

import { ReactComponent as WarningSVG } from 'images/warning.svg';

import styles from './PaymentForm.module.scss';

const createMaskGenerator = (mask: string) => ({
  rules: new Map([['X', /\d|[X]/]]),
  generateMask: () => mask,
});

const RU_PHONE_MASK = '(XXX) XXX-XX-XX';

const RU_PHONE_GENERATOR = createMaskGenerator(RU_PHONE_MASK);

const { button_color, button_text_color } = window.Telegram.WebApp.themeParams;

interface BaseProps {
  paymentMethodName: string;
  paymentMethodCode: string;
  name?: string;
  currencyCode: FiatCurrency;
  source: 'ad' | 'profile' | 'order';
  bankCodes?: string[];
}

interface CreateProps extends BaseProps {
  onCreate: (data: PaymentDetailsRestDto) => void;
}

interface EditProps extends BaseProps {
  paymentId: number;
  onEdit: (data: PaymentDetailsRestDto) => void;
  onDelete?: (paymentId: number) => void;
  attributes?: AttributesRestDto;
}

const MAX_PAYMENT_DETAILS_NAME_LENGTH = 40;
type FieldVersion = 'V1' | 'V2';

export const PaymentForm: FC<CreateProps | EditProps> = ({
  paymentMethodName,
  paymentMethodCode,
  currencyCode,
  source,
  ...props
}) => {
  const isCreate = 'onCreate' in props;
  const isEdit = 'onEdit' in props;
  const outerAttributes = isEdit && props.attributes;
  const [fieldsVersion, setFieldVersion] = useState<FieldVersion>(
    outerAttributes ? (outerAttributes.version as FieldVersion) : 'V2',
  );

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();
  const { theme, themeClassName } = useTheme(styles);
  const colorScheme = useColorScheme();
  const snackbarContext = useContext(SnackbarContext);

  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const isHackWithFocusProcessed = useRef(false);

  const [name, setName] = useState<string>(
    props.name ? (props.name.length > 40 ? '' : props.name) : '',
  );

  const [attributes, setAttributes] = useState<
    {
      name: AttributeValueRestDtoNameEnum;
      value: string | string[];
      isError?: boolean;
      isRequired?: boolean;
    }[]
  >();

  const getPaymentMethodName = useGetPaymentMethodName();

  const { data: fields, isLoading } = useQuery(
    ['findPaymentMethodSchema', paymentMethodCode, fieldsVersion],
    async () => {
      const { data } = await API.PaymentDetails.findPaymentMethodSchema({
        paymentMethodCode,
        currencyCode,
      });

      if (data.status === 'SUCCESS' && data.data) {
        const version =
          data.data.versions.find((item) => item.version === fieldsVersion) ||
          data.data.versions[0];

        setFieldVersion(version.version as FieldVersion);

        return version.parts;
      }

      return null;
    },
  );

  useEffect(() => {
    if (fields && !attributes) {
      const attributes = fields.map((attribute) => {
        let value: string | string[] = attribute.type === 'SELECT' ? [] : '';

        if (outerAttributes) {
          const foundValue = outerAttributes.values.find(
            (a) => a.name === attribute.name,
          );

          if (typeof foundValue?.value === 'string') {
            value = foundValue.value;
          }

          if (foundValue && Array.isArray(foundValue?.value)) {
            value = foundValue.value.map((v) => v.code);
          }
        }

        if (value && attribute.name === 'PHONE') {
          // remove 7 from phone number
          value = value.slice(1);
        }

        if (!value && attribute.name === 'PHONE') {
          value = 'XXXXXXXXXX';
        }

        return {
          name: attribute.name,
          value,
          isError: false,
          isRequired: attribute.validations.some(
            (validation) => validation.type === 'REQUIRED' && validation.value,
          ),
        };
      });

      setAttributes(attributes);
    }
  }, [fields, attributes, outerAttributes]);

  const getFieldPlaceholder = ({
    fieldName,
    paymentMethodCode,
  }: {
    fieldName: AttributeTypePartRestDtoNameEnum;
    paymentMethodCode: string;
  }) => {
    if (fieldName === 'PAYMENT_DETAILS_NUMBER') {
      if (paymentMethodCode === 'upi')
        return t('p2p.payment_details_page.recipientNumber_placeholder_Upi');

      return t('p2p.payment_details_page.recipientNumber_placeholder');
    }

    return '';
  };

  const handleAttributeChange = (
    attribute: AttributeTypePartRestDto,
    value: string,
  ) => {
    const nextValue = (() => {
      const currentAttribute = attributes?.find(
        (a) => a.name === attribute.name,
      );

      if (!currentAttribute) return value;

      if (
        attribute.type === 'SELECT' &&
        Array.isArray(currentAttribute.value)
      ) {
        return currentAttribute.value.find((v) => v === value)
          ? currentAttribute.value.filter((v) => v !== value)
          : [...currentAttribute.value, value];
      }

      return value;
    })();

    let isError = false;

    for (const validation of attribute.validations) {
      if (
        attribute.type === 'INPUT' &&
        validation.type === 'MAX_LENGTH' &&
        nextValue.length > Number(validation.value)
      ) {
        snackbarContext.showSnackbar({
          snackbarId: 'validationError',
          icon: 'warning',
          text: t('p2p.payment_details_page.max_length_error', {
            count: Number(validation.value),
          }),
        });

        isError = true;
      }

      if (
        attribute.type === 'INPUT' &&
        validation.type === 'MIN_LENGTH' &&
        nextValue.length < Number(validation.value)
      ) {
        snackbarContext.showSnackbar({
          snackbarId: 'validationError',
          icon: 'warning',
          text: t('p2p.payment_details_page.min_length_error', {
            count: Number(validation.value),
          }),
        });

        isError = true;
      }

      if (
        attribute.name === 'BANKS' &&
        attribute.type === 'SELECT' &&
        validation.type === 'MAX_ARRAY_SIZE' &&
        nextValue.length > Number(validation.value)
      ) {
        snackbarContext.showSnackbar({
          snackbarId: 'validationError',
          before: <WarningSVG />,
          text: t(
            'p2p.create_offer_page.maximum_amount_of_payment_methods_error',
            {
              count: Number(validation.value),
            },
          ),
        });

        return;
      }

      if (!isError) {
        isError = false;
      }
    }

    setAttributes((prevAttributes) => {
      if (!prevAttributes) return;

      return prevAttributes.map((data) => {
        if (data.name === attribute.name) {
          return {
            ...data,
            value: nextValue,
            isError,
          };
        }

        return data;
      });
    });
  };

  useEffect(() => {
    return () => {
      snackbarContext.hideSnackbar('validationError');
    };
  }, []);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > MAX_PAYMENT_DETAILS_NAME_LENGTH) {
      setIsNameError(true);
      snackbarContext.showSnackbar({
        snackbarId: 'customPaymentDetailsName',
        before: <WarningSVG />,
        text: t('p2p.payment_details_page.custom_name_length_error', {
          count: MAX_PAYMENT_DETAILS_NAME_LENGTH,
        }),
      });
      return;
    } else {
      setIsNameError(false);
      snackbarContext.hideSnackbar('customPaymentDetailsName');
    }

    setName(event.target.value);
  };

  const handleSubmit = async () => {
    if (!attributes) return;

    const attributesToSubmit: AttributesRestRequest = {
      version: fieldsVersion,
      values: attributes.map((attribute) => ({
        name: attribute.name,
        value:
          attribute.name === 'PHONE' ? `7${attribute.value}` : attribute.value,
      })) as AttributesRestRequest['values'],
    };

    try {
      setIsFormLoading(true);

      if (isCreate) {
        if (!props.onCreate) throw new Error('onCreate is required');

        const { data } = await API.PaymentDetails.createPaymentDetailsV2({
          paymentMethodCode,
          currencyCode,
          name: name,
          attributes: attributesToSubmit,
        });

        if (data.status === 'SUCCESS' && data.data) {
          logEvent('Payment method created', {
            category: 'p2p.merchant',
            source,
            currency: currencyCode,
            payment_method: paymentMethodCode,
          });

          props.onCreate(data.data);
        } else {
          console.error(data);
          snackbarContext.showSnackbar({
            snackbarId: 'common.something_went_wrong',
            text: t('common.something_went_wrong'),
            before: <WarningSVG />,
          });
        }
      } else if (isEdit) {
        if (!props.paymentId) {
          throw new Error('paymentId is required');
        }

        if (!props.onEdit) throw new Error('onEdit is required');

        const { data } = await API.PaymentDetails.editPaymentDetailsV2({
          id: props.paymentId,
          paymentMethodCode,
          currencyCode,
          name: name,
          attributes: attributesToSubmit,
        });

        if (data.status === 'SUCCESS' && data.data) {
          props.onEdit(data.data);
        } else {
          console.error(data);
          snackbarContext.showSnackbar({
            snackbarId: 'common.something_went_wrong',
            text: t('common.something_went_wrong'),
            before: <WarningSVG />,
          });
        }
      }
    } catch (error) {
      console.error(error);
      snackbarContext.showSnackbar({
        snackbarId: 'common.something_went_wrong',
        text: t('common.something_went_wrong'),
        before: <WarningSVG />,
      });
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!isEdit) return;

      if (!props.paymentId) {
        throw new Error('paymentId is required');
      }

      if (!props.onDelete) {
        throw new Error('onDelete is required');
      }

      const { data } = await API.PaymentDetails.deletePaymentDetailsV2({
        id: props.paymentId,
      });

      if (data.status === 'SUCCESS') {
        logEvent('Payment method removed', {
          category: 'p2p.merchant',
          currency: currencyCode,
          payment_method: paymentMethodCode,
        });

        props.onDelete(props.paymentId);
      } else if (data.status === 'CANNOT_DELETE_WHEN_USED_IN_OFFER') {
        snackbarContext.showSnackbar({
          snackbarId: 'payment_details_page.cannot_delete',
          text: t('p2p.payment_details_page.cannot_delete'),
          before: <WarningSVG />,
        });
      } else {
        console.error(data);
        snackbarContext.showSnackbar({
          snackbarId: 'common.something_went_wrong',
          text: t('common.something_went_wrong'),
          before: <WarningSVG />,
        });
      }
    } catch (error) {
      console.error(error);
      snackbarContext.showSnackbar({
        snackbarId: 'common.something_went_wrong',
        text: t('common.something_went_wrong'),
        before: <WarningSVG />,
      });
    }
  };

  const mainButtonText = useMemo(() => {
    if (isCreate) {
      return 'p2p.payment_details_page.create_form_button';
    } else {
      return 'p2p.payment_details_page.update_form_button';
    }
  }, [isCreate]);

  const isButtonDisabled =
    name.length === 0 ||
    !attributes ||
    attributes.some(
      (attribute) => attribute.isRequired && attribute.value.length === 0,
    ) ||
    attributes.some((attribute) => attribute.isError) ||
    attributes.some((attribute) => {
      if (attribute.name === 'PHONE') {
        const validation = fields
          ?.find((field) => field.name === attribute.name)
          ?.validations.find(
            (validation) =>
              validation.type === 'REGEX_PATTERN' && validation.value,
          );

        if (
          attribute.name === 'PHONE' &&
          validation?.type === 'REGEX_PATTERN' &&
          !new RegExp(String(validation.value)).test(
            // for ru phone number we need to add 7
            String(7 + (attribute.value as string)),
          )
        ) {
          return true;
        }

        return false;
      }
    });

  const phoneMaskOverlay = useMemo(() => {
    let value = mask(
      (attributes?.find((a) => a.name === 'PHONE')?.value as string) || '',
      RU_PHONE_GENERATOR,
    );

    // if value missing some chars from placeholder then fill it
    if (value.length < RU_PHONE_MASK.length) {
      value = RU_PHONE_MASK.split('')
        .map((char, index) => {
          if (value[index]) {
            return value[index];
          }

          return char;
        })
        .join('');
    }

    // if user fill all X-s with digits then show it as is
    if (value.length === RU_PHONE_MASK.length && value.indexOf('X') === -1) {
      return value;
    }

    return value.split('').map((char, index) => {
      // if char not digit then make it gray
      if (!/\d/.test(char)) {
        return (
          <span className={styles.hintColor} key={index}>
            {char}
          </span>
        );
      }

      return char;
    });
  }, [attributes]);

  return (
    <>
      <Skeleton
        skeletonShown={isLoading}
        skeleton={
          <div className={themeClassName('root')}>
            <Section separator title={paymentMethodName}>
              <DetailCell fetching />
            </Section>
            <Section separator>
              <DetailCell header="" fetching />
            </Section>
          </div>
        }
      >
        <div className={themeClassName('root')}>
          <Section separator title={paymentMethodName}>
            <DetailCell>
              <div
                className={classNames(
                  themeClassName('materialInput'),
                  isNameError && themeClassName('inputError'),
                )}
              >
                <input
                  name="name"
                  placeholder={t('p2p.payment_details_page.name_placeholder')}
                  onChange={handleChangeName}
                  value={name}
                  className={themeClassName('input')}
                  data-testid="tgcrawl"
                  ref={nameRef}
                />
              </div>
            </DetailCell>
          </Section>
          {fields &&
            fields.map((field, index) => {
              if (field.type === 'INPUT') {
                return (
                  <Section
                    separator={theme === 'material' || field.name !== 'PHONE'}
                    key={field.name}
                  >
                    <DetailCell header="">
                      <div
                        className={classNames(
                          field.name === 'PHONE' && styles.phoneField,
                          themeClassName('materialInput'),
                          attributes?.find((a) => a.name === field.name)
                            ?.isError && themeClassName('inputError'),
                        )}
                      >
                        {field.name === 'PHONE' ? (
                          <>
                            <div className={themeClassName('phoneMaskOverlay')}>
                              +7 {phoneMaskOverlay}
                            </div>
                            <div className={styles.phoneCodeWrapper}>
                              <div className={themeClassName('phoneCode')}>
                                +7{' '}
                              </div>
                              <MaskedInput
                                className={classNames(
                                  themeClassName('input'),
                                  styles.phoneInput,
                                )}
                                onClick={() => {
                                  if (!phoneRef.current) return;

                                  if (
                                    phoneRef.current.value === RU_PHONE_MASK
                                  ) {
                                    phoneRef.current.setSelectionRange(0, 0);
                                  }

                                  if (!phoneRef.current.selectionStart) return;

                                  // if click on position before SYMBOLS then focus on position before all X-s
                                  if (
                                    [
                                      'X',
                                      ' ',
                                      '-',
                                      '+',
                                      '7',
                                      '(',
                                      ')',
                                    ].includes(
                                      phoneRef.current.value[
                                        phoneRef.current.selectionStart - 1
                                      ],
                                    )
                                  ) {
                                    phoneRef.current.setSelectionRange(
                                      phoneRef.current.value.indexOf('X'),
                                      phoneRef.current.value.indexOf('X'),
                                    );
                                  }
                                }}
                                ref={phoneRef}
                                maskGenerator={RU_PHONE_GENERATOR}
                                name={field.name}
                                placeholder={getFieldPlaceholder({
                                  fieldName: field.name,
                                  paymentMethodCode,
                                })}
                                autoComplete="tel"
                                inputMode="tel"
                                type="tel"
                                onChange={(value: string) => {
                                  if (
                                    index === 0 &&
                                    !isHackWithFocusProcessed.current
                                  ) {
                                    setTimeout(() => {
                                      phoneRef?.current?.focus();

                                      const isEmptyField =
                                        phoneRef?.current?.value ===
                                        RU_PHONE_MASK;

                                      if (isEmptyField) {
                                        setTimeout(() => {
                                          phoneRef?.current?.setSelectionRange(
                                            0,
                                            0,
                                          );
                                        }, 0);
                                      } else {
                                        phoneRef?.current?.setSelectionRange(
                                          phoneMaskOverlay.length,
                                          phoneMaskOverlay.length,
                                        );
                                      }
                                    }, 0);

                                    isHackWithFocusProcessed.current = true;
                                    return;
                                  }

                                  handleAttributeChange(field, value);
                                }}
                                value={
                                  attributes?.find((a) => a.name === field.name)
                                    ?.value || ''
                                }
                                data-testid={`${field.name}-input`}
                              />
                            </div>
                          </>
                        ) : (
                          <input
                            className={classNames(themeClassName('input'))}
                            name={field.name}
                            placeholder={getFieldPlaceholder({
                              fieldName: field.name,
                              paymentMethodCode,
                            })}
                            type="text"
                            onChange={(event) => {
                              handleAttributeChange(field, event.target.value);
                            }}
                            value={
                              attributes?.find((a) => a.name === field.name)
                                ?.value || ''
                            }
                            data-testid={`${field.name}-input`}
                            autoFocus={index === 0}
                          />
                        )}
                      </div>
                    </DetailCell>
                  </Section>
                );
              }

              if (field.type === 'SELECT' && field.name === 'BANKS') {
                return (
                  <Section
                    separator
                    key={field.name}
                    // eslint-disable-next-line
                    // @ts-ignore
                    title={
                      <div className={styles.banksSectionHeader}>
                        <div>{t('p2p.payment_details_page.choose_method')}</div>
                        <div className={styles.textColor}>
                          {t('p2p.payment_details_page.n_of_m', {
                            n:
                              attributes?.find((a) => a.name === field.name)
                                ?.value?.length || 0,
                            m:
                              field.validations.find(
                                (v) => v.type === 'MAX_ARRAY_SIZE',
                              )?.value || 0,
                          })}
                        </div>
                      </div>
                    }
                  >
                    <Cell.List>
                      {field.options.map((option) => (
                        <SelectionCell
                          key={option.value}
                          onChange={() => {
                            handleAttributeChange(field, option.value);
                          }}
                          value={option.value}
                          checked={
                            !!attributes
                              ?.find((a) => a.name === field.name)
                              ?.value?.includes(option.value)
                          }
                          name="payment-methods"
                          mode="checkbox"
                        >
                          {getPaymentMethodName({
                            code: option.value,
                            name: option.label,
                            originNameLocale: option.labelLocale,
                            nameEng: option.labelEng,
                          })}
                        </SelectionCell>
                      ))}
                    </Cell.List>
                  </Section>
                );
              }

              return null;
            })}
          {isEdit && props.onDelete && (
            <Section separator>
              <ButtonCell
                mode="danger"
                onClick={() => {
                  window.Telegram.WebApp.showPopup(
                    {
                      title: t('p2p.payment_details_page.delete_popup_title'),
                      message: t(
                        'p2p.payment_details_page.delete_popup_message',
                      ),
                      buttons: [
                        {
                          id: 'yes',
                          text: t(
                            'p2p.payment_details_page.delete_popup_confirm_btn',
                          ),
                        },
                        {
                          id: 'no',
                          text: t(
                            'p2p.payment_details_page.delete_popup_cancel_btn',
                          ),
                        },
                      ],
                    },
                    async (id) => {
                      if (id === 'yes') {
                        handleDelete();
                      }
                    },
                  );
                }}
                data-testid="tgcrawl"
              >
                {t('p2p.payment_details_page.remove_payment_method')}
              </ButtonCell>
            </Section>
          )}
        </div>
      </Skeleton>
      <MainButton
        data-testid="tgcrawl"
        onClick={handleSubmit}
        text={t(mainButtonText).toLocaleUpperCase()}
        disabled={isButtonDisabled}
        progress={isFormLoading}
        color={
          isButtonDisabled
            ? customPalette[theme][colorScheme].button_disabled_color
            : button_color
        }
        textColor={
          isButtonDisabled
            ? customPalette[theme][colorScheme].button_disabled_text_color
            : button_text_color
        }
      />
    </>
  );
};
