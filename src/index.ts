import * as jsonToAst from "json-to-ast";
import { checkContentElementRules } from "./formContentElementCheck";
import { checkContentItemElementRules } from "./formContentItemElementCheck";
import { checkFooterRules } from "./formFooterCheck";
import { checkHeaderRules } from "./formHeaderCheck";
import { checkFormContentSize } from "./formReferenceSizeCheck";
import { checkTextHeaderRules } from "./textHeadersCheck";
import { ILinterProblem, RuleKeys } from "./types";
import { getLinterErrorData, isBlock } from "./utils";

function parseJson(jsonString: string): jsonToAst.AstJsonEntity | undefined {
  try {
    return jsonToAst(jsonString);
  } catch (err) {
    return undefined;
  }
}

function walk(
  node: jsonToAst.AstJsonEntity,
  cbObj: (property: jsonToAst.AstObject) => void
) {
  switch (node.type) {
    case "Object":
      cbObj(node);

      node.children.forEach((property: jsonToAst.AstProperty) => {
        walk(property.value, cbObj);
      });
      break;
    case "Array":
      node.children.forEach((item: jsonToAst.AstJsonEntity) =>
        walk(item, cbObj)
      );
      break;
  }
}

function makeLint(
  jsonString: string,
  validateObjectFunction: (
    property: jsonToAst.AstObject
  ) => ILinterProblem<RuleKeys>[]
): ILinterProblem<RuleKeys>[] {
  let errors: ILinterProblem<RuleKeys>[] = [];
  const ast: jsonToAst.AstJsonEntity | undefined = parseJson(jsonString);

  const cbObj = (obj: jsonToAst.AstObject) => {
    errors = [...errors, ...validateObjectFunction(obj)];
  };

  if (ast) {
    errors = [
      ...errors,
      ...checkTextHeaderRules(ast, undefined, false, 1).headerErrors,
    ];
    walk(ast, cbObj);
  } else {
    console.warn("Invalid JSON");
  }

  return errors;
}

const validateObject = (
  obj: jsonToAst.AstObject
): ILinterProblem<RuleKeys>[] => {
  if (isBlock(obj, "form")) {
    const formContent = obj.children.find((p) => p.key.value === "content");
    if (typeof formContent !== "undefined") {
      let { errors, referenceSize } = checkFormContentSize(
        obj,
        formContent.value,
        undefined
      );
      if (typeof referenceSize === "undefined") {
        errors = [getLinterErrorData("FormElementsSizeShouldBeEqual", obj.loc)];
      } else {
        errors = [
          ...errors,
          ...checkContentElementRules(formContent.value, referenceSize),
          ...checkContentItemElementRules(formContent.value, referenceSize),
          ...checkHeaderRules(formContent.value, referenceSize),
          ...checkFooterRules(formContent.value, referenceSize),
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

function lint(jsonString: string): ILinterProblem<RuleKeys>[] | [] {
  return makeLint(jsonString, validateObject);
}

const globalScope = (typeof window !== "undefined"
  ? window
  : false || global) as any;
globalScope.lint = lint;

console.log(lint(json));
