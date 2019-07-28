require("../build/linter");
var chai = require("chai");

describe("Content horizontal space should be valid", function() {
  it("The lack of form__item_space-h mix on content form element causes error", function() {
    const object = `{
      "block": "form",
      "content": {
          "block": "form",
          "elem": "content",
          "content": { "block": "input", "mods": { "size": "l" } },
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-v": "xxl" } }]
      }
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID",
        error: "Горизонтальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-h на 1 шаг больше эталонного размера",
        location: {
          end: {
            column: 8,
            line: 8,
          },
          start: {
            column: 18,
            line: 3,
          },
        },
      },
    ]);
  });

  it("Should output error when form__content with incorrect space is found after reference size was defined", function() {
    const object = `{
      "block": "form",
      "content": [
        { "block": "input", "mods": { "size": "l" } },
        {
          "block": "form",
          "elem": "content",
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xxl", "space-v": "xxl" } }]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID",
        error: "Горизонтальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-h на 1 шаг больше эталонного размера",
        location: {
          end: {
            column: 10,
            line: 9,
          },
          start: {
            column: 9,
            line: 5,
          },
        },
      },
    ]);
  });

  it("Should output error when form__content with incorrect space is found before reference size was defined", function() {
    const object = `{
      "block": "form",
      "content": [
        {
          "block": "form",
          "elem": "content",
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xxl", "space-v": "xxl" } }]
        },
        { "block": "button", "mods": { "size": "l" } }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID",
        error: "Горизонтальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-h на 1 шаг больше эталонного размера",
        location: {
          end: {
            column: 10,
            line: 8,
          },
          start: {
            column: 9,
            line: 4,
          },
        },
      },
    ]);
  });

  it("Should output error when form__content space mix has empty value", function() {
    const object = `{
      "block": "form",
      "content": [
        {
          "block": "form",
          "elem": "content",
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "", "space-v": "xxl" } }]
        },
        { "block": "button", "mods": { "size": "l" } }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID",
        error: "Горизонтальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-h на 1 шаг больше эталонного размера",
        location: {
          end: {
            column: 10,
            line: 8,
          },
          start: {
            column: 9,
            line: 4,
          },
        },
      },
    ]);
  });

  it("Several content elements with space incorrect values should return several errors", function() {
    const object = `{
      "block": "form",
      "content": [
        {
          "block": "form",
          "elem": "content",
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xxl", "space-v": "xxl" } }]
        },
        { "block": "button", "mods": { "size": "l" } },
        {
          "block": "form",
          "elem": "content",
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "s", "space-v": "xxl" } }]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID",
        error: "Горизонтальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-h на 1 шаг больше эталонного размера",
        location: {
          end: {
            column: 10,
            line: 8,
          },
          start: {
            column: 9,
            line: 4,
          },
        },
      },
      {
        code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID",
        error: "Горизонтальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-h на 1 шаг больше эталонного размера",
        location: {
          end: {
            column: 10,
            line: 14,
          },
          start: {
            column: 9,
            line: 10,
          },
        },
      },
    ]);
  });

  it("Nested elements should be checked separately", function() {
    const object = `{
      "block": "form",
      "content": [
        {
          "block": "form",
          "elem": "content",
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "m", "space-v": "xxl" } }],
          "content": [
            {
              "block": "form",
              "elem": "content",
              "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "s", "space-v": "xxl" } }]
            }
          ]
        },
        { "block": "button", "mods": { "size": "l" } },
        {
          "block": "form",
          "elem": "content",
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "l", "space-v": "xxl" } }]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID",
        error: "Горизонтальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-h на 1 шаг больше эталонного размера",
        location: {
          end: {
            column: 10,
            line: 15,
          },
          start: {
            column: 9,
            line: 4,
          },
        },
      },
      {
        code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID",
        error: "Горизонтальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-h на 1 шаг больше эталонного размера",
        location: {
          end: {
            column: 14,
            line: 13,
          },
          start: {
            column: 13,
            line: 9,
          },
        },
      },
      {
        code: "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID",
        error: "Горизонтальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-h на 1 шаг больше эталонного размера",
        location: {
          end: {
            column: 10,
            line: 21,
          },
          start: {
            column: 9,
            line: 17,
          },
        },
      },
    ]);
  });
});
