console.clear();

const inquirer = require('inquirer');
const { yellow } = require('colors');
const fs = require('fs');
const path = require('path');
const { buildCLIQuestion, getCurrentVersion, deploy } = require('./utils');

const folders = fs.readdirSync(path.join(__dirname, '../src'));
const components = folders.reduce((acc, folder) => {
  const elements = fs.readdirSync(path.join(__dirname, '../src', folder));
  acc[folder] = elements;
  return acc;
}, {});

const versionTypes = ['patch', 'minor', 'major'];

const initialQuestion = buildCLIQuestion(
  'Please choose folder:',
  'folder',
  folders,
);
let choice;

const prompt = question => {
  return inquirer.prompt(question).then(async answers => {
    console.clear();
    choice = {
      ...choice,
      ...answers,
    };

    const backKey = Object.keys(choice).find(key => choice[key] === 'back');

    if (backKey) {
      switch (backKey) {
        case 'version':
          delete choice.component;
          delete choice.version;
          break;
        case 'component':
          delete choice.component;
          delete choice.folder;
          break;
        default:
          break;
      }
    }

    const { folder, component, version } = choice;
    const chosenComponentPath = `${folder}/${component}`;

    if (folder && !component) {
      return prompt(
        buildCLIQuestion(
          'Please choose component to deploy:',
          'component',
          components[folder],
          true,
        ),
      );
    } else if (folder && component && !version) {
      const componentVersion = await getCurrentVersion(chosenComponentPath);
      return prompt(
        buildCLIQuestion(
          `Please choose version to update (current: ${yellow(
            componentVersion,
          )}):`,
          'version',
          versionTypes,
          true,
        ),
      );
    } else if (!Object.keys(choice).length) {
      return prompt(initialQuestion);
    }

    await deploy(chosenComponentPath, version);
  });
};

prompt(initialQuestion);


// ✖
// ✔