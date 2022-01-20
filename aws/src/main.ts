import { App } from "aws-cdk-lib";
import { ProjenAwsSamplePipline } from "./pipeline";
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new ProjenAwsSamplePipline(app, "ProjenSamplePipeline", { env: devEnv });

app.synth();
