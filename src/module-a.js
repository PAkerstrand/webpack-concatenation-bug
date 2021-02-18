import fs from "fs";
import path from "path";

const stats = JSON.parse(
	fs.readFileSync(
		path.resolve(__dirname, "..", "src", "generated.json"),
		"utf8"
	)
);

const { testProp } = stats;

export default function printModuleAProp() {
	console.log(testProp);
}
