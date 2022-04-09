type Config =  {
  isTest: boolean;
  groupImport: boolean;
  filteredFiles: string[];
  ignoredFiles: string[];
  aggressiveCheck: boolean;
  transformRelativeImport?: string;
  importQuote: string;
};

const configs: Config = {
  isTest: !!process.env.JEST_WORKER_ID,
  groupImport: false,
  filteredFiles: [],
  ignoredFiles: [],
  aggressiveCheck: false,
  transformRelativeImport: undefined,
  importQuote: `'`,
};

for (const argv of process.argv) {
  if (argv.includes(`--groupImport`)) {
    configs.groupImport = true;
  }
  if (argv.includes(`--filter=`)) {
    configs.filteredFiles = argv.substr(argv.indexOf(`=`) + 1).split(`,`);
  }
  if (argv.includes(`--ignored=`)) {
    configs.ignoredFiles = argv.substr(argv.indexOf(`=`) + 1).split(`,`);
  }
  if (argv.includes(`--aggressive`)) {
    configs.aggressiveCheck = true;
  }
  if (argv.includes(`--transformRelativeImport=`)) {
    configs.transformRelativeImport = argv
      .substr(argv.indexOf(`=`) + 1)
      .replace(/"/g, "");
  } else if (argv.includes(`--transformRelativeImport`)) {
    configs.transformRelativeImport = "";
  }
  if (argv.includes(`--importQuote=`)) {
    configs.importQuote =
      argv.substr(argv.indexOf(`=`) + 1).trim() !== "single" ? `"` : `'`;
  }
}

// hooking up logging
if (configs.isTest) {
  console.log = () => null;
}

export default configs;
