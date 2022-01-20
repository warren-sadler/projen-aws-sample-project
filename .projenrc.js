const { typescript, awscdk } = require("projen");
const project = new typescript.TypeScriptAppProject({
  defaultReleaseBranch: "main",
  name: "projen-aws-sample-project",
  eslintOptions: {
    prettier: true,
  },
  scripts: {
    "install:infra": "cd aws && npm install",
    "build:infra": "cd aws && npm run build",
    "synth:infra": "cd aws && npx cdk synth",
  },
});
project.synth();
const infrastructure = new awscdk.AwsCdkTypeScriptApp({
  defaultReleaseBranch: "main",
  name: "projen-aws-sample-project-infrastructure",
  parent: project,
  cdkVersion: "2.7.0",
  outdir: "aws",
  eslint: false,
  cdkout: "../cdk.out",
});
infrastructure.synth();
