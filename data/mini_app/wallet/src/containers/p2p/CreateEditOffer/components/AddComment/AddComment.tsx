// eslint-disable-next-line
// @ts-ignore
import autosize from 'autosize';
import cn from 'classnames';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';

import routePaths from 'routePaths';

import { DetailCell } from 'components/Cells';
import { MainButton } from 'components/MainButton/MainButton';
import Section from 'components/Section/Section';

import { logEvent } from 'utils/common/logEvent';

import { useTheme } from 'hooks/utils/useTheme';

import { useCreateEditOfferPageContext } from '../../CreateEditOffer';
import StepsTitle from '../StepsTitle/StepsTitle';
import styles from './AddComment.module.scss';

const AddComment = () => {
  const { draftOffer, setDraftOffer, mode, offerId, offerType, settings } =
    useCreateEditOfferPageContext();

  const { t } = useTranslation();
  const { themeClassName } = useTheme(styles);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const MAX_COMMENT_LENGTH =
    settings?.offerSettings?.commentMaxLengthInclusive || 0;

  useEffect(() => {
    const commentEl = commentRef?.current;

    if (commentEl) {
      autosize(commentEl);
    }
  }, []);

  const handleCommentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const comment = e.target.value;

      const newLinesCount = (comment.match(/\n/g) || []).length;

      const commentLength = comment.length + newLinesCount;

      if (commentLength > MAX_COMMENT_LENGTH) {
        // If user copy-pasted a long text, we need to trim it
        if (!draftOffer.comment.length) {
          setDraftOffer((offer) => ({
            ...offer,
            comment: comment.slice(0, MAX_COMMENT_LENGTH - newLinesCount),
          }));
        }

        return;
      }

      setDraftOffer((offer) => ({
        ...offer,
        comment,
      }));
    },
    [MAX_COMMENT_LENGTH, draftOffer.comment.length, setDraftOffer],
  );

  const handleCompleteAddCommentStep = useCallback(() => {
    navigate(
      mode === 'create'
        ? routePaths.P2P_OFFER_CREATE_PREVIEW_OFFER
        : generatePath(routePaths.P2P_OFFER_EDIT_PREVIEW_OFFER, {
            id: offerId!,
          }),
    );

    logEvent('Maker. Creation step comment completed', {
      category: 'p2p.merchant.ad',
      type: offerType === 'SALE' ? 'sell' : 'buy',
    });
  }, [mode, navigate, offerId, offerType]);

  const commentNewLinesCount = (draftOffer.comment.match(/\n/g) || []).length;
  const commentLength = draftOffer.comment.length + commentNewLinesCount;

  return (
    <>
      <div className={themeClassName('root')}>
        <StepsTitle
          title={t('p2p.create_offer_page.add_comment_optional')}
          step={3}
          total={4}
        />
        <Section
          separator
          description={
            <>
              {draftOffer.comment &&
                commentLength > MAX_COMMENT_LENGTH - 20 && (
                  <p className={styles.charactersLeft}>
                    {t('p2p.create_offer_page.xx_characters_left', {
                      count:
                        MAX_COMMENT_LENGTH - commentLength > 0
                          ? MAX_COMMENT_LENGTH - commentLength
                          : 0,
                    })}
                  </p>
                )}

              <p className={styles.bold}>
                {t('p2p.create_offer_page.sample_message')}
              </p>
              <p>
                {offerType === 'PURCHASE'
                  ? t(
                      'p2p.create_offer_page.description_about_message_for_buy_offer',
                    )
                  : t('p2p.create_offer_page.description_about_message')}
              </p>
            </>
          }
          material={{ descriptionLayout: 'outer' }}
        >
          <DetailCell>
            <textarea
              ref={commentRef}
              placeholder={t('p2p.create_offer_page.enter_message')}
              onChange={handleCommentChange}
              value={draftOffer.comment}
              className={cn(themeClassName('comment'))}
              maxLength={MAX_COMMENT_LENGTH}
              rows={5}
              data-testid="tgcrawl"
            />
          </DetailCell>
        </Section>
      </div>
      <MainButton
        text={t('p2p.create_offer_page.continue').toLocaleUpperCase()}
        onClick={handleCompleteAddCommentStep}
        data-testid="tgcrawl"
      />
    </>
  );
};

export default AddComment;
