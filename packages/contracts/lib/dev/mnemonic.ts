import fs from "fs";

export const getMnemonic = (dir?: string) => {
  let mnemonic;
  if (process.env.MNEMONIC) {
    mnemonic = process.env.MNEMONIC.trim();
  } else if (dir && fs.existsSync(dir)) {
    mnemonic = fs.readFileSync(dir, "ascii").trim();
  } else {
    mnemonic = "test ".repeat(11) + "junk";
  }
  return mnemonic;
};
