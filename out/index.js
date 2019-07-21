"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonToAst = require("json-to-ast");
const formContentElementCheck_1 = require("./formContentElementCheck");
const formContentItemElementCheck_1 = require("./formContentItemElementCheck");
const formFooterCheck_1 = require("./formFooterCheck");
const formHeaderCheck_1 = require("./formHeaderCheck");
const formReferenceSizeCheck_1 = require("./formReferenceSizeCheck");
const textHeadersCheck_1 = require("./textHeadersCheck");
const utils_1 = require("./utils");
function parseJson(jsonString) {
    try {
        return jsonToAst(jsonString);
    }
    catch (err) {
        return undefined;
    }
}
function walk(node, cbObj) {
    switch (node.type) {
        case "Object":
            cbObj(node);
            node.children.forEach((property) => {
                walk(property.value, cbObj);
            });
            break;
        case "Array":
            node.children.forEach((item) => walk(item, cbObj));
            break;
    }
}
function makeLint(jsonString, validateObjectFunction) {
    let errors = [];
    const ast = parseJson(jsonString);
    const cbObj = (obj) => {
        errors = [...errors, ...validateObjectFunction(obj)];
    };
    if (ast) {
        errors = [
            ...errors,
            ...textHeadersCheck_1.checkTextHeaderRules(ast, undefined, false, 1).headerErrors,
        ];
        walk(ast, cbObj);
    }
    else {
        console.warn("Invalid JSON");
    }
    return errors;
}
const validateObject = (obj) => {
    if (utils_1.isBlock(obj, "form")) {
        const formContent = obj.children.find((p) => p.key.value === "content");
        if (typeof formContent !== "undefined") {
            let { errors, referenceSize } = formReferenceSizeCheck_1.checkFormContentSize(obj, formContent.value, undefined);
            if (typeof referenceSize === "undefined") {
                errors = [utils_1.getLinterErrorData("FormElementsSizeShouldBeEqual", obj.loc)];
            }
            else {
                errors = [
                    ...errors,
                    ...formContentElementCheck_1.checkContentElementRules(formContent.value, referenceSize),
                    ...formContentItemElementCheck_1.checkContentItemElementRules(formContent.value, referenceSize),
                    ...formHeaderCheck_1.checkHeaderRules(formContent.value, referenceSize),
                    ...formFooterCheck_1.checkFooterRules(formContent.value, referenceSize),
                ];
            }
            return [...errors];
        }
        return [];
    }
    return [];
};
// const json = `{
//   "block":"tree",
//   "content":[
//   {"block":"text", "mods":{"type":"h1"}},
//   {"block":"branch1",
//     "content":[
//       {"block":"text", "mods":{"type":"h2"}},
//       {"block":"text","mods":{"type":"h3"}},
//       {"block":"wrapper","content":{"block":"text","mods":{"type":"h3"}}}
//     ]
//   },
//   {"block":"branch2",
//     "content":[
//       {"block":"wrapper","content":[{"block":"text","mods":{"type":"h3"}}, {"block":"text","mods":{"type":"h1"}}]},
//       {"block":"text","mods":{"type":"h2"}},
//       {"block":"text","mods":{"type":"h3"}}
//     ]
//   }
//   ]
// }`;
// const json = `
//   [
//     {
//       "block": "text",
//       "mods": { "type": "h2" }
//     },
//     {
//       "block": "mock",
//       "content": {
//         "block": "text",
//         "mods": { "type": "h1" }
//       }
//     }
//   ]
// `;
const json = `{
  "block": "form",
  "content": {
      "block": "form",
      "elem": "content",
      "mix": [{ "block": "form", "elem": "item", "mods": { "space-h": "xl", "space-v": "xxl"} }],
      "content": [
          {
            "block": "form",
            "elem": "content",
            "mix": [{ "block": "form", "elem": "item", "mods": { "space-h": "xl", "space-v": "xxl"} }],
            "content": [
              {
                "block": "form",
                "elem":  "content-item",
                "content": { "block": "input", "mods": { "size": "l" } }
              }
            ]
          },
          {
              "block": "form",
              "elem":  "content-item",
              "content": { "block": "input", "mods": { "size": "l" } }
          }
      ]
  }
}`;
// const json = `{
//   "block": "form",
//   "content": [{
//       "block": "form",
//       "elem": "content",
//       "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl" } }, { "block": "form", "elem": "item", "mods": {  "space-v": "xxl" } }],
//       "content": [
//           {
//               "block": "form",
//               "elem":  "content-item",
//               "mix": [{ "block": "form", "elem": "item", "mods": { "indent-b": "xl" } }],
//               "content": { "block": "input", "mods": { "size": "l" } }
//           },
//           {
//               "block": "form",
//               "elem":  "content-item",
//               "mix": [{ "block": "form", "elem": "item", "mods": { "indent-b": "xl" } }],
//               "content": { "block": "input", "mods": { "size": "l" } }
//           },
//           {
//               "block": "form",
//               "elem":  "content-item",
//               "content": { "block": "input", "mods": { "size": "l" } }
//           }
//       ]
//   },
//   {
//     "block": "form",
//     "elem": "content",
//     "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl" } }, { "block": "form", "elem": "item", "mods": {  "space-v": "xxl" } }],
//     "content": [
//         {
//             "block": "form",
//             "elem":  "content-item",
//             "content": { "block": "input", "mods": { "size": "l" } }
//         }
//     ]
//   }]
// }`;
function lint(jsonString) {
    return makeLint(jsonString, validateObject);
}
const globalScope = (typeof window !== "undefined"
    ? window
    : false || global);
globalScope.lint = lint;
console.log(lint(json));
//# sourceMappingURL=index.js.map