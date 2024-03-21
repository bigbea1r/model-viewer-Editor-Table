import './style.css';
import { ModelViewerElement } from '@google/model-viewer';
import * as THREE from 'three';
import ViewModal from './viewmodal.js';

// Функция для изменения URL модели
setTimeout(() => {          
    // Создаем один экземпляр <model-viewer>
    const viewer = new ModelViewerElement();

    let viewModal = new ViewModal();

    function changeModelUrl(viewer, currentUrl) {
        const urlTable = 'models/table.glb';
        const urlTableBig = 'models/tableBig.glb';
        
        // Если текущий URL равен urlTable, меняем на urlTableBig, и наоборот
        if (currentUrl === urlTableBig) {
          viewer.src = urlTable;
        } else {
          viewer.src = urlTableBig;
        }
      }
      viewer.autoRotate = true;
      viewer.cameraControls = true;
      // Устанавливаем URL для первой модели
      const urlTable = 'models/table.glb';
      changeModelUrl(viewer, urlTable);
      
      // Добавляем элемент <model-viewer> на страницу
      document.body.appendChild(viewer);
      
      // Обработчик события для кнопки "sizes"
      document.getElementById('state').addEventListener('click', function() {
        changeModelUrl(viewer, viewer.src); // Передаем текущий URL модели
      });
      setTimeout(() => {  
        const textureLoader = new THREE.TextureLoader();

        let colorRed = textureLoader.load('/textures/red.jpg');
        let metal = textureLoader.load('/textures/metal.jpg');
        let colorPerple = textureLoader.load('/textures/perple.jpg');
        let doorBrown = textureLoader.load('/textures/door.png');
        let doorSilver = textureLoader.load('/textures/door_silver.png');
        let doorGrey = textureLoader.load('/textures/door_grey.png');
        let screenTexture = textureLoader.load('/textures/Desk_small_screen_Emissive.png'); 

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

// Добавляем элемент <model-viewer> на страницу
document.body.appendChild(viewer);
const sceneGlb = viewer[Object.getOwnPropertySymbols(viewer).find(e => e.description === 'scene')]
console.log(sceneGlb)

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

let groupModalSecond

            firstTableBase = sceneGlb.getObjectByName('Cube018');
            firstScreen = sceneGlb.getObjectByName('Cube018_1');
            firstTableTop = sceneGlb.getObjectByName('Desk_low');
            firstLegs = sceneGlb.getObjectByName('feet_low');
            firstTableBaseScreen = sceneGlb.getObjectByName('upper_frame_low');
            console.log(firstTableBase)
            console.log(firstScreen)
            console.log(firstTableTop)
            console.log(firstLegs)
            console.log(firstTableBaseScreen)

            firstScreen.material.map = screenTexture;




        }, 2000);
}, 2000);