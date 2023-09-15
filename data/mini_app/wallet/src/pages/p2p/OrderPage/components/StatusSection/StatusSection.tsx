import { FC } from 'react';

import { DetailCell } from 'components/Cells';
import Section from 'components/Section/Section';

import { ReactComponent as ClockIcon } from 'images/clock_icon.svg';
import { ReactComponent as WarningIcon } from 'images/exclamation_mark_triange.svg';
import { ReactComponent as MessageIcon } from 'images/message_icon.svg';
import { ReactComponent as WarningRedIcon } from 'images/red_warning_icon.svg';
import { ReactComponent as CheckIcon } from 'images/white_green_check.svg';
import { ReactComponent as CrossIcon } from 'images/white_red_cross.svg';

const WarningYellowIcon = () => <WarningIcon style={{ color: '#FAC300' }} />;

interface Props {
  sections: Array<{
    icon?: 'clock' | 'warning' | 'message' | 'redWarning' | 'cross' | 'check';
    header: string;
    content?: string;
    action?: JSX.Element;
    before?: JSX.Element;
    after?: JSX.Element;
    allowScroll?: boolean;
  }>;
  description?: JSX.Element;
  separator?: boolean;
}

export const StatusSection: FC<Props> = ({
  sections,
  description,
  separator = true,
}) => {
  return (
    <Section
      apple={{ fill: 'secondary' }}
      separator={separator}
      description={description}
    >
      {sections.map((section) => {
        const icon = section.icon
          ? {
              clock: <ClockIcon />,
              warning: <WarningYellowIcon />,
              message: <MessageIcon />,
              redWarning: <WarningRedIcon />,
              cross: <CrossIcon />,
              check: <CheckIcon />,
            }[section.icon]
          : null;

        return (
          <DetailCell
            key={section.header}
            header={section.header}
            before={section.before || icon}
            after={section.after}
            allowScroll={section.allowScroll}
          >
            <div>{section.content}</div>
            <div>{section.action && section.action}</div>
          </DetailCell>
        );
      })}
    </Section>
  );
};
