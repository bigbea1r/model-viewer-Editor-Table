import './style.css';
import { ModelViewerElement } from '@google/model-viewer';
import * as THREE from 'three';
import ViewModal from './viewmodal.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// Функция для изменения URL модели
// setTimeout(() => {          
    // Создаем один экземпляр <model-viewer>
    const viewer = new ModelViewerElement();

    let viewModal = new ViewModal();

    const gltfLoader = new GLTFLoader();

    // Текстуры
    const textureLoader = new THREE.TextureLoader();

    let colorRed = textureLoader.load('/textures/red.jpg');
    let metal = textureLoader.load('/textures/metal.jpg');
    let colorPerple = textureLoader.load('/textures/perple.jpg');
    let doorBrown = textureLoader.load('/textures/door.png');
    let doorSilver = textureLoader.load('/textures/door_silver.png');
    let doorGrey = textureLoader.load('/textures/door_grey.png');
    let screenTexture = textureLoader.load('/textures/Desk_small_screen_base_col.png'); 

    screenTexture.wrapT = THREE.RepeatWrapping;
    screenTexture.wrapS = THREE.RepeatWrapping;

    metal.wrapT = THREE.RepeatWrapping;
    metal.wrapS = THREE.RepeatWrapping;
    colorPerple.wrapT = THREE.RepeatWrapping;
    colorPerple.wrapS = THREE.RepeatWrapping;
    colorRed.wrapT = THREE.RepeatWrapping;
    colorRed.wrapS = THREE.RepeatWrapping;

    doorBrown.wrapT = THREE.RepeatWrapping;
    doorBrown.wrapS = THREE.RepeatWrapping;
    doorSilver.wrapT = THREE.RepeatWrapping;
    doorSilver.wrapS = THREE.RepeatWrapping;
    doorGrey.wrapT = THREE.RepeatWrapping;
    doorGrey.wrapS = THREE.RepeatWrapping;
    
    const scene = viewer[Object.getOwnPropertySymbols(viewer).find(e => e.description === 'scene')]
    viewer.src = 'models/door.glb'; // Путь к вашей модели
    // Создаём промис, который будет резолвиться после загрузки модели
const modelLoadedPromise = new Promise((resolve, reject) => {
  viewer.addEventListener('load', () => {
      resolve();
  });
});

