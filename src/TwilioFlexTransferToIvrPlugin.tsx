import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import { Button, Tab } from '@twilio/flex-ui';
import { request } from './helper';
import { buttons } from './config';

const PLUGIN_NAME = 'TwilioFlexTransferToIvrPlugin';

export default class TwilioFlexTransferToIvrPlugin extends FlexPlugin {
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
    flex.TaskCanvasTabs.Content.add(<TransferToIVR key="transfer-to-ivr" label="Transfer to IVR" uniqueName="transfer-to-ivr" />, {
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
      transferToIvrUrl: string;
      call_sid: string;
    };
  };
}
const TransferToIVR: React.FC<Props> = (props) => {
  const { task } = props;

  if (!task || !task.attributes || !task.attributes.transferToIvrUrl) {
    console.log('@@@TransferToIVR: Not a Call or the parameters for the "Transfer to IVR" are not set.');
    return null;
  }

  const onClick = (transferToIVRMenu: string) => async () => {
    const {
      attributes: { transferToIvrUrl, call_sid },
    } = task;

    await request(transferToIvrUrl, { CallSid: call_sid, transferToIVRMenu });
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
    <Tab uniqueName="transfer-to-ivr" key="transfer-to-ivr">
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
