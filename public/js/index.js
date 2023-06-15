var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dropArea = document.querySelector("#drop-area");
const clickMe = document.querySelector("label");
const levelTooltip = document.querySelector("#level-tooltip");
const levelTooltipDrag = document.querySelector(".levelTooltipDrag");
const fileInput = document.querySelector("#file");
const body = document.body;
const privateFeature = document.querySelector("#private");
const savingFeature = document.querySelector("#saving");
const infiniteFeature = document.querySelector("#infinite");
const speedFeature = document.querySelector("#speed");
const featureComp = document.querySelector("#feature-Component");
const URLShare = document.querySelector("#URLShare");
const FacebookShare = document.querySelector("#FacebookShare");
const TwitterShare = document.querySelector("#TwitterShare");
const congratulation = document.querySelector("#congratulations");
const dic = {
    en: {
        private: "We don't send your image to any server.\nWe work only at your browser.\nIf you don't believe it, push F12(Developer Tool) and see Network tap.",
        saving: "We value your energy, so you just have to pick and drag picture to compress!\nYou don't want to care about this.",
        infinite: "Unlike other sites, We do not limit the number of images to be converted.",
        speed: "Because work only at Browser without server, So fast!",
        noImage: "Could you give only image?",
        HEIC: "Sorry HEIC format not support",
        dragon: "Drop!!",
        urlshareAlert: "link is copied! Share to your friends!",
        twiiterText: "It compress a image very very fastly!!",
    },
    ko: {
        private: "우리는 사진용량을 줄이는데 서버를 이용하지 않기 때문에 그 누구도 당신의 사진을 볼 수 없습니다. 믿기 힘드시다면 F12를 누르시고 Network탭을 눌러보십시오.",
        saving: "우리는 당신의 에너지를 소중하게 생각합니다. 당신은 그냥 이 페이지에 사진을 떨어뜨리시기만 하면 됩니다. 다른 좋은곳에 에너지를 써주세요!",
        infinite: "다른 이미지 용량줄여주는 사이트와 달리 우리는 무료이고 무제한으로 이용가능합니다!",
        speed: "우리는 서버를 사용하지 않고 당신의 브라우저에서 동작하기에 매우 빠른속도를 자랑합니다!",
        noImage: "사진파일만 넣어주실래요?",
        HEIC: "죄송합니다. HEIC형식은 지원하지 않습니다",
        dragon: "이제 떨어뜨려주세요!!",
        urlshareAlert: "링크가 복사됐습니다! 친구들에게 공유하세요!",
        twiiterText: "사진의 용량을 빠르게 줄이고 싶다면?",
    },
};
const language = window.location.pathname.split("/")[1];
const featureClose = document.querySelector("#feature-Component-close");
let currentFiles;
/** 툴팁이 클릭된상태인지 체크 */
let TooltipActive = false;
/** 처음 위치로부터 떨어진 X좌표 */
let currentX;
/** 처음 위치로부터 떨어진 Y좌표 */
let currentY;
/** 처음 X좌표(전에 마지막으로 클릭을 놓은곳) */
let initialX;
/** 처음 Y좌표(전에 마지막으로 클릭을 놓은곳) */
let initialY;
/** 처음 X값 보정 */
let xOffset = 0;
/** 처음 Y값 보정 */
let yOffset = 0;
function FileDown(files) {
    const EXP = files.length;
    const curEXP = Number(localStorage.getItem("curEXP"));
    localStorage.setItem("curEXP", String(curEXP + EXP));
    files.forEach((file) => {
        const fileReader = new FileReader();
        const filename = file.name;
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            const img = new Image();
            if (typeof fileReader.result === "string") {
                img.src = fileReader.result;
            }
            img.onload = (e) => {
                if (e.target instanceof Image) {
                    const a = document.createElement("a");
                    a.setAttribute("download", `Reduced_${filename}`);
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = e.target.width;
                    canvas.height = e.target.height;
                    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(e.target, 0, 0);
                    a.href = canvas.toDataURL("image/jpeg", 0.5);
                    document.body.append(a);
                    a.click();
                }
            };
        };
    });
    level();
}
const level = () => {
    let curLevel = localStorage.getItem("curLevel");
    let maxEXP = localStorage.getItem("maxEXP");
    let curEXP = localStorage.getItem("curEXP");
    if (!curLevel && !curEXP && !maxEXP) {
        localStorage.setItem("curLevel", "1");
        localStorage.setItem("maxEXP", "10");
        localStorage.setItem("curEXP", "0");
        level();
    }
    curLevel = Number(curLevel);
    maxEXP = Number(maxEXP);
    curEXP = Number(curEXP);
    if (curEXP >= maxEXP) {
        const levelup = Math.floor(curEXP / maxEXP);
        const remain = curEXP % maxEXP;
        if (maxEXP !== 0) {
            congratulation.style.visibility = "visible";
            congratulation.style.top = "50%";
            congratulation.style.opacity = "1";
            setTimeout(() => {
                congratulation.style.visibility = "hidden";
                congratulation.style.top = "55%";
                congratulation.style.opacity = "0";
            }, 1500);
        }
        curLevel += levelup;
        maxEXP += levelup;
        curEXP = remain;
    }
    const prograssBar = document.querySelector("progress");
    const levelIndicator = document.querySelector("#level-indicator");
    const expIndicator = document.querySelector("#EXP-indicator");
    prograssBar.value = Math.floor(curEXP);
    prograssBar.max = maxEXP;
    levelIndicator.innerText = `Your Level : ${curLevel}`;
    expIndicator.innerText = `${curEXP}/${maxEXP}`;
    localStorage.setItem("curLevel", String(curLevel));
    localStorage.setItem("maxEXP", String(maxEXP));
    localStorage.setItem("curEXP", String(curEXP));
};
const getBack = () => {
    dragToggle();
    dropArea.innerText = "";
};
const dragToggle = () => {
    document.body.classList.toggle("scroll-hidden");
    dropArea.classList.toggle("bg-slate-100");
    clickMe.classList.toggle("z-20");
    levelTooltip.classList.toggle("z-20");
    privateFeature.classList.toggle("z-20");
    savingFeature.classList.toggle("z-20");
    infiniteFeature.classList.toggle("z-20");
    speedFeature.classList.toggle("z-20");
    featureComp.classList.toggle("z-20");
    FacebookShare.classList.toggle("z-20");
    TwitterShare.classList.toggle("z-20");
    URLShare.classList.toggle("z-20");
};
const dragEnterEvent = (e) => {
    var _a;
    e.preventDefault();
    const pharse = (_a = dic[language]) !== null && _a !== void 0 ? _a : dic.en;
    dragToggle();
    dropArea.innerText = pharse.dragon;
};
const dragLeaveEvent = (e) => {
    e.preventDefault();
    getBack();
};
const dragoverEvent = (e) => {
    e.preventDefault();
};
const dropEvent = (e) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    e.preventDefault();
    const reg = /^image/;
    const pharse = (_a = dic[language]) !== null && _a !== void 0 ? _a : dic.en;
    currentFiles = Array.from((_b = e.dataTransfer) === null || _b === void 0 ? void 0 : _b.files);
    const heics = currentFiles.filter((file) => {
        const name = file.name.split(".");
        if (name[name.length - 1] === "heic")
            return file;
    });
    const notImages = currentFiles.filter((file) => !reg.test(file.type) &&
        file.name.split(".")[file.name.split(".").length - 1] !== "heic");
    if (notImages.length > 0) {
        alert(pharse.noImage);
        getBack();
        return;
    }
    if (heics.length > 0) {
        alert(pharse.HEIC);
        getBack();
        return;
    }
    FileDown(currentFiles);
    getBack();
    currentFiles = undefined;
});
const dragStart = (e) => {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    if (e.target === levelTooltipDrag) {
        TooltipActive = true;
    }
};
const drag = (e) => {
    if (TooltipActive) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        setTranslate(currentX, currentY, levelTooltip);
    }
};
const dragEnd = () => {
    initialX = currentX;
    initialY = currentY;
    TooltipActive = false;
};
const setTranslate = (xPos, yPos, el) => {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
};
const modal = (feature) => {
    var _a;
    const featureContent = document.querySelector("#feature-Component-article");
    const pharse = (_a = dic[language]) !== null && _a !== void 0 ? _a : dic.en;
    let content;
    switch (feature) {
        case "private":
            content = pharse.private;
            break;
        case "saving":
            content = pharse.saving;
            break;
        case "infinite":
            content = pharse.infinite;
            break;
        case "speed":
            content = pharse.speed;
            break;
    }
    featureContent.innerText = content;
    featureComp.classList.toggle("hidden");
};
body.addEventListener("mousedown", dragStart);
body.addEventListener("mouseup", dragEnd);
body.addEventListener("mousemove", drag);
window.addEventListener("load", level);
dropArea === null || dropArea === void 0 ? void 0 : dropArea.addEventListener("dragenter", dragEnterEvent);
dropArea === null || dropArea === void 0 ? void 0 : dropArea.addEventListener("dragleave", dragLeaveEvent);
dropArea === null || dropArea === void 0 ? void 0 : dropArea.addEventListener("dragover", dragoverEvent);
dropArea === null || dropArea === void 0 ? void 0 : dropArea.addEventListener("drop", (e) => dropEvent(e));
fileInput === null || fileInput === void 0 ? void 0 : fileInput.addEventListener("input", (e) => {
    const target = e.target;
    FileDown(Array.from(target.files));
});
privateFeature === null || privateFeature === void 0 ? void 0 : privateFeature.addEventListener("click", () => modal("private"));
savingFeature === null || savingFeature === void 0 ? void 0 : savingFeature.addEventListener("click", () => modal("saving"));
infiniteFeature === null || infiniteFeature === void 0 ? void 0 : infiniteFeature.addEventListener("click", () => modal("infinite"));
speedFeature === null || speedFeature === void 0 ? void 0 : speedFeature.addEventListener("click", () => modal("speed"));
featureClose.onclick = (e) => {
    const target = e.target;
    target.parentElement.classList.toggle("hidden");
};
URLShare.addEventListener("click", () => {
    window.navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert(dic[language].urlshareAlert));
});
FacebookShare.addEventListener("click", () => {
    window.FB.ui({
        method: "share",
        href: "https://imagecompresser.net/",
    }, (res) => { });
});
TwitterShare.addEventListener("click", () => {
    var _a;
    const pharse = (_a = dic[language]) !== null && _a !== void 0 ? _a : dic.en;
    const url = "https://imagecompresser.net/";
    const text = pharse.twiiterText;
    const hashtags = "ImageCompressor,Image,fast,simple";
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}`);
});
export {};
