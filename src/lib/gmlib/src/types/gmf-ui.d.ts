//


class UIElement {
    hide(){

    }

    show(){

    }
}

class ExperienceBar extends UIElement {
    component: () => import("@/ui/experience-bar");
}

interface UIController {
    experienceBar: UIElement<'ExperienceBar'>
}

class UI implements UIController {
    experienceBar = new ExperienceBar();
}

const ui = new UI();
