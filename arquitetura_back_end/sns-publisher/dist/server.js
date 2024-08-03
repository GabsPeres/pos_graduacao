"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/server.ts
var import_express = __toESM(require("express"));
var import_aws_sdk = require("aws-sdk");
var import_zod = require("zod");
var app = (0, import_express.default)();
app.use(import_express.default.json());
app.post("/nfe", (request, response) => __async(exports, null, function* () {
  const requestBodySchema = import_zod.z.object({
    url: import_zod.z.string().url()
  });
  try {
    const { url } = requestBodySchema.parse(request.body);
    const sns = new import_aws_sdk.SNS({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET,
      region: "us-east-1"
    });
    const { MessageId } = yield sns.publish({
      Message: JSON.stringify({ url }),
      TopicArn: process.env.AWS_TOPIC_ARN,
      MessageGroupId: "01"
    }).promise();
    if (!MessageId) {
      throw Error("Fail to publish SNS message");
    }
    return response.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    if (error instanceof import_zod.ZodError) {
      return response.status(400).json({
        message: error.format()
      });
    }
    return response.status(500).json({ message: "Internal Server Error" });
  }
}));
app.listen(Number(process.env.PORT), () => {
  console.log(`HTTP Server is running on port ${process.env.PORT}`);
});
