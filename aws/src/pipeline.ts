import * as cdk from "aws-cdk-lib";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import {
  ShellStep,
  CodePipeline,
  CodePipelineSource,
} from "aws-cdk-lib/pipelines";

export class ProjenAwsSamplePipline extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new CodePipeline(this, "Pipeline", {
      pipelineName: "Pipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          "warren-sadler/projen-aws-sample-project",
          "main",
          {
            authentication: secretsmanager.Secret.fromSecretNameV2(
              this,
              "GitHubToken",
              "warren-github-token"
            ).secretValue,
          }
        ),
        commands: ["cd aws", "npm install", "npm run build", "npx cdk synth"],
      }),
    });
  }
}
