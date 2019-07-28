require("../build/linter");
var chai = require("chai");

describe("Content vertical space should be valid", function() {
  it("The lack of form__item_space-v mix on content form element causes error", function() {
    const object = `{
      "block": "form",
      "content": {
          "block": "form",
          "elem": "content",
          "content": { "block": "input", "mods": { "size": "l" } },
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl" } }]
      }
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID",
        error: "Вертикальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-v на 2 шага больше эталонного размера",
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
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl", "space-v": "xl" } }]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID",
        error: "Вертикальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-v на 2 шага больше эталонного размера",
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
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl", "space-v": "xl" } }]
        },
        { "block": "button", "mods": { "size": "l" } }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID",
        error: "Вертикальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-v на 2 шага больше эталонного размера",
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
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl", "space-v": "" } }]
        },
        { "block": "button", "mods": { "size": "l" } }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID",
        error: "Вертикальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-v на 2 шага больше эталонного размера",
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
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl", "space-v": "xl" } }]
        },
        { "block": "button", "mods": { "size": "l" } },
        {
          "block": "form",
          "elem": "content",
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl", "space-v": "s" } }]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID",
        error: "Вертикальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-v на 2 шага больше эталонного размера",
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
        code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID",
        error: "Вертикальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-v на 2 шага больше эталонного размера",
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
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl", "space-v": "s" } }],
          "content": [
            {
              "block": "form",
              "elem": "content",
              "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl", "space-v": "m" } }]
            }
          ]
        },
        { "block": "button", "mods": { "size": "l" } },
        {
          "block": "form",
          "elem": "content",
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl", "space-v": "xl" } }]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID",
        error: "Вертикальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-v на 2 шага больше эталонного размера",
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
        code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID",
        error: "Вертикальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-v на 2 шага больше эталонного размера",
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
        code: "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID",
        error: "Вертикальный внутренний отступ элемента content должен задаваться с помощью микса на него элемента item со значением модификатора space-v на 2 шага больше эталонного размера",
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
