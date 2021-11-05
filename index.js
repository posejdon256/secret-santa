const nodemailer = require("nodemailer");

const generateText = (name, country, sender) => {
  return `Hohoho! \n
    This is Secret Santa! I wanted to make you a task. You need to prepare a gift for someone.\n
    His name is ${name}. ${
    country
      ? `This year we decided to use topics. I want you to prepare a gift in topic ${country}`
      : ""
  }
    If you have any other questions write to ${sender} ;).\n
    Hohoho,
    Your Secret Santa
    `;
};

const sendEmail = (email_title, email_text, receiver, sender, password) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: sender,
      pass: password,
    },
  });
  var mailOptions = {
    from: sender,
    to: receiver,
    subject: email_title,
    text: email_text,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomizePeopleAndSubjects = (_subjects, _people) => {
  const people = [..._people];
  const subjects = [...subjects];
  const peopleToGet = [...people];
  const donePeople = [];
  people.forEach((guy) => {
    const randomGuyIndex = (() => {
      let random = getRandom(0, peopleToGet.length - 1);
      while (String(guy.name) === String(peopleToGet[random].name)) {
        random = getRandom(0, peopleToGet.length - 1);
        if (peopleToGet.length === 1) {
          throw Error("We are in infinite loop, try restart app");
        }
      }
      return random;
    })();
    const randomGuy = peopleToGet[randomGuyIndex];
    peopleToGet.splice(randomGuyIndex, 1);
    const result = { name: randomGuy.name, email: guy.email };
    if (subjects) {
      const random = getRandom(0, subjects.length - 1);
      const subject = subjects[random];
      subjects.splice(random, 1);
      result.subject = subject;
    }
    donePeople.push(result);
  });
  return donePeople;
};
exports.SecretSanta = class SecretSanta {
  /**
   * Both arrays in parameters should have same size
   * @param {Array} _namesWithEmails Example [{name: 'Ania', email: 'ania@ania.com'}, {name: 'Adam', email: 'adam@adam.com'}]
   * @param {Array} _subjects Example: ['Cats', 'Dogs']
   */
  constructor(_namesWithEmails = [], _subjects = undefined) {
    if (_subjects && _subjects.length !== _namesWithEmails) {
      throw Error("_subjects and _namesWithEmails should have same length");
    }
    this.namesWithEmails = _namesWithEmails;
    this.subjects = _subjects;
    this.randomized = randomizePeopleAndSubjects(
      this.subjects,
      this.namesWithEmails
    );
  }
  /**
   * See result of your Secret Santa
   */
  test = () => {
    this.randomized.forEach((element) => {
      console.log(
        `From ${element.email} to ${element.name} subject ${
          this._subjects ? element.subject : "none"
        }`
      );
    });
  };
  /**
   * Attention! you need to enable not safe application in your gmail account
   * @param {string} sender - it should be your gmail email
   * @param {string} password - it should be your gmail password
   */
  send = (sender, password) => {
    this.randomized.forEach((guy) => {
      sendEmail(
        `Hohoho! This is Secret Santa!`,
        generateText(guy.name, guy.country, sender),
        guy.email,
        sender,
        password
      );
    });
  };
};
