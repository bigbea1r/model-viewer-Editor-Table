// viewModel.js
export default class ViewModal {
    constructor() {
        this.objectName = '';
        //
        this.menu_is_open = 'block';
        this.menu_is_clouse = 'none';
        this.menuCreated = false;
        this.slider = 'slider';
        this.state = "state"
    }
    // Метод для отображения кнопок текстур
    texturesButtons(textureButtons, object, styleClass) {
        const selectorTextures = document.getElementById(styleClass);
        selectorTextures.innerHTML = "";
        textureButtons.forEach(textureItem => {
            const button = document.createElement("button");
            button.textContent = textureItem.name;
            button.onclick = () => { object.material.map = textureItem.texture; };
            selectorTextures.appendChild(button);
        });
    }
    openMenu(doc){
        for (let i = 0; i < doc.length; i++) {
            if (doc[i].style.display === this.menu_is_open) {
                doc[i].style.display = this.menu_is_clouse;
            } else {
                doc[i].style.display = this.menu_is_open;
            }
        }
    }
    openMenu1(doc){
            if (doc.style.display === this.menu_is_clouse) {
                doc.style.display = this.menu_is_open;
            } else {
                doc.style.display = this.menu_is_clouse;
            }
    }
    createNewModel(model1, model2, modelContainer) {
        document.getElementById(this.state).onclick = () => {
            if (model1.visible === false) {
                model1.visible = true;
                model2.visible = true;
                modelContainer.children.forEach(child => {
                    child.visible = false;
                });
                console.log("Маленькая столешница скрыта");
                console.log(model1);
            } else {
                model1.visible = false;
                model2.visible = false;
                modelContainer.children.forEach(child => {
                    child.visible = true;
                });
                console.log("Большая столешница скрыта");
                console.log(model1);
            }
        };
    }
    
    settingsPosition(model) {
        const slider = document.getElementById(this.slider);
        slider.addEventListener('input', () => {
            let value = parseFloat(slider.value);
            let newPosition = value * 1 - 0; 
            model.position.setY(newPosition);
        });
    }
    
 }
