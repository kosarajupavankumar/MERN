const fs1 = require("fs");
const fs = require("fs").promises;

// Read the file and print the content in the file using synchrous method create the function

function readFile() {
  try {
    const data = fs1.readFileSync("example.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readFile();

// Read the file in Async way using try catch

async function readFileAsync() {
  try {
    const data = await fs.readFile("example.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readFileAsync();

// write the file in sync way

function writeFile() {
  try {
    fs1.appendFileSync("example.txt", " Hello World!", "utf8");
    console.log("File written successfully");
  } catch (err) {
    console.error(err);
  }
}

writeFile();

// write the file in Async way

async function writeFileAsync() {
  try {
    await fs.appendFile("example.txt", " new content!!", "utf8");
    console.log("File written successfully");
  } catch (err) {
    console.error(err);
  }
}

// create the new content in the file using async way and read the file async and update the content in the file

async function updateFile() {
  try {
    await fs.appendFile("example1.txt", " new content!!", "utf8");
    console.log("File written successfully");
    const data = await fs.readFile("example1.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

updateFile();

// Delete the file in sync way

function deleteFile() {
  try {
    fs1.unlinkSync("example1.txt");
    console.log("File deleted successfully");
  } catch (err) {
    console.error(err);
  }
}

deleteFile();

// Delete the file in async way

async function deleteFileAsync() {
  try {
    await fs.unlink("example.txt");
    console.log("File deleted successfully");
  } catch (err) {
    console.error(err);
  }
}

deleteFileAsync();

// check the file exist in the directory or not , if not create the file in new directory in async way

async function checkFile() {
  // create new directory
  try {
    // create the new directory with the name of "newDir" in async way and check the file exist in the directory or not
    await fs.mkdir("newDir");
    console.log("Directory created successfully");

    // if the directory is created then check the file exist in the directory or not
    const data = await fs.readdir("newDir");
    console.log(data);

    // if the file is not exist in the directory then create the file in the directory
    if (!data.includes("example.txt")) {
      await fs.writeFile("newDir/example.txt", "Hello World!", "utf8");
      console.log("File created successfully");
    }
  } catch (err) {
    console.error(err);
  }
}

checkFile();
