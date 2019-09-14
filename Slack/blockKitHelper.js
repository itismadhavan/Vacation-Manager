const constants = require('./constants');


function buildRequestFormBlocksForLeaveType(leaveTypeItem) {
  return form = [newLeaveRequestHeader(),
  LeaveRequestAvailableDays(leaveTypeItem.value),
  createLeaveTypeSelectionOptions(leaveTypeItem.value),
  leaveRequestStartDate(leaveTypeItem.startDate),
  leaveRequestEndDate(leaveTypeItem.endDate),
  divider(),
  ...formActions(true)];
}


function updateRequestFormBlocksForLeaveType(leaveTypeItem) {
  let isvalid = validateDates(leaveTypeItem.startDate, leaveTypeItem.endDate);

  form = [newLeaveRequestHeader(),
  LeaveRequestAvailableDays(leaveTypeItem.value),
  createLeaveTypeSelectionOptions(leaveTypeItem.value),
  leaveRequestStartDate(leaveTypeItem.startDate),
  leaveRequestEndDate(leaveTypeItem.endDate),
  leaveRequestReason(leaveTypeItem.reason),
  divider()];

  if (isvalid) {
    return [...form, ...formActions(true)];
  }
  else {
    return [...form, ...warning(), ...formActions(false)]
  }
}


function validateDates(startDate, endDate) {
  if (date_diff_indays(startDate, endDate) < 0) {
    return false;
  }
  return true;
}


date_diff_indays = (date1, date2) => {
  let dt1 = new Date(date1);
  let dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
}


function leaveRequestReason(leaveTypeReason) {
  if (leaveTypeReason !== '') {
    return ({
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": "*Reason*"
        },
        {
          "type": "mrkdwn",
          "text": leaveTypeReason
        }]
    })
  }
  else {
    return ({
      "type": "section",
      "text": {
        "type": "plain_text",
        "text": " ",
        "emoji": true
      }
    });
  }
}

function newLeaveRequestHeader() {
  return ({
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*Request a leave* \nPlease select one of the available leave types from the list below, and select the start and end dates of your leave. When you click the Send request button, your request will be sent for approval."
    }
  })
}

function divider() {
  return ({
    "type": "divider"
  })
}

function warning() {
  return ([{
    "type": "context",
    "elements": [
      {
        "type": "image",
        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/notificationsWarningIcon.png",
        "alt_text": "notifications warning icon"
      },
      {
        "type": "mrkdwn",
        "text": "*Error: End date can't be before start, please select the date in the future*"
      }
    ]
  }, {
    "type": "divider"
  }]);
}

function LeaveRequestAvailableDays(leaveTypeValue) {
  let leave = constants.ALL_LEAVE_TYPES.find((item) => {
    if (item.value === leaveTypeValue) {
      return item;
    }
  })
  return ({
    "type": "section",
    "fields": [
      {
        "type": "mrkdwn",
        "text": "*Leave type*"
      },
      {
        "type": "mrkdwn",
        "text": "*Days remaining for current year*"
      },
      {
        "type": "plain_text",
        "text": `${leave.name}`,
        "emoji": true
      },
      {
        "type": "plain_text",
        "text": `${leave.daysRemaining}`,
        "emoji": true
      }
    ]
  })
}


function leaveRequestEndDate(endDate) {
  return ({
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "Select a end date"
    },
    "accessory": {
      "type": "datepicker",
      "action_id": "end_date",
      "initial_date": endDate,
      "placeholder": {
        "type": "plain_text",
        "text": "Select a date",
        "emoji": true
      }
    }
  });
}

function leaveRequestStartDate(startDate) {
  return ({
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "Select a start date"
    },
    "accessory": {
      "type": "datepicker",
      "action_id": "start_date",
      "initial_date": startDate,
      "placeholder": {
        "type": "plain_text",
        "text": "Select a date",
        "emoji": true
      }
    }
  })
}


function createLeaveTypeSelectionOptions(leaveTypeValue) {
  let options = [];
  for (let index = 0; index < constants.ALL_LEAVE_TYPES.length; index++) {
    const element = constants.ALL_LEAVE_TYPES[index];
    let option = [{
      "text": {
        "type": "plain_text",
        "text": `${element.name}`,
        "emoji": true
      },
      "value": `${element.value}`
    }]
    if (options.length > 0) {
      options = [...options, ...option]
    }
    else {
      options = [...option]
    }
  }

  let leave = constants.ALL_LEAVE_TYPES.findIndex((item) => {
    if (item.value === leaveTypeValue) {
      return item;
    }
  })

  return ({
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "Select a leave type"
    },
    "accessory": {
      "type": "static_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Select an leave type",
        "emoji": true
      },
      "options": [
        ...options
      ],
      "initial_option": options[leave]
    }
  })
}


function formActions(isValidToSend) {
  if (isValidToSend) {
    return ([{
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "emoji": true,
            "text": "Send request"
          },
          "style": "primary",
          "value": "submit_leave_request"
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "emoji": true,
            "text": "Add reason"
          },
          "style": "primary",
          "value": "add_reason"
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "emoji": true,
            "text": "Cancel"
          },
          "style": "danger",
          "value": "cancel_leave_request"
        }
      ]
    }]);
  }
  else {
    return ([{
      "type": "actions",
      "elements": [
        // {
        //   "type": "button",
        //   "text": {
        //     "type": "plain_text",
        //     "emoji": true,
        //     "text": "Send request"
        //   },
        //   "style": "primary",
        //   "value": "submit_leave_request"
        // },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "emoji": true,
            "text": "Add reason"
          },
          "style": "primary",
          "value": "add_reason"
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "emoji": true,
            "text": "Cancel"
          },
          "style": "danger",
          "value": "cancel_leave_request"
        }
      ]
    }]);
  }
}

module.exports = {
  buildRequestFormBlocksForLeaveType,
  updateRequestFormBlocksForLeaveType
}