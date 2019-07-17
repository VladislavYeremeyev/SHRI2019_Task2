import * as jsonToAst from "json-to-ast";
import { ILinterProblem, IResult, RuleKeys, textSizeValues } from "./types";
import {
  getInnerEntities,
  getLinterErrorData,
  getMixedObject,
  getModsError,
  isBlock,
  isElement,
} from "./utils";

const getSizeEqualData = (
  formBlock: jsonToAst.AstObject,
  elem: jsonToAst.AstObject,
  referenceSize: string | undefined
): IResult => {
  const result: IResult = {
    errors: [],
    newReferenceSize: referenceSize,
  };

  if (isBlock(elem, "input") || isBlock(elem, "button")) {
    const { newReferenceValue, modErrorObject } = getModsError(
      elem,
      "size",
      result.newReferenceSize,
      textSizeValues
    );
    if (typeof modErrorObject !== "undefined") {
      result.errors.push(
        getLinterErrorData("FormElementsSizeShouldBeEqual", formBlock.loc)
      );
    }
    result.newReferenceSize = newReferenceValue;
  } else if (elem.children.find((p) => p.key.value === "mix")) {
    const inputMix = getMixedObject(elem, "input");
    const buttonMix = getMixedObject(elem, "button");
    const labelMix = getMixedObject(elem, "form", "label");
    [inputMix, buttonMix].forEach((mix) => {
      if (typeof mix !== "undefined") {
        const { newReferenceValue, modErrorObject } = getModsError(
          mix,
          "size",
          result.newReferenceSize,
          textSizeValues
        );
        if (typeof modErrorObject !== "undefined") {
          result.errors.push(
            getLinterErrorData("FormElementsSizeShouldBeEqual", formBlock.loc)
          );
        }
        result.newReferenceSize = newReferenceValue;
      }
    });
    if (typeof labelMix !== "undefined") {
      const content = elem.children.find((p) => p.key.value === "content");
      if (typeof content !== "undefined") {
        getInnerEntities(content.value, "text").forEach((textBlock) => {
          const { newReferenceValue, modErrorObject } = getModsError(
            textBlock,
            "size",
            result.newReferenceSize,
            textSizeValues
          );
          if (typeof modErrorObject !== "undefined") {
            result.errors.push(
              getLinterErrorData("FormElementsSizeShouldBeEqual", formBlock.loc)
            );
          }
          result.newReferenceSize = newReferenceValue;
        });
      }
    }
  } else if (isElement(elem, "form", "label")) {
    const content = elem.children.find((p) => p.key.value === "content");
    if (typeof content !== "undefined") {
      getInnerEntities(content.value, "text").forEach((textBlock) => {
        const { newReferenceValue, modErrorObject } = getModsError(
          textBlock,
          "size",
          result.newReferenceSize,
          textSizeValues
        );
        if (typeof modErrorObject !== "undefined") {
          result.errors.push(
            getLinterErrorData("FormElementsSizeShouldBeEqual", formBlock.loc)
          );
        }
        result.newReferenceSize = newReferenceValue;
      });
    }
  }

  return result;
};

export function checkFormContentSize(
  formBlock: jsonToAst.AstObject,
  formContent: jsonToAst.AstJsonEntity,
  refSize: string | undefined
) {
  let referenceSize = refSize;
  let errors: ILinterProblem<RuleKeys>[] = [];

  switch (formContent.type) {
    case "Array":
      formContent.children.forEach((elem: jsonToAst.AstJsonEntity) => {
        if (elem.type === "Object") {
          const checkData = getSizeEqualData(formBlock, elem, referenceSize);
          errors = [...errors, ...checkData.errors];
          if (
            typeof referenceSize === "undefined" &&
            typeof checkData.newReferenceSize !== "undefined"
          ) {
            referenceSize = checkData.newReferenceSize;
          }

          const innerContent = elem.children.find(
            (p) => p.key.value === "content"
          );
          if (typeof innerContent !== "undefined") {
            const data = checkFormContentSize(
              formBlock,
              innerContent.value,
              referenceSize
            );
            errors = [...errors, ...data.errors];
            referenceSize = data.referenceSize;
          }
        }
      });
      break;
    case "Object":
      const checkData = getSizeEqualData(formBlock, formContent, referenceSize);
      errors = [...errors, ...checkData.errors];
      if (
        typeof referenceSize === "undefined" &&
        typeof checkData.newReferenceSize !== "undefined"
      ) {
        referenceSize = checkData.newReferenceSize;
      }

      const innerContent = formContent.children.find(
        (p) => p.key.value === "content"
      );
      if (typeof innerContent !== "undefined") {
        const data = checkFormContentSize(
          formBlock,
          innerContent.value,
          referenceSize
        );
        errors = [...errors, ...data.errors];
        referenceSize = data.referenceSize;
      }
      break;
    default:
      break;
  }

  return { errors, referenceSize };
}
