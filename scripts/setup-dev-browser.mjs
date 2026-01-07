#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const repoUrl = "https://github.com/SawyerHood/dev-browser.git";
const codexHome = process.env.CODEX_HOME ?? path.join(os.homedir(), ".codex");
const skillsDir = path.join(codexHome, "skills");
const dest = path.join(skillsDir, "dev-browser");
const force = process.argv.includes("--force");

const log = (message) => {
  console.log(message);
};

if (fs.existsSync(dest)) {
  if (!force) {
    log(`dev-browser already exists at ${dest}`);
    log("Re-run with --force to reinstall.");
    process.exit(0);
  }
  fs.rmSync(dest, { recursive: true, force: true });
}

try {
  execSync("git --version", { stdio: "ignore" });
} catch {
  console.error("git is required to install dev-browser.");
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "dev-browser-"));
const run = (command, options = {}) =>
  execSync(command, { stdio: "inherit", ...options });

try {
  run(`git clone --depth 1 --filter=blob:none --sparse ${repoUrl} "${tmp}"`);
  run(`git -C "${tmp}" sparse-checkout set skills/dev-browser`);

  fs.mkdirSync(skillsDir, { recursive: true });
  fs.cpSync(path.join(tmp, "skills", "dev-browser"), dest, {
    recursive: true,
  });
} finally {
  fs.rmSync(tmp, { force: true, recursive: true });
}

log(`Installed dev-browser to ${dest}`);
log("Restart Codex to pick up the new skill.");
