const fs = require('fs');
const inquirer = require('inquirer');


const useApp = async  () => {  
    await inquirer.prompt ([
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your Project?'
    },
    {
        type: 'input',
        name: 'gituser',
        message: 'What is your Github username?'
    },
    {
        type: 'input',
        name: 'gitrepo',
        message: 'Please provide your Github Repository Name for this Project:'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Give a brief description of your Project:'
    },
    {
        type: 'input',
        name: 'about',
        message: 'Tell a little bit about your Project:'
    },
    {
        type: 'input',
        name: 'install',
        message: 'What installation commands for installing are needed for this Project:',
        default: 'npm i'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide the usage for this Project:'
    },
    {
        type: 'input',
        name: 'testing',
        message: 'What test commands for testing are needed for this Project:',
        default: 'npm test'
    },
    {
        type: 'input',
        name: 'ssurl',
        message: 'Please provide a link to a screenshot of your Project'
    },
    {
        type: 'input',
        name: 'demovid',
        message: 'Please provide a link to a demo video of your Project'
    },
    {
        type: 'list',
        name: 'license',
        message: 'What kind of license does your Project have?',
        choices: ['Apache2.0','GeneralPublic3.0','MIT','BSD2Clause', 'BSD3Clause', 'BoostSoftware1.0', 'CreativeCommonsZero1.0','EclipsePublic2.0','AfferoGeneralPublic3.0','GeneralPublic2.0','LesserGeneralPublic2.1','MozillaPublic2.0','TheUnlicense',]
    },
    {
        type: 'input',
        name: 'contributions',
        message: 'What contributions were made to your Project?'
    },

]);
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        // If there is an error, will report an error.
        err ? console.error(err) : console.log(`Your README.md file has been created.`)
    );
}

// init function program
function init() {
    //  Begin to ask questions with inquirer function
    inquirer.prompt(useApp).then((answers) => {
        const data = generateMarkdown(answers);
        console.log(answers);
        // File created according to answers provided
        writeToFile('README.md', data);
    })
}

// initialize init
// init();


module.exports = useApp;