// Код для удаления модели после её загрузки
modelLoadedPromise.then(() => {
  // Отключаем автоматическое вращение камеры
  viewer.autoRotate = true;

  // Скрываем модель из сцены
  scene.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
          // Проверяем, является ли объект моделью table.glb
          if (child.name === 'door.glb') {
              // Удаляем объект из сцены
              scene.remove(child);
          }
      }
  });

  // Очищаем память, выделенную под загруженную модель
  scene.dispose();
});

  
  // Очищаем память, выделенную под загруженную модель
  scene.dispose();
    const loadPromises = [];

    let firstTableBase;
    let firstScreen;
    let firstTableTop;
    let firstLegs;
    let firstTableBaseScreen;

    let secondTableBase;
    let secondScreen;
    let secondTableTop;
    let secondLegs;
    let secondTableBaseScreen

    let groupModalFirst
    let groupModalSecond
    // viewer.autoRotate = true;
    // viewer.cameraControls = true;
    // Устанавливаем URL для первой модели

    console.log(scene)

    
    gltfLoader.load('/models/table.glb', (gltf) => {
      const sceneGlb = gltf.scene;
      sceneGlb.getObjectByName('Scene').name = 'tableSmall';
      let tableName =  sceneGlb.getObjectByName('tableSmall')
            console.log(sceneGlb);
            //Элементы обычного стола
            firstTableBase = sceneGlb.getObjectByName('Cube018');
            firstScreen = sceneGlb.getObjectByName('Cube018_1');
            firstTableTop = sceneGlb.getObjectByName('Desk_low');
            firstLegs = sceneGlb.getObjectByName('feet_low');
            firstTableBaseScreen = sceneGlb.getObjectByName('upper_frame_low');

            //массивы для построения кнопок
            let texturesTableTop = [
                { texture: doorBrown, name: "Дерево" },
                { texture: doorSilver, name: "Серебро" },
                { texture: doorGrey, name: "Серый" },
                { texture: metal, name: "Металл" },
                { texture: colorPerple, name: "Фиолетовый" },
                { texture: colorRed, name: "Бордовый" },
            ];
            let table = [];

            //наложение текстуры экранчику
            firstScreen.material.map = screenTexture;

            //Создание группы для обычного стола
            groupModalFirst = new THREE.Group();
            groupModalFirst.add(firstTableBaseScreen);
            groupModalFirst.add(firstTableBase);
            groupModalFirst.add(firstScreen);
            groupModalFirst.add(firstTableTop);
            groupModalFirst.add(firstLegs);
            groupModalFirst.position.y = -0.5;

            scene.add(groupModalFirst);
            //Клонирование материалов для обычного стола
            firstTableBase.material = firstTableBase.material.clone();
            firstScreen.material = firstScreen.material.clone();
            firstTableTop.material = firstTableTop.material.clone();
            firstLegs.material = firstLegs.material.clone();

            firstScreen.material.map = screenTexture;
            //Настройка высоты стола
            document.getElementById("sizes").onclick = () => {
                let containers = document.getElementsByClassName("dat-gui-container");
                viewModal.openMenu(containers)

                viewModal.settingsPosition(firstTableTop);
                viewModal.settingsPosition(firstTableBase);
                viewModal.settingsPosition(firstScreen);
            };
            //Создание большого стола
            gltfLoader.load(
                '/models/tableBig.glb',
                (gltf) => {
                    const tableBaseModel = gltf.scene;
                    tableBaseModel.getObjectByName('Scene').name = 'tableBig';

                    tableBaseModel.visible = false;
                    secondTableBase = tableBaseModel.getObjectByName('Cube018');
                    secondScreen = tableBaseModel.getObjectByName('Cube018_1');
                    secondTableTop = tableBaseModel.getObjectByName('Desk_low');
                    secondLegs = tableBaseModel.getObjectByName('feet_low');
                    secondTableBaseScreen = tableBaseModel.getObjectByName('upper_frame_low');
                    
                    //Создание группы для большого стола
                    groupModalSecond = new THREE.Group(); 
                    groupModalSecond.visible = false; 
                    groupModalSecond.add(secondTableBaseScreen);
                    groupModalSecond.add(secondTableBase);
                    groupModalSecond.add(secondScreen);
                    groupModalSecond.add(secondTableTop);
                    groupModalSecond.add(secondLegs);
                    groupModalSecond.position.y = -0.5;
            
                    scene.add(groupModalSecond);
                    //Клонирование материалов
                    secondTableBase.material = secondTableBase.material.clone();
                    secondScreen.material = secondScreen.material.clone();
                    secondTableTop.material = secondTableTop.material.clone();
                    secondLegs.material = secondLegs.material.clone();
            
                    //Растянул основание с экранчиком. Аля костыль
                    secondTableBase.scale.x = 1.2;
                    secondScreen.scale.x = 1.2;
            
                    //наложение текстуры экранчику
                    secondScreen.material.map = screenTexture;
                    //Настройка высоты стола
                    viewModal.settingsPosition(secondTableTop);
                    viewModal.settingsPosition(secondTableBase);
                    viewModal.settingsPosition(secondScreen);

                    // console.log(scene.children[1])
                    //
                    viewModal.createNewModel(scene.children[1], scene.children[3]);

                    // Обновление массива table, добавляем вторые объекты
                    table.push(
                        { object: { first: firstTableTop, second: secondTableTop }, name: "Столешница" },
                        { object: { first: firstLegs, second: secondLegs }, name: "Ножки основания" }
                    );
                    scene.add(tableBaseModel);
                });
               
                document.getElementById("textures").onclick = () => {
                    const elemProduct = document.getElementById("elem_product");
                    viewModal.openMenu1(elemProduct);
                    elemProduct.innerHTML = "";
                
                    table.forEach(objectItem => {
                        const button = document.createElement("button");
                        button.textContent = objectItem.name;
                        button.onclick = () => viewModal.selTableBase(texturesTableTop, objectItem.object, "selector_textures", groupModalFirst, groupModalSecond, metal);
                        elemProduct.appendChild(button);
                    });
                };
                
            scene.add(sceneGlb);

            // resolve();
     });
    console.log(scene)

document.body.appendChild(viewer);
// }, 2000);