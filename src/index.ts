import { spawnSync } from "child_process";
import { statSync } from "fs";
import { homedir } from "os";
import { join as pathJoin } from "path";
import { Config } from "@jest/types";
import { Reporter, Context } from "@jest/reporters";
import { AggregatedResult } from "@jest/test-result";

interface HUDOptions {
  bin: string[];
}

const pluralize = (count: number, one: string, many: string): string => {
  if (count === 0) {
    return `No ${many}`;
  }

  if (count === 1) {
    return `1 ${one}`;
  }

  return `${count} ${many}`;
};

export default class HUDReporter implements Pick<Reporter, "onRunComplete"> {
  public globalConfig: Config.ConfigGlobals;

  public options: HUDOptions;

  constructor(globalConfig: Config.ConfigGlobals, options?: HUDOptions) {
    this.globalConfig = globalConfig;
    this.options = {
      bin: [
        "/Applications/hud.app/Contents/MacOS/cli",
        pathJoin(homedir(), "Applications/hud.app/Contents/MacOS/cli"),
      ],
      ...options,
    };
  }

  onRunComplete(_: Set<Context>, results: AggregatedResult) {
    const testsCount = results.numTotalTests;
    const failedCount = results.numFailedTests;
    const passedCount = results.numPassedTests;
    const pendingCount = results.numPendingTests;
    const messages: string[] = [];
    let title = "Passed!";
    let symbolName = "checkmark.circle.trianglebadge.exclamationmark";

    if (testsCount === 0) {
      messages.push("No tests has been found!");
    }

    if (testsCount) {
      messages.push(pluralize(testsCount, "test", "tests"));
    }

    if (passedCount) {
      title = "Passed!";
      symbolName = "checkmark.circle";
      messages.push(`${passedCount} passed`);
    }

    if (failedCount) {
      title = "Failed!";
      symbolName = "exclamationmark.triangle";
      messages.push(`${failedCount} failed`);
    }

    if (pendingCount) {
      messages.push(`${pendingCount} pending`);
    }

    const bin = this.options.bin.find(
      (b) => statSync(b, { throwIfNoEntry: false })?.isFile,
    );

    if (!bin) {
      return;
    }

    spawnSync(bin, [
      "--title",
      title,
      "--message",
      messages.join(", "),
      "--symbol-name",
      symbolName,
    ]);

    return Promise.resolve();
  }
}
