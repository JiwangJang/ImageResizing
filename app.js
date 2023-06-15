import express from "express";
import path from "path";
import dotenv from "dotenv";
const app = express();
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, ".env") });
const port = process.env.PORT;
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    var _a;
    const language = (_a = req.headers["accept-language"]) === null || _a === void 0 ? void 0 : _a.split(",")[0];
    console.log(language);
    switch (language) {
        case "ko":
            res.redirect("/ko");
            break;
        default:
            res.redirect("/en");
            break;
    }
});
app.get("/en", (req, res) => {
    res.sendFile(path.join(__dirname, "view/en-US.html"));
});
app.get("/ko", (req, res) => {
    res.sendFile(path.join(__dirname, "view/ko.html"));
});
// app.get("/", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "view/index.html"));
// });
app.listen(port, () => {
    console.log(`${port}에서 서버 열림`);
});
// 윈스턴 설치해서 로깅되게 하기
