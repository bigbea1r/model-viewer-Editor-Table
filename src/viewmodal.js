// viewModel.js
export default class ViewModal {

    constructor() {
        this.menu_is_open = 'block';
        this.menu_is_clouse = 'none';
        this.slider = 'slider';
        this.state = "state";
        this.idHtml = this.idHtml

    }
    selTableBase(texturesTableTop, objectItem, styleClass, groupModalFirst, groupModalSecond, textureLegs){
        console.log(objectItem)
            if (objectItem.first.name === 'Desk_low') {
                this.buildTextureButtons(texturesTableTop, objectItem.first, objectItem.second, styleClass);
            } else if (objectItem.first.name === 'feet_low') {
                groupModalFirst.traverse(object => {
                    if (object.name === 'feet_low' || object.name === 'Cube018') {
                        object.material.map = textureLegs;
                    }
                });
                groupModalSecond.traverse(object => {
                    if (object.name === 'feet_low' || object.name === 'Cube018') {
                        object.material.map = textureLegs;
                    }
                });
            }
    }
    // Метод для отображения кнопок текстур
    buildTextureButtons(textureButtons, objectFirst, objectSecond, styleClass) {
        this.idHtml = document.getElementById(styleClass);
        this.idHtml.innerHTML = "";
        this.createTextureButtons(textureButtons, objectFirst, objectSecond)
    }
    createTextureButtons(textureButtons, objectFirst, objectSecond ){
        textureButtons.forEach(textureItem => {
            let button = document.createElement("button");
            button.textContent = textureItem.name;
            button.onclick = () => 
            //При клике на кнопку столешницы или основания выдовать массив кнопок свои текстур
            this.selTableTop(objectFirst, objectSecond, textureItem); 
            this.idHtml.appendChild(button);
        });
    }
    selTableTop(objectFirst, objectSecond, textureItem) {
        objectFirst.material.map = textureItem.texture;
        objectSecond.material.map = textureItem.texture;
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
    createNewModel(model1, modelContainer) {
        document.getElementById(this.state).onclick = () => {
            if (model1.visible === false) {
                model1.visible = true;
                modelContainer.children.forEach(child => {
                    child.visible = false;
                });
                console.log("Большой стол");
            } else {
                model1.visible = false;
                modelContainer.children.forEach(child => {
                    child.visible = true;
                });
                console.log("Маленький стол");
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
