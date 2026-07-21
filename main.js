const steps = [
  {
    title: "파일 수정",
    description: "프로젝트 파일을 열고 필요한 내용을 수정한 뒤 저장합니다."
  },
  {
    title: "변경 확인",
    description: "git status와 git diff를 사용해 어떤 파일과 내용이 달라졌는지 확인합니다."
  },
  {
    title: "커밋 기록",
    description: "git add로 변경 사항을 스테이징하고 git commit으로 하나의 기록을 만듭니다."
  },
  {
    title: "GitHub로 Push",
    description: "git push를 실행해 로컬 커밋을 GitHub 원격 저장소에 올립니다."
  }
];

const cards = document.querySelectorAll(".workflow-card");
const stepTitle = document.querySelector("#step-title");
const stepDescription = document.querySelector("#step-description");
const nextStepButton = document.querySelector("#next-step");
const commandButtons = document.querySelectorAll(".command-item");
const copyMessage = document.querySelector("#copy-message");

let currentStep = 0;

function showStep(index) {
  currentStep = index;
  stepTitle.textContent = steps[index].title;
  stepDescription.textContent = steps[index].description;

  cards.forEach((card, cardIndex) => {
    card.classList.toggle("active", cardIndex === index);
  });

  nextStepButton.textContent =
    index === steps.length - 1 ? "처음부터 보기" : "다음 단계 보기";
}

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    showStep(index);
  });
});

nextStepButton.addEventListener("click", () => {
  const nextIndex = (currentStep + 1) % steps.length;
  showStep(nextIndex);
});

commandButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const command = button.dataset.command;

    try {
      await navigator.clipboard.writeText(command);
      copyMessage.textContent = `${command} 명령어를 복사했습니다.`;
    } catch (error) {
      copyMessage.textContent = "복사하지 못했습니다. 명령어를 직접 선택해 주세요.";
    }
  });
});
