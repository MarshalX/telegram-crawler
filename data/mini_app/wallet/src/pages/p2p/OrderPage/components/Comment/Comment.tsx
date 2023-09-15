import cn from 'classnames';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DetailCell } from 'components/Cells';
import Section from 'components/Section/Section';

import { getLinesCountInElement } from 'utils/common/getLinesCountInElement';

import { ReactComponent as MessageSVG } from 'images/message_outline.svg';

import { OrderPageContext } from '../../OrderPage';
import styles from './Comment.module.scss';

interface Props {
  separator?: boolean;
}

export const Comment: FC<Props> = ({ separator = true }) => {
  const [showCommentIconOnTop, setShowCommentIconOnTop] = useState(false);
  const commentElRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { order } = useContext(OrderPageContext);

  useEffect(() => {
    const el = commentElRef.current;

    if (!el) return;

    const linesCount = getLinesCountInElement(el);

    setShowCommentIconOnTop(linesCount > 3);
  }, []);

  if (!order || !order.offerComment) return null;

  return (
    <Section
      apple={{ fill: 'secondary' }}
      separator={separator}
      description={t('p2p.offer_details_page.comment_caution')}
    >
      <DetailCell
        beforeClassName={cn(showCommentIconOnTop && styles.alignSelfStart)}
        before={<MessageSVG />}
        header={t('p2p.offer_details_page.comment')}
      >
        <div ref={commentElRef} className={styles.comment}>
          {order.offerComment}
        </div>
      </DetailCell>
    </Section>
  );
};
