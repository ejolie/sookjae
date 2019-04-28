#!/usr/bin/env node
// (work in progress)
// refactor index.js using promise

const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');

const QUESTION = [
	{
		name: 'num',
		type: 'input',
		message: 'Enter your homework number :',
		validate: val => {
			val = val.trim()
			if (isNaN(val) || val === '') {
				return `Homework number only includes ${chalk.red.underline('numbers')}`;
			} else {
				return true;
			}
		}
	}
]

inquirer.prompt(QUESTION)
	.then(obj => {
		const input = obj['num'].trim();
		const DIR = `./${input}/`
		const HW_NAME = `${input}-homework.md`
		const WS_NAME = `${input}-workshop.md`
		const HW_CONTENT = `# ${input} Homework\n`
		const WS_CONTENT = `# ${input} Workshop\n`

		if (!fs.existsSync(DIR)) {
			fs.mkdirSync(DIR)
			// Create Homework file
			fs.writeFile(HW_NAME, HW_CONTENT, err => {
				if (err) throw err;
				// Create Workshop file
				fs.writeFile(WS_NAME, WS_CONTENT, err => {
					if (err) throw err;
					// Move files into the directory
					fs.rename(HW_NAME, DIR + HW_NAME, err => {
						if (err) throw err;
					})
					fs.rename(WS_NAME, DIR + WS_NAME, err => {
						if (err) throw err;
					})
					console.log(chalk.cyan('✔︎ Successfully created in ') + chalk.bgCyan.black(input) + chalk.cyan(' folder'));
				});
			});
		} else {
			console.log(chalk.yellow('» ') + chalk.bgYellow.black(input) + chalk.yellow(' folder already exists'));
		}
	});
