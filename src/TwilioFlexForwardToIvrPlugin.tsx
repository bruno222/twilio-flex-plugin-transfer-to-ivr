import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import { Button, Tab } from '@twilio/flex-ui';
import { request } from './helper';
import { buttons } from './config';

const PLUGIN_NAME = 'TwilioFlexForwardToIvrPlugin';

export default class TwilioFlexForwardToIvrPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  init(flex: typeof Flex, manager: Flex.Manager) {
    flex.TaskCanvasTabs.Content.add(<ForwardToIVR key="forward-to-ivr" label="Forward to IVR" uniqueName="forward-to-ivr" />, {
      if: ({ task: { channelType, taskStatus } }: any) => {
        return channelType === 'voice' && taskStatus !== 'wrapping';
      },
    });
  }
}

interface Props {
  label: string;
  uniqueName: string;
  key: string;
  task?: {
    attributes: {
      forwardToIvrUrl: string;
      call_sid: string;
    };
  };
}
const ForwardToIVR: React.FC<Props> = (props) => {
  const { task } = props;

  if (!task || !task.attributes || !task.attributes.forwardToIvrUrl) {
    console.log('@@@ForwardToIVR: Not a Call or the parameters for the "Forward to IVR" are not set.');
    return null;
  }

  const onClick = (forwardToIVRMenu: string) => async () => {
    const {
      attributes: { forwardToIvrUrl, call_sid },
    } = task;

    await request(forwardToIvrUrl, { CallSid: call_sid, forwardToIVRMenu });
  };

  const styles: any = {
    div: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '6px 12px',
      flex: 1,
    },
    button: {
      fontSize: '20px',
      margin: '15px',
    },
  };

  return (
    <Tab uniqueName="forward-to-ivr" key="forward-to-ivr">
      <div style={styles.div}>
        {buttons.map(({ id, name }) => {
          return (
            <Button style={styles.button} onClick={onClick(id)}>
              {name}
            </Button>
          );
        })}
      </div>
    </Tab>
  );
};
