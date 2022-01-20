import * as cdk from "aws-cdk-lib";
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
          "main"
        ),
        commands: ["npm install", "npm run build", "npx cdk synth"],
      }),
    });
  }
}
