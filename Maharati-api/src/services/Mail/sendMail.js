const nodemailer = require("nodemailer");
const Event = require("../../models/calendar");
const cron = require("node-cron");
const moment = require("moment");
const { createNotif } = require("../Notification/createNotif.js");
async function sendMail(destination, subject, content) {
  const mailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #1b2c3f;
            padding: 20px;
            text-align: center;
        }
        .header img {
            width: 100px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h1 {
            color: #333333;
        }
        .content p {
            color: #555555;
            font-size: 16px;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            margin-top: 20px;
            background-color: #1b2c3f;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #999999;
            font-size: 14px;
        }
        .footer p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://res.cloudinary.com/derytlbaz/image/upload/v1727363222/logo/dho0rbjfhcmgpwlg23io.png" alt="Logo">
    </div>
    <div class="container">
        <div class="content">
            <h1>${subject}</h1>
            <p>${content[0]}</p>
            <a href="${content[1]}" class="button" style="color: #ffffff; background-color: #1b2c3f;">${subject}</a>
        </div>
        <div class="footer">
        <p><strong>Stay Safe,</strong><br/>The Maharati Team</p>
            <p>&copy; 2024 MAHARATI.PROFEEL . All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
  try {
    var transporter = nodemailer.createTransport({
      host: process.env.HOST_MAIL,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL,
      },
    });

    var mailOptions = {
      from: `"Maharati" <${process.env.USER_MAIL}>`,
      to: destination,
      subject: subject,
      html: mailTemplate,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}
async function composeMail(destination, subject, content) {
  const mailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #1b2c3f;
            padding: 20px;
            text-align: center;
        }
        .header img {
            width: 100px;
        }
        .content {
            padding: 20px;
            text-align: left;
        }
        .content h1 {
            color: #333333;
        }
        .content p {
            color: #555555;
            font-size: 16px;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            margin-top: 20px;
            background-color: #1b2c3f;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #999999;
            font-size: 14px;
        }
        .footer p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://res.cloudinary.com/derytlbaz/image/upload/v1727363222/logo/dho0rbjfhcmgpwlg23io.png" alt="Logo">
    </div>
    <div class="container">
        <div class="content">
            <h1>${subject}</h1>
            <p>${content}</p>
        </div>
        <div class="footer">
        <p><strong>Stay Safe,</strong><br/>The Maharati Team</p>
            <p>&copy; 2024 MAHARATI.PROFEEL . All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

  try {
    var transporter = nodemailer.createTransport({
      host: process.env.HOST_MAIL,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL,
      },
    });

    var mailOptions = {
      from: `"Maharati" <${process.env.USER_MAIL}>`,
      to: destination,
      subject: subject,
      html: mailTemplate,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}
async function sendDailyReminder() {
  try {
    const ownerSet = new Set();

    var transporter = nodemailer.createTransport({
      host: process.env.HOST_MAIL,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL,
      },
    });
    const events = await getTodaysEvents();
    if (events.length > 0) {
      for (const event of events) {
        const mailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #1b2c3f;
              padding: 20px;
              text-align: center;
          }
          .header img {
              width: 100px;
          }
          .content {
              padding: 20px;
              text-align: center;
          }
          .content h1 {
              color: #333333;
          }
          .content p {
              color: #555555;
              font-size: 16px;
              line-height: 1.5;
          }
          .button {
              display: inline-block;
              padding: 12px 24px;
              margin-top: 20px;
              background-color: #1b2c3f;
              color: #ffffff;
              text-decoration: none;
              border-radius: 4px;
              font-size: 16px;
          }
          .footer {
              text-align: center;
              padding: 20px;
              color: #999999;
              font-size: 14px;
          }
          .footer p {
              margin: 0;
          }
      </style>
  </head>
  <body>
      <div class="header">
          <img src="https://res.cloudinary.com/derytlbaz/image/upload/v1727363222/logo/dho0rbjfhcmgpwlg23io.png" alt="Logo">
      </div>
      <div class="container">
          <div class="content">
              <h1>Reminder: ${event.title} is happening today</h1>
              <p>Dear ${event.Owner.FirstName},</p>
                     <p>This is a reminder that the event <strong>${event.title}</strong> is scheduled for today at ${event.start}.</p>
                     <p>Best regards,<br/>MAHARATI.PROFEEL</p>
              <a href="http://localhost:5173/calendar" class="button" style="color: #ffffff; background-color: #1b2c3f;">Check Event</a>
          </div>
          <div class="footer">
          <p><strong>Stay Safe,</strong><br/>The Maharati Team</p>
              <p>&copy; 2024 MAHARATI.PROFEEL . All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `;
        const mailOptions = {
          from: `"Maharati" <${process.env.USER_MAIL}>`,
          to: event.Owner.Email,
          subject: `Reminder: ${event.title} is happening today`,
          html: mailTemplate,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
      events.forEach((event) => {
        if (event.Owner && event.Owner._id) {
          ownerSet.add(event.Owner._id.toString());
        }
      });
      ownerSet.forEach((ownerId) =>
        createNotif(ownerId, {
          title: "Today's Events",
          type: "calendar",
          detail: `You have ${events.length} upcoming events for today`,
        })
      );
    }
  } catch (error) {
    throw new Error(error);
  }
}
async function send30MinutesReminder() {
  try {
    var transporter = nodemailer.createTransport({
      host: process.env.HOST_MAIL,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL,
      },
    });
    const events = await checkEvents();
    if (events.length > 0) {
      for (const event of events) {
        const mailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #1b2c3f;
            padding: 20px;
            text-align: center;
        }
        .header img {
            width: 100px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h1 {
            color: #333333;
            margin-bottom: 20px;
        }
        .content p {
            color: #555555;
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            margin-top: 20px;
            background-color: #1b2c3f;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #999999;
            font-size: 14px;
        }
        .footer p {
            margin: 0;
        }
        .event-details {
            text-align: left;
            margin-top: 20px;
            padding: 0;
        }
        .event-details ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .event-details li {
            background: #f9f9f9;
            margin: 5px 0;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://res.cloudinary.com/derytlbaz/image/upload/v1727363222/logo/dho0rbjfhcmgpwlg23io.png" alt="Logo">
    </div>
    <div class="container">
        <div class="content">
            <h1>Upcoming Event: ${event.title}</h1>
            <p>Hello ${event.Owner.FirstName},</p>
            <p>Your event <strong>${event.title}</strong> is starting in 30 minutes.</p>
            <div class="event-details">
                <p>Event Details:</p>
                <ul>
                    <li><strong>Title:</strong> ${event.title}</li>
                    <li><strong>Description:</strong> ${event.description}</li>
                    <li><strong>Date:</strong> ${event.start}</li>
                </ul>
            </div>
            <p>Best regards,<br/>MAHARATI.PROFEEL</p>
            <a href="${process.env.CLIENT_URL}/calendar" class="button" style="color: #ffffff; background-color: #1b2c3f;">Check Event</a>
        </div>
        <div class="footer">
            <p><strong>Stay Safe,</strong><br/>The Maharati Team</p>
            <p>&copy; 2024 MAHARATI.PROFEEL . All rights reserved.</p>
        </div>
    </div>
</body>
</html>

  `;
        const mailOptions = {
          from: `"Maharati" <${process.env.USER_MAIL}>`,
          to: event.Owner.Email,
          subject: `Upcoming Event: ${event.title}`,
          html: mailTemplate,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        createNotif(event.Owner._id, {
          title: `Event ${event.title} in 30 minutes`,
          type: "calendar",
          detail: `You have an upcoming event at ${event.start}`,
        });
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}
const getTodaysEvents = async () => {
  const todayStart = moment().startOf("day").format("YYYY-MM-DD HH:mm");
  const todayEnd = moment().endOf("day").format("YYYY-MM-DD HH:mm");

  const events = await Event.find({
    $or: [
      {
        $and: [{ start: { $lte: todayEnd } }, { end: { $gte: todayStart } }],
      },
      {
        $and: [{ start: { $gte: todayStart } }, { start: { $lte: todayEnd } }],
      },
    ],
    status: { $ne: "Canceled" },
  }).populate("Owner");

  return events;
};
const checkEvents = async () => {
  try {
    const now = moment();
    const thirtyMinutesFromNow = moment().add(30, "minutes");

    const currentDate = now.format("YYYY-MM-DD");
    const currentTime = now.format("HH:mm");
    const thirtyMinutesTime = thirtyMinutesFromNow.format("HH:mm");

    const events = await Event.find({
      $or: [
        {
          $and: [
            { start: { $lte: `${currentDate} ${thirtyMinutesTime}` } },
            { end: { $gte: `${currentDate} ${currentTime}` } },
          ],
        },
        {
          $and: [{ start: `${currentDate} ${thirtyMinutesTime}` }],
        },
      ],
      status: { $ne: "Canceled" },
    }).populate("Owner");
    const filteredEvents = events.filter((event) => {
      const eventStartTime = moment(event.start, "YYYY-MM-DD HH:mm:ss");
      const nowTime = now.format("HH:mm:ss");
      const eventStartTimeTime = eventStartTime.format("HH:mm:ss");

      const nowTimeMoment = moment(nowTime, "HH:mm:ss");
      const eventStartTimeMoment = moment(eventStartTimeTime, "HH:mm:ss");

      const isExactly30MinutesBefore = nowTimeMoment.isSame(
        eventStartTimeMoment.clone().subtract(30, "minutes")
      );
      return isExactly30MinutesBefore;
    });
    return filteredEvents;
  } catch (error) {
    console.error("Error checking events:", error);
    throw error;
  }
};
cron.schedule("00 7 * * *", () => {
  sendDailyReminder();
});
cron.schedule("* * * * *", () => {
  send30MinutesReminder();
});
module.exports = { sendMail, composeMail };
