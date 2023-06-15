declare global {
  interface Window {
    FB: any;
  }
}

type div = HTMLDivElement | null;
type input = HTMLInputElement | null;

const dropArea: div = document.querySelector("#drop-area");
const clickMe: HTMLLabelElement = document.querySelector("label");
const levelTooltip: div = document.querySelector("#level-tooltip");
const levelTooltipDrag: div = document.querySelector(".levelTooltipDrag");
const fileInput: input = document.querySelector("#file");
const body = document.body;
const privateFeature: div = document.querySelector("#private");
const savingFeature: div = document.querySelector("#saving");
const infiniteFeature: div = document.querySelector("#infinite");
const speedFeature: div = document.querySelector("#speed");
const featureComp = document.querySelector("#feature-Component");
const URLShare = document.querySelector("#URLShare");
const FacebookShare = document.querySelector("#FacebookShare");
const TwitterShare = document.querySelector("#TwitterShare");
const congratulation: div = document.querySelector("#congratulations");

const dic = {
  en: {
    private:
      "We don't send your image to any server.\nWe work only at your browser.\nIf you don't believe it, push F12(Developer Tool) and see Network tap.",
    saving:
      "We value your energy, so you just have to pick and drag picture to compress!\nYou don't want to care about this.",
    infinite:
      "Unlike other sites, We do not limit the number of images to be converted.",
    speed: "Because work only at Browser without server, So fast!",
    noImage: "Could you give only image?",
    HEIC: "Sorry HEIC format not support",
    dragon: "Drop!!",
    urlshareAlert: "link is copied! Share to your friends!",
    twiiterText: "It compress a image very very fastly!!",
  },
  ko: {
    private:
      "우리는 사진용량을 줄이는데 서버를 이용하지 않기 때문에 그 누구도 당신의 사진을 볼 수 없습니다. 믿기 힘드시다면 F12를 누르시고 Network탭을 눌러보십시오.",
    saving:
      "우리는 당신의 에너지를 소중하게 생각합니다. 당신은 그냥 이 페이지에 사진을 떨어뜨리시기만 하면 됩니다. 다른 좋은곳에 에너지를 써주세요!",
    infinite:
      "다른 이미지 용량줄여주는 사이트와 달리 우리는 무료이고 무제한으로 이용가능합니다!",
    speed:
      "우리는 서버를 사용하지 않고 당신의 브라우저에서 동작하기에 매우 빠른속도를 자랑합니다!",
    noImage: "사진파일만 넣어주실래요?",
    HEIC: "죄송합니다. HEIC형식은 지원하지 않습니다",
    dragon: "이제 떨어뜨려주세요!!",
    urlshareAlert: "링크가 복사됐습니다! 친구들에게 공유하세요!",
    twiiterText: "사진의 용량을 빠르게 줄이고 싶다면?",
  },
};

const language = window.location.pathname.split("/")[1];

const featureClose = document.querySelector(
  "#feature-Component-close"
) as HTMLDivElement;

let currentFiles: File[] | undefined;
/** 툴팁이 클릭된상태인지 체크 */
let TooltipActive = false;

/** 처음 위치로부터 떨어진 X좌표 */
let currentX: number;

/** 처음 위치로부터 떨어진 Y좌표 */
let currentY: number;

/** 처음 X좌표(전에 마지막으로 클릭을 놓은곳) */
let initialX: number;

/** 처음 Y좌표(전에 마지막으로 클릭을 놓은곳) */
let initialY: number;

/** 처음 X값 보정 */
let xOffset: number = 0;

/** 처음 Y값 보정 */
let yOffset: number = 0;

function FileDown(files: File[]): void {
  const EXP = files.length;
  const curEXP = Number(localStorage.getItem("curEXP"));
  localStorage.setItem("curEXP", String(curEXP + EXP));
  files.forEach((file) => {
    const fileReader: FileReader = new FileReader();
    const filename: string = file.name;
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const img: HTMLImageElement = new Image();
      if (typeof fileReader.result === "string") {
        img.src = fileReader.result;
      }
      img.onload = (e: Event) => {
        if (e.target instanceof Image) {
          const a: HTMLAnchorElement = document.createElement("a");
          a.setAttribute("download", `Reduced_${filename}`);
          const canvas: HTMLCanvasElement = document.createElement("canvas");
          const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
          canvas.width = e.target.width;
          canvas.height = e.target.height;
          ctx?.drawImage(e.target, 0, 0);
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
  let curLevel: string | number = localStorage.getItem("curLevel");
  let maxEXP: string | number = localStorage.getItem("maxEXP");
  let curEXP: string | number = localStorage.getItem("curEXP");

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
  const levelIndicator = document.querySelector(
    "#level-indicator"
  ) as HTMLParagraphElement;
  const expIndicator = document.querySelector(
    "#EXP-indicator"
  ) as HTMLParagraphElement;

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

const dragEnterEvent = (e: DragEvent): void => {
  e.preventDefault();
  const pharse = dic[language] ?? dic.en;
  dragToggle();
  dropArea.innerText = pharse.dragon;
};

const dragLeaveEvent = (e: DragEvent): void => {
  e.preventDefault();
  getBack();
};

const dragoverEvent = (e: DragEvent): void => {
  e.preventDefault();
};

const dropEvent = async (e: DragEvent) => {
  e.preventDefault();
  const reg: RegExp = /^image/;
  const pharse = dic[language] ?? dic.en;
  currentFiles = Array.from(e.dataTransfer?.files);
  const heics = currentFiles.filter((file) => {
    const name = file.name.split(".");
    if (name[name.length - 1] === "heic") return file;
  });
  const notImages = currentFiles.filter(
    (file) =>
      !reg.test(file.type) &&
      file.name.split(".")[file.name.split(".").length - 1] !== "heic"
  );

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
};

const dragStart = (e: DragEvent) => {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;
  if (e.target === levelTooltipDrag) {
    TooltipActive = true;
  }
};

const drag = (e: DragEvent) => {
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

const setTranslate = (xPos: number, yPos: number, el: div) => {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
};

const modal = (feature: string) => {
  const featureContent = document.querySelector(
    "#feature-Component-article"
  ) as HTMLDivElement;
  const pharse = dic[language] ?? dic.en;
  let content: string;
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

dropArea?.addEventListener("dragenter", dragEnterEvent);
dropArea?.addEventListener("dragleave", dragLeaveEvent);
dropArea?.addEventListener("dragover", dragoverEvent);
dropArea?.addEventListener("drop", (e) => dropEvent(e));
fileInput?.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  FileDown(Array.from(target.files));
});

privateFeature?.addEventListener("click", () => modal("private"));
savingFeature?.addEventListener("click", () => modal("saving"));
infiniteFeature?.addEventListener("click", () => modal("infinite"));
speedFeature?.addEventListener("click", () => modal("speed"));

featureClose.onclick = (e) => {
  const target = e.target as HTMLDivElement;
  target.parentElement.classList.toggle("hidden");
};

URLShare.addEventListener("click", () => {
  window.navigator.clipboard
    .writeText(window.location.href)
    .then(() => alert(dic[language].urlshareAlert));
});

FacebookShare.addEventListener("click", () => {
  window.FB.ui(
    {
      method: "share",
      href: "https://imagecompresser.net/",
    },
    (res: any) => {}
  );
});

TwitterShare.addEventListener("click", () => {
  const pharse = dic[language] ?? dic.en;
  const url = "https://imagecompresser.net/";
  const text = pharse.twiiterText;
  const hashtags = "ImageCompressor,Image,fast,simple";
  window.open(
    `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}`
  );
});
