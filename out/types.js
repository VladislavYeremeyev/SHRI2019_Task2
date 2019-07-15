"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RuleKeys;
(function (RuleKeys) {
    RuleKeys["FormElementsSizeShouldBeEqual"] = "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL";
    RuleKeys["FormContentVerticalSpaceIsInvalid"] = "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID";
    RuleKeys["FormContentHorizontalSpaceIsInvalid"] = "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID";
    RuleKeys["FormContentItemIndentIsInvalid"] = "FORM.CONTENT_ITEM_INDENT_IS_INVALID";
    RuleKeys["FormHeaderTextSizeIsInvalid"] = "FORM.HEADER_TEXT_SIZE_IS_INVALID";
    RuleKeys["FormHeaderVerticalSpaceIsInvalid"] = "FORM.HEADER_VERTICAL_SPACE_IS_INVALID";
    RuleKeys["FormHeaderHorizontalSpaceIsInvalid"] = "FORM.HEADER_HORIZONTAL_SPACE_IS_INVALID";
    RuleKeys["FormFooterVerticalSpaceIsInvalid"] = "FORM.FOOTER_VERTICAL_SPACE_IS_INVALID";
    RuleKeys["FormFooterHorizontalSpaceIsInvalid"] = "FORM.FOOTER_HORIZONTAL_SPACE_IS_INVALID";
    RuleKeys["FormFooterTextSizeIsInvalid"] = "FORM.FOOTER_TEXT_SIZE_IS_INVALID";
    RuleKeys["TextSeveralH1"] = "TEXT.SEVERAL_H1";
    RuleKeys["TextInvalidH2Position"] = "TEXT.INVALID_H2_POSITION";
    RuleKeys["TextInvalidH3Position"] = "TEXT.INVALID_H3_POSITION";
})(RuleKeys = exports.RuleKeys || (exports.RuleKeys = {}));
var RuleErrorText;
(function (RuleErrorText) {
    RuleErrorText["FormElementsSizeShouldBeEqual"] = "\u0418\u043D\u043F\u0443\u0442\u044B, \u043A\u043D\u043E\u043F\u043A\u0438 \u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438 \u0432 \u0444\u043E\u0440\u043C\u0435 \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u043E\u0434\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430";
    RuleErrorText["FormContentVerticalSpaceIsInvalid"] = "\u0412\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u043E\u0442\u0441\u0442\u0443\u043F \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 content \u0434\u043E\u043B\u0436\u0435\u043D \u0437\u0430\u0434\u0430\u0432\u0430\u0442\u044C\u0441\u044F \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043C\u0438\u043A\u0441\u0430 \u043D\u0430 \u043D\u0435\u0433\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 item \u0441\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435\u043C \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430 space-v \u043D\u0430 2 \u0448\u0430\u0433\u0430 \u0431\u043E\u043B\u044C\u0448\u0435 \u044D\u0442\u0430\u043B\u043E\u043D\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430";
    RuleErrorText["FormContentHorizontalSpaceIsInvalid"] = "\u0413\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u043E\u0442\u0441\u0442\u0443\u043F \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 content \u0434\u043E\u043B\u0436\u0435\u043D \u0437\u0430\u0434\u0430\u0432\u0430\u0442\u044C\u0441\u044F \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043C\u0438\u043A\u0441\u0430 \u043D\u0430 \u043D\u0435\u0433\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 item \u0441\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435\u043C \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430 space-h \u043D\u0430 1 \u0448\u0430\u0433 \u0431\u043E\u043B\u044C\u0448\u0435 \u044D\u0442\u0430\u043B\u043E\u043D\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430";
    RuleErrorText["FormContentItemIndentIsInvalid"] = "\u0421\u0442\u0440\u043E\u043A\u0438 \u0444\u043E\u0440\u043C\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u043E\u0442\u0431\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043C\u0435\u0436\u0434\u0443 \u0441\u043E\u0431\u043E\u0439 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043E\u0442\u0441\u0442\u0443\u043F\u0430 indent-b \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 item \u043D\u0430 1 \u0448\u0430\u0433 \u0431\u043E\u043B\u044C\u0448\u0435 \u044D\u0442\u0430\u043B\u043E\u043D\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430";
    RuleErrorText["FormHeaderTextSizeIsInvalid"] = "\u0412\u0441\u0435 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0435 \u0431\u043B\u043E\u043A\u0438 \u0432 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0435 \u0444\u043E\u0440\u043C\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u0441\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435\u043C \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430 size \u043D\u0430 2 \u0448\u0430\u0433\u0430 \u0431\u043E\u043B\u044C\u0448\u0435 \u044D\u0442\u0430\u043B\u043E\u043D\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430";
    RuleErrorText["FormHeaderVerticalSpaceIsInvalid"] = "\u0412\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u043E\u0442\u0441\u0442\u0443\u043F \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 \u0444\u043E\u0440\u043C\u044B \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0440\u0430\u0432\u043D\u044B\u043C \u044D\u0442\u0430\u043B\u043E\u043D\u043D\u043E\u043C\u0443 \u0440\u0430\u0437\u043C\u0435\u0440\u0443";
    RuleErrorText["FormHeaderHorizontalSpaceIsInvalid"] = "\u0413\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u043E\u0442\u0441\u0442\u0443\u043F \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 \u0444\u043E\u0440\u043C\u044B \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0430 1 \u0448\u0430\u0433 \u0431\u043E\u043B\u044C\u0448\u0435 \u044D\u0442\u0430\u043B\u043E\u043D\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430";
    RuleErrorText["FormFooterVerticalSpaceIsInvalid"] = "\u0412\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u043E\u0442\u0441\u0442\u0443\u043F \u043F\u043E\u0434\u0432\u0430\u043B\u0430 \u0444\u043E\u0440\u043C\u044B \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0440\u0430\u0432\u043D\u044B\u043C \u044D\u0442\u0430\u043B\u043E\u043D\u043D\u043E\u043C\u0443 \u0440\u0430\u0437\u043C\u0435\u0440\u0443";
    RuleErrorText["FormFooterHorizontalSpaceIsInvalid"] = "\u0413\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u043E\u0442\u0441\u0442\u0443\u043F \u043F\u043E\u0434\u0432\u0430\u043B\u0430 \u0444\u043E\u0440\u043C\u044B \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0430 1 \u0448\u0430\u0433 \u0431\u043E\u043B\u044C\u0448\u0435 \u044D\u0442\u0430\u043B\u043E\u043D\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430";
    RuleErrorText["FormFooterTextSizeIsInvalid"] = "\u0420\u0430\u0437\u043C\u0435\u0440 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0445 \u0431\u043B\u043E\u043A\u043E\u0432 \u0432 \u043F\u043E\u0434\u0432\u0430\u043B\u0435 \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u044D\u0442\u0430\u043B\u043E\u043D\u043D\u043E\u043C\u0443";
    RuleErrorText["TextSeveralH1"] = "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043E\u0434\u0438\u043D \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435";
    RuleErrorText["TextInvalidH2Position"] = "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0432\u0442\u043E\u0440\u043E\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u043C \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F \u043D\u0430 \u043E\u0434\u043D\u043E\u043C \u0438\u043B\u0438 \u0431\u043E\u043B\u0435\u0435 \u0433\u043B\u0443\u0431\u043E\u043A\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435 \u0432\u043B\u043E\u0436\u0435\u043D\u043D\u043E\u0441\u0442\u0438";
    RuleErrorText["TextInvalidH3Position"] = "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0442\u0440\u0435\u0442\u044C\u0435\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u043F\u0435\u0440\u0435\u0434 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u043C \u0432\u0442\u043E\u0440\u043E\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F \u043D\u0430 \u043E\u0434\u043D\u043E\u043C \u0438\u043B\u0438 \u0431\u043E\u043B\u0435\u0435 \u0433\u043B\u0443\u0431\u043E\u043A\u043E\u043C \u0443\u0440\u043E\u0432\u043D\u0435 \u0432\u043B\u043E\u0436\u0435\u043D\u043D\u043E\u0441\u0442\u0438";
})(RuleErrorText = exports.RuleErrorText || (exports.RuleErrorText = {}));
exports.textSizeValues = ["s", "m", "l", "xl", "xxl"];
exports.spaceValues = [
    "xxxs",
    "xxs",
    "s",
    "m",
    "l",
    "xl",
    "xxl",
    "xxxl",
    "xxxxl",
];
//# sourceMappingURL=types.js.map