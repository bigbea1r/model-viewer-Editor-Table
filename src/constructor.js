export default class ConstructModal{
    constructor(scene){
        this.scene=scene;
        this.const_default_value = 0.03;
        this.colorIndex = 0;
    }
    //метод значений модели по дефолту
    valDefault(){
        this.scene.scale.set(0.3,0.3,0.3)
        this.scene.rotation.set(-0.04,0,0)
        this.scene.position.set(0,-0.2,0)
    }
    //методы для изменения позиционирования, поворотов и увелечения
    modelZoom(value = this.const_default_value){
        this.scene.scale.x+=value
        this.scene.scale.y+=value
        this.scene.scale.z+=value
        //console.log(value)
    };
    modelOutZoom(value = this.const_default_value){
        this.scene.scale.x-=value
        this.scene.scale.y-=value
        this.scene.scale.z-=value
    };
    modelUp(value = this.const_default_value){
        this.scene.rotation.x-=value
    }
    modelDown(value = this.const_default_value){
        this.scene.rotation.x+=value
    }
    modelRight(value = this.const_default_value){
        this.scene.rotation.y+=value
    }
    modelLeft(value = this.const_default_value){
        this.scene.rotation.y-=value
    }
    //цикл для визуального удаление объекта
    vicCar(objectName){
        let obj = this.scene.getObjectByName(objectName);
        obj.visible=!obj.visible;
    }
    selButtons(objectName, color) {
        let obj = this.scene.getObjectByName(objectName);
        obj.material.color = color;
    }
    set_colors_for_elements( element, color) {
        element.addEventListener('mouseover', () => {
            element.style.backgroundColor = "#" + color.getHexString();
          });
          element.addEventListener('mouseout', () => {
            element.style.backgroundColor = '';
          });
     }
}