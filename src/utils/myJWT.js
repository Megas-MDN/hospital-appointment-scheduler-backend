require("dotenv").config();
const crypto = require("crypto");

const handlerToken = (
  key = process.env.JWT_SECRET || "STR_SECRET",
  expiresInSeconds = process.env.EXPIRE_TIME || 60,
  alg = { alg: "HS256", typ: "CustomJWT" },
) => {
  const encodeBase64 = (str) => {
    return new Buffer.from(str).toString("base64url").toString("utf-8");
  };

  const decodeBase64 = (str) => {
    return new Buffer.from(str, "base64url").toString("utf-8");
  };

  const stringify = (obj) => JSON.stringify(obj);

  const checkSumGen = (head, body) => {
    const str = head + "." + body;
    const hash = crypto.createHmac("sha256", key);
    const checkSum = hash.update(str).digest("base64url").toString("utf8");
    return checkSum;
  };

  return {
    encode: (obj) => {
      let result = "";
      const header = encodeBase64(stringify(alg));
      result += header + ".";

      const payload = {
        ...obj,
        exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
        expInSeconds: expiresInSeconds,
        date: new Date().toISOString(),
      };

      const body = encodeBase64(stringify(payload));
      result += body + ".";

      const checkSum = checkSumGen(header, body);
      result += checkSum;
      return result;
    },
    decode: (str) => {
      const jwtArr = str.split(".");
      const [head, body, hash] = jwtArr;
      const checkSum = checkSumGen(head, body);

      if (hash === checkSum) {
        const payload = JSON.parse(decodeBase64(body));
        if (payload.exp < Math.floor(Date.now() / 1000)) {
          return false;
        }
        return payload;
      } else {
        return false;
      }
    },
  };
};

module.exports = { handlerToken };
