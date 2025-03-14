#!/usr/bin/env node

const { program } = require("commander");
const inquirer = require("inquirer");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

program
  .version("1.0.0")
  .argument("<project-name>", "项目名称")
  .action((projectName) => {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "confirmCreate",
          message: `是否确实要创建名为${projectName}的项目？`,
          default: true,
        },
      ])
      .then((answers) => {
        const { confirmCreate } = answers;
        if (confirmCreate) {
          const targetDir = path.join(process.cwd(), projectName);
          if (fs.existsSync(targetDir)) {
            console.error(`目录${projectName}已存在。请选择其他名称。`);
            return;
          }

          const repoUrl =
            "https://gitee.com/nqsjd178559344/merak-dashboard.git";
          const cloneCommand = `git clone ${repoUrl} ${targetDir}`;
          exec(cloneCommand, (error) => {
            if (error) {
              console.error("克隆存储库失败:", error);
              return;
            }
            console.log(`项目${projectName}已成功创建！`);
            console.log(
              `To get started, run:\ncd ${projectName}\nnpm install\nnpm run dev`
            );
          });
        }
      });
  });

program.parse(process.argv);
