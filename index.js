
//dependancies 
const fs = require("fs");
const inquirer = require("inquirer");

//array of questions for user input
const questions = 
[
  {
    //input title
    type: "input",
    name: "appTitle",
    message: "Application's Title: ",
    validate: (appTitleInput) => {
      if (appTitleInput) {
        return true;
      } else {
        return false;
      }
    },
  },

  //input description
  {
    type: "input",
    name: "description",
    message: "Description of the app: ",
    validate: (descriptionInput) => {
      if (descriptionInput) {
        return true;
      } else {
        console.log("Description of the app:");
        return false;
      }
    },
  },

  //input installation instructions
  {
    type: "input",
    name: "installation",
    message:
      "Installation instructions: ",
    validate: (installInput) => {
      if (installInput) {
        return true;
      } else {
        console.log("Installation instructions:");
        return false;
      }
    },
  },

  //input usage insrtunions 
  {
    type: "input",
    name: "usage",
    message: "Usage instructions: ",
    validate: (usageInput) => {
      if (usageInput) {
        return true;
      } else {
        return false;
      }
    },
  },

  //input license information
  {
    type: "list",
    name: "license",
    message: "What is the licensing for your app?",
    choices: ["EPL 1.0", "GPL V3", "MIT", "MPL 2.0"],
    validate: (licenseInput) => {
      if (licenseInput) {
        return true;
      } else {
        return false;
      }
    },
  },

  //input contributers
  {
    type: "input",
    name: "contributors",
    message: 'Other contributors?',
    validate: (contributorsInput) => {
      if (contributorsInput) {
        return true;
      } else {
        return false;
      }
    },
  },

  //input tests
  {
    type: "input",
    name: "tests",
    message: "Tests preformed:",
    validate: (testsInput) => {
      if (testsInput) {
        return true;
      } else {
        return false;
      }
    },
  },

  //input contact information
  {
    type: "input",
    name: "contact",
    message:
      "Enter email:",
    validate: (contactInput) => {
      if (contactInput) {
        return true;
      } else {
        return false;
      }
    },
  },

  //input github username for contact
  {
    type: "input",
    name: "githubUser",
    message: "Github username: ",
    validate: (githubUserInput) => {
      if (githubUserInput) {
        return true;
      } else {
        return false;
      }
    },
  },

];

//main program 
function main() 
{
  const tableofContents =
    "  \n ## Table of Contents:   \n [1. Description](#Description)  \n[2. Installation](#Installation)  \n[3. Usage](#Usage)  \n[4. License](#License)  \n[5. Contributors](#Contributors)  \n[6. Tests](#Tests)  \n[7. Questions](#Questions) \n";
  
  //prompt for questions
  inquirer.prompt(questions).then((res) => 
  {

    //add the title
    title();    
    function title() {
      fs.writeFile(
        "./out/README.md",
        `# ${res.appTitle}  \r\n`,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          //calls next part of building function
          licenseBadge();
        }
      );
    }

    //add badge for github
    function licenseBadge() 
    {
      
      if (res.license === "EPL 1.0") {
        fs.appendFileSync(
          "./out/README.md",
          `[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`,
          (err) => {
            if (err) {
              console.log(err);
              return;
            }
            contents();
          }
        );
      } 
      else if (res.license === "GPL V3") {
        fs.appendFileSync(
          "./out/README.md",
          `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`,
          (err) => {
            if (err) {
              console.log(err);
              return;
            }
            contents();
          }
        );
      } 
      else if (res.license === "MIT") {
        fs.appendFileSync(
          "./out/README.md",
          `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
          (err) => {
            if (err) {
              console.log(err);
              return;
            }
            contents();
          }
        );
      } else if (res.license === "MPL 2.0") {
        fs.appendFileSync(
          "./out/README.md",
          `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`,
          (err) => {
            if (err) {
              console.log(err);
              return;
            }
            contents();
          }
        );
      }
      contents();
    }

    //table of contents
    function contents() {
      fs.appendFile("./out/README.md", `${tableofContents}`, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        description();
      });
    }

    //add app description
    function description() {
      fs.appendFile(
        "./out/README.md",
        `## Description:\n${res.description}\n`,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          install();
        }
      );
    }

    //add install instructions
    function install() {
      fs.appendFile(
        "./out/README.md",
        `## Installation:\n${res.installation}\n`,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          usage();
        }
      );
    }

    //add user instructions
    function usage() {
      fs.appendFile(
        "./out/README.md",
        `## App Usage:\n${res.usage}\n`,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          license();
        }
      );
    }

    //add license all info
    function license() {
      fs.appendFile(
        "./out/README.md",
        `## License Details:  \n The Eclipse Public License (EPL) is a free and open source software license most notably used for the Eclipse IDE and other projects by the Eclipse Foundation. It replaces the Common Public License (CPL) and removes certain terms relating to litigations related to patents  \n  \n The GNU General Public License (GNU GPL or simply GPL) is a series of widely-used free software licenses that guarantee end users the freedom to run, study, share, and modify the software. \n  \n The MIT License is a permissive free software license originating at the Massachusetts Institute of Technology (MIT) in the late 1980s. As a permissive license, it puts only very limited restriction on reuse and has, therefore, high license compatibility. \n  \n The Mozilla Public License (MPL) is a free and open-source software license developed and maintained by the Mozilla Foundation. It is a weak copyleft license, characterized as a middle ground between permissive software licenses and the GNU General Public License (GPL), that seeks to balance the concerns of proprietary and open-source developers. As such, it allows re-licensing. `,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          contributors();
        }
      );
    }

    //add contributers
    function contributors() {
      fs.appendFile(
        "./out/README.md",
        `  \n## Contributors:\n${res.contributors}\n`,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          tests();
        }
      );
    }

    //add testing section
    function tests() {
      fs.appendFile("./out/README.md", `## Tests:\n${res.tests}\n`, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        questions();
      });
    }

    //add questions section
    function questions() {
      fs.appendFile(
        "./out/README.md",
        `## Questions:\n 
        For quesitons, email at:  \n
        ${res.contact} \n
        github at:  \n 
        https://github.com/${res.githubUser}  \n `,
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
    }
  });
}

//starts the generator
main();
