// ScrollOut({});
ScrollOut({
    once: true, // ScrollOut 효과 한번만
    onShown: (element) => {
        // TypeIt 효과 적용
        new TypeIt(element.querySelector(".title"), {
            startDelay: 500,
            cursor: false,
        })
            .pause(2000)
            .go();
    },
});
