{
    "description": "Demo Transfer to IVR",
    "states": [
      {
        "name": "Trigger",
        "type": "trigger",
        "transitions": [
          {
            "event": "incomingMessage"
          },
          {
            "next": "mainMenu",
            "event": "incomingCall"
          },
          {
            "event": "incomingRequest"
          },
          {
            "event": "incomingParent"
          }
        ],
        "properties": {
          "offset": {
            "x": 0,
            "y": 0
          }
        }
      },
      {
        "name": "sendToFlex",
        "type": "add-twiml-redirect",
        "transitions": [
          {
            "next": "backToIVRSplit",
            "event": "return"
          },
          {
            "event": "timeout"
          },
          {
            "event": "fail"
          }
        ],
        "properties": {
          "offset": {
            "x": 270,
            "y": 1220
          },
          "method": "POST",
          "url": "https://manual-tests-bruno-1234.twil.io/send-to-flex-and-back-to-studio",
          "timeout": "14400"
        }
      },
      {
        "name": "mainMenu",
        "type": "gather-input-on-call",
        "transitions": [
          {
            "next": "mainMenuSplit",
            "event": "keypress"
          },
          {
            "event": "speech"
          },
          {
            "event": "timeout"
          }
        ],
        "properties": {
          "voice": "Polly.Joanna",
          "number_of_digits": 1,
          "speech_timeout": "auto",
          "offset": {
            "x": 150,
            "y": 240
          },
          "loop": 1,
          "finish_on_key": "#",
          "say": "Welcome to Twilio! Press 1 to Sales or 2 to Services",
          "language": "en-US",
          "stop_gather": true,
          "gather_language": "en-US",
          "profanity_filter": "true",
          "timeout": 5
        }
      },
      {
        "name": "mainMenuSplit",
        "type": "split-based-on",
        "transitions": [
          {
            "event": "noMatch"
          },
          {
            "next": "saySales",
            "event": "match",
            "conditions": [
              {
                "friendly_name": "sales",
                "arguments": [
                  "{{widgets.mainMenu.Digits}}"
                ],
                "type": "equal_to",
                "value": "1"
              }
            ]
          },
          {
            "next": "sayServices",
            "event": "match",
            "conditions": [
              {
                "friendly_name": "services",
                "arguments": [
                  "{{widgets.mainMenu.Digits}}"
                ],
                "type": "equal_to",
                "value": "2"
              }
            ]
          }
        ],
        "properties": {
          "input": "{{widgets.mainMenu.Digits}}",
          "offset": {
            "x": -210,
            "y": 510
          }
        }
      },
      {
        "name": "sayServices",
        "type": "say-play",
        "transitions": [
          {
            "next": "sendToFlex",
            "event": "audioComplete"
          }
        ],
        "properties": {
          "voice": "Polly.Joanna",
          "offset": {
            "x": 420,
            "y": 930
          },
          "loop": 1,
          "say": "Welcome to Services, please wait while I forward your call to one of your specialists.",
          "language": "en-US"
        }
      },
      {
        "name": "saySales",
        "type": "say-play",
        "transitions": [
          {
            "next": "sendToFlex",
            "event": "audioComplete"
          }
        ],
        "properties": {
          "voice": "Polly.Joanna",
          "offset": {
            "x": 70,
            "y": 930
          },
          "loop": 1,
          "say": "Welcome to Sales, please wait while I forward your call to one of your specialists.",
          "language": "en-US"
        }
      },
      {
        "name": "backToIVRSplit",
        "type": "split-based-on",
        "transitions": [
          {
            "event": "noMatch"
          },
          {
            "next": "saySales",
            "event": "match",
            "conditions": [
              {
                "friendly_name": "sales",
                "arguments": [
                  "{{widgets.sendToFlex.transferToIVRMenu}}"
                ],
                "type": "equal_to",
                "value": "sales"
              }
            ]
          },
          {
            "next": "sayServices",
            "event": "match",
            "conditions": [
              {
                "friendly_name": "services",
                "arguments": [
                  "{{widgets.sendToFlex.transferToIVRMenu}}"
                ],
                "type": "equal_to",
                "value": "services"
              }
            ]
          },
          {
            "next": "mainMenu",
            "event": "match",
            "conditions": [
              {
                "friendly_name": "main",
                "arguments": [
                  "{{widgets.sendToFlex.transferToIVRMenu}}"
                ],
                "type": "equal_to",
                "value": "main"
              }
            ]
          }
        ],
        "properties": {
          "input": "{{widgets.sendToFlex.transferToIVRMenu}}",
          "offset": {
            "x": 1270,
            "y": 1460
          }
        }
      }
    ],
    "initial_state": "Trigger",
    "flags": {
      "allow_concurrent_calls": true
    }
  }