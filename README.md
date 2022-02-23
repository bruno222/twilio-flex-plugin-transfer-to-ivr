## Screenshots

This Plugin in action:

![Plugin](/.docs/screenshot-flex.png)

Studio flow example:

![Studio](/.docs/screenshot-studio.png)

## What

This is a [Flex Plugin](https://www.twilio.com/docs/flex/developer/plugins) that allows the Agents of your Contact Center to forward back the call to the IVR.

## Why?

    The main use-case is this one:

    Customer calls but presses the wrong options on the IVR and ends up talking with the wrong Agent..

    Instead of having the Agent saying "oh we are not sales, we are services, call us again please", the Agent can help this customer and forward him/her back to the exact menu in the IVR the customer wants to go to, avoiding having the customer to listen all your IVR flow once again.

## How to install

You have to work on 3 things, don't get scared of, they are quick steps:

- Step 1 - Create a new Twilio Function
- Step 2 - Create a new StudioFlow
- Step 3 - Install the Flex Plugin

#### Step 1 - Create a new Twilio Function

1. TODO - but for now: create a Public Function copying the script from ./docs/function-send-to-flex-and-back-to-studio.js)

#### Step 2 - Create a new StudioFlow

1. TODO (but for now: copy from ./docs/studio-flow-json.js and change the URL of the widget "Redirect TwiML")

#### Step 3 - Install the Flex Plugin

1. clone this repo;
2. `npm install` to install the packages into your computer.
3. You need to have the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart). Type `twilio` in your terminal to see if you have it, if not, install it now.
4. You need the [Flex Plugins CLI](https://www.twilio.com/docs/flex/developer/plugins/cli/install) . Type `twilio plugins` to make sure you have it, if not, install it.
5. You need to create a new profile for your Twilio CLI, type `twilio profiles:list` to check if you are using it correctly. If not, add a new profile with the cmd `twilio profiles:add`.
6. `npm run deploy -- --changelog "first deployment!"` to deploy this Plugin.
7. Once **step 6** is finished, it will show the next steps, you will have to run the command mentioned there (something like `twilio flex:plugins:release ... etc etc`)
8. We are done! Go to https://flex.twilio.com and make a call to your IVR! Once you accept the call on Flex, you will be able to see the new tab "FORWARD TO IVR"
