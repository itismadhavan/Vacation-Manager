const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const constants = require('./constants');
const formhelper = require('./blockKitHelper');
const redis = require('redis');

const app = express()
const redisClient = redis.createClient();
redisClient.on('connect', () => {
  console.log('redis clinet connected');
});
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const authToken = "xoxp-672673271492-661747186131-752118349892-3fa27c417ae84a6e4ed689b81e899433";

function sendMessageToSlackResponseURL(responseURL, JSONmessage) {
  const postOptions = {
    uri: responseURL,
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    json: JSONmessage
  }
  request(postOptions, (error, response, body) => {
    if (error) {
    }
  })
}

//for making any external API calls
function make_API_call(url) {
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (err, res, body) => {
      if (err) reject(err)
      resolve(body)
    });
  })
}


function createAddReasonDialog(triggerID) {
  return (
    {
      "trigger_id": triggerID,
      "dialog": {
        "callback_id": "vacation-manager-46e2b0",
        "title": "Add resson",
        "submit_label": "Confirm",
        "notify_on_cancel": false,
        "state": "Limo",
        "elements": [
          {
            "label": "Vacation reson",
            "name": "comment",
            "type": "textarea",
          }
        ]
      }
    })
}

function createLeaveReqFormForType(type) {
  return new Promise((resolve, reject) => {
    let formBlocks = formhelper.buildRequestFormBlocksForLeaveType(type);
    if (formBlocks.length > 0) {
      resolve({
        blocks: [
          ...formhelper.buildRequestFormBlocksForLeaveType(type)
        ]
      });
    }
    else {
      reject();
    }
  })
}
function updateLeaveReqFormForType(type) {
  return new Promise((resolve, reject) => {
    let formBlocks = formhelper.updateRequestFormBlocksForLeaveType(type);
    if (formBlocks.length > 0) {
      resolve({
        blocks: [
          ...formBlocks
        ]
      });
    }
    else {
      reject();
    }
  })
}

app.post('/', (req, res) => {
  res.send({
    "text": "Hi Looking to take some time off? Let me help!",
    "attachments": [
      {
        "fallback": "You are unable to create a holiday",
        "callback_id": "vacation_manger_actions",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "actions": [
          {
            "name": "Request Leave",
            "text": "Request leave",
            "type": "button",
            "style": "primary",
            "value": "new_leave_request"
          },
          {
            "name": "Cancel Request",
            "text": "Cancel",
            "type": "button",
            "style": "danger",
            "value": "cancel_request",
          }
        ]
      }
    ]
  });
});

app.post('/slack/actions', urlencodedParser, (req, res) => {
  let message = {};
  let ValueFromCache = {};
  res.status(200).end();
  const actionJSONPayload = JSON.parse(req.body.payload);

  if (actionJSONPayload.type === "dialog_submission") {
    redisClient.get(actionJSONPayload.user.id, (error, value) => {
      ValueFromCache = JSON.parse(value);
      ValueFromCache.reason = actionJSONPayload.submission.comment;
      updateLeaveReqFormForType(ValueFromCache)
        .then((result) => {
          sendMessageToSlackResponseURL(actionJSONPayload.response_url, result);
          redisClient.set(actionJSONPayload.user.id, JSON.stringify(ValueFromCache));
        })
        .catch(err => {
          throw err;
        })
    });
  }
  else if (actionJSONPayload.actions[0].type === "static_select") {
    redisClient.get(actionJSONPayload.user.id, (error, value) => {
      ValueFromCache = JSON.parse(value);
      if (ValueFromCache.value !== actionJSONPayload.actions[0].selected_option.value) {
        ValueFromCache.value = actionJSONPayload.actions[0].selected_option.value;
        updateLeaveReqFormForType(ValueFromCache)
          .then((result) => {
            sendMessageToSlackResponseURL(actionJSONPayload.response_url, result);
            redisClient.set(actionJSONPayload.user.id, JSON.stringify(ValueFromCache));
          })
          .catch(err => {
            throw err;
          })
      }
    });
  }
  else if (actionJSONPayload.actions[0].type === "datepicker") {

    switch (actionJSONPayload.actions[0].action_id) {
      case "start_date":
        redisClient.get(actionJSONPayload.user.id, (error, value) => {
          ValueFromCache = JSON.parse(value);
          ValueFromCache.startDate = actionJSONPayload.actions[0].selected_date;
          updateLeaveReqFormForType(ValueFromCache)
            .then((result) => {
              sendMessageToSlackResponseURL(actionJSONPayload.response_url, result);
              redisClient.set(actionJSONPayload.user.id, JSON.stringify(ValueFromCache));
            })
            .catch(err => {
              throw err;
            })
        });
        break;
      case "end_date":
        redisClient.get(actionJSONPayload.user.id, (error, value) => {
          ValueFromCache = JSON.parse(value);
          ValueFromCache.endDate = actionJSONPayload.actions[0].selected_date;
          updateLeaveReqFormForType(ValueFromCache)
            .then((result) => {
              sendMessageToSlackResponseURL(actionJSONPayload.response_url, result);
              redisClient.set(actionJSONPayload.user.id, JSON.stringify(ValueFromCache));
            })
            .catch(err => {
              throw err;
            })
        });
        break;
    }

  }
  else {
    switch (actionJSONPayload.actions[0].value) {
      case "new_leave_request":
        let defaultValue = constants.ALL_LEAVE_TYPES.find((item => item.value === "PAID_TIME_OFF"));
        const value = {
          startDate: `${defaultValue.startDate.getFullYear()}-${defaultValue.startDate.getMonth() + 1}-${defaultValue.startDate.getDate()}`,
          endDate: `${defaultValue.endDate.getFullYear()}-${defaultValue.endDate.getMonth() + 1}-${defaultValue.endDate.getDate()}`,
          value: defaultValue.value,
          reason: ''
        }
        redisClient.set(actionJSONPayload.user.id, JSON.stringify(value), () => {
          createLeaveReqFormForType(value)
            .then((result) => {
              sendMessageToSlackResponseURL(actionJSONPayload.response_url, result);
            })
            .catch((err) => {
              throw err;
            })
        });
        break;
      case "add_reason":
        sendMessageToSlackResponseURL("https://slack.com/api/dialog.open", createAddReasonDialog(actionJSONPayload.trigger_id));
        break;
      case "cancel_request":
        message = {
          "text": `Your request is cancelled`,
          "replace_original": true
        }
        sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);
        break;
      case "submit_leave_request":
        redisClient.get(actionJSONPayload.user.id, (error, value) => {
          ValueFromCache = JSON.parse(value);
          console.log(ValueFromCache);
        });
        break;
      case "cancel_leave_request":
        message = {
          "text": `Your leave request is cancelled`,
          "replace_original": true
        }
        sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);
        break;
    }
  }
})
const server = require('http').createServer(app);

const port = process.env.PORT || 6000;
server.listen(port);

console.log('App is listening on port ' + port);