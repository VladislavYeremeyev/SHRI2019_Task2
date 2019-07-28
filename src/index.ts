import * as jsonToAst from "json-to-ast";
import { checkContentElementRules } from "./formContentElementCheck";
import { checkContentItemElementRules } from "./formContentItemElementCheck";
import { checkFooterRules } from "./formFooterCheck";
import { checkHeaderRules } from "./formHeaderCheck";
import { checkFormContentSize } from "./formReferenceSizeCheck";
import { checkTextHeaderRules } from "./textHeadersCheck";
import { ILinterProblem, RuleKeys } from "./types";
import { getLinterErrorData, isBlock } from "./utils";

// Функция парсинга JSON-строки
function parseJson(jsonString: string): jsonToAst.AstJsonEntity | undefined {
  try {
    return jsonToAst(jsonString);
  } catch (err) {
    return undefined;
  }
}

// Функция обхода дерева
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

// Функция, запускающая линтинг и возвращающая все ошибки
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

// Функция, валидирующая объект по заданным правилам
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

function lint(jsonString: string): ILinterProblem<RuleKeys>[] | [] {
  return makeLint(jsonString, validateObject);
}

// сделать функцию доступной в глобальной области видимости в NodeJS и браузере (требуется по условию)
const globalScope = (typeof window !== "undefined"
  ? window
  : false || global) as any;
globalScope.lint = lint;
