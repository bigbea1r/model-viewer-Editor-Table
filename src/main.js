// Импорты
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import ModalConstruct from './constructor.js';
import ViewModal from './viewmodal.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Создание экземпляра объекта ViewModal
let viewModal = new ViewModal();

// Модели
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

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

// Создание группы для источников света
const lightHolder = new THREE.Group();

// Создание и добавление освещения
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
lightHolder.add(ambientLight);

const light = new THREE.PointLight(0xffffff, 0.6);
light.position.set(2, 3, 4);
lightHolder.add(light);

scene.add(lightHolder);

// Размеры
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Камера
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 2, 5);
scene.add(camera);

// Управление
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Рендерер
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});
renderer.localClippingEnabled = true;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#313131', 1);

// Загрузка моделей и скрытие прелоадера после загрузки
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
// Загрузка модели стола
loadPromises.push(new Promise((resolve, reject) => {
    gltfLoader.load(
        '/models/table.glb',
        (gltf) => {
            const sceneGlb = gltf.scene;
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
            let groupModalFirst = new THREE.Group();
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

                    //
                    viewModal.createNewModel(groupModalSecond, sceneGlb.parent.children[2]);
            
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

            resolve();
        },
        undefined,
        reject
    );
}));

// Скрыть прелоадер после загрузки всех моделей
Promise.all(loadPromises).then(() => {
    document.getElementById("loader").style.display = "none";
    document.querySelectorAll("button").forEach(button => {
        button.style.display = "block";
    });
}).catch(error => {
    console.error('Failed to load models', error);
    alert('Failed to load models. Please try again later.');
});

// Обновление сцены
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    lightHolder.quaternion.copy(camera.quaternion);
    window.requestAnimationFrame(tick);
};

tick();
