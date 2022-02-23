import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import { Button, Tab } from '@twilio/flex-ui';

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
      if: ({ task: { channelType } }: any) => {
        return channelType === 'voice';
      },
    });
  }
}

interface Props {
  label: string;
  uniqueName: string;
  key: string;
  task?: {
    attributes: string;
  };
}
const ForwardToIVR: React.FC<Props> = (props) => {
  const { task } = props;
  const { attributes } = task!;

  console.log('@@@task', task);
  console.log('@@@taskattributes', attributes);
  // console.log('@@@props', props);
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
        <Button style={styles.button}>Main menu</Button>
        <Button style={styles.button}>Sales menu</Button>
        <Button style={styles.button}>Service menu</Button>
      </div>
    </Tab>
  );
};
